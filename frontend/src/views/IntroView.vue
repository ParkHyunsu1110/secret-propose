<template>
  <div class="intro-page">
    <div class="intro-content">
      <p class="intro-message">당신을 위해<br />준비했어요</p>
      <button class="intro-btn" @click="goToCards">
        시작하기
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMusic } from '@/composables/useMusic.js'
import { SHARE_MEMORY_IDS_ORDERED } from '@/config/shareMemories.js'

const router = useRouter()
const route = useRoute()
const { play } = useMusic()

function goToCards() {
  // 사용자 클릭 제스처로 재생을 보장해 페이지 이동 후에도 음악이 이어지게 한다.
  play().catch(() => {})
  router.push(route.meta.share ? '/share/cards' : '/cards')
}

function preloadImage(src) {
  if (!src) return
  const img = new Image()
  img.decoding = 'async'
  img.src = src
}

function toWebp(src) {
  return src?.replace(/\.jpg$/i, '.webp') || src
}

async function preloadInitialCardImages() {
  try {
    const res = await fetch('/data/card-news.json')
    if (!res.ok) throw new Error('no json')
    const cards = await res.json()
    if (!Array.isArray(cards)) return

    const share = route.meta.share === true
    const ordered = share
      ? SHARE_MEMORY_IDS_ORDERED.map((id) => cards.find((c) => c.id === id)).filter(Boolean)
      : cards

    // 시작 전 체감 개선: 첫 10개 카드 이미지를 우선 로드
    const firstImages = ordered
      .slice(0, 10)
      .flatMap((c) => (Array.isArray(c.images) ? c.images : []))
      .filter(Boolean)

    for (const src of firstImages) {
      preloadImage(toWebp(src))
      preloadImage(src)
    }
  } catch {
    // 폴백: json 실패 시 파일명 기준 선로딩 (share는 목록 앞 10개 id)
    const ids = route.meta.share
      ? SHARE_MEMORY_IDS_ORDERED.slice(0, 10)
      : Array.from({ length: 10 }, (_, i) => i + 1)
    for (const id of ids) {
      const base = `/images/memory-${String(id).padStart(3, '0')}`
      preloadImage(`${base}.webp`)
      preloadImage(`${base}.jpg`)
    }
  }
}

onMounted(() => {
  preloadInitialCardImages()
})
</script>

<style scoped>
.intro-page {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.intro-content {
  text-align: center;
  max-width: 400px;
}

.intro-message {
  font-family: 'Nanum Myeongjo', serif;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.6;
  color: #5c4a3d;
  margin-bottom: 2.5rem;
}

.intro-btn {
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #c8956c, #a67c52);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(168, 124, 82, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;
}

.intro-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(168, 124, 82, 0.4);
}

.intro-btn:active {
  transform: translateY(0);
}
</style>
