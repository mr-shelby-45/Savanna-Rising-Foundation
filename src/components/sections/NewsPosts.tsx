import styles from './NewsPosts.module.css'
import { sanityFetch } from '@/lib/sanity'
import { postsQuery } from '@/lib/queries'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  pillar?: string
}

function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

export default async function NewsPosts() {
  const posts = await sanityFetch<Post[]>(postsQuery)

  if (!posts || posts.length === 0) return null

  return (
    <section className={styles.section}>
      <p className={styles.label}>Latest</p>
      <div className={styles.list}>
        {posts.map((post) => (
          <a key={post._id} href={`/news/${post.slug.current}`} className={styles.post}>
            <div className={styles.postMeta}>
              <span className={styles.pillarTag}>{post.pillar}</span>
              <span className={styles.date}>{formatPostDate(post.publishedAt)}</span>
            </div>
            <div className={styles.postContent}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              {post.excerpt && <p className={styles.postExcerpt}>{post.excerpt}</p>}
            </div>
            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </section>
  )
}