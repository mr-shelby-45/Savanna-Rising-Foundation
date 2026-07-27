import Link from 'next/link'
import styles from './ProgrammesCulture.module.css'

const activities = [
  {
    name: 'Intergenerational Mentorship',
    target: 'Elders, players, families',
    desc: 'Elders open tournaments with storytelling circles — not ceremony for its own sake, but the generation that remembers speaking directly to the one that\'s next.',
  },
  {
    name: 'Traditional Games & Music',
    target: 'All age groups',
    desc: 'Indigenous games and local music take the half-time break — proof that the traditions around the game are as worth showing up for as the game itself.',
  },
  {
    name: 'Heritage Preservation',
    target: 'Youth players',
    desc: 'Young athletes learn the social history of the land and communities they play in — context most of them wouldn\'t otherwise get handed.',
  },
]

export default function ProgrammesCulture() {
  return (
    <section className={styles.section} id="culture">
      <div className={styles.pillarRow}>
        <div className={styles.pillarLeft}>
          <p className={styles.number}>03</p>
          <h2 className={styles.pillarName}>Culture</h2>
        </div>
        <div className={styles.pillarRight}>
          <p className={styles.pillarDesc}>
            We bring elders to tournament sidelines. We make space for indigenous games,
            local music, and the traditions that shaped how Kenyan communities move and
            celebrate. Culture is not preserved behind glass here — it is lived, played,
            and passed on at the pitch.
          </p>
        </div>
      </div>
      <div className={styles.programmeList}>
        {activities.map((p) => (
          <div key={p.name} className={styles.programme}>
            <div className={styles.progLeft}>
              <h3 className={styles.progName}>{p.name}</h3>
              <p className={styles.progTarget}>{p.target}</p>
            </div>
            <div className={styles.progRight}>
              <p className={styles.progDesc}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/get-involved#partner" className={styles.cta}>
        Partner on a cultural event →
      </Link>
    </section>
  )
}