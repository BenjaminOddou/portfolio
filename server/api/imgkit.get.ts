// server/api/imgkit.get.ts
import { Buffer } from 'node:buffer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const privateKey = config.imagekitApi

  if (!privateKey) {
    console.error('ERREUR : La variable imagekitApi est indefinie.')
    throw createError({
      statusCode: 500,
      statusMessage: 'Configuration serveur incorrecte (Cle manquante).',
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
    console.error('Erreur API ImageKit:', error.data || error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: 'Erreur lors de la communication avec ImageKit.',
    })
  }
})
