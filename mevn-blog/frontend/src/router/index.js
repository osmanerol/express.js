import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('../views/Create.vue')
  },
  {
    path: '/update/:id',
    name: 'Update',
    component: () => import('../views/Update.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
