<script setup lang="ts">
import Botpoison from '@botpoison/browser'
const { $gsap: gsap } = useNuxtApp()

const alertMessage = alertStore()
const config = useRuntimeConfig()
const botpoison = new Botpoison({
  publicKey: config.public.BOTPOISON_PK,
})
const loading = ref(false)
const checked = ref(false)
const Prénom = ref('')
const Nom = ref('')
const Mail = ref('')
const Objet = ref('')
const Message = ref('')

const submitForm = async () => {
  loading.value = true
  try {
    const { solution } = await botpoison.challenge()
    await $fetch(config.public.FORMSPARK_ACTION_URL, {
      method: 'POST',
      body: {
        Prénom: Prénom.value,
        Nom: Nom.value,
        Mail: Mail.value,
        Objet: Objet.value,
        Message: Message.value,
        _botpoison: solution,
      },
    })
    Prénom.value = ''
    Nom.value = ''
    Mail.value = ''
    Objet.value = ''
    Message.value = ''
    checked.value = false
    alertMessage.$patch({
      header: 'Message reçu',
      content: 'Le formulaire a bien été transmis ✅',
      color: 'teal',
      delay: 7000,
      isAlert: true,
    })
  }
  catch {
    alertMessage.$patch({
      header: 'Oups...',
      content: 'Le message a été perdu en chemin 🚨',
      color: 'red',
      delay: 7000,
      isAlert: true,
    })
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  // Animation Contact Section
  const stars = document.querySelectorAll<HTMLParagraphElement>(
    '.stars:not(#last-star)',
  )
  const boxAnima = document.querySelectorAll<HTMLDivElement>('.box-animation')
  const boxAnima2
    = document.querySelectorAll<HTMLDivElement>('.box-animation_2')
  const placeHolders = document.querySelectorAll<HTMLElement>(
    'input[type=\'email\'], input[type=\'text\'], textarea, select',
  )

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#contact-container',
        start: 'top 100%',
        toggleActions: 'play none none reset',
      },
    })
    .from(
      '#title-contact',
      {
        yPercent: 100,
        duration: 0.7,
        delay: 0.2,
        ease: 'power4.out',
      },
    )
    .from(
      '#subtitle-contact',
      {
        yPercent: 100,
        duration: 0.7,
        ease: 'power4.out',
      },
      '<+=0.2',
    )
    .from(
      stars,
      {
        autoAlpha: 0,
        scale: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      },
      '<+=0.5',
    )
    .fromTo(
      boxAnima2,
      {
        width: '0%',
      },
      {
        width: '100%',
        duration: 1.5,
        stagger: 0.1,
        ease: 'power4.out',
      },
      0.5,
    )
    .fromTo(
      boxAnima,
      {
        width: '0%',
      },
      {
        width: '100%',
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
      },
      '<+=0.1',
    )
    .from(
      placeHolders,
      {
        autoAlpha: 0,
        duration: 1,
        ease: 'power4.out',
      },
      '>-=0.5',
    )
    .from(
      '#RGPD',
      {
        yPercent: 100,
        duration: 0.7,
        ease: 'power4.out',
      },
      '<-=0.2',
    )
    .from(
      '#last-star, #check',
      {
        autoAlpha: 0,
        scale: 0,
        duration: 1,
        stagger: 0.5,
        ease: 'power3.out',
      },
      '<+=0.2',
    )
    .from(
      '#label-check',
      {
        yPercent: 100,
        duration: 0.7,
        ease: 'power4.out',
      },
      '<+=0.7',
    )
    .from(
      '#submit-button',
      {
        autoAlpha: 0,
        scale: 0.7,
        duration: 1,
        ease: 'back.out(1.4)',
      },
      '<+=0.2',
    )
})
</script>

