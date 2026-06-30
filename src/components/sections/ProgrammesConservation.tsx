import styles from './ProgrammesConservation.module.css'

const programmes = [
  {
    name: 'Green Pitch Initiative',
    target: 'All programme participants',
    desc: 'Every pitch we use becomes a site of conservation action. We work with local authorities and communities to maintain, clean, and plant around the spaces where we gather — because the ground beneath the game matters.',
  },
  {
    name: 'Match Day Tree Planting',
    target: 'Players, families, communities',
    desc: 'Each tournament and league day includes a community tree planting drive. Players bring family members. Elders choose the species. The trees stay long after the final whistle.',
  },
  {
    name: 'Environmental Curriculum',
    target: 'Coaches and youth players',
    desc: 'Conservation education is woven into our coaching curriculum — not as a separate lesson, but as context. Why the land matters. How it connects to the game. What young people can do to protect it.',
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