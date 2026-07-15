import styles from './ProgrammesConservation.module.css'
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

export default async function ProgrammesConservation() {
  const all = await sanityFetch<Programme[]>(programmesQuery)
  const programmes = all?.filter((p) => p.pillar === 'Conservation') ?? []

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