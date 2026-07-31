import styles from './AboutFounder.module.css'

export default function AboutFounder() {
  return (
    <section className={styles.founder}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <p className={styles.label}>Who we are</p>
        </div>
        <div className={styles.col}>
          <p className={styles.body}>
            The Mwenda Kimathi Foundation is a community-based organization rooted in
            Kibirichia and the surrounding areas of Buuri, Meru County. We believe strong
            communities are built when people are connected to their culture, to each
            other, and to the environment.
          </p>
          <p className={styles.body}>
            Founded by Collins Mwenda Kimathi, a community leader, former athlete, and
            International Relations graduate, the foundation brings people together
            through practical, youth-centered programs. Collins played club rugby at Mt.
            Kenya University with the Titans Rugby Club, and now channels the values of
            discipline, teamwork, and leadership into community work.
          </p>
          <p className={styles.body}>
            Our programs focus on local arts and culture, cultural games and festivals,
            sports coaching, and environmental conservation. We also apply principles of
            diplomacy and partnership to unite communities, engage county government and
            NGOs, and promote sustainable development.
          </p>
          <p className={styles.body}>
            We are committed to creating safe spaces where young people can learn skills,
            celebrate heritage, protect the environment, and build community pride.
          </p>
        </div>
      </div>
    </section>
  )
}
