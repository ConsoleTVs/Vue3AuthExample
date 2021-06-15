import { App, ComputedRef, Component, ref, Ref } from 'vue'
import { h, computed, reactive, defineComponent, provide } from 'vue'
import { useRouter } from 'vue-router'

export interface User {
  id: number
  name: string
  email: string
}

export interface Auth {
  user: Ref<User | undefined>
  isLoggedIn: ComputedRef<boolean>
}

export const withAuth = (component: Component): Component =>
  defineComponent({
    render: () => h(component),
    setup() {
      const router = useRouter()
      // Stores the user information.
      const user: Ref<User | undefined> = ref<User | undefined>(undefined)
      // Determines if the user is logged in.
      const isLoggedIn: ComputedRef<boolean> = computed(
        () => user.value !== undefined
      )

      // Provide the logic to the application.
      provide('auth', <Auth>{ isLoggedIn, user })

      router.beforeEach((to, from) => {
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
    },
  })
