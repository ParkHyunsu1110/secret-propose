#!/usr/bin/env node

import sharp from 'sharp'
import { readdirSync } from 'fs'
import { join, extname, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = join(__dirname, '..', 'frontend', 'public', 'images')
const JPG_DIR = join(IMAGES_DIR, 'jpg')

async function main() {
  const files = readdirSync(JPG_DIR)
    .filter((f) => extname(f).toLowerCase() === '.jpg' && f.startsWith('memory-'))
    .sort()

  let converted = 0
  for (const file of files) {
    const input = join(JPG_DIR, file)
    const output = join(IMAGES_DIR, `${basename(file, '.jpg')}.webp`)
    await sharp(input).resize({ width: 520, withoutEnlargement: true }).webp({ quality: 60 }).toFile(output)
    converted += 1
  }

  console.log(`✓ WebP 생성 완료: ${converted}개`)
}

main().catch((e) => {
  console.error('WebP 생성 실패:', e.message)
  process.exit(1)
})
