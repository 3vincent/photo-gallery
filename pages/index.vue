<script setup lang="ts">
const photoCatalogStore = usePhotoCatalogStore()
const { galleryNames } = storeToRefs(photoCatalogStore)

await navigateTo(
  `/${photoCatalogStore.getGalleryMetaInfo(galleryNames.value[0]).pathName}`
)
</script>
