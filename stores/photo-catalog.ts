import photosCatalogueRaw from '@/assets/photos-catalog.json'
import type { GalleryData } from '@/helpers/types'

export const usePhotoCatalogStore = defineStore('photo-catalog', () => {
  const photosCatalogue: GalleryData = photosCatalogueRaw

  const galleryNames = ref(Object.keys(photosCatalogue))

  const galleries = ref(
    galleryNames.value.map(galleryName => photosCatalogue[galleryName])
  )

  function getGalleryMetaInfo(galleryNameOrPathName: string): {
    id: number
    name: string
    pathName: string
  } {
    return (
      galleryNames.value
        .map((galleryName, index) => {
          return {
            id: index,
            name: galleryName,
            pathName: galleryName.toLowerCase().split(' ').join('-'),
          }
        })
        .find(
          gallery =>
            gallery.name === galleryNameOrPathName ||
            gallery.pathName === galleryNameOrPathName
        ) ?? {
        id: 0,
        name: 'error',
        pathName: 'error',
      }
    )
  }

  return { galleryNames, galleries, getGalleryMetaInfo }
})
