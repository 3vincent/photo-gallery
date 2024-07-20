// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true,
  },
  compatibilityDate: '2024-07-20',
  modules: ['@nuxt/image', '@pinia/nuxt', '@nuxt/content'],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  image: {
    format: ['webp'],
    // provider: 'static',
    // staticFilename: '[publicPath]/[name]-[hash][ext]',
  },

  css: ['~/assets/styles/index.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./assets/styles/general/variables.scss";',
        },
      },
    },
  },
})
