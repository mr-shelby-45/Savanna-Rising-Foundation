import styles from './ImpactHeader.module.css'

export default function ImpactHeader() {
  return (
    <section className={styles.header}>
      <p className={styles.label}>Impact</p>
      <h1 className={styles.title}>The work in numbers<br />and stories.</h1>
      <p className={styles.sub}>
        We measure what matters — youth reached, trees planted, communities
        gathered, traditions documented. Here is what the work looks like on the ground.
      </p>
    </section>
  )
}