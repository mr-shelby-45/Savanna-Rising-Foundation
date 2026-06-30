import styles from './ProgrammesCulture.module.css'

const programmes = [
  {
    name: 'Heritage Match Days',
    target: 'Players, families, elders',
    desc: 'Tournaments where culture takes the sideline. Local music, traditional dress, indigenous games running alongside the main event. The pitch becomes a gathering space for the whole community — not just the players.',
  },
  {
    name: 'Elder Engagement',
    target: 'Community elders, youth players',
    desc: 'We bring elders into our programmes deliberately. As referees, as storytellers, as the people who remember what the land looked like before. Their presence at the pitch is not ceremonial — it is structural.',
  },
  {
    name: 'Indigenous Games',
    target: 'Youth 8–18',
    desc: 'Alongside football and rugby we run sessions in traditional Kenyan games — preserving the rules, the knowledge, and the joy of games that predate the ones imported from elsewhere. Play is culture. We treat it that way.',
  },
  {
    name: 'Cultural Documentation',
    target: 'Communities across programme counties',
    desc: 'We record what we find — stories, games, traditions, languages tied to the land we work on. A growing archive built with communities, not about them, available to the people it belongs to.',
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