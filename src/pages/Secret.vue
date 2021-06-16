<template>
  <div>Secret Page!</div>
  <div>{{ JSON.stringify(user) }}</div>
  <button @click="handle">Logout</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'
import type { Auth } from '../auth'

export default defineComponent({
  setup() {
    console.log('Inside Secret')

    const router = useRouter()
    const { user, logout } = inject<Auth>('auth')!

    const handle = () => {
      logout(async () => {
        await router.push('/')
      })
    }

    return { user, handle }
  },
})
</script>
