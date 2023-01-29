// @ts-expect-error-next-line
import { defineStore } from 'pinia'

export const scrollStore = defineStore({
  id: 'smooth-store',
  state: () => {
    return {
      isReady: true,
    }
  },
})

export const routeStore = defineStore({
  id: 'page-store',
  state: () => {
    return {
      isNewPage: 0,
    }
  },
})

export const linkStore = defineStore({
  id: 'link-store',
  state: () => {
    return {
      isNewLink: 0,
    }
  },
})

export const alertStore = defineStore({
  id: 'alert-store',
  state: () => {
    return {
      header: 'Information',
      content: 'Il n\'y à rien à déclarer',
      color: 'teal' as 'teal' | 'red',
      delay: 0,
      isAlert: false,
    }
  },
})
