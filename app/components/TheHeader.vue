<script setup lang="ts">
/** Barre fixe : logo (retour à l'accueil), bascule clair / sombre et bouton du menu. */
const props = defineProps<{
  menuOpen: boolean
}>()

const emit = defineEmits<{
  toggleMenu: []
}>()

const colorMode = useColorMode()
function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Survol du burger (souris uniquement) : il prend la forme d'une flèche.
// L'état est remis à zéro quand le menu s'ouvre ou se ferme.
const isBurgerHovered = ref(false)
watch(() => props.menuOpen, () => (isBurgerHovered.value = false))
</script>

<template>
  <div>
    <!-- Lien classique (et non NuxtLink) : recharge complètement la page d'accueil -->
    <a href="/" aria-label="Retour à l'Accueil" class="header-button slide-from-left fixed top-[1.4rem] z-11 ml-6">
      <IconLogo class="fill-current stroke-current stroke-10" />
    </a>

    <div class="slide-from-right fixed top-6 right-0 z-11 mr-6 grid grid-cols-2">
      <button type="button" aria-label="Affichage du Mode Sombre/Lumineux" class="header-button theme-toggle" @click="toggleTheme">
        <span>
          <svg class="sun animate-[rotate-full_20s_linear_infinite] fill-jet stroke-jet dark:translate-y-16 dark:animate-none dark:fill-white dark:stroke-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M1 12h1m2.2-7.8.7.7M12 1v1m7.8 2.2-.7.7M23 12h-1m-2.2 7.8-.7-.7M12 23v-1m-7.8-2.2.7-.7" />
            <circle cx="12" cy="12" r="6" />
          </svg>
          <svg class="moon translate-y-16 fill-jet stroke-jet dark:translate-y-0 dark:fill-white dark:stroke-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 16A10 10 0 0 1 8 6c0-.9.1-1.8.4-2.6A9.9 9.9 0 0 0 1 13a10 10 0 0 0 10 10c4.6 0 8.5-3.1 9.6-7.4-.8.3-1.7.4-2.6.4z" />
            <path d="M15 1v4m-2-2h4" class="star-1" />
            <path d="M21 7v4m-2-2h4" class="star-2" />
          </svg>
        </span>
      </button>

      <button
        type="button"
        aria-label="Affichage/Désactivation du Menu"
        :aria-expanded="menuOpen"
        class="header-button burger"
        :class="{ 'is-open': menuOpen, 'is-hovered': isBurgerHovered }"
        @click="emit('toggleMenu')"
        @pointerenter="isBurgerHovered = $event.pointerType === 'mouse'"
        @pointerleave="isBurgerHovered = false"
      >
        <span v-for="bar in 3" :key="bar" class="burger-bar bg-jet dark:bg-white" />
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ---------- Apparition après le préchargeur ---------- */
.slide-from-left {
  animation: slide-in-left 1s var(--ease-back-out) 4.9s both;
}

.slide-from-right {
  animation: slide-in-right 1s var(--ease-back-out) 4.9s both;
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
}

/* ---------- Taille commune des boutons ---------- */
.header-button {
  --size: 40px;
  display: block;
  width: var(--size);
  height: var(--size);
}

@media (min-width: 768px) and (min-height: 576px) {
  .header-button {
    --size: 50px;
  }
}

/* ---------- Burger : 3 barres → croix (ouvert) / flèche (survol) ---------- */
.burger {
  --bar: calc(var(--size) / 10);
  width: calc(var(--size) - 1px);
  margin: 0 auto;
}

.burger-bar {
  display: block;
  float: right;
  width: calc(var(--size) - 3 * var(--bar));
  height: var(--bar);
  transform-origin: center;
  transition: all 0.25s ease;
}

.burger-bar:nth-child(2) {
  margin: var(--bar) 0;
}

/* Menu ouvert : croix */
.burger.is-open .burger-bar:nth-child(1) {
  transform: translateY(calc(2 * var(--bar))) rotateZ(45deg);
}

.burger.is-open .burger-bar:nth-child(2) {
  opacity: 0;
}

.burger.is-open .burger-bar:nth-child(3) {
  transform: translateY(calc(-2 * var(--bar))) rotateZ(-45deg);
}

/* Menu fermé + survol : flèche vers la gauche */
.burger.is-hovered .burger-bar:nth-child(1) {
  width: calc(3 * var(--bar));
  transform: translateX(calc(-3 * var(--bar) - 1px)) rotateZ(-45deg);
}

.burger.is-hovered .burger-bar:nth-child(2) {
  transform: rotateZ(-90deg);
}

.burger.is-hovered .burger-bar:nth-child(3) {
  width: calc(3 * var(--bar));
  transform: translateX(calc(-1 * var(--bar) + 1px)) translateY(calc(-4 * var(--bar))) rotateZ(45deg);
}

/* Menu ouvert + survol : deux barres parallèles */
.burger.is-open.is-hovered .burger-bar:nth-child(1) {
  width: calc(var(--size) - 3 * var(--bar));
  transform: translateY(calc(2 * var(--bar)));
}

.burger.is-open.is-hovered .burger-bar:nth-child(2) {
  opacity: 0;
}

.burger.is-open.is-hovered .burger-bar:nth-child(3) {
  width: calc(var(--size) - 3 * var(--bar));
  transform: translateY(calc(-2 * var(--bar)));
}

/* ---------- Bascule soleil / lune ---------- */
.theme-toggle {
  position: relative;
  z-index: 1;
}

.theme-toggle > span {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.theme-toggle svg {
  position: absolute;
  display: block;
  stroke-width: 2px;
  stroke-linecap: square;
  stroke-linejoin: round;
  transition: translate 0.5s ease;
}

.sun {
  top: 5px;
  left: 5px;
  width: calc(var(--size) - 10px);
  height: calc(var(--size) - 10px);
}

.moon {
  --moon-size: calc(0.8 * (var(--size) - 10px));
  top: calc((var(--size) - var(--moon-size)) / 2);
  left: calc((var(--size) - var(--moon-size)) / 2);
  width: var(--moon-size);
  height: var(--moon-size);
}

.moon .star-1 {
  transform-origin: 15px 3px;
  animation: twinkle 5s linear infinite;
}

.moon .star-2 {
  transform-origin: 21px 9px;
  animation: twinkle-late 5s linear infinite;
}

@keyframes twinkle {
  5%,
  20% {
    opacity: 0;
    transform: scale(0) rotate(90deg);
  }
  25%,
  100% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
}

@keyframes twinkle-late {
  0%,
  60% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
  65%,
  70% {
    opacity: 0;
    transform: scale(0) rotate(90deg);
  }
  75%,
  100% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
}
</style>
