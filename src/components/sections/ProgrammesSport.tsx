import Link from 'next/link'
import styles from './ProgrammesSport.module.css'

const activities = [
  {
    name: 'Leagues & Tournaments',
    target: 'Regional football & rugby',
    desc: 'Organised regional competitions, run properly — qualified referees, structured seasons, a level of seriousness that tells every player their game matters.',
  },
  {
    name: 'Youth Coaching Workshops',
    target: 'Volunteer coaches, all genders',
    desc: 'Skill training paired with character-building — coaching that shapes how a young person carries themselves, not just how they play.',
  },
  {
    name: 'Leadership & Fair Play',
    target: 'All age groups',
    desc: 'Mentorship built into the rhythm of the game itself, in the moments before and after a match, where the real conversations happen.',
  },
]

export default function ProgrammesSport() {
  return (
    <section className={styles.section} id="sport">
      <div className={styles.pillarRow}>
        <div className={styles.pillarLeft}>
          <p className={styles.number}>01</p>
          <h2 className={styles.pillarName}>Sport</h2>
        </div>
        <div className={styles.pillarRight}>
          <p className={styles.pillarDesc}>
            Football and rugby are our entry points. The game is worth running for its own
            sake — and because of what it reveals in the people who play it. We run
            structured, properly resourced sport programmes that take competition seriously
            and use it to build young people who take themselves seriously.
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
        Support a league or tournament →
      </Link>
    </section>
  )
}