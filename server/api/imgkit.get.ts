import { Buffer } from 'node:buffer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const privateKey = config.imagekitApi

  if (!privateKey) {
    console.error('DEBUG: Liste des clés dispos dans runtimeConfig :', Object.keys(config))
    throw createError({
      statusCode: 500,
      statusMessage: `Clé introuvable. Clés dispos: ${Object.keys(config).join(', ')}`,
    })
  }

  try {
    const b64Token = Buffer.from(`${privateKey}:`).toString('base64')

    const response = await $fetch<any[]>('https://api.imagekit.io/v1/files', {
      headers: {
        Authorization: `Basic ${b64Token}`,
      },
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
  catch (error: any) {
    console.error('Erreur ImageKit:', error.data || error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: 'Erreur ImageKit API',
    })
  }
})
