const allImages = Array.from(
  { length: 87 },
  (_, i) => `/images/memory-${String(i + 1).padStart(3, '0')}.jpg`
)

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
