import { Plugin, ComputedRef, ref, Ref } from 'vue'
import { computed } from 'vue'
import router from './router'

export interface User {
  id: number
  name: string
  email: string
}

export interface Auth {
  user: Ref<User | undefined>
  isLoggedIn: ComputedRef<boolean>
  initialized: Ref<boolean>
  initialize: (initialization: () => Promise<void>) => Promise<void>
}

export const createAuth = (bootstrap?: (auth: Auth) => void): Plugin => {
  return (app) => {
    // User information
    const user = ref<User | undefined>(undefined)
    // Some computation to determine if the user is logged in.
    const isLoggedIn = computed(() => user.value !== undefined)
    // Initialization logic.
    const initialized = ref(false)
    const initialize = async (initialization: () => Promise<void>) => {
      if (initialized.value) return
      await initialization()
      initialized.value = true
    }
    // Create the authentication state.
    const auth: Auth = { isLoggedIn, user, initialized, initialize }
    // Provides the application with the authentication
    // state for further use in the application.
    app.provide('auth', auth)
    // Bootstraps the authentication logic
    // given the current authentication state.
    bootstrap?.(auth)
  }
}

export default createAuth(({ initialize, isLoggedIn }) => {
  router.beforeEach(async (to) => {
    // Perform initial checking for the user's
    // authentication state
    await initialize(async () => {
      // await fetch('...')
    })
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
