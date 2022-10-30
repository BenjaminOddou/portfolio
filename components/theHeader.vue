<script setup lang="ts">
import gsap from 'gsap'

const setColorTheme = (newTheme: 'light' | 'dark') => {
  useColorMode().preference = newTheme
}
onMounted(() => {
  const reload = document.querySelector<HTMLButtonElement>('#reload')
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
        ease: 'back.out(1.4)'
      }
    )
    .fromTo(
      '#reload',
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'back.out(1.4)'
      },
      '<'
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
      <svg
        id="logo-bo"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        stroke="currentColor"
        viewBox="0 0 100 100"
      >
        <path
          id="B"
          d="M26.2361 50.3759C30.4027 49.3342 34.3611 46.0702 34.3611 39.6812C34.3611 25.6535 18.1805 26.0008 18.1805 26.0008H2V74.6119H18.1805C21.4444 74.6119 35.0554 73.9869 35.0554 60.6535C35.0554 60.6535 35.4027 52.2509 26.2361 50.3759ZM10.0555 34.0563H18.1805C18.1805 34.0563 26.2361 33.709 26.2361 40.2368C26.2361 46.2785 18.1805 46.2785 18.1805 46.2785H10.0555V34.0563ZM18.1805 66.5563H10.0555V54.4035H18.1805C18.1805 54.4035 26.9305 53.9172 26.9305 60.4452C26.9304 65.7229 21.5834 66.5562 18.1805 66.5562V66.5563Z"
        />
        <path
          id="O"
          d="M56.3308 38.4998C46.4001 38.4998 38.2751 46.6248 38.2751 56.5555C38.2751 66.4862 46.4001 74.6112 56.3308 74.6112C66.2614 74.6112 74.3861 66.4862 74.3861 56.5555C74.3861 46.6248 66.2611 38.4998 56.3308 38.4998ZM56.3308 66.5555C50.7751 66.5555 46.3308 62.1112 46.3308 56.5555C46.3308 50.9998 50.7751 46.5555 56.3308 46.5555C61.8864 46.5555 66.3304 50.9998 66.3304 56.5555C66.3304 62.1112 61.8861 66.5555 56.3308 66.5555Z"
        />
        <path id="-" d="M40.4974 34.061H72.5804V26.0055H40.4974V34.061Z" />
      </svg>
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
          <svg
            class="sun translate-y-0 fill-jet stroke-jet dark:translate-y-16 dark:fill-white dark:stroke-white"
            viewBox="0 0 24 24"
          >
            <g class="origin-center animate-[20s_linear_infinite_spin]">
              <line x1="1" y1="12" x2="2" y2="12" />
              <line x1="4.2" y1="4.2" x2="4.9" y2="4.9" />
              <line x1="12" y1="1" x2="12" y2="2" />
              <line x1="19.8" y1="4.2" x2="19.1" y2="4.9" />
              <line x1="23" y1="12" x2="22" y2="12" />
              <line x1="19.8" y1="19.8" x2="19.1" y2="19.1" />
              <line x1="12" y1="23" x2="12" y2="22" />
              <line x1="4.2" y1="19.8" x2="4.9" y2="19.1" />
            </g>
            <circle cx="12" cy="12" r="6" />
          </svg>
          <svg
            class="moon translate-y-16 fill-jet stroke-jet dark:translate-y-0 dark:fill-white dark:stroke-white"
            viewBox="0 0 24 24"
          >
            <path
              d="M18,16C12.5,16,8,11.5,8,6 c0-0.9,0.1-1.8,0.4-2.6C4.1,4.5,1,8.4,1,13c0,5.5,4.5,10,10,10c4.6,0,8.5-3.1,9.6-7.4C19.8,15.9,18.9,16,18,16z"
            />
            <g class="star-1">
              <line x1="15" y1="1" x2="15" y2="5" />
              <line x1="13" y1="3" x2="17" y2="3" />
            </g>
            <g class="star-2">
              <line x1="21" y1="7" x2="21" y2="11" />
              <line x1="19" y1="9" x2="23" y2="9" />
            </g>
          </svg>
        </div>
      </button>

      <button
        id="button-burger"
        aria-label="Affichage/Désactivation du Menu"
        class="menu fixed-el"
      >
        <div class="burger-bar bg-jet dark:bg-white"></div>
        <div class="burger-bar bg-jet dark:bg-white"></div>
        <div class="burger-bar bg-jet dark:bg-white"></div>
      </button>
    </div>
  </div>
</template>

<style scoped>
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
