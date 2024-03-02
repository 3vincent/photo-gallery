import photosCatalogueRaw from '@/assets/photos-catalogue.json'
import type { GalleryData } from '@/helpers/types'

export const usePhotoCatalogStore = defineStore('photo-catalog', () => {
  const photosCatalogue: GalleryData = photosCatalogueRaw

  const galleryNames = ref(Object.keys(photosCatalogue))

  const galleries = ref(
    galleryNames.value.map(galleryName => photosCatalogue[galleryName])
  )

  return { galleryNames, galleries }
})
