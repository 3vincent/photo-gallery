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

const previousPhoto = computed<Photo>(() => {
  return (
    photosCatalogue['default'].images[photoIndexInCatalog - 1] ?? {
      filename: 'error.jpg',
      description: 'test',
      year: '2019',
    }
  )
})

const nextPhoto = computed<Photo>(() => {
  return (
    photosCatalogue['default'].images[photoIndexInCatalog + 1] ?? {
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

      if ((<Element>e.target).classList.contains('link')) return

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
        class="link go-back-button"
        :to="{
          path: `${currentRouteQuery as RouteLocationRaw}`,
          hash: `#${router.currentRoute.value.params.filename}`,
        }"
      >
        back to gallery
      </NuxtLink>
    </Transition>

    <Transition name="fadeLeft">
      <NuxtLink
        v-if="photoIndexInCatalog !== 0 && showBackButton"
        class="link prev-photo"
        :to="{
          path: `/photo/${photoIndexInCatalog}-${previousPhoto.filename.slice(previousPhoto.filename.lastIndexOf('/') + 1, previousPhoto.filename.lastIndexOf('.'))}`,
          query: { parentGallery: `${currentRouteQuery as RouteLocationRaw}` },
        }"
      >
        Prev
      </NuxtLink>
    </Transition>

    <Transition name="fadeRight">
      <NuxtLink
        v-if="
          photoIndexInCatalog + 2 <= photosCatalogue['default'].images.length &&
          showBackButton
        "
        class="link next-photo"
        :to="{
          path: `/photo/${photoIndexInCatalog + 2}-${nextPhoto.filename.slice(nextPhoto.filename.lastIndexOf('/') + 1, nextPhoto.filename.lastIndexOf('.'))}`,
          query: { parentGallery: `${currentRouteQuery as RouteLocationRaw}` },
        }"
      >
        Next
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

.fadeLeft-enter-active,
.fadeLeft-leave-active {
  transition: transform 0.4s ease;
}

.fadeLeft-enter-from,
.fadeLeft-leave-to {
  transform: translateX(-50px);
}

.fadeRight-enter-active,
.fadeRight-leave-active {
  transition: transform 0.4s ease;
}

.fadeRight-enter-from,
.fadeRight-leave-to {
  transform: translateX(50px);
}

.container {
  background: rgba(24, 23, 23, 1);
}

.link {
  background-color: rgb(62, 62, 62);
  display: inline-block;
  padding: 0.6rem;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  z-index: 10;
  text-decoration: none;

  &:visited,
  &:link {
    color: black;
  }
  &.go-back-button {
    left: 100px;
  }

  &.next-photo {
    right: 0;
  }
}
</style>
