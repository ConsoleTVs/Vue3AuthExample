import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    auth?: boolean
  }
}

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./pages/Index.vue'),
    },
    {
      path: '/login',
      component: () => import('./pages/Login.vue'),
      meta: { auth: false },
    },
    {
      path: '/secret',
      component: () => import('./pages/Secret.vue'),
      meta: { auth: true },
    },
  ],
})
