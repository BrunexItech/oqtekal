import type { TeamMember } from '@/payload-types'

import { TeamCard } from './TeamCard'

/** Designed for a small senior team: three across on desktop, swipeable on phones. */
export const TeamGrid = ({ members }: { members: TeamMember[] }) => (
  <div className="-mx-4 no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 lg:gap-8">
    {members.map((m, i) => (
      <div key={m.id} className="w-[82%] shrink-0 snap-center sm:w-auto">
        <TeamCard member={m} index={i} />
      </div>
    ))}
  </div>
)
