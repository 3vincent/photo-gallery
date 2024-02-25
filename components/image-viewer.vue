<script setup lang="ts">
import type { Photo } from '../pages/photo/[filename].vue'
import type { RouteLocationRaw } from '#vue-router'

const props = defineProps({
  photo: {
    type: Object as PropType<Photo>,
    default: { filename: 'error.jpg', description: 'test', year: '2019' },
  },
  parentGallery: {
    type: String as PropType<String>,
  },
})

// const backgroundImage = computed(() => {
//   return {
//     '--this-image-url': `url('/photos/${props.photo.filename}')`,
//   }
// })

const goBackToGallery = () => {
  // router.go(-1)
  navigateTo(props.parentGallery as RouteLocationRaw)
}
</script>

<template>
  <div class="container">
    <div
      v-if="props.parentGallery"
      @click="goBackToGallery"
      class="go-back-button"
    >
      back to gallery
    </div>

    <div class="image-container">
      <!-- <div class="image background" :style="backgroundImage"></div> -->

      <img :src="`/photos/${props.photo.filename}`" />
    </div>

    <div class="text">
      <p>{{ photo.description }}</p>
      <p>{{ photo.year }}</p>
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
    max-height: 80dvh;
    min-height: 80dvh;
    max-width: 80vw;
    object-fit: contain;
  }
}

// .image {
//   min-height: 80vh;
//   width: 80vw;
// }

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
    font-family: Helvetica, Georgia, 'Times New Roman', Times, serif;
    font-style: italic;
    color: white;
    font-size: 1rem;
    margin: 0;
    padding: 0;
  }
}

.go-back-button {
  background-color: rgb(62, 62, 62);
  display: inline-block;
  padding: 0.6rem;
  cursor: pointer;
}
</style>
