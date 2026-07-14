import Image from 'next/image'
import styles from './Story.module.css'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { featuredStoriesQuery } from '@/lib/queries'

type FeaturedStory = {
  _id: string
  name: string
  location?: string
  quote: string
  photo?: { asset?: { url?: string }; alt?: string }
}

export default async function Story() {
  const [story] = await sanityFetch<FeaturedStory[]>(featuredStoriesQuery)

  if (!story) return null

  return (
    <section className={styles.story}>
      <div className={styles.img}>
        {story.photo?.asset?.url ? (
          <Image
            src={urlFor(story.photo).width(1200).height(1200).url()}
            alt={story.photo.alt || story.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className={styles.imgPlaceholder} />
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.label}>From the pitch</p>
        <blockquote className={styles.quote}>{story.quote}</blockquote>
        <p className={styles.attr}>{story.name}{story.location ? ` — ${story.location}` : ''}</p>
      </div>
    </section>
  )
}
