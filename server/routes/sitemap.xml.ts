import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(() => {
  const sitemap = new SitemapStream({
    hostname: 'https://www.benjaminoddou-photographe.com',
    lastmodDateOnly: false
  })

  // Alternatively create array of objects like so : const endpoints = [{url: '/', changefreq: 'weekly'}, {url: '/gallery', changefreq: 'monthly'}, ...]
  const endpoints = ['/', '/gallery', '/about']
  const changeFreq = 'weekly'
  const Priority = 0.9
  const date = new Date().toISOString()

  // If using array of objects, reference them as like so : url: enpoint.url, changefreq: endpoint.changefreq
  for (const endpoint of endpoints) {
    sitemap.write({
      url: endpoint,
      changefreq: changeFreq,
      priority: Priority,
      lastmod: date
    })
  }

  sitemap.end()
  return streamToPromise(sitemap)
})
