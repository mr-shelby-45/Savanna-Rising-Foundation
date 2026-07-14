import styles from './ProgrammesSport.module.css'
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

export default async function ProgrammesSport() {
  const all = await sanityFetch<Programme[]>(programmesQuery)
  const programmes = all?.filter((p) => p.pillar === 'Sport') ?? []

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