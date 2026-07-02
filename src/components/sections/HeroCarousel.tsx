'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import styles from './HeroCarousel.module.css'
import Image from 'next/image'
import slide1 from '../../../public/images/carousel-1.jpg'
import slide2 from '../../../public/images/carousel-2.jpg'
import slide3 from '../../../public/images/carousel-3.jpg'
import slide4 from '../../../public/images/carousel-4.jpg'
import slide5 from '../../../public/images/carousel-5.jpg'


const slides = [
  {
    id: 1,
    label: null,
    caption: null,
    isHero: true,
    src: slide1
  },
  {
    id: 2,
    label: 'Sport',
    caption: 'Saturday league, Nakuru',
    isHero: false,
    src: slide2
  },
  {
    id: 3,
    label: 'Conservation',
    caption: 'Tree planting after match day',
    isHero: false,
    src: slide3
  },
  {
    id: 4,
    label: 'Culture',
    caption: 'Heritage tournament, Nairobi',
    isHero: false,
    src: slide4
  },
  {
    id: 5,
    label: 'Sport',
    caption: 'Girls coaching programme',
    isHero: false,
    src: slide5
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length)
  }, [])

  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 2500)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero and community photo carousel"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${i === current ? styles.active : ''}`}
          aria-hidden={i !== current}
        >
          {slide.src ? (
            <Image
              src={slide.src}
              alt={slide.caption ?? ''}
              fill
              style={{ objectFit: 'cover' }}
              priority={i === 0}
            />
          ) : (
            <div className={styles.imgPlaceholder} />
          )}
          <div className={styles.overlay} />

          {slide.isHero ? (
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Nairobi · Nakuru · Kenya</p>
              <h1 className={styles.headline}>
                The pitch is<br />where it
                <span className={styles.accent}> starts.</span>
              </h1>
              <div className={styles.rule} />
              <p className={styles.sub}>
                We use football and rugby to build young Kenyans who know who they are,
                care for the land they live on, and carry their communities forward.
              </p>
              <div className={styles.actions}>
                <Link href="/get-involved" className={styles.btnPrimary}>Join the movement</Link>
                <Link href="/about" className={styles.btnGhost}>See what we're building</Link>
              </div>
            </div>
          ) : (
            <div className={styles.caption}>
              <span className={styles.captionLabel}>{slide.label}</span>
              <span className={styles.captionText}>{slide.caption}</span>
            </div>
          )}
        </div>
      ))}

      <button className={`${styles.arrow} ${styles.arrowPrev}`} onClick={prev} aria-label="Previous slide">←</button>
      <button className={`${styles.arrow} ${styles.arrowNext}`} onClick={next} aria-label="Next slide">→</button>

      <div className={styles.dots} role="tablist">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === current}
            role="tab"
          />
        ))}
      </div>
    </section>
  )
}