import styles from './ProgrammesHeader.module.css'

export default function ProgrammesHeader() {
  return (
    <section className={styles.header}>
      <p className={styles.label}>Programmes</p>
      <h1 className={styles.title}>Three commitments.<br />One living idea.</h1>
      <p className={styles.sub}>
        By integrating athletics, environmental stewardship, and cultural heritage, our initiatives build strong leaders and resilient communities across Kenya.
      </p>
      <div className={styles.anchors}>
        <a href="#sport" className={styles.anchor}>Sport</a>
        <a href="#conservation" className={styles.anchor}>Conservation</a>
        <a href="#culture" className={styles.anchor}>Culture</a>
        <a href="#schools" className={styles.anchor}>Schools</a>
      </div>
    </section>
  )
}