import styles from './AboutStory.module.css'

export default function AboutStory() {
  return (
    <section className={styles.story}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <p className={styles.label}>Our story</p>
        </div>
        <div className={styles.col}>
          <p className={styles.body}>
            Sport speaks a language every young Kenyan understands. It draws people in naturally—and once they are on the pitch, real transformation begins.
          </p>
          <p className={styles.body}>
            A young athlete on a pitch stands on more than grass; they stand on land with a story, traditions, and an identity that deserves to be carried forward. Alongside the game, we tend to these things. We plant trees on match days and bring culture to the sidelines. We make the pitch a place where conservation is normal and heritage is celebrated—because in Kenya, it is all connected
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