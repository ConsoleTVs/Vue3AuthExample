import { Plugin, ComputedRef, Component, ref, Ref } from 'vue'
import { h, computed, reactive, defineComponent, provide } from 'vue'
import router from './router'

export interface User {
  id: number
  name: string
  email: string
}

export interface Auth {
  user: Ref<User | undefined>
  isLoggedIn: ComputedRef<boolean>
}

export const createAuth = (bootstrap?: (auth: Auth) => void): Plugin => {
  return (app) => {
    const user = ref<User | undefined>(undefined)
    const isLoggedIn = computed(() => user.value !== undefined)
    const auth: Auth = { isLoggedIn, user }
    // Provides the application with the authentication
    // state for further use in the application.
    app.provide('auth', auth)
    // Bootstraps the authentication logic
    // given the current authentication state.
    bootstrap?.(auth)
  }
}

export default createAuth(({ isLoggedIn }) => {
  router.beforeEach((to) => {
    // If the route we're navigating to has no
    // authentication logic, we can continue.
    if (to.meta.auth === undefined) return true
    // If the route has authentication logic and it
    // requires authentication, we need to check
    // if the user has loged in or not.
    if (to.meta.auth! && !isLoggedIn.value) return '/login'
    // Otherwise, if the route does not require auth and
    // the user is logged in, we must cancel the nagivation.
    if (!to.meta.auth! && isLoggedIn.value) return '/secret'
  })
})
