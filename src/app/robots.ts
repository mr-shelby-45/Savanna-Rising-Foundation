import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savanna-rising-foundation.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Studio is the Sanity CMS admin UI - no reason for it to be
      // crawled/indexed, and the API routes aren't content pages.
      disallow: ['/studio', '/api'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
