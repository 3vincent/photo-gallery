<script lang="ts">
export default {
  name: 'ImageViewer',
  props: {
    image: {
      type: String,
      default: 'error.jpg',
    },
  },

  computed: {
    backgroundProp() {
      return {
        '--this-image-url': `url('photos/${this.image}')`,
      }
    },
  },
}
</script>

<template>
  <div class="image-container">
    <div class="content background" :style="backgroundProp"> </div>
    <div class="text-container">
      <!-- <p>{{ image }}</p> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-container {
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  position: relative;
  display: flex;
}

.content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  height: 100vh;
  width: 100vw;
  max-height: 80vh;
  max-width: 87vw;
}

.background {
  background-image: var(--this-image-url);
  // background-size: auto 80vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.text-container {
  position: relative;
}
</style>
