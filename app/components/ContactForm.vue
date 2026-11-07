<script setup lang="ts">
/**
 * Formulaire de contact : envoi vers Formspark, protégé des robots par Botpoison.
 * Les champs apparaissent en cascade la première fois que le formulaire entre dans l'écran.
 */
const SUBJECTS = [
  { value: 'Mariage / Évènement', label: 'Mariage / Évènement' },
  { value: 'Portrait Entreprise', label: 'Portrait Entreprise' },
  { value: 'Séance Couple', label: 'Séance Couple' },
  { value: 'Séance Solo', label: 'Séance Solo' },
  { value: 'Autres Demandes', label: 'Autres' },
]

const config = useRuntimeConfig()
const { show: showAlert } = useAlert()
const consentId = useId()

function emptyForm() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
  }
}
const form = reactive(emptyForm())
const isSending = ref(false)

async function submit() {
  isSending.value = true
  try {
    // Botpoison (anti-robots) n'est téléchargé qu'au moment de l'envoi
    const { default: Botpoison } = await import('@botpoison/browser')
    const { solution } = await new Botpoison({ publicKey: config.public.botpoisonPk ?? '' }).challenge()

    // Noms des champs attendus par Formspark : ne pas les renommer
    await $fetch(config.public.formSparkActionUrl ?? '', {
      method: 'POST',
      body: {
        Prénom: form.firstName,
        Nom: form.lastName,
        Mail: form.email,
        Objet: form.subject,
        Message: form.message,
        _botpoison: solution,
      },
    })

    Object.assign(form, emptyForm())
    showAlert({ title: 'Message reçu', message: 'Le formulaire a bien été transmis ✅', tone: 'success' })
  }
  catch {
    showAlert({ title: 'Oups...', message: 'Le message a été perdu en chemin 🚨', tone: 'error' })
  }
  finally {
    isSending.value = false
  }
}
</script>

<template>
  <div id="formsection" class="mx-auto grid max-w-[2500px] px-[10vw] pt-[10vh]">
    <div v-reveal="{ start: 1, once: true }" class="m-auto mb-[5vh] grid w-11/12 justify-items-center md:w-4/5">
      <form class="relative w-full" @submit.prevent="submit">
        <!-- Titre -->
        <h2 class="overflow-hidden">
          <span class="reveal-up block font-baron text-[25px] lg:text-[2.5vw] 2xl:text-[42px]" style="--delay: 0.3s">
            me contacter
          </span>
        </h2>
        <div class="mb-8 flex overflow-hidden">
          <p class="reveal-up" style="--duration: 0.7s; --delay: 0.5s">
            Champs Obligatoires
          </p>
          <span class="star reveal-scale ml-1" style="--delay: 0.8s" aria-hidden="true">*</span>
        </div>

        <!-- Prénom / Nom -->
        <div class="relative mt-3 flex gap-5">
          <div class="field">
            <input v-model="form.firstName" type="text" placeholder="Prénom" aria-label="Prénom" required class="reveal-fade" style="--delay: 2s">
            <span class="field-border" style="--delay: 0.5s" />
          </div>
          <span class="star reveal-scale absolute right-1/2" style="--delay: 1s" aria-hidden="true">*</span>
          <div class="field">
            <input v-model="form.lastName" type="text" placeholder="Nom" aria-label="Nom" class="reveal-fade" style="--delay: 2s">
            <span class="field-border" style="--delay: 0.6s" />
          </div>
        </div>

        <!-- E-mail -->
        <div class="relative mt-3 flex">
          <div class="field">
            <input v-model="form.email" type="email" placeholder="Adresse Mail" aria-label="Adresse Mail" required class="reveal-fade" style="--delay: 2s">
            <span class="field-border" style="--delay: 0.6s" />
          </div>
          <span class="star reveal-scale absolute -right-2.5" style="--delay: 1.2s" aria-hidden="true">*</span>
        </div>

        <!-- Objet -->
        <div class="relative mt-3 flex">
          <div class="field">
            <select v-model="form.subject" aria-label="Objet" required class="subject-select reveal-fade" style="--delay: 2s">
              <option disabled value="">
                Objet
              </option>
              <option v-for="subject in SUBJECTS" :key="subject.value" :value="subject.value">
                {{ subject.label }}
              </option>
            </select>
            <span class="field-border" style="--delay: 0.8s" />
          </div>
          <span class="star reveal-scale absolute -right-2.5" style="--delay: 1.4s" aria-hidden="true">*</span>
        </div>

        <!-- Message -->
        <div class="relative mt-3 flex">
          <div class="field">
            <textarea v-model="form.message" rows="7" placeholder="Message" aria-label="Message" required class="reveal-fade" style="--delay: 2s" />
            <span class="field-border" style="--delay: 1s" />
          </div>
          <span class="star reveal-scale absolute -right-2.5" style="--delay: 1.6s" aria-hidden="true">*</span>
        </div>

        <!-- Consentement RGPD -->
        <div class="mt-8 flex overflow-hidden">
          <p class="reveal-up font-bold" style="--duration: 0.7s; --delay: 1.8s">
            Conformité RGPD
          </p>
          <span class="star reveal-scale ml-1" style="--delay: 2s" aria-hidden="true">*</span>
        </div>
        <div class="mt-2 mb-4 flex items-center overflow-hidden">
          <input :id="consentId" v-model="form.consent" type="checkbox" required class="reveal-scale" style="--ease: var(--ease-power3-out); --delay: 2.5s">
          <label :for="consentId" class="reveal-up ml-2 cursor-pointer" style="--duration: 0.7s; --delay: 2.7s">
            Je consens à transmettre mes informations à : Benjamin Oddou
          </label>
        </div>

        <!-- Envoi -->
        <div class="reveal-scale mt-6" style="--from-scale: 0.7; --ease: var(--ease-back-out); --delay: 2.9s">
          <button
            type="submit"
            :disabled="isSending"
            class="button flex w-full justify-center p-2 disabled:pointer-events-none disabled:bg-light-lavender dark:disabled:bg-light-orange"
          >
            {{ isSending ? 'Envoi en cours...' : 'Envoyer' }}
          </button>
        </div>
      </form>
    </div>

    <TheFooter />
  </div>
</template>

<style scoped>
/* Astérisque rouge des champs obligatoires */
.star {
  --ease: var(--ease-power3-out);
  display: inline-block;
  color: var(--color-red-600);
}

/* Champ : la bordure se trace de gauche à droite à l'apparition */
.field {
  position: relative;
  width: 100%;
}

.field > :is(input, select, textarea) {
  position: relative;
  z-index: 1;
}

.field-border {
  position: absolute;
  inset-block: 0;
  left: 0;
  width: 0;
  visibility: hidden;
  border: 1px solid currentColor;
  transition:
    width 1.5s var(--ease-power4-out) var(--delay),
    visibility 0s var(--delay);
}

.is-revealed .field-border {
  width: 100%;
  visibility: visible;
}

/* Flèche personnalisée de la liste « Objet » (pointe vers le haut une fois ouverte) */
.subject-select {
  --arrow: var(--color-jet);
  background-image:
    linear-gradient(45deg, transparent 50%, var(--arrow) 50%),
    linear-gradient(135deg, var(--arrow) 50%, transparent 50%),
    linear-gradient(to right, var(--arrow), var(--arrow));
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
}

:global(.dark) .subject-select {
  --arrow: var(--color-white);
}

.subject-select:focus {
  background-image:
    linear-gradient(45deg, var(--arrow) 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, var(--arrow) 50%),
    linear-gradient(to right, var(--arrow), var(--arrow));
  background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
}
</style>
