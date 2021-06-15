<template>
  <button @click="login">Login</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'
import type { Auth } from '../auth'

export default defineComponent({
  setup() {
    console.log('Inside Login')

    const router = useRouter()
    const { user } = inject<Auth>('auth')!

    const login = () => {
      user.value = { id: 1, name: 'Erik', email: 'soc@erik.cat' }
      router.push('/secret')
    }

    return { login }
  },
})
</script>
