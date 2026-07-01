import styles from './NewsPosts.module.css'

const posts = [
  {
    title: 'What we learned from our first season',
    excerpt: 'Twelve match days, six counties, three hundred young people. Here is what the first season of Savanna Rising taught us about what works and what we are changing.',
    date: 'February 2025',
    pillar: 'General',
    slug: 'first-season-lessons',
  },
  {
    title: 'Why we plant trees on match days',
    excerpt: 'The idea started simply — if people are already gathered, what else can we do with that energy? The answer turned out to be more powerful than we expected.',
    date: 'January 2025',
    pillar: 'Conservation',
    slug: 'trees-on-match-days',
  },
  {
    title: 'Bringing elders to the sideline',
    excerpt: 'Margaret was the first elder to agree to come. By the end of the day, she was teaching the under-14s a game her grandmother had taught her. This is what happened.',
    date: 'December 2024',
    pillar: 'Culture',
    slug: 'elders-on-the-sideline',
  },
  {
    title: 'Girls in the Game — end of season report',
    excerpt: 'Forty-two girls completed the first full season of Girls in the Game. Eight are now training as junior coaches. Here is what they said about the experience.',
    date: 'November 2024',
    pillar: 'Sport',
    slug: 'girls-in-the-game-report',
  },
]

export default function NewsPosts() {
  return (
    <section className={styles.section}>
      <p className={styles.label}>Latest</p>
      <div className={styles.list}>
        {posts.map((post, i) => (
          <a key={i} href={`/news/${post.slug}`} className={styles.post}>
            <div className={styles.postMeta}>
              <span className={styles.pillarTag}>{post.pillar}</span>
              <span className={styles.date}>{post.date}</span>
            </div>
            <div className={styles.postContent}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
            </div>
            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </section>
  )
}