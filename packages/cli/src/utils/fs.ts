import fs from 'node:fs'
import path from 'node:path'

export async function writeFile(filePath: string, content: string): Promise<void> {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, content, 'utf-8')
}

export async function ensureDir(dirPath: string): Promise<void> {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

export async function fileExists(filePath: string): Promise<boolean> {
  return fs.existsSync(filePath)
}

export async function readFile(filePath: string): Promise<string> {
  return fs.readFileSync(filePath, 'utf-8')
}

export async function copyFile(src: string, dest: string): Promise<void> {
  const dir = path.dirname(dest)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.copyFileSync(src, dest)
}
