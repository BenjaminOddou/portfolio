import { defineStore } from '@pinia/nuxt/node_modules/pinia'

export const scrollStore = defineStore({
  id: 'smooth-store',
  state: () => {
    return {
      isReady: true
    }
  }
})

export const routeStore = defineStore({
  id: 'page-store',
  state: () => {
    return {
      isNewPage: 0
    }
  }
})

export const linkStore = defineStore({
  id: 'link-store',
  state: () => {
    return {
      isNewLink: 0
    }
  }
})

export const alertStore = defineStore({
  id: 'alert-store',
  state: () => {
    return {
      header: 'Information',
      content: `Il n'y à rien à déclarer`,
      color: 'teal' as 'teal' | 'red',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      delay: 0,
      isAlert: false
    }
  }
})
