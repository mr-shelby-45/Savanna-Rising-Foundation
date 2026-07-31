import styles from './AboutWhoWeAre.module.css'

export default function AboutWhoWeAre() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <p className={styles.label}>Who we are</p>
        </div>
        <div className={styles.col}>
          <p className={styles.body}>
            The Mwenda Kimathi Foundation is a community-based organisation rooted in
            Kibirichia and the surrounding areas of Buuri, Meru County. We believe strong
            communities are built when people are connected to their culture, to each
            other, and to the environment. Our work brings that belief to life through
            sports coaching, cultural games and festivals, local arts, and environmental
            conservation — creating safe spaces where young people can learn skills,
            celebrate heritage, protect the land, and build pride in where they're from.
          </p>
          <p className={`${styles.body} ${styles.closing}`}>
            We not only care about the wins on the pitch. We care about what sport does
            to a young person's sense of themselves — and what a changed young person does
            to a community. That is the work. That has always been the work.
          </p>
        </div>
      </div>
    </section>
  )
}
