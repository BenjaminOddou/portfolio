/** Pages référencées dans le plan du site */
const PAGES = ['/', '/gallery', '/about']

/**
 * GET /sitemap.xml — plan du site pour les moteurs de recherche.
 * Format : https://www.sitemaps.org/protocol.html
 */
export default defineEventHandler((event) => {
  const lastModified = new Date().toISOString()

  const urls = PAGES.map(path => `  <url>
    <loc>${SITE.url}${path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`)

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
})
