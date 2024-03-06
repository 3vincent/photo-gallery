<template>
  <div class="container">
    <TopMenu />
    <div class="content">
      Some menu
      <ContentDoc />
    </div>
  </div>
</template>

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
