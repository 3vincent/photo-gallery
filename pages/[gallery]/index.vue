<script setup lang="ts">
import type { GalleryViewMode } from '@/helpers/types'

/**
 * TODO:
 *  - add config file json for personal info
 *  - add meta information
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

watch(
  () => galleryViewMode.value,
  (mode: GalleryViewMode) => {
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
)

onMounted(() => {
  handleHashScroll()
})

function handleHashScroll() {
  const currentHash = router.currentRoute.value.hash

  if (!currentHash || galleryViewMode.value !== 'stream') return

  const element = document.getElementById(currentHash.substring(1))

  if (!element) return

  const elementPosition = element.getBoundingClientRect().left
  scrollToPosition(mainContainerRef.value, elementPosition)

  router.replace({ hash: '' })
}

function scrollToPosition(container: HTMLElement | null, position: number) {
  if (!container) return

  container.scrollTo({
    left: position,
    behavior: 'instant',
  })
}

onBeforeMount(() => {
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
    <TopMenuBar :position-absolute="true" :show-view-mode-switch="true" />

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
}

.inner-content {
  &.grid {
    margin: 0 auto;
    --auto-grid-min-size: 10rem;
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

    @media (min-width: $_md) {
      --auto-grid-min-size: 14rem;
    }

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
