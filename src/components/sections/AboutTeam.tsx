import styles from './AboutTeam.module.css'

const team = [
  { name: 'Team Member', role: 'Executive Director', type: 'Team' },
  { name: 'Team Member', role: 'Sport Programme Lead', type: 'Team' },
  { name: 'Team Member', role: 'Conservation Lead', type: 'Team' },
  { name: 'Team Member', role: 'Culture & Heritage Lead', type: 'Team' },
]

const board = [
  { name: 'Board Member', role: 'Chair, Board of Trustees', type: 'Board' },
  { name: 'Board Member', role: 'Trustee — Legal', type: 'Board' },
  { name: 'Board Member', role: 'Trustee — Finance', type: 'Board' },
]

export default function AboutTeam() {
  return (
    <section className={styles.team} id="team">
      <div className={styles.block}>
        <p className={styles.label}>The team</p>
        <div className={styles.grid}>
          {team.map((member, i) => (
            <div key={i} className={styles.member}>
              <div className={styles.photo} />
              <p className={styles.name}>{member.name}</p>
              <p className={styles.role}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <p className={styles.label}>Board of trustees</p>
        <div className={styles.grid}>
          {board.map((member, i) => (
            <div key={i} className={styles.member}>
              <div className={styles.photo} />
              <p className={styles.name}>{member.name}</p>
              <p className={styles.role}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}