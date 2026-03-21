import { ref } from 'vue'

const audio = new Audio('/music/bgm.mp3')
audio.loop = true
audio.preload = 'auto'

const isPlaying = ref(false)
let autoplayInitialized = false

audio.addEventListener('play', () => { isPlaying.value = true })
audio.addEventListener('pause', () => { isPlaying.value = false })

export function useMusic() {
  async function play() {
    try {
      await audio.play()
    } catch {
      /* autoplay blocked */
    }
  }

  function pause() {
    audio.pause()
  }

  function ensureAutoPlay() {
    if (autoplayInitialized) return
    autoplayInitialized = true

    const tryPlay = async () => {
      try {
        await play()
      } catch {
        // ignore
      }
      if (isPlaying.value) {
        document.removeEventListener('click', tryPlay)
        document.removeEventListener('touchstart', tryPlay)
        document.removeEventListener('keydown', tryPlay)
      }
    }

    // 가능한 환경에서는 즉시 자동재생 시도
    tryPlay()

    // 브라우저 정책으로 막히면 첫 사용자 상호작용 시 재시도
    document.addEventListener('click', tryPlay, { passive: true })
    document.addEventListener('touchstart', tryPlay, { passive: true })
    document.addEventListener('keydown', tryPlay, { passive: true })
  }

  return { isPlaying, play, pause, ensureAutoPlay }
}
