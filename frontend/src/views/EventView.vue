<template>
  <div class="event-page">
    <div v-if="!started" class="music-overlay" @click="start">
      <div class="music-prompt">
        <span class="music-icon">✉</span>
        <p>화면을 터치하면<br />특별한 이야기가 시작됩니다</p>
      </div>
    </div>

    <div v-if="started" class="event-content">
      <transition name="fade-up">
        <div v-if="showLetter" class="letter-section">
          <LetterContent />

          <div class="proposal-section">
            <h2 class="proposal-question">나와 평생을 함께 해줄래?</h2>

            <div class="button-group">
              <button class="yes-btn" @click="onYes">
                네
              </button>
              <RunawayButton />
            </div>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LetterContent from '@/components/LetterContent.vue'
import RunawayButton from '@/components/RunawayButton.vue'
import { useMusic } from '@/composables/useMusic.js'
import { acceptPropose, recordVisit } from '@/api/index.js'

const router = useRouter()
const { play } = useMusic()
const started = ref(false)
const showLetter = ref(false)

onMounted(() => {
  recordVisit('event').catch(() => {})
})

async function start() {
  play().catch(() => {})
  started.value = true
  await nextTick()
  setTimeout(() => {
    showLetter.value = true
  }, 300)
}

function onYes() {
  acceptPropose().catch(() => {})
  router.push('/celebration')
}
</script>

<style scoped>
.event-page {
  min-height: 100dvh;
  position: relative;
}

.music-overlay {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.music-prompt {
  text-align: center;
  color: #8b6f5c;
  animation: float 3s ease-in-out infinite;
}

.music-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.music-prompt p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 0;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.event-content {
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
}

.letter-section {
  width: 100%;
  max-width: 480px;
}

.proposal-section {
  margin-top: 3rem;
  text-align: center;
}

.proposal-question {
  font-size: 1.5rem;
  font-weight: 700;
  color: #5c4a3d;
  margin: 0 0 2rem 0;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  align-items: center;
}

.yes-btn {
  padding: 0.9rem 2.5rem;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, #e8c170, #d4a04a);
  color: #fff;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.yes-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(212, 160, 74, 0.4);
}

.yes-btn:active {
  transform: translateY(-1px);
}

/* fade-up transition */
.fade-up-enter-active {
  transition: all 0.8s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

@media (max-width: 480px) {
  .event-content {
    padding: 2rem 0.8rem;
  }

  .proposal-question {
    font-size: 1.3rem;
  }

  .music-prompt p {
    font-size: 1rem;
  }
}
</style>
