import styles from './GetInvolvedHeader.module.css'

export default function GetInvolvedHeader() {
  return (
    <section className={styles.header}>
      <p className={styles.label}>Get involved</p>
      <h1 className={styles.title}>Sport is how we show up.<br />Be part of what comes next.</h1>
      <p className={styles.sub}>
        There are three ways to join the movement — donate to the work, volunteer your
        time, or partner with us as an organisation. Every contribution builds something real.
      </p>
      <div className={styles.anchors}>
        <a href="#donate" className={styles.anchor}>Donate</a>
        <a href="#volunteer" className={styles.anchor}>Volunteer</a>
        <a href="#partner" className={styles.anchor}>Partner with us</a>
      </div>
    </section>
  )
}