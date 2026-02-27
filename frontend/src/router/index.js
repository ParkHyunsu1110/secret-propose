import { createRouter, createWebHistory } from 'vue-router'
import CardNewsView from '@/views/CardNewsView.vue'
import EventView from '@/views/EventView.vue'

const routes = [
  {
    path: '/',
    name: 'CardNews',
    component: CardNewsView,
  },
  {
    path: '/event',
    name: 'Event',
    component: EventView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
