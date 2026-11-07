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
    class="relative h-[20vw] max-h-50 min-h-37.5 w-[16vw] max-w-40 min-w-30 select-none lt:max-h-187.5 lt:max-w-150"
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
