// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true,
  },
  modules: ['@nuxt/image', '@pinia/nuxt'],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  image: {
    format: ['webp'],
    // provider: 'static',
    // staticFilename: '[publicPath]/[name]-[hash][ext]',
  },
})
