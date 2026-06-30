'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import styles from './Nav.module.css'

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

  return (
    <nav className={`${styles.nav} ${visible ? styles.visible : styles.hidden}`}>
      <Link href="/" className={styles.logo}>Savanna Rising</Link>

      <ul className={`${styles.links} ${open ? styles.open : ''}`}>
        <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
        <li><Link href="/programmes" onClick={() => setOpen(false)}>Programmes</Link></li>
        <li><Link href="/impact" onClick={() => setOpen(false)}>Impact</Link></li>
        <li><Link href="/news" onClick={() => setOpen(false)}>News</Link></li>
        <li><Link href="/get-involved" onClick={() => setOpen(false)}>Get involved</Link></li>
      </ul>

      <Link href="/get-involved#donate" className={styles.cta}>Donate</Link>

      <button
        className={styles.burger}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}