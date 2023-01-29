<script setup lang="ts">
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
if (process.client)
  gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother)

const isRoute = routeStore()

definePageMeta({
  title: 'Accueil',
  url: 'https://www.benjaminoddou-photographe.com',
  description:
    'Site en ligne de Benjamin Oddou, photographe de mariage et portrait basé à Paris, réservez un shooting !',
})

useHead({
  title: 'Accueil',
})

onMounted(() => {
  const Smooth = ScrollSmoother.get() as globalThis.ScrollSmoother
  const buttonsToForm = document.querySelectorAll(
    '.to-form',
  ) as NodeListOf<HTMLButtonElement>
  const tl1 = gsap.timeline()
  const titleHero = new SplitText('#titleHero', {
    type: 'lines, chars',
  })
  const subtitleHero = new SplitText('#subtitleHero', {
    type: 'lines, chars',
  })
  const charAbout = new SplitText('#char-about', {
    type: 'words, chars',
  })
  const imgUnit = document.querySelectorAll<HTMLImageElement>('.img-unit')
  const wordPortfolio = new SplitText('#word-portfolio', {
    type: 'lines, words',
  })
  gsap.set([charAbout.words, wordPortfolio.lines], {
    css: { overflow: 'hidden' },
  })

  tl1.pause()
  isRoute.$subscribe(() => {
    tl1.play()
  })

  tl1
    .fromTo(
      titleHero.chars,
      {
        y: '100%',
      },
      {
        y: '0%',
        stagger: 0.07,
        duration: 0.8,
        ease: 'power4.out',
      },
    )
    .fromTo(
      subtitleHero.chars,
      {
        y: '100%',
      },
      {
        y: '0%',
        stagger: 0.07,
        duration: 0.6,
        ease: 'power4.out',
        onComplete: () => {
          titleHero.revert()
          subtitleHero.revert()
        },
      },
      '<+0.8',
    )
    .from(
      '#main-img',
      {
        opacity: 0,
        scale: 0.6,
        duration: 1.2,
        ease: 'power4.out',
      },
      '>-=0.7',
    )
    .from(
      '#call-text',
      {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power4.out',
      },
      '<+0.5',
    )
    .from(
      '#hidden__large',
      {
        opacity: 0,
        scale: 0.7,
        duration: 1,
        ease: 'back.out(1.4)',
      },
      '>-=0.5',
    )

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#homesection',
        start: 'top 0px',
        end: '=+100%',
        scrub: true,
      },
    })
    .to('#titleHero', {
      y: '-250%',
    })
    .to(
      '#subtitleHero',
      {
        y: '-350%',
      },
      '<',
    )
    .to(
      '#img-wrap',
      {
        scale: 1.4,
      },
      '<',
    )
    .to(
      '#call-text',
      {
        x: '100%',
      },
      '<',
    )

  buttonsToForm.forEach((button) => {
    button.addEventListener('click', () => {
      gsap.to(Smooth, {
        duration: 3,
        scrollTop: Math.min(
          ScrollTrigger.maxScroll(window),
          Smooth.offset('#formsection', 'top top'),
        ),
        ease: 'power3.inOut',
      })
    })
  })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#grid-about',
        start: 'top 100%',
        end: 'top 100%',
        toggleActions: 'play none none reset',
      },
    })
    .fromTo(
      charAbout.chars,
      {
        y: '100%',
      },
      {
        y: '0%',
        stagger: 0.025,
        duration: 0.6,
        ease: 'power4.out',
      },
    )
    .fromTo(
      '.link-about',
      {
        autoAlpha: 0,
        y: 20,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
      },
      '>-=0.5',
    )

  imgUnit.forEach((element) => {
    gsap.to(element, {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        end: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })
  })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#carousel-title',
        start: 'top 75%',
        end: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })
    .from('#span-portfolio', {
      y: '100%',
      duration: 1.4,
      ease: 'power4.out',
    })
    .from(
      wordPortfolio.words,
      {
        y: '100%',
        duration: 1.4,
        ease: 'power4.out',
      },
      '<',
    )
    .from(
      '.link-portfolio',
      {
        autoAlpha: 0,
        y: 20,
        duration: 1,
        ease: 'power4.out',
      },
      '<+=0.8',
    )
})
</script>

