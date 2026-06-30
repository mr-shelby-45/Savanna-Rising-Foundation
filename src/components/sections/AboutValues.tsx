import styles from './AboutValues.module.css'

const values = [
  {
    title: 'The game teaches respect. So do we.',
    body: 'On the pitch, you earn respect through how you play — not where you come from or who you know. We carry that into everything we build. In our programmes, in our communities, in the way we show up.',
  },
  {
    title: 'Competition beyond sport.',
    body: 'The drive to be better, to push past what you managed last season — that instinct does not belong only to sport. We help young people take it off the pitch and into their education, their relationships, and their ambitions. Improvement is a habit, not a talent.',
  },
  {
    title: 'Different jerseys, same game.',
    body: 'Kenya holds dozens of cultures, languages, and traditions. On the pitch, none of that divides — it enriches. We build programmes that treat cultural difference the way a good team treats different positions: everyone brings something the others do not, and that is exactly the point.',
  },
  {
    title: 'The pitch belongs to everyone on it.',
    body: 'No single player wins alone. No community thrives alone either. The habits of teamwork — listening, covering for each other, sharing the credit — are the same habits that build neighbourhoods, conserve land, and keep traditions alive.',
  },
]

export default function AboutValues() {
  return (
    <section className={styles.values}>
      <div className={styles.header}>
        <p className={styles.label}>What we believe</p>
        <h2 className={styles.title}>Lessons from the pitch.</h2>
      </div>
      <div className={styles.grid}>
        {values.map((v, i) => (
          <div key={i} className={styles.item}>
            <h3 className={styles.valueTitle}>{v.title}</h3>
            <p className={styles.valueBody}>{v.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}