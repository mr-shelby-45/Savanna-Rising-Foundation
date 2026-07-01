import styles from './ContactHeader.module.css'

export default function ContactHeader() {
  return (
    <section className={styles.header}>
      <p className={styles.label}>Contact</p>
      <h1 className={styles.title}>Get in touch.</h1>
    </section>
  )
}