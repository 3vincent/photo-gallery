import type { GalleryViewMode } from '@/helpers/types'

export const useViewModeStore = defineStore('viewmode', () => {
  const galleryViewMode = ref<GalleryViewMode>('stream')

  return { galleryViewMode }
})
