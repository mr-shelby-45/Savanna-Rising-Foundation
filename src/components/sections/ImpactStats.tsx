import styles from './ImpactStats.module.css'
import { sanityFetch } from '@/lib/sanity'
import { impactStatsQuery } from '@/lib/queries'

type ImpactStat = {
  _id: string
  label: string
  value: string
  pillar?: string
}

export default async function ImpactStats() {
  const stats = await sanityFetch<ImpactStat[]>(impactStatsQuery)

  if (!stats || stats.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>This season</p>
        <h2 className={styles.title}>Numbers from the ground</h2>
      </div>
      <div className={styles.grid}>
        {stats.map((s) => (
          <div key={s._id} className={styles.stat}>
            <p className={styles.pillar}>{s.pillar}</p>
            <p className={styles.value}>{s.value}</p>
            <p className={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}