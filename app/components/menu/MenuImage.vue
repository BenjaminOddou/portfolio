<script setup lang="ts">
/** Photo du menu qu'on peut attraper et lancer à l'intérieur de `bounds`. */
const props = defineProps<{
  image: SiteImage
  bounds: HTMLElement | null
}>()

const emit = defineEmits<{
  grab: []
}>()

const element = useTemplateRef('element')

useDragAndThrow(element, {
  bounds: () => props.bounds,
  onGrab: () => emit('grab'),
})
</script>

<template>
  <div
    ref="element"
    data-cursor="hide"
    class="relative h-[20vw] max-h-50 min-h-37.5[16vw] max-w-40w-[120px] select-none lt:malt:max-h-187.5ax-w-[600px]"
  >
    <NuxtImg
      :src="image.filePath"
      width="600"
      height="750"
      alt=""
      draggable="false"
      class="pointer-events-none size-full object-cover"
    />
  </div>
</template>
