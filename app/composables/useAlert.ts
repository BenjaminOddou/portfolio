/** Message affiché en haut de l'écran (en bas sur mobile) par TheAlert.vue. */
export interface Alert {
  title: string
  message: string
  tone: 'success' | 'error'
}

let hideTimer: ReturnType<typeof setTimeout> | undefined

/**
 * Notifications du site (remplace le store Pinia).
 * @example
 * const { show } = useAlert()
 * show({ title: 'Message reçu', message: 'Merci !', tone: 'success' })
 */
export function useAlert() {
  const current = useState<Alert | null>('alert', () => null)

  /** Affiche une alerte pendant `duration` millisecondes (7 s par défaut). */
  function show(alert: Alert, duration = 7000) {
    current.value = alert
    clearTimeout(hideTimer)
    hideTimer = setTimeout(() => (current.value = null), duration)
  }

  return { current, show }
}
