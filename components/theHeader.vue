<script setup lang="ts">
import gsap from 'gsap'

const setColorTheme = (newTheme: 'light' | 'dark') => {
  useColorMode().preference = newTheme
}
onMounted(() => {
  const reload = document.querySelector('#reload') as HTMLButtonElement
  reload.addEventListener('click', () => {
    location.href = '/'
  })

  // Animation Onload
  gsap
    .timeline()
    .fromTo(
      '#end-navbar',
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        delay: 4.9,
        duration: 1,
        ease: 'back.out(1.4)',
      },
    )
    .fromTo(
      '#reload',
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'back.out(1.4)',
      },
      '<',
    )
})
</script>

<template>
  <div>
    <button
      id="reload"
      aria-label="Retour à l'Accueil"
      class="menu fixed-el fixed top-[1.4rem] z-[11] ml-6"
    >
      <TheSVG id="logo-bo" name="logo-bo" class="fill-current stroke-current stroke-[10]" />
    </button>

    <div
      id="end-navbar"
      class="fixed top-6 right-0 z-[11] mr-6 grid grid-cols-2"
    >
      <button
        aria-label="Affichage du Mode Sombre/Lumineux"
        class="menu toggle fixed-el"
        @click="setColorTheme($colorMode.value === 'dark' ? 'light' : 'dark')"
      >
        <div>
          <TheSVG name="head-sun" class="sun origin-center translate-y-0 animate-[20s_linear_infinite_spin] fill-jet stroke-jet dark:translate-y-16 dark:animate-none dark:fill-white dark:stroke-white" />
          <TheSVG name="head-moon" class="moon translate-y-16 fill-jet stroke-jet dark:translate-y-0 dark:fill-white dark:stroke-white" />
        </div>
      </button>

      <button
        id="button-burger"
        aria-label="Affichage/Désactivation du Menu"
        class="menu fixed-el"
      >
        <div class="burger-bar bg-jet dark:bg-white" />
        <div class="burger-bar bg-jet dark:bg-white" />
        <div class="burger-bar bg-jet dark:bg-white" />
      </button>
    </div>
  </div>
</template>

<style>
/*
Menu Burger
*/
.menu {
  width: var(--dimensions);
  height: var(--dimensions);
  --dimensions: 40px;
  color: currentColor;
}

@media (min-width: 768px) and (min-height: 576px) {
  .menu {
    --dimensions: 50px;
  }
}

#button-burger {
  width: calc(var(--dimensions) - 1px);
  margin: 0 auto;
}

#button-burger .burger-bar {
  float: right;
  width: calc(var(--dimensions) - 3 * var(--baseh));
  height: calc(var(--dimensions) / 10);
  --baseh: calc(var(--dimensions) / 10);
  transition: all 0.25s ease;
}

#button-burger .burger-bar:nth-of-type(2) {
  margin-top: var(--baseh);
  margin-bottom: var(--baseh);
}

#button-burger.is-open .burger-bar:nth-of-type(1) {
  transform: translateY(calc(2 * var(--baseh))) rotateZ(45deg);
  transform-origin: center;
}

#button-burger.is-open .burger-bar:nth-of-type(2) {
  opacity: 0;
}

#button-burger.is-open .burger-bar:nth-of-type(3) {
  transform: translateY(calc(-2 * var(--baseh))) rotateZ(-45deg);
  transform-origin: center;
}

#button-burger.is-open.is-hovered .burger-bar:nth-of-type(1) {
  width: calc(var(--dimensions) - 3 * var(--baseh));
  transform: translateY(calc(2 * var(--baseh)));
  transform-origin: center;
}

#button-burger.is-open.is-hovered .burger-bar:nth-of-type(2) {
  opacity: 0;
}

#button-burger.is-open.is-hovered .burger-bar:nth-of-type(3) {
  width: calc(var(--dimensions) - 3 * var(--baseh));
  transform: translateY(calc(-2 * var(--baseh)));
  transform-origin: center;
}

#button-burger.is-hovered .burger-bar:nth-of-type(1) {
  width: calc(3 * var(--baseh));
  transform: translateX(
      calc(calc(-4 * var(--baseh)) - calc(-1 * var(--baseh) + 1px))
    )
    rotateZ(-45deg);
  transform-origin: center;
}

#button-burger.is-hovered .burger-bar:nth-of-type(2) {
  width: calc(var(--dimensions) - 3 * var(--baseh));
  transform: rotateZ(-90deg);
  transform-origin: center;
}

#button-burger.is-hovered .burger-bar:nth-of-type(3) {
  width: calc(3 * var(--baseh));
  transform: translateX(calc(-1 * var(--baseh) + 1px))
    translateY(calc(-4 * var(--baseh))) rotateZ(45deg);
  transform-origin: center;
}

/* DARK MODE BUTTON */

.toggle {
  position: relative;
  z-index: 1;
  padding: 0;
  margin: 0;
  display: block;
  width: var(--dimensions);
  height: var(--dimensions);
}

.toggle svg {
  display: block;
  stroke-linecap: square;
  stroke-linejoin: round;
  position: absolute;
  left: var(--left, -2px);
  top: var(--top, 14px);
  stroke-width: var(--stroke-width, 2px);
}

.toggle svg.line {
  --stroke-width: 3px;
  width: 52px;
  height: 36px;
  stroke-width: 3px;
  stroke-linecap: square;
}

.toggle div {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 0px;
  top: 0px;
}

.toggle svg.sun {
  --left: 5px;
  --top: 5px;
  width: calc(var(--dimensions) - 10px);
  height: calc(var(--dimensions) - 10px);
}

.toggle svg.moon {
  --left: calc((var(--dimensions) - (0.8 * (var(--dimensions) - 10px))) / 2);
  --top: calc((var(--dimensions) - (0.8 * (var(--dimensions) - 10px))) / 2);
  width: calc(0.8 * (var(--dimensions) - 10px));
  height: calc(0.8 * (var(--dimensions) - 10px));
}

.moon .star-1 {
  transform-origin: 15px 3px;
  animation: star 5s linear infinite;
}

.moon .star-2 {
  transform-origin: 21px 9px;
  animation: star2 5s linear infinite;
}

@keyframes star {
  5%,
  20% {
    opacity: 0;
    transform: scale(0) rotate(90deg) translateZ(0);
  }

  25%,
  100% {
    opacity: 1;
    transform: scale(1) rotate(180deg) translateZ(0);
  }
}

@keyframes star2 {
  0%,
  60% {
    opacity: 1;
    transform: scale(1) rotate(0) translateZ(0);
  }

  65%,
  70% {
    opacity: 0;
    transform: scale(0) rotate(90deg) translateZ(0);
  }

  75%,
  100% {
    opacity: 1;
    transform: scale(1) rotate(180deg) translateZ(0);
  }
}
</style>
