import photosCatalogueRaw from '@/assets/photos-catalog.json'
import type { GalleryData } from '@/helpers/types'

export const usePhotoCatalogStore = defineStore('photo-catalog', () => {
  const photosCatalogue: GalleryData = photosCatalogueRaw

  const galleryNames = ref(Object.keys(photosCatalogue))

  const galleries = ref(
    galleryNames.value.map(galleryName => photosCatalogue[galleryName])
  )

  function getCurrentGallery(currentGalleryNameFromParams: string) {
    return (
      galleryNames.value
        .map((galleryName, index) => {
          return { id: index, name: galleryName }
        })
        .find(gallery => gallery.name === currentGalleryNameFromParams) ?? {
        id: 0,
        name: 'example',
      }
    )
  }

  return { galleryNames, galleries, getCurrentGallery }
})
