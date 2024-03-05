<template>
  <div class="container">
    <div class="content">
      Some menu
      <ContentDoc />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: flex-start;
  max-width: 1024px;
  margin: 0 auto;
  border: 2px solid red;

  .content {
    max-width: 1024px;
  }
}
</style>
