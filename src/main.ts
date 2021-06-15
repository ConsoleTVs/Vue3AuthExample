import { createApp } from 'vue'
import { router } from './router'
import { withAuth } from './auth'
import App from './App.vue'

createApp(withAuth(App))
  .use(router) // Use router.
  .mount('#app')
