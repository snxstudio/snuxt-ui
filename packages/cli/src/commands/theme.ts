import { Command } from 'commander'
import pc from 'picocolors'
import { loadConfig } from '../utils/detect.js'

export const themeCommand = new Command('theme')
  .description('Manage themes')
  .argument('<theme>', 'Theme to add (e.g., dark)')
  .action(async (theme: string) => {
    const cwd = process.cwd()
    const config = loadConfig(cwd)

    if (!config) {
      console.log(pc.red('\n  snx-ui.json not found. Run `npx snx-ui init` first.\n'))
      return
    }

    if (theme === 'dark') {
      console.log(pc.bold('\n  Dark theme\n'))
      console.log('  Dark theme tokens are already included in your base CSS.')
      console.log('  To activate dark mode, add this to your HTML:')
      console.log(pc.cyan('\n    <html data-theme="dark">'))
      console.log('\n  Or toggle with JavaScript:')
      console.log(pc.cyan("    document.documentElement.setAttribute('data-theme', 'dark')"))
      console.log()
    } else {
      console.log(pc.yellow(`\n  Theme "${theme}" is not available yet.`))
      console.log(`  Available themes: ${pc.cyan('dark')}\n`)
    }
  })
