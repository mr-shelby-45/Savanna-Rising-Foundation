import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section className={styles.section}>
          <p className={styles.label}>404</p>
          <h1 className={styles.title}>This page isn&apos;t on the pitch.</h1>
          <p className={styles.desc}>
            The page you&apos;re looking for may have moved or no longer exists.
          </p>
          <Link href="/" className={styles.link}>
            Back to home →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
