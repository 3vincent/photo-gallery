import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  // scrollBehavior(to, from, savedPosition) {
  //   console.log(to.hash)
  //   if (to.hash) {
  //     // BEFORE:
  //     // return { selector: to.hash }
  //     return { el: to.hash }
  //   }
  // },
  // scrollBehavior(_to, _from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   }
  //   return { top: 0, left: 0 }
  // },
}
