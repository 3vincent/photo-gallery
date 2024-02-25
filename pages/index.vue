<script setup lang="ts">
import photosCatalogue from '~/assets/photos-catalogue.json'

type GalleryViewMode = 'grid' | 'stream'

const mainContainerRef = ref<HTMLElement | null>(null)
const galleryViewMode = ref<GalleryViewMode>('grid')

const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value.fullPath)

const toggleGalleryViewMode = (mode: GalleryViewMode) => {
  if (mode === 'stream') galleryViewMode.value = 'grid'
  if (mode === 'grid') galleryViewMode.value = 'stream'

  const mainContainer = mainContainerRef.value
  if (mainContainer) mainContainer.scrollTo(0, 0)
}
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
        class="grid"
        :class="{ active: galleryViewMode === 'grid' }"
      ></div>

      <div
        @click="toggleGalleryViewMode('grid')"
        class="stream"
        :class="{ active: galleryViewMode === 'stream' }"
      ></div>
    </div>

    <div
      v-if="galleryViewMode === 'stream'"
      class="inner-content stream"
      v-for="(photo, index) in photosCatalogue.default"
      :key="index"
    >
      <NuxtLink
        :to="{
          path: `/photo/${photo.filename.slice(0, photo.filename.indexOf('.'))}`,
          query: { parentGallery: currentRoute },
        }"
      >
        <NuxtImg :src="`/photos/${photo.filename}`" loading="lazy"></NuxtImg>
      </NuxtLink>
    </div>

    <div v-if="galleryViewMode === 'grid'" class="inner-content grid">
      <div
        v-for="(photo, index) in photosCatalogue.default"
        class="image"
        :key="index"
      >
        <NuxtLink
          :to="{
            path: `/photo/${photo.filename.slice(0, photo.filename.indexOf('.'))}`,
            query: { parentGallery: currentRoute },
          }"
        >
          <!-- <NuxtImg :src="`/photos/${photo.filename}`" loading="lazy"></NuxtImg> -->

          <div
            :style="`background-image: url(/photos/${photo.filename})`"
          ></div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;

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
  background-color: #93cfd0;
  // background-color: #f1f1f1;
}
.inner-content.stream {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  min-width: 100dvw;
  scroll-snap-align: start;

  a {
    img {
      min-height: 60dvh;
      max-height: 90dvh;
      max-width: 90dvw;
      aspect-ratio: auto;
      object-fit: contain;
    }
  }
}

.inner-content.grid {
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
  grid-template-rows: max-content;

  // grid-gap: 0.8rem;
  grid-gap: 1.8rem;

  width: 100dvw;
  min-height: 100dvh;

  // a img {
  //   max-width: 100%;
  //   max-height: 100%;
  //   object-fit: contain;
  //   // max-width: 40dvw;
  //   // max-height: 40dvw;
  // }

  a div {
    background-size: contain;
    // background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    aspect-ratio: 1/1;
  }
}
</style>
