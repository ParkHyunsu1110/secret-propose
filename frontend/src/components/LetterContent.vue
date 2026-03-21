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
import { ref } from 'vue'

const DEFAULT_GREETING = '세상에서 가장 사랑하는 은솔아'
const DEFAULT_CLOSING = '영원히 사랑하는, 당신의 사람으로부터'
const DEFAULT_PARAGRAPHS = [
  '너를 처음 만난 날\n그 날 무슨 얘기를 했는지는 기억나지 않지만 \n그 날 이후로 무슨 감정이 생겼는지는 아직도 기억나',
  '그렇게 시작된 우리의 만남으로 내 인생이 많이 바뀌었어',
  '매일 아침을 즐거움으로 시작하게 되었고\n항상 응원해준 덕분에 계속 나아갈 수 있었어',
  '무엇을 위해 살아가야할지 모르는 나에게\n무엇이 되어 주었고',
  '사랑을 받고, 사랑을 준다는 것이 어떤건지\n깨닫게 해주었어',
  '그리고, 사랑하는 사람과 함께하는 시간이\n얼마나 소중하고 행복한지 알게 해주었어.',
  '함께 했던 첫 1년은 행복한 순간 뿐이었고,\n함께 했던 2년째에는 미안한 순간이 가득했고,\n함께 했던 3년째에는 고마운 순간이 가득했어',
  '이제까지의 3년은 짧게만 느껴지는데\n앞으로 다가올 4년째는 행복할 우리의 새 시작이 기다리는 것 때문인지,\n왜 이렇게나 길게만 느껴지는지 모르겠다',
  '나의 행복했던 시간과 힘들었던 시간을 함께 해준 은솔아',
  '앞으로 우리가 함께 나아가면서 얼마나 많이 행복할지\n또 얼마나 많은 시련에 마주칠지는 모르겠지만\n그때 내 옆에 너라는 사람이 있었으면 좋겠어',
  '평생 너를 옆에 꼭 끼고 지켜주며 든든한 동반자가 되어줄게',
  '항상 너의 의견을 존중하며 언제나 너를 위한 단 한 사람이 될게',
  '지금처럼 하루하루 소소한 이야기를 나누면서\n사랑하는 너와 작은 것 하나에도\n감사하고 즐거워하며 살아가고 싶어',
  '사랑한다 은솔아',
  '내 남은 평생을, 앞으로 펼쳐질 인생을 너와 함께할래',
]

const greeting = ref(DEFAULT_GREETING)
const closing = ref(DEFAULT_CLOSING)
const paragraphs = ref(DEFAULT_PARAGRAPHS)
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
