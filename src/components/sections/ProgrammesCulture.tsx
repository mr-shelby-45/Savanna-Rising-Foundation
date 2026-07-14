import styles from './ProgrammesCulture.module.css'
import { sanityFetch } from '@/lib/sanity'
import { programmesQuery } from '@/lib/queries'

type Programme = {
  _id: string
  title: string
  pillar: string
  tagline?: string
  description?: string
  targetGroup?: string
}

export default async function ProgrammesCulture() {
  const all = await sanityFetch<Programme[]>(programmesQuery)
  const programmes = all?.filter((p) => p.pillar === 'Culture') ?? []

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
        {programmes.map((p) => (
          <div key={p._id} className={styles.programme}>
            <div className={styles.progLeft}>
              <h3 className={styles.progName}>{p.title}</h3>
              <p className={styles.progTarget}>{p.targetGroup}</p>
            </div>
            <div className={styles.progRight}>
              <p className={styles.progDesc}>{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}