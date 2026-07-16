import styles from './Impact.module.css'
import { sanityFetch } from '@/lib/sanity'
import { impactStatsQuery } from '@/lib/queries'

type ImpactStat = {
  _id: string
  label: string
  value: string
  pillar?: string
}

export default async function Impact() {
  const stats = await sanityFetch<ImpactStat[]>(impactStatsQuery)

  if (!stats || stats.length === 0) return null

  // Homepage teaser only needs a handful — full breakdown lives on /impact
  const featured = stats.slice(0, 4)

  return (
    <section className={styles.impact}>
      <div className={styles.header}>
        <p className={styles.label}>This season</p>
        <h2 className={styles.title}>The work in numbers</h2>
      </div>
      <div className={styles.row}>
        {featured.map((s) => (
          <div key={s._id} className={styles.item}>
            <p className={styles.num}>{s.value}</p>
            <p className={styles.desc}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
