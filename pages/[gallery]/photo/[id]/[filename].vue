<script setup lang="ts">
import type { Photo } from '@/helpers/types'

const router = useRouter()
const photoCatalogStore = usePhotoCatalogStore()
const { galleries } = storeToRefs(photoCatalogStore)

const currentGalleryInfo = photoCatalogStore.getGalleryMetaInfo(
  router.currentRoute.value.params.gallery as string
)

const photoIndexInCatalog: number =
  parseInt(
    Array.isArray(router.currentRoute.value.params.id)
      ? router.currentRoute.value.params.id[0]
      : router.currentRoute.value.params.id
  ) - 1

const photo = computed<Photo>(() => {
  return galleries.value[currentGalleryInfo.id].photos[photoIndexInCatalog]
})

const previousPhoto = computed<Photo>(() => {
  return galleries.value[currentGalleryInfo.id].photos[photoIndexInCatalog - 1]
})

const nextPhoto = computed<Photo>(() => {
  return galleries.value[currentGalleryInfo.id].photos[photoIndexInCatalog + 1]
})

const showBackButton = ref(true)

let timer: ReturnType<typeof setTimeout> | undefined

const mouseMoveHandler = (e: MouseEvent) => {
  window.requestAnimationFrame(() => {
    showBackButton.value = true

    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }

    if ((e.target as Element).classList.contains('link')) return

    timer = setTimeout(() => {
      showBackButton.value = false
    }, 2000)
  })
}

onMounted(() => {
  timer = setTimeout(() => {
    showBackButton.value = false
  }, 2000)

  document.addEventListener('mousemove', mouseMoveHandler)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', mouseMoveHandler)
})
</script>

<template>
  <div class="container">
    <Transition>
      <NuxtLink
        v-if="currentGalleryInfo.name && showBackButton"
        class="link go-back-button"
        :to="{
          path: `/${currentGalleryInfo.pathName}`,
          hash: `#${photoIndexInCatalog + 1}-${photo.filename.slice(photo.filename.lastIndexOf('/') + 1, photo.filename.lastIndexOf('.'))}`,
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
          path: `/${currentGalleryInfo.pathName}/photo/${photoIndexInCatalog}/${previousPhoto.filename.slice(previousPhoto.filename.lastIndexOf('/') + 1, previousPhoto.filename.lastIndexOf('.'))}`,
        }"
      >
        Prev
      </NuxtLink>
    </Transition>

    <Transition name="fadeRight">
      <NuxtLink
        v-if="
          photoIndexInCatalog + 2 <=
            galleries[currentGalleryInfo.id].photos.length && showBackButton
        "
        class="link next-photo"
        :to="{
          path: `/${currentGalleryInfo.pathName}/photo/${photoIndexInCatalog + 2}/${nextPhoto.filename.slice(nextPhoto.filename.lastIndexOf('/') + 1, nextPhoto.filename.lastIndexOf('.'))}`,
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
