<script setup lang="ts">
import photosCatalogueRaw from '@/assets/photos-catalogue.json'
import type { Gallery, GalleryViewMode } from '@/helpers/types'
import { useViewModeStore } from '@/stores/view-mode'

/**
 * TODO:
 *  - create buttons for prev/next image
 *  - implement Pinia store to store galleryViewMode state
 *  - implement gallery as dynamic gallery [gallery], read the gallery name from
 *    the json file
 *  - (need to fix the links then...🙄)
 *  - need a menu then to switch the galleries
 *  - implement left bar?
 *  - implement info pages (CV etc.) with MarkDown?
 */

const photosCatalogue: Gallery = photosCatalogueRaw

const viewModeStore = useViewModeStore()
const { galleryViewMode } = storeToRefs(viewModeStore)

const mainContainerRef = ref<HTMLElement | null>(null)

const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value.fullPath)

const toggleGalleryViewMode = (mode: GalleryViewMode) => {
  galleryViewMode.value = mode

  const mainContainer = mainContainerRef.value
  if (mainContainer)
    mainContainer.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
}

onMounted(async () => {
  const currentHash = router.currentRoute.value.hash

  if (currentHash) {
    // to remove hash from the url
    await navigateTo({ hash: '' })

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
        @click="toggleGalleryViewMode('stream')"
        class="stream"
        :class="{ active: galleryViewMode === 'stream' }"
      ></div>

      <div
        @click="toggleGalleryViewMode('grid')"
        class="grid"
        :class="{ active: galleryViewMode === 'grid' }"
      ></div>
    </div>

    <div v-if="galleryViewMode === 'grid'" class="inner-content grid">
      <div
        v-for="(photo, index) in photosCatalogue.default.images"
        class="image"
        :key="index"
      >
        <NuxtLink
          :to="{
            path: `/photo/${index + 1}-${photo.filename.slice(photo.filename.lastIndexOf('/') + 1, photo.filename.lastIndexOf('.'))}`,
            query: { parentGallery: currentRoute },
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
      v-for="(photo, index) in photosCatalogue.default.images"
      :key="index"
    >
      <NuxtLink
        :to="{
          path: `/photo/${index + 1}-${photo.filename.slice(photo.filename.lastIndexOf('/') + 1, photo.filename.lastIndexOf('.'))}`,
          query: { parentGallery: currentRoute },
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
        ></NuxtImg>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
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
    // FOR DESKTOP
    // --auto-grid-min-size: 16rem;

    // FOR MOBILE
    --auto-grid-min-size: 8rem;

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
