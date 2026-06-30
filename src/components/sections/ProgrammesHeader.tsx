import styles from './ProgrammesHeader.module.css'

export default function ProgrammesHeader() {
  return (
    <section className={styles.header}>
      <p className={styles.label}>Programmes</p>
      <h1 className={styles.title}>Three commitments.<br />One living idea.</h1>
      <p className={styles.sub}>
        Every programme we run connects back to the same belief — that sport, done well,
        opens a door. What we build through that door is community, conservation, and culture.
      </p>
    </section>
  )
}