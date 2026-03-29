import { Buffer } from 'node:buffer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const privateKey = config.imagekitApi

  if (!privateKey || privateKey.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: `La clé 'imagekitApi' est présente mais VIDE. Vérifiez NUXT_IMAGEKIT_API sur Netlify.`,
    })
  }

  try {
    const b64Token = Buffer.from(`${privateKey}:`).toString('base64')
    const response = await $fetch<any[]>('https://api.imagekit.io/v1/files', {
      headers: { Authorization: `Basic ${b64Token}` },
    })

    return response.map(item => ({
      name: item.name,
      filePath: item.filePath,
      tags: item.tags,
      width: item.width,
      height: item.height,
      url: item.url,
    }))
  }
  catch {
    throw createError({ statusCode: 500, statusMessage: 'Erreur API ImageKit' })
  }
})
