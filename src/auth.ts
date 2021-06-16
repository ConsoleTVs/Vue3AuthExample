import { Plugin, ComputedRef, ref, Ref, readonly, DeepReadonly } from 'vue'
import { computed } from 'vue'
import router from './router'

export interface User {
  readonly id: number
  readonly name: string
  readonly email: string
}

export interface Auth {
  readonly user: DeepReadonly<Ref<User | undefined>>
  readonly loggedIn: DeepReadonly<Ref<boolean>>
  readonly initialized: DeepReadonly<Ref<boolean>>
  readonly initialize: (initialization: () => Promise<void>) => Promise<void>
  readonly login: (
    loggedInUser: User,
    beforePopulate?: () => Promise<void> | void
  ) => Promise<void>
  readonly logout: (beforeCleanup?: () => Promise<void> | void) => Promise<void>
}

export const createAuth = (bootstrap?: (auth: Auth) => void): Plugin => {
  return (app) => {
    // User information
    const user = ref<User | undefined>(undefined)
    // Some computation to determine if the user is logged in.
    const loggedIn = ref(false)
    // Initialization logic.
    const initialized = ref(false)
    const initialize = async (initialization: () => Promise<void>) => {
      if (initialized.value) return
      await initialization()
      initialized.value = true
    }
    const login = async (
      loggedInUser: User,
      beforePopulate?: () => Promise<void> | void
    ) => {
      loggedIn.value = true
      await beforePopulate?.()
      user.value = loggedInUser
    }
    const logout = async (beforeCleanup?: () => Promise<void> | void) => {
      loggedIn.value = false
      await beforeCleanup?.()
      user.value = undefined
    }
    // Create the authentication state.
    const auth: Auth = {
      loggedIn: readonly(loggedIn),
      user: readonly(user),
      initialized: readonly(initialized),
      initialize,
      login,
      logout,
    }
    // Provides the application with the authentication
    // state for further use in the application.
    app.provide('auth', auth)
    // Bootstraps the authentication logic
    // given the current authentication state.
    bootstrap?.(auth)
  }
}

export default createAuth(({ initialize, loggedIn }) => {
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
    if (to.meta.auth! && !loggedIn.value) return '/login'
    // Otherwise, if the route does not require auth and
    // the user is logged in, we must cancel the nagivation.
    if (!to.meta.auth! && loggedIn.value) return '/secret'
  })
})
