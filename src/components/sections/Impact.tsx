import styles from './Impact.module.css'

const stats = [
  { num: '340', suffix: '+', label: 'Youth reached through sport' },
  { num: '12',  suffix: '',  label: 'Match days with tree planting' },
  { num: '6',   suffix: '',  label: 'Counties active' },
  { num: '2',   suffix: 'K+', label: 'Trees planted alongside the game' },
]

export default function Impact() {
  return (
    <section className={styles.impact}>
      <div className={styles.header}>
        <p className={styles.label}>This season</p>
        <h2 className={styles.title}>The work in numbers</h2>
      </div>
      <div className={styles.row}>
        {stats.map((s) => (
          <div key={s.label} className={styles.item}>
            <p className={styles.num}>
              {s.num}<span>{s.suffix}</span>
            </p>
            <p className={styles.desc}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
