import styles from './ProgrammesSchools.module.css'
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

export default async function ProgrammesSchools() {
  const all = await sanityFetch<Programme[]>(programmesQuery)
  const schools = all?.filter((p) => p.pillar === 'Schools') ?? []

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
        {schools.map((p) => (
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