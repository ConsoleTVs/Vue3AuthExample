import { createApp } from 'vue'
import router from './router'
import auth from './auth'
import App from './App.vue'

createApp(App)
  .use(router) // Registers vue-router.
  .use(auth) // Register the authentication plugin.
  .mount('#app')
