<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="container">
    <div>
      <h2>{{ error?.statusCode }}</h2>
      <h2>{{ error?.statusMessage }}</h2>
      <button @click="handleError">Back to home</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  // flex-direction: column;
}
</style>
