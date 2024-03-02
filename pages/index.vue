<script setup lang="ts">
import type { GalleryViewMode } from '@/helpers/types'

/**
 * TODO:
 *  - implement gallery as dynamic gallery [gallery], read the gallery name from
 *    the json file
 *      - "gallery as param" -> will work when gallery is a dynamic route :)
 *      - (need to fix the links then...🙄)
 *      - need a menu then to switch the galleries
 *      - implement left bar?
 *  - implement info pages (CV etc.) with MarkDown?
 */

const viewModeStore = useViewModeStore()
const { galleryViewMode } = storeToRefs(viewModeStore)

const PhotoCatalogStore = usePhotoCatalogStore()
const { galleries, galleryNames } = storeToRefs(PhotoCatalogStore)

const mainContainerRef = ref<HTMLElement | null>(null)

const router = useRouter()

const setGalleryViewMode = (mode: GalleryViewMode) => {
  if (galleryViewMode.value === mode) return

  galleryViewMode.value = mode

  if (mode === 'stream') {
    nextTick(() => {
      const mainContainer = mainContainerRef.value
      if (mainContainer)
        mainContainer.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant',
        })
    })
  }
}

onMounted(async () => {
  const currentHash = router.currentRoute.value.hash

  if (currentHash) {
    router.replace({ hash: '' })

    if (galleryViewMode.value === 'stream') {
      const element = document.getElementById(currentHash.substring(1))

      element?.scrollIntoView()
    }
  }
})
</script>

<template>
  <div
    class="container"
    :class="{ 'stream-view': galleryViewMode === 'stream' }"
    ref="mainContainerRef"
  >
    <div class="view-switch">
      <div
        @click="setGalleryViewMode('stream')"
        class="stream"
        :class="{ active: galleryViewMode === 'stream' }"
      ></div>

      <div
        @click="setGalleryViewMode('grid')"
        class="grid"
        :class="{ active: galleryViewMode === 'grid' }"
      ></div>
    </div>

    <div v-if="galleryViewMode === 'grid'" class="inner-content grid">
      <div
        v-for="(photo, index) in galleries[0].photos"
        class="image"
        :key="index"
      >
        <NuxtLink
          :to="{
            path: `/photo/${index + 1}/${photo.filename.slice(photo.filename.lastIndexOf('/') + 1, photo.filename.lastIndexOf('.'))}`,
            query: { parentGallery: galleryNames[0] },
          }"
        >
          <div
            :style="
              photo.filename.includes('http')
                ? `background-image: url(${photo.filename})`
                : `background-image: url(/photos/${photo.filename})`
            "
            :id="`${index + 1}-${photo.filename.slice(photo.filename.lastIndexOf('/') + 1, photo.filename.lastIndexOf('.'))}`"
          ></div>
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="galleryViewMode === 'stream'"
      class="inner-content stream"
      v-for="(photo, index) in galleries[0].photos"
      :key="index"
    >
      <NuxtLink
        :to="{
          path: `/photo/${index + 1}/${photo.filename.slice(photo.filename.lastIndexOf('/') + 1, photo.filename.lastIndexOf('.'))}`,
          query: { parentGallery: galleryNames[0] },
        }"
      >
        <NuxtImg
          :src="
            photo.filename.includes('http')
              ? `${photo.filename}`
              : `/photos/${photo.filename}`
          "
          loading="lazy"
          :id="`${index + 1}-${photo.filename.slice(photo.filename.lastIndexOf('/') + 1, photo.filename.lastIndexOf('.'))}`"
          :alt="photo.title || photo.description"
        ></NuxtImg>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: static;
  display: flex;
  background-color: #93cfd0;
  // background-color: #f1f1f1;

  &.stream-view {
    scroll-snap-type: x mandatory;
    overflow-x: scroll;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 768px) {
      -ms-overflow-style: initial;
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        display: inherit;
      }
    }
  }

  .view-switch {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    display: flex;
    column-gap: 0.8rem;
    z-index: 10;

    > div {
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.5rem;
      cursor: pointer;

      background-size: 24px 24px;
      background-repeat: no-repeat;
      background-position: center;

      &.active {
        background-color: rgba(255, 255, 255, 0.2);
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 2px;
      }
      &.grid {
        background-image: url('assets/icons/grid-view.svg');
      }
      &.stream {
        background-image: url('assets/icons/stream-view.svg');
      }
    }
  }
}

.inner-content {
  &.grid {
    margin: 0 auto;
    --auto-grid-min-size: 8rem;

    @media (min-width: $_md) {
      --auto-grid-min-size: 16rem;
    }

    padding: calc(40px + 0.8rem * 2) 0.8rem 0.8rem;

    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--auto-grid-min-size), 1fr)
    );

    // grid-gap: 0.8rem;
    grid-gap: 1.8rem;

    width: 100dvw;
    max-width: 1024px;
    min-height: 100dvh;
    grid-auto-rows: max-content;

    a div {
      background-size: contain;
      // background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      width: 100%;
      aspect-ratio: 1/1;
    }
  }

  &.stream {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    min-width: 100dvw;
    scroll-snap-align: start;

    a {
      img {
        min-height: 70dvh;
        max-height: 80dvh;
        max-width: 80dvw;
        aspect-ratio: auto;
        object-fit: contain;
      }
    }
  }
}
</style>
