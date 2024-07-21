<template>
  <div class="menu-container" :class="{ 'pos-absolute': positionAbsolute }">
    <div class="user-logo">
      <NuxtLink
        :to="`/${photoCatalogStore.getGalleryMetaInfo(galleryNames[0]).pathName}`"
      >
        <h1>raum0 portfolio</h1>
      </NuxtLink>
    </div>

    <div class="user-menu-container">
      <div v-if="showViewModeSwitch" class="view-switch">
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
        <BurgerMenu />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GalleryViewMode } from '~/helpers/types'

const viewModeStore = useViewModeStore()
const { galleryViewMode } = storeToRefs(viewModeStore)

const photoCatalogStore = usePhotoCatalogStore()
const { galleries, galleryNames } = storeToRefs(photoCatalogStore)

const setGalleryViewMode = (mode: GalleryViewMode) => {
  if (galleryViewMode.value === mode) return

  galleryViewMode.value = mode
}

const props = defineProps({
  positionAbsolute: { type: Boolean, default: false },
  showViewModeSwitch: { type: Boolean, default: false },
})
</script>

<style scoped lang="scss">
.menu-container {
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 2400px;
  padding: 0 1.6rem;
  z-index: 20;

  &.pos-absolute {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}

.user-logo {
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
</style>
