<template>
  <button @click="handle">Login</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'
import type { Auth } from '../auth'

export default defineComponent({
  setup() {
    console.log('Inside Login')

    const router = useRouter()
    const { login } = inject<Auth>('auth')!

    const handle = () => {
      login({ id: 1, name: 'Erik', email: 'soc@erik.cat' })
      router.push('/secret')
    }

    return { handle }
  },
})
</script>
