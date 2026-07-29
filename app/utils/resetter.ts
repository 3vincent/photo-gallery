import { getActivePinia } from 'pinia'
import { useViewModeStore } from '@/stores/view-mode'
import { usePhotoCatalogStore } from '@/stores/photo-catalog'

const registeredStores = [useViewModeStore, usePhotoCatalogStore]

export function resetAllStores() {
  const pinia = getActivePinia()

  if (pinia) {
    registeredStores.forEach(store => {
      const storeInstance = store()

      if (typeof storeInstance.$reset === 'function') {
        storeInstance.$reset()
      }
    })
  }
}
