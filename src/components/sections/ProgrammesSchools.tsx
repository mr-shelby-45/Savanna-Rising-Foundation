import Link from 'next/link'
import styles from './ProgrammesSchools.module.css'

const activities = [
  {
    name: 'In-School Sports Clinics',
    target: 'Primary & secondary schools',
    desc: 'Sports training taken directly to school grounds — no travel, no barrier to entry, just the game showing up where students already are.',
  },
  {
    name: 'Life Skills Education',
    target: 'Teachers and pupils',
    desc: 'Academic focus paired with team leadership concepts — the classroom and the pitch reinforcing the same lessons from two directions.',
  },
  {
    name: 'Equipment & Gear Support',
    target: 'Under-resourced schools',
    desc: 'Real sports gear for schools that don\'t have it — because a programme built on discipline and access can\'t ask students to show up without either.',
  },
]

export default function ProgrammesSchools() {
  return (
    <section className={styles.section} id="schools">
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <p className={styles.label}>Across all three pillars</p>
          <h2 className={styles.title}>Schools programme</h2>
        </div>
        <div className={styles.topRight}>
          <p className={styles.desc}>
            The schools programme is where all three pillars meet in one place. Sport
            brings students together. Conservation gives them a relationship with the land
            they study on. Culture gives them pride in who they are before the world tells
            them who to be. We run this across primary and secondary schools in our active
            counties — and we are expanding.
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
        Partner your school with us →
      </Link>
    </section>
  )
}