<template>
  <div class="container">
    <TopMenuBar />

    <div class="content">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('content').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100dvh;

  .content {
    margin: 0 auto;
    max-width: 1024px;
    padding: 1.6rem;
    margin-top: 4rem;
  }
}
</style>
