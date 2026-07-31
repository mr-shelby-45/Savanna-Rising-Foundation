import styles from './AboutFounder.module.css'

export default function AboutFounder() {
  return (
    <section className={styles.founder}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <p className={styles.label}>Founder</p>
        </div>
        <div className={styles.col}>
          <p className={styles.body}>
            Collins Mwenda Kimathi founded the Mwenda Kimathi Foundation on a simple
            belief: that sport could hold a community together the way it once held him.
            A former rugby player with the Titans Rugby Club at Mount Kenya University and
            a graduate of International Relations, Collins brings the discipline of the
            pitch and the patience of diplomacy to the same table — building the
            partnerships with county government, local leaders, and NGOs that turn a good
            idea into work that actually reaches people.
          </p>
        </div>
      </div>
    </section>
  )
}
