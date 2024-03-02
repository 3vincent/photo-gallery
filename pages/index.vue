<script setup lang="ts">
const photoCatalogStore = usePhotoCatalogStore()
const { galleryNames } = storeToRefs(photoCatalogStore)

await navigateTo(`/${galleryNames.value[0]}`)
</script>
