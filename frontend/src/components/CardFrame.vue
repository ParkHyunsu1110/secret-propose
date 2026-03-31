<template>
  <div class="card-frame">
    <div class="card-image-wrapper">
      <button
        v-if="images.length > 1 && imageIndex > 0"
        class="card-arrow card-arrow-left"
        aria-label="이전 사진"
        @click.prevent="imageIndex--"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <img
        v-if="currentImage"
        class="card-image-blur"
        :src="toWebp(currentImage)"
        aria-hidden="true"
        alt=""
      >
      <div class="card-image">
        <picture v-if="currentImage">
          <source :srcset="toWebp(currentImage)" type="image/webp">
          <img
            :src="currentImage"
            class="card-image-img"
            alt=""
            decoding="async"
            fetchpriority="high"
            @load="hasImage = true"
            @error="hasImage = false"
          >
        </picture>
        <div v-else class="card-image-placeholder">
          <span>📷</span>
          <p>사진을 추가해주세요</p>
        </div>
      </div>
      <button
        v-if="images.length > 1 && imageIndex < images.length - 1"
        class="card-arrow card-arrow-right"
        aria-label="다음 사진"
        @click.prevent="imageIndex++"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
      <div v-if="images.length > 1" class="card-image-dots">
        <template v-if="images.length <= 20">
          <span
            v-for="(_, i) in images"
            :key="i"
            class="card-image-dot"
            :class="{ active: i === imageIndex }"
          />
        </template>
        <span v-else class="card-image-counter">
          {{ imageIndex + 1 }} / {{ images.length }}
        </span>
      </div>
    </div>
    <div v-if="memory.date || memory.place" class="card-meta">
      <div v-if="memory.date" class="card-date-line">날짜: {{ memory.date }}</div>
      <div v-if="memory.place" class="card-place-line">{{ memory.place }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  memory: {
    type: Object,
    required: true,
  },
})

const images = computed(() => {
  const raw = props.memory?.images || props.memory?.image
  if (Array.isArray(raw)) return raw
  if (typeof raw === 'string' && raw.startsWith('[')) {
    try {
      return JSON.parse(raw)
    } catch {
      return raw ? [raw] : []
    }
  }
  return raw ? [raw] : []
})

const imageIndex = ref(0)
const currentImage = computed(() => images.value[imageIndex.value] || '')

function toWebp(src) {
  return src?.replace(/\.jpg$/i, '.webp') || src
}

const hasImage = ref(false)

watch(
  () => currentImage.value,
  () => {
    hasImage.value = false
  },
  { immediate: true }
)

watch(
  () => props.memory,
  () => (imageIndex.value = 0),
  { deep: true }
)
</script>

<style scoped>
.card-frame {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(100, 80, 50, 0.1);
}

.card-image-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  min-height: 120px;
}

.card-image-blur {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
  transform: scale(1.1);
  z-index: 0;
}

.card-image {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.card-image picture {
  display: flex;
  justify-content: center;
  width: 100%;
}

.card-image-img {
  max-width: 100%;
  max-height: 70vh;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}

.card-image-placeholder {
  text-align: center;
  color: #c8a88a;
}

.card-image-placeholder span {
  font-size: 3rem;
}

.card-image-placeholder p {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.card-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  color: rgba(80, 60, 40, 0.9);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.card-arrow svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.card-arrow:hover {
  background: rgba(255, 255, 255, 0.6);
}

.card-arrow-left {
  left: 10px;
}

.card-arrow-right {
  right: 10px;
}

.card-image-dots {
  position: absolute;
  bottom: 14px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 2;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
  margin: 0 12px;
  border-radius: 20px;
}

.card-image-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.2s;
}

.card-image-dot.active {
  background: #fff;
  transform: scale(1.25);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
}

.card-image-counter {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.card-meta {
  padding: 1rem 1.5rem;
  font-size: 0.9rem;
  color: #8b6f5c;
  background: rgba(255, 255, 255, 0.98);
}

.card-date-line {
  margin-bottom: 0.35rem;
}

.card-place-line {
  line-height: 1.45;
}

@media (max-width: 520px) {
  .card-frame {
    max-width: 100%;
    border-radius: 16px;
  }

  .card-meta {
    padding: 0.9rem 1.2rem;
    font-size: 0.85rem;
  }
}
</style>
