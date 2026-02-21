import { Command } from 'commander'
import pc from 'picocolors'
import path from 'node:path'
import fs from 'node:fs'
import { registry, resolveComponentDeps } from '../registry/resolve.js'
import { loadConfig } from '../utils/detect.js'
import { writeFile, ensureDir } from '../utils/fs.js'
import { transformImports } from '../utils/transform.js'

export const addCommand = new Command('add')
  .description('Add components to your project')
  .argument('<components...>', 'Components to add')
  .option('-y, --yes', 'Skip confirmation', false)
  .option('-o, --overwrite', 'Overwrite existing files', false)
  .action(async (componentNames: string[], options) => {
    const cwd = process.cwd()
    const config = loadConfig(cwd)

    if (!config) {
      console.log(pc.red('\n  snx-ui.json not found. Run `npx snx-ui init` first.\n'))
      return
    }

    // Validate component names
    const invalid = componentNames.filter(name => !registry.components[name])
    if (invalid.length > 0) {
      console.log(pc.red(`\n  Unknown components: ${invalid.join(', ')}`))
      console.log(`  Run ${pc.cyan('npx snx-ui list')} to see available components.\n`)
      return
    }

    // Resolve all dependencies
    const allComponents = new Set<string>()
    for (const name of componentNames) {
      const deps = resolveComponentDeps(name)
      for (const dep of deps) {
        allComponents.add(dep)
      }
      allComponents.add(name)
    }

    console.log(pc.bold(`\n  Adding ${allComponents.size} component(s):\n`))

    for (const name of allComponents) {
      const component = registry.components[name]
      if (!component) continue

      console.log(`  ${pc.cyan(name)} ${component.type === 'css-only' ? '(CSS)' : '(interactive)'}`)

      const framework = config.framework as 'react' | 'angular'
      const componentDir = path.join(cwd, config.aliases.components)
      await ensureDir(componentDir)

      // Get the files to copy for this framework
      const files = component.files[framework]
      const cssFile = component.files.css
      const coreFile = component.files.core

      if (!files) {
        console.log(pc.yellow(`    Skipped: no ${framework} adapter`))
        continue
      }

      // Copy framework-specific files
      const filesToCopy = Array.isArray(files) ? files : [files]
      for (const file of filesToCopy) {
        const fileName = path.basename(file)
        const destPath = path.join(componentDir, fileName)

        if (fs.existsSync(destPath) && !options.overwrite) {
          console.log(pc.yellow(`    Skipped: ${fileName} (already exists, use --overwrite)`))
          continue
        }

        const sourcePath = path.join(__dirname, '..', '..', '..', file)
        let content: string

        if (fs.existsSync(sourcePath)) {
          content = fs.readFileSync(sourcePath, 'utf-8')
        } else {
          content = `// ${name} component for ${framework}\n// Run 'npx snx-ui add ${name}' to regenerate\n`
        }

        content = transformImports(content, config)

        await writeFile(destPath, content)
        console.log(pc.green(`    Created: ${config.aliases.components}/${fileName}`))
      }

      // Copy core logic file if interactive
      if (coreFile && component.type === 'interactive') {
        const utilsDir = path.join(cwd, config.aliases.utils)
        await ensureDir(utilsDir)
        const coreFileName = path.basename(coreFile)
        const coreDest = path.join(utilsDir, coreFileName)

        if (!fs.existsSync(coreDest) || options.overwrite) {
          const coreSourcePath = path.join(__dirname, '..', '..', '..', coreFile)
          let coreContent = fs.existsSync(coreSourcePath)
            ? fs.readFileSync(coreSourcePath, 'utf-8')
            : `// ${name} core logic\n`

          await writeFile(coreDest, coreContent)
          console.log(pc.green(`    Created: ${config.aliases.utils}/${coreFileName}`))
        }
      }

      // Copy CSS file
      if (cssFile) {
        const cssDir = path.join(cwd, path.dirname(config.tailwind.css))
        const cssComponentsDir = path.join(cssDir, 'components')
        await ensureDir(cssComponentsDir)
        const cssFileName = path.basename(cssFile)
        const cssDest = path.join(cssComponentsDir, cssFileName)

        if (!fs.existsSync(cssDest) || options.overwrite) {
          const cssSourcePath = path.join(__dirname, '..', '..', '..', cssFile)
          let cssContent = fs.existsSync(cssSourcePath)
            ? fs.readFileSync(cssSourcePath, 'utf-8')
            : `/* ${name} styles */\n`

          await writeFile(cssDest, cssContent)
          console.log(pc.green(`    Created: components/${cssFileName}`))
        }
      }
    }

    console.log(pc.bold(pc.green('\n  Done!\n')))
  })
