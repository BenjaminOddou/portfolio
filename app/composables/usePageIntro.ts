/**
 * Signal « la page est visible ».
 *
 * Il est émis à la fin du préchargeur (première visite) ou quand la vague de
 * transition se retire (navigation). Chaque page s'en sert pour lancer son
 * animation d'introduction au bon moment, et non derrière l'écran de chargement.
 */

const usePageIntroCounter = () => useState('page-intro', () => 0)

/**
 * Renvoie une ref qui passe à `true` quand la page courante devient visible.
 * @example
 * const introStarted = usePageIntro()
 * // <h1 :class="{ 'is-revealed': introStarted }">…</h1>
 */
export function usePageIntro() {
  const counter = usePageIntroCounter()
  const started = ref(false)
  watch(counter, () => (started.value = true), { once: true })
  return started
}

/** Renvoie la fonction qui prévient la page courante qu'elle est visible. */
export function usePageIntroTrigger() {
  const counter = usePageIntroCounter()
  return () => {
    counter.value++
  }
}
