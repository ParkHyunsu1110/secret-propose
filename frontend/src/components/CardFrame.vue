<template>
  <div class="card-frame">
    <div class="card-image-wrapper">
      <div class="card-image" :style="{ backgroundImage: `url(${memory.image})` }">
        <div class="card-image-placeholder" v-if="!hasImage">
          <span>📷</span>
          <p>사진을 추가해주세요</p>
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="card-meta">
        <span class="card-date">{{ memory.date }}</span>
        <span class="card-divider">·</span>
        <span class="card-place">{{ memory.place }}</span>
      </div>
      <h2 class="card-title">{{ memory.title }}</h2>
      <p class="card-description">{{ memory.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  memory: {
    type: Object,
    required: true,
  },
})

const hasImage = ref(false)

onMounted(() => {
  const img = new Image()
  img.onload = () => (hasImage.value = true)
  img.onerror = () => (hasImage.value = false)
  img.src = props.memory.image
})
</script>

<style scoped>
.card-frame {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(100, 80, 50, 0.1);
}

.card-image-wrapper {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-color: #f5efe3;
  display: flex;
  align-items: center;
  justify-content: center;
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

.card-content {
  padding: 1.8rem 1.5rem;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #b09a7e;
  margin-bottom: 0.8rem;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #4a3728;
  margin: 0 0 0.8rem 0;
  line-height: 1.3;
}

.card-description {
  font-size: 0.95rem;
  color: #6b5c4a;
  line-height: 1.7;
  margin: 0;
  word-break: keep-all;
}

@media (max-width: 480px) {
  .card-frame {
    max-width: 100%;
    border-radius: 16px;
  }

  .card-content {
    padding: 1.4rem 1.2rem;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .card-description {
    font-size: 0.9rem;
  }
}
</style>
