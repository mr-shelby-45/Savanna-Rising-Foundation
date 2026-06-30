import styles from './ProgrammesSport.module.css'

const programmes = [
  {
    name: 'Community Leagues',
    target: 'Youth 14–25, mixed gender',
    desc: 'Grassroots football and rugby leagues running across Nakuru and neighbouring counties. Structured seasons, qualified referees, and coaching support — because the game deserves to be run properly.',
  },
  {
    name: 'Girls in the Game',
    target: 'Girls 12–20',
    desc: 'A dedicated programme creating safe, structured space for girls to play, lead, and compete. Includes mentorship, life skills sessions woven into training, and pathways to coaching certification.',
  },
  {
    name: 'Coaches as Champions',
    target: 'Volunteer coaches, all genders',
    desc: 'Coaching is the most powerful role in any youth sport programme. We train, certify, and support volunteer coaches — equipping them to run sessions that go beyond the game.',
  },
  {
    name: 'Tournament Series',
    target: 'All age groups',
    desc: 'Seasonal tournaments that bring multiple communities onto one pitch. Every tournament integrates a conservation drive and a cultural showcase — sport as the gathering, the rest as what grows from it.',
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
        {programmes.map((p, i) => (
          <div key={i} className={styles.programme}>
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
    </section>
  )
}