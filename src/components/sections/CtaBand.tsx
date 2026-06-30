import Link from 'next/link'
import styles from './CtaBand.module.css'

export default function CtaBand() {
  return (
    <section className={styles.band}>
      <p className={styles.line}>
        Sport is how we show up.<br />
        <span>Be part of what comes next.</span>
      </p>
      <Link href="/get-involved" className={styles.btn}>Join the movement</Link>
    </section>
  )
}
