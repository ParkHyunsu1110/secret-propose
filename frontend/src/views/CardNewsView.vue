<template>
  <div class="card-news">
    <div
      class="card-news-container"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <transition :name="transitionName" mode="out-in">
        <CardFrame :key="currentIndex" :memory="currentMemory" />
      </transition>

      <div class="card-indicator">
        <span
          v-for="(_, index) in memories"
          :key="index"
          class="dot"
          :class="{ active: index === currentIndex }"
        />
      </div>

      <div class="card-navigation">
        <button
          class="nav-btn prev"
          :class="{ hidden: currentIndex === 0 }"
          @click="prev"
        >
          이전
        </button>

        <button
          v-if="!isLast"
          class="nav-btn next"
          @click="next"
        >
          다음
        </button>

        <button
          v-else
          class="nav-btn event-btn"
          @click="goToEvent"
        >
          특별한 이야기 보기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CardFrame from '@/components/CardFrame.vue'
import { memories } from '@/data/memories.js'

const router = useRouter()
const currentIndex = ref(0)
const transitionName = ref('slide-left')

const currentMemory = computed(() => memories[currentIndex.value])
const isLast = computed(() => currentIndex.value === memories.length - 1)

function next() {
  if (currentIndex.value < memories.length - 1) {
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
  router.push('/event')
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
  max-width: 420px;
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
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.dot.active {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.3);
}

.card-navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.nav-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.nav-btn.prev {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  backdrop-filter: blur(10px);
}

.nav-btn.prev:hover {
  background: rgba(255, 255, 255, 0.3);
}

.nav-btn.prev.hidden {
  visibility: hidden;
}

.nav-btn.next {
  background: rgba(255, 255, 255, 0.9);
  color: #3d2c3e;
}

.nav-btn.next:hover {
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.nav-btn.event-btn {
  background: linear-gradient(135deg, #e8a0bf, #d4739d);
  color: #fff;
  animation: pulse 2s ease-in-out infinite;
}

.nav-btn.event-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 115, 157, 0.4);
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(212, 115, 157, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(212, 115, 157, 0); }
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

  .nav-btn {
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>
