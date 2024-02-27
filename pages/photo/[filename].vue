<script setup lang="ts">
import photosCatalogueRaw from '@/assets/photos-catalogue.json'
import type { Gallery, Photo } from '@/helpers/types'
import type { RouteLocationRaw } from '#vue-router'

const photosCatalogue: Gallery = photosCatalogueRaw

const router = useRouter()

const photoIndexInCatalog: number =
  parseInt(
    Array.isArray(router.currentRoute.value.params.filename)
      ? router.currentRoute.value.params.filename[0].split('-')[0]
      : router.currentRoute.value.params.filename.split('-')[0]
  ) - 1

const photo = computed<Photo>(() => {
  return (
    photosCatalogue['default'].images[photoIndexInCatalog] ?? {
      filename: 'error.jpg',
      description: 'test',
      year: '2019',
    }
  )
})

const currentRouteQuery = router.currentRoute.value.query
  .parentGallery as String

const showBackButton = ref(true)
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  timer = setTimeout(() => {
    showBackButton.value = false
  }, 2000)

  document.addEventListener('mousemove', e => {
    window.requestAnimationFrame(() => {
      showBackButton.value = true

      if (timer !== undefined) {
        clearTimeout(timer)
        timer = undefined
      }

      if ((<Element>e.target).className === 'go-back-button') return

      timer = setTimeout(() => {
        showBackButton.value = false
      }, 2000)
    })
  })
})
</script>

<template>
  <div class="container">
    <Transition>
      <NuxtLink
        v-if="currentRouteQuery && showBackButton"
        class="go-back-button"
        :to="{
          path: `${currentRouteQuery as RouteLocationRaw}`,
          hash: `#${router.currentRoute.value.params.filename}`,
        }"
      >
        back to gallery
      </NuxtLink>
    </Transition>

    <ImageViewer :photo="photo" />
  </div>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-40px);
}

.container {
  background: rgba(24, 23, 23, 1);
}

.go-back-button {
  background-color: rgb(62, 62, 62);
  display: inline-block;
  padding: 0.6rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  z-index: 10;
  text-decoration: none;

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

  &:visited,
  &:link {
    color: black;
  }
}
</style>
