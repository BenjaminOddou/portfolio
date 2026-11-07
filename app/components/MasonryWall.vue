<script setup lang="ts" generic="T">
/**
 * Mur « masonry » maison (remplace @yeger/vue-masonry-wall).
 *
 * Le nombre de colonnes dépend de la largeur disponible et de `columnWidth`
 * (largeur minimale d'une colonne). Chaque élément est placé, dans l'ordre,
 * dans la colonne la moins haute. Les hauteurs sont calculées à partir du
 * ratio de chaque élément : pas besoin d'attendre le chargement des images,
 * et ajouter des éléments ne déplace jamais ceux déjà affichés.
 *
 * @example
 * <MasonryWall :items="images" :column-width="340" :gap="24" :ratio="img => img.height / img.width" :item-key="img => img.filePath">
 *   <template #default="{ item, index }">…</template>
 * </MasonryWall>
 */
const props = withDefaults(defineProps<{
  items: T[]
  /** Largeur minimale d'une colonne (px) */
  columnWidth: number
  /** Espace entre colonnes et entre éléments (px) */
  gap?: number
  /** Ratio hauteur / largeur d'un élément */
  ratio: (item: T) => number
  /** Clé unique d'un élément */
  itemKey: (item: T) => string | number
}>(), {
  gap: 0,
})

defineSlots<{
  default: (props: { item: T, index: number }) => unknown
}>()

const root = useTemplateRef('root')
const width = ref(0) // 0 tant que la largeur n'est pas connue (rendu serveur) → 1 colonne

const columnCount = computed(() =>
  Math.max(1, Math.floor((width.value + props.gap) / (props.columnWidth + props.gap))),
)

const columns = computed(() => {
  const columnWidth = (width.value - props.gap * (columnCount.value - 1)) / columnCount.value || 1
  const columns = Array.from({ length: columnCount.value }, () => ({
    height: 0,
    entries: [] as { item: T, index: number }[],
  }))

  props.items.forEach((item, index) => {
    const shortest = columns.reduce((min, column) => (column.height < min.height ? column : min))
    shortest.entries.push({ item, index })
    shortest.height += columnWidth * props.ratio(item) + props.gap
  })
  return columns
})

let resizeObserver: ResizeObserver | undefined
onMounted(() => {
  if (!root.value)
    return
  width.value = root.value.clientWidth
  resizeObserver = new ResizeObserver(([entry]) => (width.value = entry!.contentRect.width))
  resizeObserver.observe(root.value)
})
onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <div ref="root" class="flex items-start" :style="{ gap: `${gap}px` }">
    <div
      v-for="(column, c) in columns"
      :key="c"
      class="flex min-w-0 flex-1 flex-col"
      :style="{ gap: `${gap}px` }"
    >
      <template v-for="{ item, index } in column.entries" :key="itemKey(item)">
        <slot :item :index />
      </template>
    </div>
  </div>
</template>
