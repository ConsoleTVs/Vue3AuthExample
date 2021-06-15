<template>
  <div>Secret Page!</div>
  <button @click="logout">Logout</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'
import type { Auth } from '../auth'

export default defineComponent({
  setup() {
    console.log('Inside Secret')

    const router = useRouter()
    const { user } = inject<Auth>('auth')!

    const logout = () => {
      user.value = undefined
      router.push('/')
    }

    return { logout }
  },
})
</script>
