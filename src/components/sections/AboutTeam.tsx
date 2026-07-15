import Image from 'next/image'
import styles from './AboutTeam.module.css'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { teamQuery } from '@/lib/queries'

type TeamMember = {
  _id: string
  name: string
  role: string
  type?: 'Team' | 'Board' | 'Advisory'
  bio?: string
  photo?: { asset?: { url?: string }; alt?: string }
}

function MemberGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className={styles.grid}>
      {members.map((member) => (
        <div key={member._id} className={styles.member}>
          {member.photo?.asset?.url ? (
            <div className={styles.photo} style={{ position: 'relative', overflow: 'hidden' }}>
              <Image
                src={urlFor(member.photo).width(400).height(400).url()}
                alt={member.photo.alt || member.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div className={styles.photo} />
          )}
          <p className={styles.name}>{member.name}</p>
          <p className={styles.role}>{member.role}</p>
        </div>
      ))}
    </div>
  )
}

export default async function AboutTeam() {
  const members = await sanityFetch<TeamMember[]>(teamQuery)

  const team = members?.filter((m) => m.type === 'Team') ?? []
  const board = members?.filter((m) => m.type === 'Board') ?? []
  const advisory = members?.filter((m) => m.type === 'Advisory') ?? []

  return (
    <section className={styles.team} id="team">
      {team.length > 0 && (
        <div className={styles.block}>
          <p className={styles.label}>The team</p>
          <MemberGrid members={team} />
        </div>
      )}

      {board.length > 0 && (
        <div className={styles.block}>
          <p className={styles.label}>Board of trustees</p>
          <MemberGrid members={board} />
        </div>
      )}

      {advisory.length > 0 && (
        <div className={styles.block}>
          <p className={styles.label}>Advisory</p>
          <MemberGrid members={advisory} />
        </div>
      )}
    </section>
  )
}