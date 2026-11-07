import type { Easing } from '~/utils/motion'

/**
 * Contrôle du défilement fluide (instance Lenis créée par plugins/smooth-scroll.client.ts).
 * Côté serveur, toutes les méthodes sont sans effet.
 */
export function useSmoothScroll() {
  const lenis = import.meta.client ? useNuxtApp().$lenis : undefined

  return {
    /** Bloque le défilement (menu ouvert, transition de page…) */
    lock: () => lenis?.stop(),

    /** Débloque le défilement */
    unlock: () => lenis?.start(),

    /**
     * Défilement animé vers une position (px), un élément ou un sélecteur CSS.
     * @example scrollTo('#formsection', { duration: 3, easing: ease.power3.inOut })
     */
    scrollTo: (target: number | string | HTMLElement, options: { duration?: number, easing?: Easing } = {}) =>
      lenis?.scrollTo(target, { ...options, force: true }),

    /** Remonte instantanément en haut de la page */
    jumpToTop: () => lenis?.scrollTo(0, { immediate: true, force: true }),
  }
}
