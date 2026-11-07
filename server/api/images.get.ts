/**
 * GET /api/images?folder=galerie-page
 *
 * Renvoie les images d'un dossier ImageKit, triées par nom (ordre croissant).
 * Sans paramètre `folder`, renvoie toutes les images.
 */
export default defineEventHandler(async (event) => {
  const { folder } = getQuery(event)
  const images = await listImageKitFiles(event)

  if (typeof folder !== 'string' || !folder)
    return images

  return images.filter(image => image.filePath.startsWith(`/${folder}/`))
})
