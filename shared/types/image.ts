/** Une image hébergée sur ImageKit, telle que renvoyée par `/api/images`. */
export interface SiteImage {
  /** Nom du fichier, ex. `0042.webp` */
  name: string
  /** Chemin dans ImageKit, ex. `/galerie-page/0042.webp` */
  filePath: string
  /** Albums de l'image (`*` = toutes les images de la galerie, `large` = format panoramique) */
  tags: string[] | null
  width: number
  height: number
  /** URL de l'image originale */
  url: string
}

/** Dossiers ImageKit utilisés par le site */
export type ImageFolder = 'galerie-page' | 'navbar' | '404-page' | 'index-page' | 'about-page'
