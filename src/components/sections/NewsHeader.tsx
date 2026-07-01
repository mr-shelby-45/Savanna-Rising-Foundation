import styles from './NewsHeader.module.css'

export default function NewsHeader() {
  return (
    <section className={styles.header}>
      <p className={styles.label}>News & events</p>
      <h1 className={styles.title}>Latest from the pitch<br />and the community.</h1>
    </section>
  )
}