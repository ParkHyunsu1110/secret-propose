#!/usr/bin/env node

/**
 * TextGuide.md 파싱 → src/main/resources/data.sql 생성
 * 실행: npm run generate:data (프로젝트 루트에서)
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const TEXT_GUIDE = join(ROOT, 'TextGuide.md')
const OUTPUT = join(ROOT, 'src', 'main', 'resources', 'data.sql')

function escapeSql(str) {
  if (!str || typeof str !== 'string') return "''"
  return "'" + str.replace(/'/g, "''") + "'"
}

function parseTextGuide(content) {
  const memories = []
  const letter = { greeting: '', closing: '', paragraphs: [] }

  // 카드 뉴스: ### N ... ### N+1 또는 ## 편지
  const cardSection = content.match(/## 카드 뉴스[\s\S]*?(?=## 편지|$)/i)
  if (cardSection) {
    const cardBlocks = cardSection[0].matchAll(/### (\d+)\s*\n([\s\S]*?)(?=### \d+|## |$)/g)
    for (const [, num, block] of cardBlocks) {
      const date = block.match(/- 날짜:\s*(.+?)(?:\n|$)/)?.[1]?.trim() || ''
      const place = block.match(/- 장소:\s*(.+?)(?:\n|$)/)?.[1]?.trim() || ''
      const title = block.match(/- 제목:\s*(.+?)(?:\n|$)/)?.[1]?.trim() || ''
      const descMatch = block.match(/- 설명:\s*([\s\S]*?)(?=\n\n|\n---|\n### |\n## |$)/)
      const desc = descMatch?.[1]?.trim()?.replace(/\n\s*/g, ' ') || ''
      const photoMatch = block.match(/- 사진:\s*(.+?)(?:\n|$)/)?.[1]?.trim()
      let imagePaths = []
      if (photoMatch) {
        const trimmed = photoMatch.trim()
        const rangeMatch = trimmed.match(/^(\d+)\s*[-~]\s*(\d+)$/)
        if (rangeMatch) {
          const [, start, end] = rangeMatch.map(Number)
          imagePaths = Array.from(
            { length: Math.max(0, end - start + 1) },
            (_, i) => `/images/memory-${String(start + i).padStart(3, '0')}.jpg`
          )
        } else {
          imagePaths = trimmed.split(/[,，]/).map((f) => {
            const s = f.trim()
            return s.startsWith('http') ? s : (s.includes('/') ? s : `/images/${s}`)
          }).filter(Boolean)
        }
      } else {
        imagePaths = [`/images/memory-${String(num).padStart(3, '0')}.jpg`]
      }
      if (imagePaths.length > 0 || date || place || title || desc) {
        memories.push({
          id: parseInt(num, 10),
          date,
          place,
          title,
          description: desc,
          imagePath: JSON.stringify(imagePaths),
        })
      }
    }
  }

  // 편지
  const letterSection = content.match(/## 편지[\s\S]*$/i)
  if (letterSection) {
    const section = letterSection[0]
    letter.greeting = section.match(/- 인사말:\s*(.+)/)?.[1]?.trim() || '사랑하는 당신에게'
    letter.closing = section.match(/- 맺음말:\s*(.+)/)?.[1]?.trim() || '영원히 사랑하는, 당신의 사람으로부터'

    const bodyMatch = section.match(/### 본문\s*\n([\s\S]*?)(?=## |$)/)
    if (bodyMatch) {
      const body = bodyMatch[1].trim()
      letter.paragraphs = body
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    }
  }

  return { memories, letter }
}

function generateSql({ memories, letter }) {
  const lines = ['-- 기존 데이터가 없을 때만 삽입', '-- TextGuide.md에서 자동 생성됨 (npm run generate:data)', '']

  if (memories.length > 0) {
    const memValues = memories
      .map(
        (m) =>
          `(${m.id}, ${escapeSql(m.date)}, ${escapeSql(m.place)}, ${escapeSql(m.title)}, ${escapeSql(m.description)}, ${escapeSql(m.imagePath)}, ${m.id})`
      )
      .join(',\n')
    lines.push(
      'MERGE INTO memory (id, date, place, title, description, image_path, sort_order) KEY(id) VALUES',
      memValues,
      ';',
      ''
    )
  }

  const greeting = letter.greeting || '사랑하는 당신에게'
  const closing = letter.closing || '영원히 사랑하는, 당신의 사람으로부터'
  const paragraphs =
    letter.paragraphs.length > 0 ? letter.paragraphs : ['우리가 함께한 모든 순간들이 떠올라.']
  const paragraphsJson = JSON.stringify(paragraphs)

  lines.push(
    'MERGE INTO letter (id, greeting, closing, paragraphs) KEY(id) VALUES',
    `(1,\n ${escapeSql(greeting)},\n ${escapeSql(closing)},\n ${escapeSql(paragraphsJson)});`
  )

  return lines.join('\n')
}

function main() {
  let content
  try {
    content = readFileSync(TEXT_GUIDE, 'utf-8')
  } catch (e) {
    console.error('TextGuide.md를 찾을 수 없습니다:', TEXT_GUIDE)
    process.exit(1)
  }

  const parsed = parseTextGuide(content)
  const sql = generateSql(parsed)

  try {
    writeFileSync(OUTPUT, sql, 'utf-8')
    console.log('✓ data.sql 생성 완료:', OUTPUT)
    console.log('  - 카드 뉴스:', parsed.memories.length, '개')
    console.log('  - 편지 문단:', parsed.letter.paragraphs.length, '개')
  } catch (e) {
    console.error('파일 쓰기 실패:', e.message)
    process.exit(1)
  }
}

main()
