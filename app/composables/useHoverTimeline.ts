import type { Track } from '~/utils/motion'

/**
 * Timeline jouée au survol : `play` à l'entrée de la souris, `reverse` à la sortie.
 * Les pistes sont construites au montage, quand les éléments du DOM existent.
 *
 * @example
 * const dot = useTemplateRef('dot')
 * const { play, reverse } = useHoverTimeline(() => [
 *   track([[0, 1], [0.3, 0, ease.sine.inOut]], v => dot.value!.style.scale = String(v)),
 * ])
 * // <svg @mouseenter="play" @mouseleave="reverse">
 */
export function useHoverTimeline(buildTracks: () => Track[]) {
  let timeline: ReturnType<typeof createTimeline> | undefined

  onMounted(() => (timeline = createTimeline(buildTracks())))
  onBeforeUnmount(() => timeline?.stop())

  return {
    play: () => timeline?.play(),
    reverse: () => timeline?.reverse(),
  }
}
