<script>
import photosCatalogue from 'assets/photos-catalogue.json'

export default {
  data() {
    return {
      photosCatalogue,
    }
  },
}
</script>

<template>
  <div class="container">
    <div
      class="inner-content"
      v-for="(photo, index) in photosCatalogue.default"
      :key="index"
    >
      <ImageViewer :image="photo.filename" />
      <p>{{ photo.description }}</p>
      <p>{{ photo.year }}</p>
    </div>
  </div>
</template>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: rgba(24, 23, 23, 1);
  scroll-snap-type: x mandatory;
  overflow-y: scroll;

  .inner-content {
    height: 100vh;
    width: 100vw;
    scroll-snap-align: start;

    p {
      font-family: Georgia, 'Times New Roman', Times, serif;
      color: white;
    }
  }
}
</style>
