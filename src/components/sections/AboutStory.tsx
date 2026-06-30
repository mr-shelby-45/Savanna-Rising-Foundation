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
            Sport has a language that every young Kenyan speaks. It draws people in before
            they know anything is being offered — and once they are in, everything becomes
            possible. Savanna Rising Foundation was built around that truth. We run football
            and rugby programmes because the game is worth running for its own sake — and
            because of what it reveals in the people who play it.
          </p>
          <p className={styles.body}>
            But we have always noticed something. A young person standing on a pitch is
            standing on more than grass. They are standing on land that has a story. On
            traditions that shaped the way their community moves, celebrates, and gathers.
            On an identity that deserves to be known and carried forward. So alongside the
            game, we tend to those things. We plant trees on match days. We bring culture
            onto the sidelines. We make the pitch a place where conservation is normal and
            heritage is celebrated — because in Kenya, all of it is connected anyway.
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