'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import styles from './Nav.module.css'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Impact', href: '/impact' },
  { label: 'News', href: '/news' },
  { label: 'Get involved', href: '/get-involved' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < 200) {
        setVisible(true)
      } else if (currentY > lastY.current + 8) {
        setVisible(false)
      } else if (currentY < lastY.current - 8) {
        setVisible(true)
      }
      lastY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav className={`${styles.nav} ${visible ? styles.visible : styles.hidden}`}>
        <Link href="/" className={styles.logo}>Savanna Rising</Link>

        <ul className={styles.desktopLinks}>
          {links.map(l => (
            <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
          ))}
        </ul>

        <div className={styles.navRight}>
          <Link href="/get-involved#donate" className={styles.cta}>Donate</Link>
          <button
            className={styles.burger}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
        onClick={() => setOpen(false)}
      />

      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}>
        <div className={styles.overlayTop}>
          <Link href="/" className={styles.overlayLogo} onClick={() => setOpen(false)}>
            <span className={styles.overlayFullLabel}>Savanna Rising</span>
            <span className={styles.overlayShortLabel}>Home</span>
          </Link>
          <button
            className={styles.closeBtn}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <ul className={styles.overlayLinks}>
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={styles.overlayLink}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.overlayBottom}>
          <Link
            href="/get-involved#donate"
            className={styles.overlayDonate}
            onClick={() => setOpen(false)}
          >
            Donate
          </Link>
        </div>
      </div>
    </>
  )
}
