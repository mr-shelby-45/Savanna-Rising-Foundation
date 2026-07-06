import styles from './AboutGovernance.module.css'

export default function AboutGovernance() {
  return (
    <section className={styles.governance} id="governance">
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.label}>Registration & governance</p>
          <h2 className={styles.title}>Accountable to the communities we serve.</h2>
          <p className={styles.body}>
            Mwenda Kimathi Foundation is registered as a Public Benefit Organization under
            Kenya's PBO Act of 2013, regulated by the PBO Regulatory Authority. We publish
            annual reports and maintain open governance so that our partners, funders, and
            communities always know how we work and where the resources go.
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.stat}>
            <p className={styles.statValue}>2025</p>
            <p className={styles.statLabel}>Year founded</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statValue}>PBO</p>
            <p className={styles.statLabel}>Registered — Kenya</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statValue}>Nakuru</p>
            <p className={styles.statLabel}>Founding county</p>
          </div>
          <div className={styles.reportLink}>
            <a href="/impact#reports" className={styles.link}>
              View annual reports →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}