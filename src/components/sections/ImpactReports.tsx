import styles from './ImpactReports.module.css'

const reports = [
  { year: '2025', title: 'Annual Report 2025', size: 'PDF — 2.4 MB', href: '#' },
]

export default function ImpactReports() {
  return (
    <section className={styles.section} id="reports">
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.label}>Annual reports</p>
          <h2 className={styles.title}>Open books.</h2>
          <p className={styles.desc}>
            We publish annual reports so our partners, funders, and communities can see
            exactly how the work is going and where every resource goes. Accountability
            is not a requirement for us — it is a commitment.
          </p>
        </div>
        <div className={styles.right}>
          {reports.map((r, i) => (
            <a key={i} href={r.href} className={styles.report} download>
              <div className={styles.reportInfo}>
                <p className={styles.reportYear}>{r.year}</p>
                <p className={styles.reportTitle}>{r.title}</p>
                <p className={styles.reportSize}>{r.size}</p>
              </div>
              <span className={styles.downloadIcon}>↓</span>
            </a>
          ))}
          {reports.length === 0 && (
            <p className={styles.empty}>
              Our first annual report will be published at the end of the 2025 season.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}