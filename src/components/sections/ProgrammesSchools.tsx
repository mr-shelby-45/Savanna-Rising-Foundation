import styles from './ProgrammesSchools.module.css'

const schools = [
  {
    name: 'School Leagues',
    target: 'Primary & secondary schools',
    desc: 'Inter-school football and rugby leagues with conservation and cultural components built into every match day. Schools compete on the pitch and collaborate off it.',
  },
  {
    name: 'Classroom to Pitch',
    target: 'Teachers and pupils aged 10–18',
    desc: 'A curriculum resource linking sport, environmental science, and social studies. Built with teachers, used in classrooms, brought to life on the pitch.',
  },
  {
    name: 'Youth Leadership Track',
    target: 'Students aged 15–18',
    desc: 'A structured pathway for older students to move from player to junior coach to community leader. The pitch is the classroom. The community is the qualification.',
  },
]

export default function ProgrammesSchools() {
  return (
    <section className={styles.section} id="schools">
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <p className={styles.label}>Across all three pillars</p>
          <h2 className={styles.title}>Schools programme</h2>
        </div>
        <div className={styles.topRight}>
          <p className={styles.desc}>
            The schools programme is where all three pillars meet in one place. Sport
            brings students together. Conservation gives them a relationship with the land
            they study on. Culture gives them pride in who they are before the world tells
            them who to be. We run this across primary and secondary schools in our active
            counties — and we are expanding.
          </p>
        </div>
      </div>
      <div className={styles.programmeList}>
        {schools.map((p, i) => (
          <div key={i} className={styles.programme}>
            <div className={styles.progLeft}>
              <h3 className={styles.progName}>{p.name}</h3>
              <p className={styles.progTarget}>{p.target}</p>
            </div>
            <div className={styles.progRight}>
              <p className={styles.progDesc}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}