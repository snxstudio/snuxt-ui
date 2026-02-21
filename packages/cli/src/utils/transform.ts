import type { SnxConfig } from './detect.js'

export function transformImports(content: string, config: SnxConfig): string {
  let result = content

  // Transform @snx-ui/core imports to local utils path
  result = result.replace(
    /from ['"]@snx-ui\/core['"]/g,
    `from '${config.aliases.utils}/cn'`
  )

  // Transform relative hook imports to match component directory
  result = result.replace(
    /from ['"]\.\/hooks\//g,
    `from './`
  )

  return result
}
