import pageInfoRaw from '@/assets/page-info.json'

export const usePageInfoStore = defineStore('page-info', () => {
  const pageInfo = ref(pageInfoRaw)

  return { pageInfo }
})
