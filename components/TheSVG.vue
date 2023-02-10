<script setup lang="ts">
const props = defineProps<{ name: string }>()
const icon = shallowRef('')
import(`../assets/svgs/${props.name}.svg`).then((module) => {
  icon.value = module.default
})
</script>

<template>
  <component :is="icon" v-if="icon" />
</template>
