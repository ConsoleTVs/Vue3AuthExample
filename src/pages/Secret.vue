<template>
  <div>Secret Page!</div>
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
    const { logout } = inject<Auth>('auth')!

    const handle = () => {
      logout()
      router.push('/')
    }

    return { handle }
  },
})
</script>
