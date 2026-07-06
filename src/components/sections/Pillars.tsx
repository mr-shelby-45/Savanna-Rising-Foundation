import Link from 'next/link'
import styles from './Pillars.module.css'

export default function Pillars() {
  return (
    <section className={styles.pillars}>
      <div className={styles.top}>
        <h2 className={styles.intro}>Three commitments.<br />One living idea.</h2>
      </div>

      <div className={styles.sport}>
        <div>
          <p className={styles.label}>Pillar one</p>
          <h3 className={`${styles.name} ${styles.terra}`}>Sport</h3>
        </div>
        <div>
          <p className={styles.desc}>
            Football and rugby are our entry points — not because we love the game above
            everything else, but because the game loves people back. It gives them somewhere
            to be, something to fight for, and someone to become. We run leagues, tournaments,
            and coaching programmes that take the game seriously and use it to build young
            people who take themselves seriously.
          </p>
          <Link href="/programmes#sport" className={styles.link}>Explore our sport programmes </Link>
        </div>
      </div>

      <div className={styles.split}>
        <div className={styles.cell}>
          <p className={styles.label}>Pillar two</p>
          <h3 className={styles.name}>Conservation</h3>
          <p className={styles.desc}>
            A young person standing on a pitch is standing on land that has a story.
            We plant trees on match days, run environmental education through our coaching
            curriculum, and make conservation a normal part of how our communities gather —
            not a separate agenda, but part of the same conversation.
          </p>
          <Link href="/programmes#conservation" className={styles.link}>Explore conservation impact</Link>
        </div>
        <div className={`${styles.cell} ${styles.cellRight}`}>
          <p className={styles.label}>Pillar three</p>
          <h3 className={styles.name}>Culture</h3>
          <p className={styles.desc}>
            We bring elders to tournament sidelines. We make space for indigenous games,
            local music, and the traditions that shaped how Kenyan communities move and
            celebrate. Culture, for us, is not preserved behind glass — it is lived,
            played, and passed on at the pitch.
          </p>
          <Link href="/programmes#culture" className={styles.link}>Explore our cultural programmes </Link>
        </div>
      </div>
    </section>
  )
}
