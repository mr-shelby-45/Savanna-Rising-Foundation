import styles from './NewsEvents.module.css'
import { sanityFetch } from '@/lib/sanity'
import { upcomingEventsQuery } from '@/lib/queries'

type UpcomingEvent = {
  _id: string
  title: string
  date: string
  location?: string
  county?: string
  pillar?: string
}

function formatEventDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function NewsEvents() {
  const events = await sanityFetch<UpcomingEvent[]>(upcomingEventsQuery)

  if (!events || events.length === 0) return null

  return (
    <section className={styles.section}>
      <p className={styles.label}>Upcoming</p>
      <div className={styles.list}>
        {events.map((e) => (
          <div key={e._id} className={styles.event}>
            <div className={styles.eventLeft}>
              <p className={styles.eventDate}>{formatEventDate(e.date)}</p>
              <p className={styles.eventLocation}>
                {[e.location, e.county].filter(Boolean).join(', ')}
              </p>
            </div>
            <div className={styles.eventRight}>
              <span className={styles.pillarTag}>{e.pillar}</span>
              <h3 className={styles.eventTitle}>{e.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}