import { notFound } from 'next/navigation'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import NewsArticle from '@/components/sections/NewsArticle'
import { sanityFetch } from '@/lib/sanity'
import { postBySlugQuery } from '@/lib/queries'

type Post = {
  title: string
  excerpt?: string
}

// Next.js 15+ passes route params as a Promise.
type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug })

  if (!post) {
    return { title: 'Not found — Mwenda Kimathi Foundation' }
  }

  return {
    title: `${post.title} — Mwenda Kimathi Foundation`,
    description: post.excerpt,
  }
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params

  // Fetch once here just to decide whether to 404 - NewsArticle does its
  // own fetch for the actual render, deduped automatically by Next.js
  // since it's the same query + params within one request.
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug })

  if (!post) {
    notFound()
  }

  return (
    <>
      <Nav />
      <main>
        <NewsArticle slug={slug} />
      </main>
      <Footer />
    </>
  )
}
