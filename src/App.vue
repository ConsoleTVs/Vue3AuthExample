<template>
  <header>
    <nav>
      <router-link to="/">Index</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/secret">Secret</router-link>
    </nav>
  </header>
  <main>
    <router-view v-if="ready" />
    <div v-else>Loading</div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const ready = ref(false)

    // When the router is ready, we'll show the app.
    router.isReady().then(() => (ready.value = true))

    return { ready }
  },
})
</script>
