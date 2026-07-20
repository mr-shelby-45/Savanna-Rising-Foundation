import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity'
import { postsQuery } from '@/lib/queries'

type Post = {
  slug: { current: string }
  publishedAt: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savanna-rising-foundation.vercel.app'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/programmes`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/impact`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/news`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/get-involved`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/contact`, changeFrequency: 'yearly', priority: 0.5 },
  ]

  // Pull real post slugs from Sanity so new articles show up in the
  // sitemap automatically without a code change every time one's published.
  let postRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await sanityFetch<Post[]>(postsQuery)
    postRoutes = (posts || []).map((post) => ({
      url: `${siteUrl}/news/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  } catch (err) {
    // If Sanity is unreachable at build time, fall back to just the
    // static routes rather than failing the whole sitemap.
    console.error('Failed to fetch posts for sitemap:', err)
  }

  return [...staticRoutes, ...postRoutes]
}
