import styles from './Mission.module.css'

export default function Mission() {
  return (
    <section className={styles.mission}>
      <div className={styles.left}>
        <p className={styles.label}>Our foundation</p>
        <div className={styles.body}>
          <p>
            Savanna Rising Foundation is a Kenyan Public Benefit Organization built on a
            straightforward belief: that sport, done well, changes people. We run football
            and rugby programmes across Kenya and pay close attention to what the game
            reveals in the people who play it.
          </p>
          <p>
            The discipline it builds. The community it creates. The pride it draws out.
            After the final whistle, that is where our real work begins — in the environment
            those young people live in, and the culture they carry with them onto every pitch.
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <p className={styles.pull}>
          Sport is how we show up.<br />
          <span>Community is what we build.</span>
        </p>
      </div>
    </section>
  )
}
