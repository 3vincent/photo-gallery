export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true,
  },
  compatibilityDate: '2026-07-29',
  modules: ['@nuxt/image', '@pinia/nuxt', '@nuxt/content', '@nuxt/eslint'],

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
          additionalData: '@use "~/assets/styles/general/variables.scss" as *;',
        },
      },
    },
  },
})
