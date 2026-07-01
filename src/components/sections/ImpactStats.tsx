import styles from './ImpactStats.module.css'

const stats = [
  { value: '340', suffix: '+',  label: 'Youth reached through sport',          pillar: 'Sport' },
  { value: '12',  suffix: '',   label: 'Match days with tree planting drives',  pillar: 'Conservation' },
  { value: '6',   suffix: '',   label: 'Counties active this season',           pillar: 'Overall' },
  { value: '2',   suffix: 'K+', label: 'Trees planted alongside the game',      pillar: 'Conservation' },
  { value: '4',   suffix: '',   label: 'Cultural heritage events held',         pillar: 'Culture' },
  { value: '48',  suffix: '+',  label: 'Volunteer coaches trained',             pillar: 'Sport' },
]

export default function ImpactStats() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>This season</p>
        <h2 className={styles.title}>Numbers from the ground</h2>
      </div>
      <div className={styles.grid}>
        {stats.map((s, i) => (
          <div key={i} className={styles.stat}>
            <p className={styles.pillar}>{s.pillar}</p>
            <p className={styles.value}>{s.value}<span>{s.suffix}</span></p>
            <p className={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}