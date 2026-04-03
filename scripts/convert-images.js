#!/usr/bin/env node

/**
 * frontend/public/images/ 이미지 변환 스크립트
 * 1. 파일 타입 변환: HEIC, heic, PNG → JPG (sips 사용)
 * 2. 이름 변경: memory-{번호}.jpg (prepare-rename 모드)
 *
 * 사용법:
 *   node scripts/convert-images.js convert   # 1단계: 타입 변환
 *   node scripts/convert-images.js rename   # 2단계: 이름 변경 (convert 후 실행)
 */

import { readdirSync, unlinkSync, renameSync } from 'fs'
import { join, extname, basename } from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = join(__dirname, '..', 'frontend', 'public', 'images', 'jpg')

const TO_CONVERT = ['.heic', '.HEIC', '.png', '.PNG']

function convertToJpg() {
  const files = readdirSync(IMAGES_DIR).filter((f) => {
    const ext = extname(f).toLowerCase()
    return (ext === '.heic' || ext === '.png') && !f.startsWith('.')
  })

  if (files.length === 0) {
    console.log('변환할 파일이 없습니다.')
    return
  }

  console.log(`변환 대상: ${files.length}개`)
  for (const file of files) {
    const inputPath = join(IMAGES_DIR, file)
    const base = basename(file, extname(file))
    const outputPath = join(IMAGES_DIR, `${base}.jpg`)

    const outputExists = readdirSync(IMAGES_DIR).some(
      (f) => f.toLowerCase() === `${base}.jpg`.toLowerCase()
    )
    if (outputExists) {
      console.log(`  - ${file} 스킵 (${base}.jpg 이미 존재)`)
      unlinkSync(inputPath)
      continue
    }

    try {
      execSync(`sips -s format jpeg "${inputPath}" --out "${outputPath}"`, {
        stdio: 'pipe',
      })
      unlinkSync(inputPath)
      console.log(`  ✓ ${file} → ${base}.jpg`)
    } catch (e) {
      console.error(`  ✗ ${file}: ${e.message}`)
    }
  }
  console.log('변환 완료.')
}

function renameToMemory() {
  const files = readdirSync(IMAGES_DIR)
    .filter((f) => /\.(jpg|jpeg|JPG|JPEG)$/i.test(f) && !f.startsWith('.'))
    .sort()

  if (files.length === 0) {
    console.log('변환할 JPG 파일이 없습니다.')
    return
  }

  console.log(`이름 변경 대상: ${files.length}개`)
  files.forEach((file, i) => {
    const n = i + 1
    const newName = `memory-${String(n).padStart(3, '0')}.jpg`
    const oldPath = join(IMAGES_DIR, file)
    const newPath = join(IMAGES_DIR, newName)
    if (oldPath !== newPath) {
      renameSync(oldPath, newPath)
      console.log(`  ✓ ${file} → ${newName}`)
    }
  })
  console.log('이름 변경 완료.')
}

const cmd = process.argv[2] || 'convert'
if (cmd === 'convert') {
  convertToJpg()
} else if (cmd === 'rename') {
  renameToMemory()
} else {
  console.log('사용법: node scripts/convert-images.js [convert|rename]')
}