<template>
  <div
    id="formsection"
    class="mx-auto mb-0 grid max-w-[2500px] px-[10vw] pt-[10vh] pb-0 lg:mx-auto lg:mb-0"
  >
    <div
      id="contact-container"
      class="m-auto mb-[5vh] grid w-11/12 justify-items-center md:w-4/5"
    >
      <form class="relative w-full" @submit.prevent="submitForm()">
        <div class="overflow-hidden">
          <div
            id="title-contact"
            class="baron cursor-text text-[24.775px] lg:text-[2.5vw] 2xl:text-[42px]"
          >
            me contacter
          </div>
        </div>
        <div class="mx-0 mt-0 mb-8 flex flex-wrap overflow-hidden">
          <div id="subtitle-contact" class="cursor-text">
            Champs Obligatoires
          </div>
          <p class="stars ml-1">
            *
          </p>
        </div>
        <div class="relative mt-3 flex space-x-5">
          <div class="relative z-0 w-full">
            <input v-model="Prénom" type="text" placeholder="Prénom" required>
            <div class="box-animation_2" />
          </div>
          <p class="stars absolute right-1/2">
            *
          </p>
          <div class="relative z-0 w-full">
            <input v-model="Nom" type="text" placeholder="Nom">
            <div class="box-animation_2" />
          </div>
        </div>
        <div class="relative mt-3 flex">
          <div class="box-animation">
            <input
              v-model="Mail"
              type="email"
              placeholder="Adresse Mail"
              required
            >
          </div>
          <p class="stars absolute -right-2.5">
            *
          </p>
        </div>
        <div class="relative mt-3 flex">
          <div class="box-animation">
            <select v-model="Objet" required>
              <option disabled value="">
                Objet
              </option>
              <option value="Mariage / Évènement">
                Mariage / Évènement
              </option>
              <option value="Portrait Entreprise">
                Portrait Entreprise
              </option>
              <option value="Séance Couple">
                Séance Couple
              </option>
              <option value="Séance Solo">
                Séance Solo
              </option>
              <option value="Autres Demandes">
                Autres
              </option>
            </select>
          </div>
          <p class="stars absolute -right-2.5">
            *
          </p>
        </div>
        <div class="relative mt-3 flex">
          <div class="box-animation">
            <textarea
              v-model="Message"
              cols="10"
              rows="7"
              placeholder="Message"
              required
            />
          </div>
          <p class="stars absolute -right-2.5">
            *
          </p>
        </div>
        <div class="mx-0 mb-0 mt-8 flex flex-wrap overflow-hidden">
          <p id="RGPD" class="font-bold">
            Conformité RGPD
          </p>
          <p id="last-star" class="stars ml-1">
            *
          </p>
        </div>
        <div class="relative mx-0 mt-2 mb-4 flex items-center overflow-hidden">
          <input id="check" v-model="checked" type="checkbox" required>
          <label id="label-check" class="ml-2 cursor-pointer" for="check">
            Je consens à transmettre mes informations à : Benjamin Oddou
          </label>
        </div>
        <div id="submit-button" class="mx-0 mb-0 mt-6">
          <input
            type="submit"
            :disabled="loading"
            :value="loading ? 'Envoi en cours...' : 'Envoyer'"
            class="button flex w-full cursor-pointer justify-center p-2 disabled:pointer-events-none disabled:bg-light-lavender dark:disabled:pointer-events-none dark:disabled:bg-light-orange"
          >
        </div>
      </form>
    </div>

    <TheFooter />
  </div>
</template>

<style scoped>
html.dark select {
  --classic-color: white;
}

html:not(.dark) select {
  --classic-color: #2a2a2a;
}

select {
  background-image: linear-gradient(
      45deg,
      transparent 50%,
      var(--classic-color) 50%
    ),
    linear-gradient(135deg, var(--classic-color) 50%, transparent 50%),
    linear-gradient(to right, var(--classic-color), var(--classic-color));
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
}

select:focus {
  background-image: linear-gradient(
      45deg,
      var(--classic-color) 50%,
      transparent 50%
    ),
    linear-gradient(135deg, transparent 50%, var(--classic-color) 50%),
    linear-gradient(to right, var(--classic-color), var(--classic-color));
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  outline: 0;
}

input[type='checkbox']::after {
  content: '';
  mask: url('../assets/svg/checkmark.svg') 0px 1px;
  height: 15px;
  width: 15px;
}
</style>
