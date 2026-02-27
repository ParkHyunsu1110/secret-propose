<template>
  <div class="event-page">
    <audio ref="audioRef" loop :src="musicSrc" />

    <div v-if="!musicStarted" class="music-overlay" @click="startMusic">
      <div class="music-prompt">
        <span class="music-icon">♪</span>
        <p>화면을 터치하면<br />특별한 이야기가 시작됩니다</p>
      </div>
    </div>

    <div v-else class="event-content">
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

    <div v-if="accepted" class="celebration-overlay">
      <div class="celebration-content">
        <span class="heart-icon">❤️</span>
        <h1>고마워, 사랑해</h1>
        <p>우리 함께 영원히</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import LetterContent from '@/components/LetterContent.vue'
import RunawayButton from '@/components/RunawayButton.vue'

const audioRef = ref(null)
const musicStarted = ref(false)
const showLetter = ref(false)
const accepted = ref(false)
const musicSrc = '/music/bgm.mp3'

async function startMusic() {
  try {
    await audioRef.value?.play()
  } catch {
    /* autoplay blocked - continue without music */
  }
  musicStarted.value = true
  await nextTick()
  setTimeout(() => {
    showLetter.value = true
  }, 300)
}

function onYes() {
  accepted.value = true
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
  color: rgba(255, 255, 255, 0.9);
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
  color: #fff;
  margin: 0 0 2rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  background: linear-gradient(135deg, #e8a0bf, #d4739d);
  color: #fff;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.yes-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(212, 115, 157, 0.4);
}

.yes-btn:active {
  transform: translateY(-1px);
}

.celebration-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #1a0a14 0%, #2d1225 50%, #1a0a14 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  animation: fadeIn 1s ease;
}

.celebration-content {
  text-align: center;
  color: #fff;
  animation: scaleIn 0.8s ease 0.3s both;
}

.heart-icon {
  font-size: 5rem;
  display: block;
  margin-bottom: 1.5rem;
  animation: heartbeat 1.2s ease-in-out infinite;
}

.celebration-content h1 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
}

.celebration-content p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.15); }
  30% { transform: scale(1); }
  45% { transform: scale(1.1); }
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

  .celebration-content h1 {
    font-size: 1.6rem;
  }
}
</style>
