import styles from './ImpactStories.module.css'

const stories = [
  {
    name: 'Wanjiku M.',
    location: 'Nakuru, age 19',
    pillar: 'Sport',
    quote: 'The game gave me structure. What happened around it gave me purpose.',
    full: 'Wanjiku joined the Girls in the Game programme in 2024. Within one season she had completed her junior coaching certification and was running warm-up sessions for the under-14 group. She is now training to become a qualified referee.',
  },
  {
    name: 'James O.',
    location: 'Nakuru, age 24',
    pillar: 'Conservation',
    quote: 'I never thought about the trees until we planted them together. Now I notice every one that is missing.',
    full: 'James has been a volunteer coach with Savanna Rising since the foundation\'s first season. He led the tree planting drive at the 2024 tournament series, coordinating over 80 players and family members across two match days.',
  },
  {
    name: 'Margaret A.',
    location: 'Nakuru, age 52',
    pillar: 'Culture',
    quote: 'When the children asked me to teach them the old games, I knew something was changing.',
    full: 'Margaret is one of the elders who joined the Heritage Match Day programme as a cultural advisor. She has since documented three traditional games from her community and trained junior coaches to run them alongside the main league sessions.',
  },
]

export default function ImpactStories() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>From the pitch</p>
        <h2 className={styles.title}>The people behind the numbers</h2>
      </div>
      {stories.map((story, i) => (
        <div key={i} className={`${styles.story} ${i % 2 !== 0 ? styles.storyReverse : ''}`}>
          <div className={styles.storyImg}>
            <div className={styles.imgPlaceholder} />
            <div className={styles.imgOverlay} />
            <div className={styles.imgCaption}>
              <span className={styles.imgPillar}>{story.pillar}</span>
            </div>
          </div>
          <div className={styles.storyContent}>
            <blockquote className={styles.quote}>{story.quote}</blockquote>
            <p className={styles.storyBody}>{story.full}</p>
            <p className={styles.attr}>{story.name} — {story.location}</p>
          </div>
        </div>
      ))}
    </section>
  )
}