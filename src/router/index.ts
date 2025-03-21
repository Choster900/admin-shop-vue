import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue'
import HomeView from '@/modules/shop/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
      ]
    },
  ],
})

export default router
