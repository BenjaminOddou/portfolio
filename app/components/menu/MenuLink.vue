<script setup lang="ts">
/**
 * Lien du menu principal. Au survol, chaque lettre bascule en 3D :
 * une copie du mot arrive par le haut pendant que l'autre part vers le bas.
 */
const props = defineProps<{
  to: string
  label: string
}>()

// Les espaces deviennent insécables, sinon ils disparaîtraient entre deux lettres « inline-block »
const chars = computed(() => Array.from(props.label, char => (char === ' ' ? '\u00A0' : char)))
</script>

<template>
  <li class="z-999 mx-auto mb-2 block text-center mix-blend-color-dodge lt:mb-6 dark:mix-blend-normal">
    <NuxtLink :to class="menu-link" :aria-label="label">
      <span class="relative block perspective-[1000px] perspective-origin-bottom" aria-hidden="true">
        <!-- Copie qui arrive au survol -->
        <span class="block">
          <span
            v-for="(char, i) in chars"
            :key="i"
            class="flip-char flip-in"
            :style="{ '--i': i, '--n': chars.length }"
          >{{ char }}</span>
        </span>
        <!-- Copie visible au repos -->
        <span class="absolute inset-0">
          <span
            v-for="(char, i) in chars"
            :key="i"
            class="flip-char flip-out"
            :style="{ '--i': i, '--n': chars.length }"
          >{{ char }}</span>
        </span>
      </span>
    </NuxtLink>
  </li>
</template>

<style scoped>
.flip-char {
  display: inline-block;
  transition-property: opacity, translate, rotate;
  transition-duration: 0.4s;
  transition-timing-function: var(--ease-power2-in-out);
  /* À la sortie du survol, les lettres reviennent de la dernière à la première */
  transition-delay: calc((var(--n) - 1 - var(--i)) * 40ms);
}

/* Au repos, la copie « entrante » est couchée au-dessus de la ligne */
.flip-in {
  opacity: 0;
  translate: 0 -80%;
  rotate: x -90deg;
  transform-origin: bottom;
}

.flip-out {
  transform-origin: top;
}

@media (hover: hover) {
  .menu-link:hover .flip-char {
    transition-delay: calc(var(--i) * 40ms);
  }

  .menu-link:hover .flip-in {
    opacity: 1;
    translate: 0 0;
    rotate: x 0deg;
  }

  .menu-link:hover .flip-out {
    opacity: 0;
    translate: 0 80%;
    rotate: x -90deg;
  }
}
</style>