<template>
  <div>
    <!-- HERO SECTION -->
    <div id="homesection" class="h-[110vh] min-h-[400px] overflow-hidden">
      <div class="o-container">
        <div id="c-header" class="relative h-[90vh] min-h-[320px] sm:h-screen">
          <div
            id="container-title"
            class="absolute top-0 grid h-3/5 w-full justify-center"
          >
            <div
              id="titleHero"
              class="baron z-[1] cursor-text self-end overflow-hidden text-center text-[8.7vw] leading-tight sm:text-[7vw] xl:text-[calc((7px_*_1200)_/_100)]"
            >
              BenJAmin oddou
            </div>
            <div
              id="subtitleHero"
              class="z-[1] cursor-text self-start overflow-hidden text-center text-[5.3vw] font-thin leading-none text-dark-lavender dark:text-dark-orange sm:text-[3.6vw] xl:text-[calc((3.6px_*_1200)_/_100)]"
            >
              PHOTOGRAPHE
            </div>
          </div>
          <div
            id="img-wrap"
            class="z-0 h-full w-full px-[10vw] py-[10vh] sm:px-[20vw]"
          >
            <div
              id="main-img"
              class="m-auto h-full max-h-[853px] w-[63vw] max-w-[63vw] rounded-[8rem] bg-[url('https://ik.imagekit.io/palladium/index-page/Hero_img_light.webp')] bg-cover bg-center bg-no-repeat transition-bg-img duration-500 ease-classic after:hidden after:content-[url('https://ik.imagekit.io/palladium/index-page/Hero_img_light.webp')_url('https://ik.imagekit.io/palladium/index-page/Hero_img_dark.webp')] dark:bg-[url('https://ik.imagekit.io/palladium/index-page/Hero_img_dark.webp')] sm:max-h-full sm:w-full sm:max-w-[454px] lt:rounded-[11rem] av:rounded-full"
            />
          </div>
          <div
            id="call-text"
            class="absolute top-2/3 left-[70%] z-20 hidden w-1/5 max-w-[12rem] gap-2 sm:grid md:left-3/4 lt:top-1/2"
          >
            <span class="hidden cursor-text font-bold lt:block">Réservation disponible !</span>
            <span class="hidden cursor-text text-[0.9rem] lt:block">Veuillez remplir le formulaire en bas tout en précisant le type
              de réservation.</span>
            <span class="mx-0 my-2 hidden w-2/5 border-t-4 lt:block" />
            <button
              id="button__hover"
              aria-label="Affichage du Formulaire de contact"
              class="to-form group mt-[0.3rem] h-12 w-48"
            >
              <div id="learn-more" class="relative">
                <span
                  id="circle"
                  class="m-0 block h-12 w-12 rounded-full bg-jet transition-all duration-500 ease-smooth group-hover:w-full dark:bg-white"
                  aria-hidden="true"
                >
                  <span
                    id="arrow"
                    class="absolute inset-y-0 left-[0.625rem] m-auto h-[0.125rem] w-[1.125rem] bg-transparent transition-all duration-500 ease-smooth before:absolute before:top-[-0.25rem] before:right-[0.0625rem] before:h-[0.625rem] before:w-[0.625rem] before:rotate-45 before:border-t-[0.125rem] before:border-r-[0.125rem] before:border-white before:content-[''] group-hover:translate-x-4 group-hover:bg-white dark:before:border-jet dark:group-hover:bg-jet"
                  />
                </span>
                <span
                  id="button-text"
                  class="baron absolute inset-0 ml-[1.85rem] py-[0.9rem] text-center text-sm leading-[1.6rem] transition-all duration-500 ease-smooth group-hover:text-white dark:group-hover:text-jet sm:text-base"
                >réserver !</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        id="hidden__large"
        class="z-[1] mt-2 flex h-[4vh] w-full scale-100 items-center justify-center opacity-100 sm:hidden"
      >
        <button
          aria-label="Affichage du Formulaire de contact"
          class="to-form button h-full min-h-[40px] w-[65%] max-w-[300px] rounded-full"
        >
          <span>Réserver un shooting !</span>
        </button>
      </div>
    </div>

    <!-- ABOUT SECTION -->
    <div
      id="aboutsection"
      class="my-[10vw] h-[70vh] min-h-[400px] sm:my-[10vh] sm:min-h-full"
    >
      <div class="p-container">
        <div
          id="grid-about"
          class="grid w-full justify-items-center self-center"
        >
          <div
            class="mx-auto w-full items-end text-center text-[24.544px] font-extralight md:text-[3.2vw] 2xl:text-[53.76px]"
          >
            <span
              id="char-about"
              aria-hidden="true"
              class="inline-block cursor-text"
            >Pour moi,&#160;<b>la photographie</b>&#160;représente le moyen de
              matérialiser nos&#160;<b>souvenirs</b>&#160;et&#160;nos&#160;<b>émotions vécues</b></span>
          </div>
          <span
            class="link-about mt-2 mb-4 w-[10%] border-t-2 border-current sm:mt-[1vw] sm:mb-[2vw] md:border-t-[3px]"
          />
          <span>
            <NuxtLink
              to="/about"
              class="link-about group relative flex content-center justify-center"
            >
              <span
                class="baron text-center text-[16.864px] lg:text-[1.7vw] 2xl:text-[28.56px]"
              >À propos de Benjamin</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="arrow-button right-[-12%]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.707 3.29297C18 10 11.707 3.29297 18 10C11.707 16.707 18 10 11.707 16.707C11 15.9999 11 15.9999 10.293 15.293L14.586 11H3C3 9.99994 3.00001 9.99994 3 8.99997H14.586L10.293 4.70697C11 3.99993 11 3.99993 11.707 3.29297Z"
                  clip-rule="evenodd"
                />
              </svg>
            </NuxtLink>
          </span>
        </div>
      </div>
    </div>

    <!-- GALERIE SECTION -->
    <div id="galeriesection" class="py-[10vw] lg:py-[10vh]">
      <div
        class="m-w-[2500px] relative m-auto grid grid-cols-[repeat(11,_1fr)] items-start gap-0 px-[5vw] sm:px-[10vw]"
      >
        <div
          id="carousel-title"
          class="col-start-1 col-end-10 row-span-1 grid max-w-[650px] justify-items-start sm:col-start-7 sm:col-end-12"
        >
          <span
            class="baron w-full cursor-text overflow-hidden text-[11.904px] lg:text-[1.2vw] 2xl:text-[20.16px]"
          >
            <p id="span-portfolio">mes photographies</p>
          </span>
          <span
            id="word-portfolio"
            class="w-full cursor-text text-[27.776px] font-thin lg:text-[2.8vw] 2xl:text-[47.04px]"
          >Paysage / Mariage / Portrait / Nature / Architecture /
            Astrophotographie</span>
          <span
            class="link-portfolio mt-2 mb-4 w-[20%] border-t-2 border-current sm:mt-[1vw] sm:mb-[2vw] md:border-t-[3px]"
          />
          <span>
            <NuxtLink
              to="./gallery"
              class="link-portfolio group relative flex content-center justify-center"
            >
              <span
                class="baron text-center text-[16.864px] lg:text-[1.7vw] 2xl:text-[28.56px]"
              >voir la galerie</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="arrow-button right-[-18%]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.707 3.29297C18 10 11.707 3.29297 18 10C11.707 16.707 18 10 11.707 16.707C11 15.9999 11 15.9999 10.293 15.293L14.586 11H3C3 9.99994 3.00001 9.99994 3 8.99997H14.586L10.293 4.70697C11 3.99993 11 3.99993 11.707 3.29297Z"
                  clip-rule="evenodd"
                />
              </svg>
            </NuxtLink>
          </span>
        </div>
        <div
          class="carousel-cell img-v z-[1] col-start-1 col-end-12 row-start-2 row-end-2 mt-[5vw] sm:col-end-6 sm:row-start-1 sm:row-end-1 sm:mt-0"
        >
          <nuxt-img
            src="/index-page/c-1-910w.webp"
            sizes="xl:518px, 2xl:910px"
            alt="Phare rouge de la grande jetée - Sables d'Olonne (France, 2020)"
            class="img-unit"
          />
        </div>
        <div
          class="carousel-cell img-h col-start-1 col-end-12 mt-[5vw] sm:col-start-5 sm:mt-[-1.5vw]"
        >
          <nuxt-img
            src="/index-page/c-2-1273w.webp"
            sizes="lg:518px, xl:1273px"
            alt="Coucher de Soleil Plage du Sauveterre 1 - Sables d'Olonne (France, 2020)"
            class="img-unit"
          />
        </div>
        <div
          class="carousel-cell img-h col-start-1 col-end-12 mt-[5vw] sm:col-end-8"
        >
          <nuxt-img
            src="/index-page/c-3-1273w.webp"
            sizes="lg:518px, xl:1273px"
            alt="Sortie v1 Église Notre-Dame E&E - Durtal (France, 2021)"
            class="img-unit"
          />
        </div>
        <div
          class="carousel-cell img-v z-[1] col-start-1 col-end-12 mt-[5vw] sm:col-start-7 sm:mt-[-2vw]"
        >
          <nuxt-img
            src="/index-page/c-4-910w.webp"
            sizes="xl:518px, 2xl:910px"
            alt="Remise des alliances E&E - Durtal (France, 2021)"
            class="img-unit"
          />
        </div>
        <div
          class="carousel-cell img-v z-[1] col-start-1 col-end-12 mt-[5vw] sm:col-end-6 sm:mt-[-15vw]"
        >
          <nuxt-img
            src="/index-page/c-5-910w.webp"
            sizes="xl:518px, 2xl:910px"
            alt="Portrait LO - Marrakech (Maroc, 2018)"
            class="img-unit"
          />
        </div>
        <div
          class="carousel-cell img-h col-start-1 col-end-12 mt-[5vw] sm:col-start-5 sm:mt-[-15vw]"
        >
          <nuxt-img
            src="/index-page/c-6-1273w.webp"
            sizes="lg:518px, xl:1273px"
            alt="Portrait AO Souk - Marrakech (Maroc, 2018)"
            class="img-unit"
          />
        </div>
        <div
          class="carousel-cell img-h col-start-1 col-end-12 mt-[5vw] sm:col-start-5 sm:mt-[10vw]"
        >
          <nuxt-img
            src="/index-page/c-7-1273w.webp"
            sizes="lg:518px, xl:1273px"
            alt="Martin-pêcheur d'Europe - Le Gorgeais (France, 2020)"
            class="img-unit"
          />
        </div>
        <div
          class="carousel-cell img-v z-[1] col-start-1 col-end-12 mt-[5vw] sm:col-end-6 sm:mt-[-20vw]"
        >
          <nuxt-img
            src="/index-page/c-8-910w.webp"
            sizes="xl:518px, 2xl:910px"
            alt="Colibri - Clearwater (Canada, 2019)"
            class="img-unit"
          />
        </div>
        <div
          class="carousel-cell img-v z-[1] col-start-1 col-end-12 mt-[5vw] sm:col-start-7 sm:mt-[10vw]"
        >
          <nuxt-img
            src="/index-page/c-9-910w.webp"
            sizes="xl:518px, 2xl:910px"
            alt="Immeuble en bord de mer - Aarhus (Danemark, 2020)"
            class="img-unit"
          />
        </div>
        <div
          class="carousel-cell img-h col-start-1 col-end-12 mt-[5vw] sm:col-end-8 sm:mt-[-10vw]"
        >
          <nuxt-img
            src="/index-page/c-10-1273w.webp"
            sizes="lg:518px, xl:1273px"
            alt="Bâtiments Souk - Marrakech (Maroc, 2018)"
            class="img-unit"
          />
        </div>
        <div
          class="carousel-cell img-h z-[1] col-start-1 col-end-12 mt-[5vw] sm:col-start-5 sm:mt-[7vw]"
        >
          <nuxt-img
            src="/index-page/c-11-1273w.webp"
            sizes="lg:518px, xl:1273px"
            alt="Voie lactée + galaxie andromède - Saint-Mesmin (France, 2019)"
            class="img-unit"
          />
        </div>
        <div
          class="carousel-cell img-v col-start-1 col-end-12 mt-[5vw] sm:col-end-6 sm:mt-[-15vw]"
        >
          <nuxt-img
            src="/index-page/c-12-910w.webp"
            sizes="xl:518px, 2xl:910px"
            alt="Comète C/2020 F3 Neowise - Saint-Mathurin (France, 2020)"
            class="img-unit"
          />
        </div>
      </div>
    </div>
    <!-- CONTACT SECTION -->
    <TheForm />
  </div>
</template>
