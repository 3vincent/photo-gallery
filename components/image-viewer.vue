<script setup lang="ts">
import type { Photo } from '@/helpers/types'

const props = defineProps({
  photo: {
    type: Object as PropType<Photo>,
    default: { filename: 'error.jpg', description: 'test', year: '2019' },
  },
})
</script>

<template>
  <div class="container">
    <div class="image-container">
      <NuxtImg
        :src="
          photo.filename.includes('http')
            ? `${props.photo.filename}`
            : `/photos/${props.photo.filename}`
        "
        :alt="`${props.photo.title}, ${props.photo.year}`"
      />
    </div>

    <div v-if="photo.description || photo.year || photo.title" class="text">
      <p v-if="photo.title">{{ photo.title }}</p>
      <p v-if="photo.year">{{ photo.year }}</p>
      <br />
      <p v-if="photo.description" class="description">{{
        photo.description
      }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: max-content;
  margin: 0 auto;
  position: relative;
}

.image-container {
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    min-height: 80dvh;
    max-height: 90dvh;
    max-width: 90vw;
    object-fit: contain;
  }
}

.background {
  background-image: var(--this-image-url);
  // background-size: auto 80vw;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.text {
  align-self: flex-start;
  padding: 0 0 4rem 0;

  p {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;

    color: white;
    font-size: 1rem;
    margin: 0;
    padding: 0;

    &.description {
      font-style: italic;
    }
  }
}
</style>
