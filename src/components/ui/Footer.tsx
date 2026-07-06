import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <p className={styles.brand}>Mwenda Kimathi Foundation</p>
          <p className={styles.tagline}>Sport is how we show up.<br />Community is what we build.</p>
        </div>
        <div>
          <p className={styles.colTitle}>Foundation</p>
          <ul className={styles.links}>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/about#team">Our team</Link></li>
            <li><Link href="/about#governance">Governance</Link></li>
            <li><Link href="/impact#reports">Annual reports</Link></li>
          </ul>
        </div>
        <div>
          <p className={styles.colTitle}>Programmes</p>
          <ul className={styles.links}>
            <li><Link href="/programmes#sport">Sport</Link></li>
            <li><Link href="/programmes#conservation">Conservation</Link></li>
            <li><Link href="/programmes#culture">Culture</Link></li>
            <li><Link href="/programmes#schools">Schools</Link></li>
          </ul>
        </div>
        <div>
          <p className={styles.colTitle}>Get involved</p>
          <ul className={styles.links}>
            <li><Link href="/get-involved#donate">Donate</Link></li>
            <li><Link href="/get-involved#volunteer">Volunteer</Link></li>
            <li><Link href="/get-involved#partner">Partner with us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.copy}>© 2025 Mwenda Kimathi Foundation. All rights reserved.</p>
        <p className={styles.reg}>Registered PBO · Kenya</p>
      </div>
    </footer>
  )
}
