<template>
  <div class="celebration-page">
    <canvas ref="canvasRef" class="particle-canvas" />

    <div class="content-layer">
      <transition name="zoom">
        <div v-if="phase >= 1" class="ring-wrapper">
          <div class="ring-glow" />
          <span class="ring-emoji">💍</span>
        </div>
      </transition>

      <transition name="fade-up-slow">
        <h1 v-if="phase >= 2" class="main-text">고마워, 사랑해</h1>
      </transition>

      <transition name="fade-up-slow">
        <p v-if="phase >= 3" class="sub-text">우리 함께 영원히</p>
      </transition>

      <transition name="fade-up-slow">
        <p v-if="phase >= 4" class="date-text">2026.04.05</p>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { recordVisit } from '@/api/index.js'

const route = useRoute()

const canvasRef = ref(null)
const phase = ref(0)

let ctx = null
let animationId = null
let particles = []

const HEART_COLORS = [
  '#e8c170', '#f0d08a', '#d4a04a', '#c8956c',
  '#e0b87a', '#daa060', '#f2d194', '#ecc88a',
]

const SPARKLE_COLORS = [
  '#ffd700', '#f5c842', '#e8b830', '#f0d060',
]

class Particle {
  constructor(canvas, type) {
    this.canvas = canvas
    this.type = type
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = this.canvas.height + 20 + Math.random() * 100
    this.size = this.type === 'heart' ? 10 + Math.random() * 14 : 2 + Math.random() * 4
    this.speedY = -(1.5 + Math.random() * 2.5)
    this.speedX = (Math.random() - 0.5) * 1.2
    this.opacity = 0.4 + Math.random() * 0.6
    this.fadeSpeed = 0.001 + Math.random() * 0.003
    this.rotation = Math.random() * Math.PI * 2
    this.rotationSpeed = (Math.random() - 0.5) * 0.04
    this.wobbleAmplitude = 0.5 + Math.random() * 1
    this.wobbleSpeed = 0.02 + Math.random() * 0.03
    this.wobbleOffset = Math.random() * Math.PI * 2

    if (this.type === 'heart') {
      this.color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)]
    } else {
      this.color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]
    }
  }

  update(time) {
    this.y += this.speedY
    this.x += this.speedX + Math.sin(time * this.wobbleSpeed + this.wobbleOffset) * this.wobbleAmplitude
    this.rotation += this.rotationSpeed
    this.opacity -= this.fadeSpeed

    if (this.opacity <= 0 || this.y < -30) {
      this.reset()
    }
  }

  draw(ctx, time) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)

    if (this.type === 'heart') {
      this.drawHeart(ctx)
    } else {
      this.drawSparkle(ctx, time)
    }

    ctx.restore()
  }

  drawHeart(ctx) {
    const s = this.size
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.moveTo(0, s * 0.3)
    ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s)
    ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3)
    ctx.closePath()
    ctx.fill()
  }

  drawSparkle(ctx, time) {
    const s = this.size
    const pulse = 1 + 0.3 * Math.sin(time * 0.005 + this.wobbleOffset)
    ctx.fillStyle = this.color
    ctx.shadowColor = this.color
    ctx.shadowBlur = s * 2
    ctx.beginPath()
    ctx.arc(0, 0, s * pulse, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  resizeCanvas()
  createParticles()
  animate(0)
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function createParticles() {
  const canvas = canvasRef.value
  if (!canvas) return

  particles = []
  const heartCount = Math.min(35, Math.floor(window.innerWidth / 20))
  const sparkleCount = Math.min(50, Math.floor(window.innerWidth / 12))

  for (let i = 0; i < heartCount; i++) {
    const p = new Particle(canvas, 'heart')
    p.y = Math.random() * canvas.height
    particles.push(p)
  }
  for (let i = 0; i < sparkleCount; i++) {
    const p = new Particle(canvas, 'sparkle')
    p.y = Math.random() * canvas.height
    particles.push(p)
  }
}

function animate(time) {
  if (!ctx || !canvasRef.value) return

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  for (const p of particles) {
    p.update(time)
    p.draw(ctx, time)
  }

  animationId = requestAnimationFrame(animate)
}

function handleResize() {
  resizeCanvas()
  createParticles()
}

onMounted(() => {
  recordVisit(route.meta.share ? 'celebration-share' : 'celebration').catch(() => {})
  initCanvas()
  window.addEventListener('resize', handleResize)

  setTimeout(() => { phase.value = 1 }, 400)
  setTimeout(() => { phase.value = 2 }, 1500)
  setTimeout(() => { phase.value = 3 }, 2800)
  setTimeout(() => { phase.value = 4 }, 4000)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.celebration-page {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #fdf6e3 0%, #fef3d0 40%, #fff8e1 70%, #fdf6e3 100%);
  overflow: hidden;
}

.particle-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.content-layer {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: 2rem;
  pointer-events: none;
}

.ring-wrapper {
  position: relative;
  margin-bottom: 2.5rem;
}

.ring-emoji {
  font-size: 5rem;
  display: block;
  animation: gentle-float 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.4));
}

.ring-glow {
  position: absolute;
  inset: -30px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
  animation: glow-pulse 2s ease-in-out infinite;
}

.main-text {
  font-size: 2.4rem;
  font-weight: 700;
  color: #5c4a3d;
  margin: 0 0 1rem 0;
  text-shadow: 0 4px 30px rgba(212, 160, 74, 0.3);
  letter-spacing: 0.05em;
}

.sub-text {
  font-size: 1.2rem;
  color: rgba(92, 74, 61, 0.7);
  margin: 0 0 2rem 0;
  font-weight: 300;
  letter-spacing: 0.1em;
}

.date-text {
  font-size: 0.9rem;
  color: rgba(139, 111, 92, 0.5);
  margin: 0;
  letter-spacing: 0.15em;
  font-weight: 300;
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-12px) rotate(5deg); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
}

/* zoom transition */
.zoom-enter-active {
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.zoom-enter-from {
  opacity: 0;
  transform: scale(0.3);
}

/* fade-up-slow transition */
.fade-up-slow-enter-active {
  transition: all 1s ease;
}
.fade-up-slow-enter-from {
  opacity: 0;
  transform: translateY(25px);
}

@media (max-width: 480px) {
  .ring-emoji {
    font-size: 4rem;
  }

  .main-text {
    font-size: 1.8rem;
  }

  .sub-text {
    font-size: 1rem;
  }
}
</style>
