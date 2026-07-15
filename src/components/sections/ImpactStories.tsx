import Image from 'next/image'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import styles from './ImpactStories.module.css'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { allStoriesQuery } from '@/lib/queries'

type Story = {
  _id: string
  name: string
  location?: string
  pillar?: string
  quote: string
  fullStory?: PortableTextBlock[]
  photo?: { asset?: { url?: string }; alt?: string }
}

export default async function ImpactStories() {
  const stories = await sanityFetch<Story[]>(allStoriesQuery)

  if (!stories || stories.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>From the pitch</p>
        <h2 className={styles.title}>The people behind the numbers</h2>
      </div>
      {stories.map((story, i) => (
        <div key={story._id} className={`${styles.story} ${i % 2 !== 0 ? styles.storyReverse : ''}`}>
          <div className={styles.storyImg}>
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
            <div className={styles.imgOverlay} />
            <div className={styles.imgCaption}>
              <span className={styles.imgPillar}>{story.pillar}</span>
            </div>
          </div>
          <div className={styles.storyContent}>
            <blockquote className={styles.quote}>{story.quote}</blockquote>
            {story.fullStory && (
              <div className={styles.storyBody}>
                <PortableText value={story.fullStory} />
              </div>
            )}
            <p className={styles.attr}>{story.name}{story.location ? ` — ${story.location}` : ''}</p>
          </div>
        </div>
      ))}
    </section>
  )
}