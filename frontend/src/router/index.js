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
