import { ECategory } from '@/api/types'
import { createWebHistory, createRouter, } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    category: ECategory
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Все кроссовки', category: ECategory.Products },
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/favorite',
      name: 'favorite',
      meta: { title: 'Избранное', category: ECategory.Favorite },
      component: () => import('@/pages/Home.vue'),
    },

  ],
})

export default router

