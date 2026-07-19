import Image from 'next/image'
import { PortableText, type PortableTextComponents, type PortableTextBlock } from '@portabletext/react'
import styles from './NewsArticle.module.css'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { postBySlugQuery } from '@/lib/queries'

type Post = {
  _id: string
  title: string
  publishedAt: string
  pillar?: string
  body?: PortableTextBlock[]
  coverImage?: { asset?: { url?: string }; alt?: string }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Sanity's body field allows inline images alongside text blocks - this
// tells PortableText how to render that image type (it only knows text
// blocks by default).
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <div className={styles.inlineImageWrap}>
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ''}
            width={1200}
            height={800}
            className={styles.inlineImage}
          />
        </div>
      )
    },
  },
}

export default async function NewsArticle({ slug }: { slug: string }) {
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug })

  if (!post) return null

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        {post.pillar && <p className={styles.pillar}>{post.pillar}</p>}
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.date}>{formatDate(post.publishedAt)}</p>
      </div>

      {post.coverImage?.asset?.url && (
        <div className={styles.coverWrap}>
          <Image
            src={urlFor(post.coverImage).width(1600).url()}
            alt={post.coverImage.alt || post.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}

      {post.body && (
        <div className={styles.body}>
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      )}
    </article>
  )
}
