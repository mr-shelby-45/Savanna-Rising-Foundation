import styles from './NewsEvents.module.css'

const events = [
  {
    title: 'Community League — Season Opener',
    date: 'Saturday 15 March 2025',
    location: 'Afraha Stadium, Nakuru',
    pillar: 'Sport',
  },
  {
    title: 'Green Pitch Initiative — Tree Planting Drive',
    date: 'Saturday 22 March 2025',
    location: 'Kiamunyi Grounds, Nakuru',
    pillar: 'Conservation',
  },
  {
    title: 'Heritage Match Day — Tournament Series',
    date: 'Saturday 5 April 2025',
    location: 'TBC, Nakuru',
    pillar: 'Culture',
  },
]

export default function NewsEvents() {
  return (
    <section className={styles.section}>
      <p className={styles.label}>Upcoming</p>
      <div className={styles.list}>
        {events.map((e, i) => (
          <div key={i} className={styles.event}>
            <div className={styles.eventLeft}>
              <p className={styles.eventDate}>{e.date}</p>
              <p className={styles.eventLocation}>{e.location}</p>
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