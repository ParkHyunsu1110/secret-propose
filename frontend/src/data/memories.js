// 033 슬롯 비움(누락분 추가 예정), 034~088로 번호 밀림
const allImages = [
  ...Array.from({ length: 32 }, (_, i) => `/images/memory-${String(i + 1).padStart(3, '0')}.jpg`),
  ...Array.from({ length: 55 }, (_, i) => `/images/memory-${String(34 + i).padStart(3, '0')}.jpg`),
]

export const memories = [
  {
    id: 1,
    date: '',
    place: '',
    title: '',
    description: '',
    images: allImages,
  },
]
