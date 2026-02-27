<template>
  <button
    ref="buttonRef"
    class="runaway-btn"
    :style="buttonStyle"
    @mouseover="runAway"
    @touchstart.prevent="runAway"
    @click.prevent="runAway"
  >
    아니요
  </button>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const buttonRef = ref(null)
const posX = ref(0)
const posY = ref(0)
const isPositioned = ref(false)

const containerPadding = 20

const buttonStyle = computed(() => {
  if (!isPositioned.value) return {}
  return {
    position: 'fixed',
    left: `${posX.value}px`,
    top: `${posY.value}px`,
    transition: 'left 0.3s ease, top 0.3s ease',
  }
})

function getViewportBounds() {
  const btn = buttonRef.value
  if (!btn) return { maxX: 0, maxY: 0 }
  const rect = btn.getBoundingClientRect()
  return {
    maxX: window.innerWidth - rect.width - containerPadding,
    maxY: window.innerHeight - rect.height - containerPadding,
  }
}

function runAway() {
  isPositioned.value = true
  const { maxX, maxY } = getViewportBounds()

  let newX, newY
  let attempts = 0

  do {
    newX = containerPadding + Math.random() * (maxX - containerPadding)
    newY = containerPadding + Math.random() * (maxY - containerPadding)
    attempts++
  } while (
    Math.abs(newX - posX.value) < 100 &&
    Math.abs(newY - posY.value) < 100 &&
    attempts < 10
  )

  posX.value = newX
  posY.value = newY
}

function handleResize() {
  if (!isPositioned.value) return
  const { maxX, maxY } = getViewportBounds()
  posX.value = Math.min(posX.value, maxX)
  posY.value = Math.min(posY.value, maxY)
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.runaway-btn {
  padding: 0.9rem 2.5rem;
  border: 2px solid #ccc;
  border-radius: 50px;
  background: #fff;
  color: #888;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  z-index: 100;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}

.runaway-btn:hover {
  border-color: #aaa;
}

@media (max-width: 480px) {
  .runaway-btn {
    padding: 0.8rem 2rem;
    font-size: 0.95rem;
  }
}
</style>
