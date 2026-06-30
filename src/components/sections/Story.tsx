import styles from './Story.module.css'

export default function Story() {
  return (
    <section className={styles.story}>
      <div className={styles.img}>
        {/* Replace with Next.js <Image> once photography is available */}
        <span>editorial photo</span>
      </div>
      <div className={styles.content}>
        <p className={styles.label}>From the pitch</p>
        <blockquote className={styles.quote}>
          The game gave me structure. What happened around it gave me purpose.
        </blockquote>
        <p className={styles.attr}>Wanjiku M. — Nakuru, age 19</p>
      </div>
    </section>
  )
}
