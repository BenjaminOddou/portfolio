import type { H3Event } from 'h3'

/**
 * Liste toutes les images du compte ImageKit (jusqu'à 1000).
 * Le résultat est mis en cache 10 minutes : l'API ImageKit n'est donc pas
 * appelée à chaque visite (le cache est rafraîchi en arrière-plan).
 * Doc : https://imagekit.io/docs/api-reference/digital-asset-management-dam/list-and-search-assets
 */
export const listImageKitFiles = defineCachedFunction(async (event: H3Event): Promise<SiteImage[]> => {
  const { imagekitApi } = useRuntimeConfig(event)
  if (!imagekitApi) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Clé ImageKit manquante : définissez IMAGEKIT_API (ou NUXT_IMAGEKIT_API en production).',
    })
  }

  // Authentification « Basic » : clé privée suivie de « : », encodée en base64
  const token = btoa(`${imagekitApi}:`)
  const files = await $fetch<SiteImage[]>('https://api.imagekit.io/v1/files', {
    headers: { Authorization: `Basic ${token}` },
    query: { limit: 1000 },
  }).catch(() => {
    throw createError({ statusCode: 502, statusMessage: 'Erreur API ImageKit' })
  })

  // On ne garde que les champs utilisés par le site, triés par nom
  return files
    .map(({ name, filePath, tags, width, height, url }) => ({
      name,
      filePath,
      tags,
      width,
      height,
      url,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}, {
  name: 'imagekit-files',
  getKey: () => 'all',
  maxAge: 60 * 10,
})
