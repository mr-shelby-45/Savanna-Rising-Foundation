import styles from './GetInvolvedDonate.module.css'

export default function GetInvolvedDonate() {
  return (
    <section className={styles.section} id="donate">
      <div className={styles.placeholder}>
        <p className={styles.methodLabel}>Donate</p>
        <h2 className={styles.placeholderTitle}>Online giving is coming soon.</h2>
        <p className={styles.placeholderDesc}>
          We're setting up secure online donations via M-Pesa and card. In the meantime,
          reach out through our contact page and we'll help you make a gift directly.
        </p>
        <a href="/contact" className={styles.placeholderLink}>
          Get in touch →
        </a>
      </div>
    </section>
  )
}
