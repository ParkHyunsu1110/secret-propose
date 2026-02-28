<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <transition name="fade">
    <button v-if="isPlaying" class="music-toggle" @click="toggleMusic" :aria-label="isPlaying ? '음악 끄기' : '음악 켜기'">
      <span class="music-icon" :class="{ paused: !isPlaying }">♪</span>
    </button>
  </transition>
</template>

<script setup>
import { useMusic } from '@/composables/useMusic.js'

const { isPlaying, play, pause } = useMusic()

function toggleMusic() {
  if (isPlaying.value) pause()
  else play()
}
</script>

<style scoped>
.music-toggle {
  position: fixed;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 999;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(180, 150, 100, 0.3);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.music-toggle:hover {
  background: rgba(255, 255, 255, 0.8);
}

.music-icon {
  color: #8b6f5c;
  font-size: 1.1rem;
  animation: bounce-note 1.5s ease-in-out infinite;
}

.music-icon.paused {
  animation: none;
  opacity: 0.5;
}

@keyframes bounce-note {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
</style>
