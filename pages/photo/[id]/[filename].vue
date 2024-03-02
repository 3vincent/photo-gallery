<script setup lang="ts">
import type { Photo } from '@/helpers/types'

const PhotoCatalogStore = usePhotoCatalogStore()
const { galleries, galleryNames } = storeToRefs(PhotoCatalogStore)

const router = useRouter()

// console.log(router.currentRoute.value.params.gallery)

const photoIndexInCatalog: number =
  parseInt(
    Array.isArray(router.currentRoute.value.params.id)
      ? router.currentRoute.value.params.id[0]
      : router.currentRoute.value.params.id
  ) - 1

const photo = computed<Photo>(() => {
  return galleries.value[0].photos[photoIndexInCatalog]
})

const previousPhoto = computed<Photo>(() => {
  return galleries.value[0].photos[photoIndexInCatalog - 1]
})

const nextPhoto = computed<Photo>(() => {
  return galleries.value[0].photos[photoIndexInCatalog + 1]
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
          path: `/`,
          // hash: `#${router.currentRoute.value.params.filename}`,
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
          path: `/photo/${photoIndexInCatalog}/${previousPhoto.filename.slice(previousPhoto.filename.lastIndexOf('/') + 1, previousPhoto.filename.lastIndexOf('.'))}`,
          query: { parentGallery: galleryNames[0] },
        }"
      >
        Prev
      </NuxtLink>
    </Transition>

    <Transition name="fadeRight">
      <NuxtLink
        v-if="
          photoIndexInCatalog + 2 <= galleries[0].photos.length &&
          showBackButton
        "
        class="link next-photo"
        :to="{
          path: `/photo/${photoIndexInCatalog + 2}/${nextPhoto.filename.slice(nextPhoto.filename.lastIndexOf('/') + 1, nextPhoto.filename.lastIndexOf('.'))}`,
          query: { parentGallery: galleryNames[0] },
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
