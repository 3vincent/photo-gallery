<script setup lang="ts">
import photosCatalogue from '../../assets/photos-catalogue.json'

const router = useRouter()

export type Photo = {
  filename: string
  description: string
  year: string
}

const photo = computed<Photo>(() => {
  return (
    photosCatalogue['default'].find(
      (photo: Photo) =>
        photo.filename.slice(0, photo.filename.indexOf('.')) ==
        router.currentRoute.value.params.filename
    ) ?? { filename: 'error.jpg', description: 'test', year: '2019' }
  )
})

const currentRouteQuery = router.currentRoute.value.query
  .parentGallery as String
</script>

<template>
  <div class="container">
    <ImageViewer :photo="photo" :parent-gallery="currentRouteQuery" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  background: rgba(24, 23, 23, 1);
}
</style>
