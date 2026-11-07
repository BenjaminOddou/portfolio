<script setup lang="ts">
/**
 * Découpe un texte pour l'animer morceau par morceau (remplace GSAP SplitText).
 *
 * Chaque morceau est placé dans un masque (`.split-mask`) avec la classe
 * `reveal-up` et une variable `--i` (son rang), qui sert à décaler les
 * animations : `[--stagger:70ms]` sur un parent → 70 ms entre chaque morceau.
 *
 *  - `by="chars"` : lettre par lettre (le texte complet reste lisible par les lecteurs d'écran)
 *  - `by="words"` : mot par mot
 *  - `by="lines"` : ligne par ligne (recalculé quand la largeur change)
 *
 * Le texte peut contenir des passages mis en valeur et des retours à la ligne :
 * @example
 * <SplitText by="chars" :text="['Pour moi, ', { text: 'la photographie', emphasis: true }, ' représente…']" />
 * <SplitText by="lines" text="Première ligne\nDeuxième ligne" />
 */
type TextPart = string | { text: string, emphasis?: boolean }

interface Word {
  index: number
  text: string
  chars: { char: string, index: number }[]
  emphasis: boolean
  /** Retour à la ligne forcé après ce mot */
  lineBreak: boolean
}

const props = withDefaults(defineProps<{
  text: string | TextPart[]
  by?: 'chars' | 'words' | 'lines'
  /** Classes des passages mis en valeur */
  emphasisClass?: string
}>(), {
  by: 'chars',
  emphasisClass: 'font-light italic',
})

/** Découpe en caractères « visibles » (gère les emojis composés, ex. 👁️) */
const segmenter = new Intl.Segmenter('fr', { granularity: 'grapheme' })
const toChars = (word: string) => Array.from(segmenter.segment(word), ({ segment }) => segment)

const words = computed(() => {
  const parts = typeof props.text === 'string' ? [props.text] : props.text
  const result: Word[] = []
  let charIndex = 0

  for (const part of parts) {
    const { text, emphasis = false } = typeof part === 'string' ? { text: part } : part
    text.split('\n').forEach((line, lineIndex) => {
      if (lineIndex > 0 && result.length)
        result.at(-1)!.lineBreak = true
      for (const word of line.split(/\s+/).filter(Boolean)) {
        const chars = toChars(word).map(char => ({ char, index: charIndex++ }))
        result.push({
          index: result.length,
          text: word,
          chars,
          emphasis,
          lineBreak: false,
        })
      }
    })
  }
  return result
})

const plainText = computed(() => words.value.map(word => word.text).join(' '))

// ---------------------------------------------------------------------------
// Mode « lignes » : numéro de ligne de chaque mot, d'après sa position à l'écran
// ---------------------------------------------------------------------------
const root = useTemplateRef('root')
const lineOfWord = ref<number[]>([])

function measureLines() {
  const masks = root.value?.querySelectorAll<HTMLElement>('.split-mask') ?? []
  let line = -1
  let lineTop = Number.NEGATIVE_INFINITY
  lineOfWord.value = Array.from(masks, (mask) => {
    if (mask.offsetTop > lineTop + 2) {
      line++
      lineTop = mask.offsetTop
    }
    return line
  })
}

let resizeObserver: ResizeObserver | undefined
onMounted(() => {
  if (props.by !== 'lines' || !root.value)
    return
  resizeObserver = new ResizeObserver(measureLines)
  resizeObserver.observe(root.value)
})
onBeforeUnmount(() => resizeObserver?.disconnect())

/** Rang utilisé pour décaler l'animation d'un mot */
function wordRank(word: Word) {
  return props.by === 'lines' ? (lineOfWord.value[word.index] ?? 0) : word.index
}
</script>

<template>
  <span ref="root">
    <span v-if="by === 'chars'" class="sr-only">{{ plainText }}</span>
    <span :aria-hidden="by === 'chars' ? 'true' : undefined">
      <template v-for="word in words" :key="word.index">
        <span class="split-mask" :class="word.emphasis && emphasisClass">
          <template v-if="by === 'chars'">
            <span
              v-for="{ char, index } in word.chars"
              :key="index"
              class="reveal-up inline-block"
              :style="{ '--i': index }"
            >{{ char }}</span>
          </template>
          <span v-else class="reveal-up inline-block" :style="{ '--i': wordRank(word) }">{{ word.text }}</span>
        </span>
        <br v-if="word.lineBreak">
        <template v-else>{{ ' ' }}</template>
      </template>
    </span>
  </span>
</template>
