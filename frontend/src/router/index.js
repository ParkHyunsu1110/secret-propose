import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '@/views/IntroView.vue'
import CardNewsView from '@/views/CardNewsView.vue'
import EventView from '@/views/EventView.vue'
import CelebrationView from '@/views/CelebrationView.vue'

const routes = [
  {
    path: '/',
    name: 'Intro',
    component: IntroView,
  },
  {
    path: '/cards',
    name: 'CardNews',
    component: CardNewsView,
  },
  {
    path: '/event',
    name: 'Event',
    component: EventView,
  },
  {
    path: '/celebration',
    name: 'Celebration',
    component: CelebrationView,
  },
  /** 공개용: 동일 화면, 라우트만 /share 하위 */
  {
    path: '/share',
    name: 'ShareIntro',
    component: IntroView,
    meta: { share: true },
  },
  {
    path: '/share/cards',
    name: 'ShareCardNews',
    component: CardNewsView,
    meta: { share: true },
  },
  {
    path: '/share/event',
    name: 'ShareEvent',
    component: EventView,
    meta: { share: true },
  },
  {
    path: '/share/celebration',
    name: 'ShareCelebration',
    component: CelebrationView,
    meta: { share: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
