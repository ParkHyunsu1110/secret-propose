<template>
  <div class="letter">
    <div class="letter-paper">
      <p class="letter-greeting">{{ greeting }}</p>
      <div class="letter-body">
        <p v-for="(paragraph, index) in paragraphs" :key="index">
          {{ paragraph }}
        </p>
      </div>
      <p class="letter-closing">{{ closing }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchLetter } from '@/api/index.js'

const greeting = ref('사랑하는 당신에게')
const closing = ref('영원히 사랑하는, 당신의 사람으로부터')
const paragraphs = ref([
  '우리가 함께한 모든 순간들이 떠올라. 처음 만났던 그 날부터 지금 이 순간까지, 매일이 선물 같았어.',
  '네가 웃을 때마다 세상이 환해지는 것 같고, 네가 내 곁에 있다는 것만으로도 하루가 완벽해져.',
  '앞으로도 우리의 이야기를 함께 써 나가고 싶어. 슬플 때도, 기쁠 때도, 평범한 날에도 항상 네 옆에 있고 싶어.',
  '그래서 오늘, 용기를 내어 물어보려 해.',
])

onMounted(async () => {
  try {
    const data = await fetchLetter()
    if (data) {
      if (data.greeting) greeting.value = data.greeting
      if (data.closing) closing.value = data.closing
      if (data.paragraphs?.length) paragraphs.value = data.paragraphs
    }
  } catch {
    /* fallback to local data */
  }
})
</script>

<style scoped>
.letter {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

.letter-paper {
  background: linear-gradient(180deg, #fdf8f0 0%, #faf3e8 100%);
  border-radius: 12px;
  padding: 2.5rem 2rem;
  box-shadow:
    0 2px 20px rgba(0, 0, 0, 0.08),
    inset 0 0 80px rgba(200, 170, 130, 0.05);
  position: relative;
  font-family: 'Nanum Myeongjo', serif;
  max-height: 60dvh;
  overflow-y: auto;
}

.letter-paper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 2rem;
  right: 2rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, #d4b896, transparent);
}

.letter-greeting {
  font-size: 1.15rem;
  color: #8b6f5c;
  margin: 0 0 2rem 0;
  font-style: italic;
  font-weight: 700;
}

.letter-body p {
  font-size: 1rem;
  color: #5c4a3d;
  line-height: 2;
  margin: 0 0 1.4rem 0;
  word-break: keep-all;
  white-space: pre-line;
  text-align: center;
}

.letter-closing {
  font-size: 0.95rem;
  color: #8b6f5c;
  text-align: right;
  margin: 2rem 0 0 0;
  font-style: italic;
}

@media (max-width: 480px) {
  .letter-paper {
    padding: 2rem 1.5rem;
    border-radius: 10px;
  }

  .letter-body p {
    font-size: 0.9rem;
    line-height: 1.8;
  }
}
</style>
