<script setup lang="ts">
import type { GalleryViewMode } from '@/helpers/types'

/**
 * TODO:
 *  - add config file json for personal info
 *  - add keyboard navigation in galleries
 *  - add markdown stuff for Text-pages, CV etc..
 *  - add meta information
 *  - implement info pages (CV etc.) with MarkDown?
 */

const router = useRouter()

const viewModeStore = useViewModeStore()
const { galleryViewMode } = storeToRefs(viewModeStore)

const photoCatalogStore = usePhotoCatalogStore()
const { galleries, galleryNames } = storeToRefs(photoCatalogStore)

const currentGalleryInfo = photoCatalogStore.getGalleryMetaInfo(
  router.currentRoute.value.params.gallery as string
)

const mainContainerRef = ref<HTMLElement | null>(null)

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

onBeforeMount(async () => {
  if (
    !galleryNames.value
      .map(item => photoCatalogStore.getGalleryMetaInfo(item).pathName)
      .includes(router.currentRoute.value.params.gallery as string)
  ) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
    })
  }
})
</script>

<template>
  <div
    class="container"
    :class="{ 'stream-view': galleryViewMode === 'stream' }"
    ref="mainContainerRef"
  >
    <div class="user-logo">
      <NuxtLink
        :to="`/${photoCatalogStore.getGalleryMetaInfo(galleryNames[0]).pathName}`"
      >
        <h1>raum0 portfolio</h1>
      </NuxtLink>
    </div>

    <div class="user-menu-container">
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

      <div class="user-menu">
        <Menu />
      </div>
    </div>

    <div v-if="galleryViewMode === 'grid'" class="inner-content grid">
      <div
        v-for="(photo, index) in galleries[currentGalleryInfo.id].photos"
        class="image"
        :key="index"
      >
        <NuxtLink
          :to="{
            path: `/${currentGalleryInfo.pathName}/photo/${index + 1}/${photo.filename.slice(photo.filename.lastIndexOf('/') + 1, photo.filename.lastIndexOf('.'))}`,
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
      v-for="(photo, index) in galleries[currentGalleryInfo.id].photos"
      :key="index"
    >
      <NuxtLink
        :to="{
          path: `/${currentGalleryInfo.pathName}/photo/${index + 1}/${photo.filename.slice(photo.filename.lastIndexOf('/') + 1, photo.filename.lastIndexOf('.'))}`,
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
        />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: static;
  display: flex;
  // background-color: #93cfd0; // sky-stang,
  background-color: rgba(238, 243, 243, 0.53);

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

  .user-logo {
    position: absolute;
    left: 1.6rem;
    z-index: 10;
    display: flex;
    align-items: center;
    -moz-column-gap: 1.6rem;
    column-gap: 1.6rem;
    height: 84px;
    max-width: 200px;

    a {
      text-decoration: none;

      h1 {
        color: #333;
        font-style: normal;
        font-weight: 800;
        font-size: 26px;
        text-transform: uppercase;
        letter-spacing: normal;
        line-height: 1;
        padding: 0;
      }
    }
  }

  .user-menu-container {
    position: absolute;
    top: 1.8rem;
    right: 1.6rem;
    z-index: 10;
    display: flex;
    column-gap: 1.6rem;
    height: 30px;

    .view-switch {
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
}

.inner-content {
  &.grid {
    margin: 0 auto;
    --auto-grid-min-size: 10rem;

    @media (min-width: $_md) {
      --auto-grid-min-size: 14rem;
    }

    padding: calc(40px + 1.8rem * 2) 0.8rem 0.8rem;

    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--auto-grid-min-size), 1fr)
    );

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
