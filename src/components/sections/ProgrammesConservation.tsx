import Link from 'next/link'
import styles from './ProgrammesConservation.module.css'

const activities = [
  {
    name: 'Match-Day Tree Planting',
    target: 'Players, families, communities',
    desc: 'Native trees go into the ground around the pitches and venues we use, before kick-off — the crowd already gathered is the crowd that plants.',
  },
  {
    name: 'Eco-Curriculum',
    target: 'Coaches and youth players',
    desc: 'Environmental awareness woven into coaching sessions — not a separate lesson, just part of how we talk about the ground we play on.',
  },
  {
    name: 'Pitch & Field Stewardship',
    target: 'All programme participants',
    desc: 'Community clean-up and maintenance days for the spaces we gather in, because the ground beneath the game deserves the same care as the game itself.',
  },
]

export default function ProgrammesConservation() {
  return (
    <section className={styles.section} id="conservation">
      <div className={styles.pillarRow}>
        <div className={styles.pillarLeft}>
          <p className={styles.number}>02</p>
          <h2 className={styles.pillarName}>Conservation</h2>
        </div>
        <div className={styles.pillarRight}>
          <p className={styles.pillarDesc}>
            A young person standing on a pitch is standing on land that has a story. We
            plant trees on match days, run environmental education through our coaching
            curriculum, and make conservation a normal part of how our communities gather.
            Not a separate agenda. Part of the same conversation.
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
      <Link href="/get-involved#donate" className={styles.cta}>
        Sponsor native trees →
      </Link>
    </section>
  )
}