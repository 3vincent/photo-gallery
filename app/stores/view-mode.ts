import type { GalleryViewMode } from '@/utils/types'

export const useViewModeStore = defineStore('viewmode', () => {
  const galleryViewMode = ref<GalleryViewMode>('stream')

  return { galleryViewMode }
})
