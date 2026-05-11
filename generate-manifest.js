import { readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function findJsonFiles(dir, basePath = '') {
  const files = []

  if (!existsSync(dir)) {
    return files
  }

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const relativePath = join(basePath, entry)

    if (statSync(fullPath).isDirectory()) {
      files.push(...findJsonFiles(fullPath, relativePath))
    } else if (entry.endsWith('.json') && entry !== 'manifest.json') {
      files.push('/openapi/public/' + relativePath.replace(/\\/g, '/'))
    }
  }

  return files
}

const openapiDir = join(__dirname, 'public', 'openapi')
if (!existsSync(openapiDir)) {
  mkdirSync(openapiDir, { recursive: true })
}
const files = findJsonFiles(openapiDir)
const manifest = { files, generated: new Date().toISOString() }
writeFileSync(join(openapiDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`Generated manifest with ${files.length} OpenAPI spec files`)
