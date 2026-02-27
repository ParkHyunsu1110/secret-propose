import { ref } from 'vue'

const audio = new Audio('/music/bgm.mp3')
audio.loop = true

const isPlaying = ref(false)

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

  return { isPlaying, play, pause }
}
