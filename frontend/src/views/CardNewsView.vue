<template>
  <div class="card-news">
    <div
      class="card-news-container"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div class="card-frame-wrapper">
        <button
          class="card-nav-arrow card-nav-arrow-left"
          :class="{ hidden: currentIndex === 0 }"
          aria-label="이전"
          @click="prev"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <transition v-if="currentMemory" :name="transitionName" mode="out-in" class="card-transition">
          <CardFrame :key="currentIndex" :memory="currentMemory" />
        </transition>
        <div v-else class="card-loading card-transition">카드를 불러오는 중...</div>
        <button
          class="card-nav-arrow card-nav-arrow-right"
          :aria-label="isLast ? '특별한 이야기 보기' : '다음'"
          @click="isLast ? goToEvent() : next()"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div class="card-indicator">
        <span
          v-for="(_, index) in memories"
          :key="index"
          class="dot"
          :class="{ active: index === currentIndex }"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CardFrame from '@/components/CardFrame.vue'
import { recordVisit } from '@/api/index.js'
import { SHARE_MEMORY_IDS_ORDERED } from '@/config/shareMemories.js'

function parseImages(raw) {
  if (Array.isArray(raw)) return raw
  if (typeof raw === 'string' && raw.startsWith('[')) {
    try {
      return JSON.parse(raw)
    } catch {
      return [raw]
    }
  }
  return raw ? [raw] : []
}

const router = useRouter()
const route = useRoute()
const currentIndex = ref(0)
const transitionName = ref('slide-left')
const memories = ref([])

const currentMemory = computed(() => memories.value[currentIndex.value] || null)
const isLast = computed(() => currentIndex.value === memories.value.length - 1)
const preloaded = new Set()

function preferredImageSrc(src) {
  return src?.replace(/\.jpg$/i, '.webp') || src
}

function preloadMemoryImages(index) {
  const memory = memories.value[index]
  if (!memory?.images?.length) return
  for (const rawSrc of memory.images) {
    const src = preferredImageSrc(rawSrc)
    if (!src || preloaded.has(src)) continue
    const img = new Image()
    img.decoding = 'async'
    img.src = src
    preloaded.add(src)
  }
}

function preloadAroundCurrent() {
  const i = currentIndex.value
  // 현재/다음/다다음 카드를 미리 로드해 넘길 때 체감 지연을 줄인다.
  preloadMemoryImages(i)
  preloadMemoryImages(i + 1)
  preloadMemoryImages(i + 2)
}

onMounted(async () => {
  recordVisit(route.meta.share ? 'card-news-share' : 'card-news').catch(() => {})
  try {
    const res = await fetch('/data/card-news.json')
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length) {
        memories.value = data.map((m) => ({
          ...m,
          images: parseImages(m.imagePath || m.image || m.images),
        }))
      }
    }
  } catch {
    /* fallback omitted: show loading state if data file is unavailable */
  }
  memories.value = memories.value.map((m) => ({
    ...m,
    images: m.images || parseImages(m.imagePath || m.image),
  }))
  if (route.meta.share) {
    const byId = new Map(memories.value.map((m) => [m.id, m]))
    memories.value = SHARE_MEMORY_IDS_ORDERED.map((id) => byId.get(id)).filter(Boolean)
  }
  if (currentIndex.value >= memories.value.length) currentIndex.value = 0
  preloadAroundCurrent()
})

watch(currentIndex, () => {
  preloadAroundCurrent()
})

function next() {
  if (currentIndex.value < memories.value.length - 1) {
    transitionName.value = 'slide-left'
    currentIndex.value++
  }
}

function prev() {
  if (currentIndex.value > 0) {
    transitionName.value = 'slide-right'
    currentIndex.value--
  }
}

function goToEvent() {
  router.push(route.meta.share ? '/share/event' : '/event')
}

const SWIPE_THRESHOLD = 50
let touchStartX = 0

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
}

function onTouchEnd(e) {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) < SWIPE_THRESHOLD) return

  if (diff > 0) {
    if (isLast.value) goToEvent()
    else next()
  } else {
    prev()
  }
}
</script>

<style scoped>
.card-news {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.card-news-container {
  width: 100%;
  max-width: 520px;
}

.card-frame-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.card-transition {
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
}

.card-loading {
  width: 100%;
  min-height: 420px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b6f5c;
  font-size: 0.95rem;
}

.card-nav-arrow {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  color: rgba(80, 60, 40, 0.9);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.card-nav-arrow:hover {
  background: rgba(255, 255, 255, 0.85);
}

.card-nav-arrow.hidden {
  visibility: hidden;
  pointer-events: none;
}

.card-nav-arrow svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

@media (max-width: 560px) {
  .card-frame-wrapper {
    gap: 8px;
  }

  .card-nav-arrow {
    width: 36px;
    height: 36px;
  }

  .card-nav-arrow svg {
    width: 18px;
    height: 18px;
  }
}

.card-indicator {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(180, 150, 100, 0.3);
  transition: all 0.3s ease;
}

.dot.active {
  background: #c8956c;
  transform: scale(1.3);
}

/* Slide transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(60px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(60px);
}

@media (max-width: 480px) {
  .card-news {
    padding: 1rem 0.8rem;
  }
}
</style>
