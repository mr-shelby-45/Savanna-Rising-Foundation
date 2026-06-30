import styles from './AboutHeader.module.css'

export default function AboutHeader() {
  return (
    <section className={styles.header}>
      <p className={styles.label}>About us</p>
      <h1 className={styles.title}>Built from the grassroots.<br />Built through sport.</h1>
    </section>
  )
}