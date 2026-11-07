import type { Directive } from 'vue'

/**
 * Directive `v-reveal` : apparitions au défilement (remplace ScrollTrigger).
 *
 * Ajoute la classe `is-revealed` quand le haut de l'élément passe au-dessus
 * d'une ligne horizontale de l'écran, et la retire quand on remonte.
 * Le CSS des classes `.reveal-*` (main.css) fait le reste.
 *
 * @example
 * <div v-reveal>…</div>                       → ligne à 75 % de la hauteur d'écran
 * <div v-reveal="{ start: 0.6 }">…</div>      → ligne à 60 %
 * <div v-reveal="{ start: 1, once: true }">   → dès l'entrée dans l'écran, une seule fois
 */
export interface RevealOptions {
  /** Position de la ligne de déclenchement (0 = haut, 1 = bas de l'écran) */
  start?: number
  /** Ne joue l'apparition qu'une fois (pas de retour en arrière) */
  once?: boolean
}

const DEFAULT_START = 0.75

/** Un IntersectionObserver par ligne de déclenchement, partagé entre les éléments */
const observers = new Map<number, IntersectionObserver>()
const onceElements = new WeakSet<Element>()

function getObserver(start: number) {
  let observer = observers.get(start)
  if (!observer) {
    const currentObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        // Dans la zone au-dessus de la ligne… ou déjà sorti par le haut de l'écran
        const isPast = entry.isIntersecting || entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0)
        entry.target.classList.toggle('is-revealed', isPast)
        if (isPast && onceElements.has(entry.target))
          currentObserver.unobserve(entry.target)
      }
    }, { rootMargin: `0px 0px ${-(1 - start) * 100}% 0px` })
    observers.set(start, currentObserver)
    observer = currentObserver
  }
  return observer
}

const reveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(element, { value = {} }) {
    if (value.once)
      onceElements.add(element)
    getObserver(value.start ?? DEFAULT_START).observe(element)
  },
  beforeUnmount(element, { value = {} }) {
    getObserver(value.start ?? DEFAULT_START).unobserve(element)
  },
  // Rien à faire au rendu serveur
  getSSRProps: () => ({}),
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})

// Typage de `v-reveal` dans les templates
declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof reveal
  }
}
