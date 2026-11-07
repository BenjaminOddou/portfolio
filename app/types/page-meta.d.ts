// Champs ajoutés à `definePageMeta()` et lus par app.vue pour le SEO
declare module '#app' {
  interface PageMeta {
    /** Titre de la page (onglet + réseaux sociaux) */
    title?: string
    /** Description pour les moteurs de recherche et les réseaux sociaux */
    description?: string
  }
}

export {}
