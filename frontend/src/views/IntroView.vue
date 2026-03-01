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
import { useRouter } from 'vue-router'

const router = useRouter()

function goToCards() {
  router.push('/cards')
}
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
