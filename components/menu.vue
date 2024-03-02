<template>
  <button aria-label="Main User Menu" @click="burgerMenuClickHandler">
    <div id="main-menu-button" :class="{ open: isMenuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </button>

  <Transition>
    <div v-if="isMenuOpen" class="menu-items-container">
      <ul>
        <li
          v-for="galleryName in galleryNames"
          @click="menuItemClickHandler(galleryName)"
          >{{ galleryName }}</li
        >
      </ul>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const photoCatalogStore = usePhotoCatalogStore()
const { galleryNames } = storeToRefs(photoCatalogStore)

const isMenuOpen = ref(false)

const burgerMenuClickHandler = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const menuItemClickHandler = async (galleryName: string) => {
  isMenuOpen.value = false

  await navigateTo(`/${galleryName}`)
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.menu-items-container {
  position: absolute;
  width: max-content;
  min-width: 200px;
  max-width: 400px;
  top: 3rem;
  right: 0rem;
  border: 2px solid #2f4342;
  border-radius: 1rem;
  background-color: aliceblue;
  padding: 1rem;

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;

    li {
      min-height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.6rem;
      &:hover {
        background-color: #ececec;
        border-radius: 0.4rem;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

button {
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0;
  height: 30px;
  width: 26px;
}

#main-menu-button span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #2f4342;
  transition: transform 0.2s linear;
  will-change: transform;
  border-radius: 1px;
}

#main-menu-button {
  height: 30px;
  width: 26px;
  transition: transform 0.3s linear;

  &.open {
    transform: rotate(-90deg);
  }
}

#main-menu-button span:nth-child(1) {
  top: 5px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#main-menu-button span:nth-child(2) {
  top: 13px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#main-menu-button span:nth-child(3) {
  top: 21px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#main-menu-button.open span:nth-child(1) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  top: 5px;
  left: 4px;
  width: 23px;
}

#main-menu-button.open span:nth-child(2) {
  width: 0%;
  opacity: 0;
}

#main-menu-button.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  top: 21px;
  left: 4px;
  width: 23px;
}
</style>
