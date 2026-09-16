import { ArrowRight, Timer } from 'lucide-react'
import type { Session } from '../types'
import { countdownLabel, formatTime12 } from '../utils/time'

interface NextSessionProps {
  session: Session | null
  now: Date
  onOpen: (session: Session) => void
}

const TYPE_LABEL: Record<Session['type'], string> = {
  lecture: 'Lecturer class',
  'self-study': 'Self study',
  personal: 'Personal',
}

export default function NextSession({ session, now, onOpen }: NextSessionProps) {
  if (!session) {
    return (
      <div className="rounded-xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800 px-5 py-4 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Next session</p>
        <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">Nothing scheduled this week.</p>
      </div>
    )
  }

  const isBlack = session.color === 'black'

  return (
    <button
      type="button"
      onClick={() => onOpen(session)}
      className="w-full text-left rounded-xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800 px-5 py-4 shadow-card hover:border-navy-300 dark:hover:border-navy-500 transition-colors"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Next session</p>
        <span className="flex items-center gap-1 text-xs font-medium text-navy-500 dark:text-navy-300">
          <Timer size={13} />
          Starts in {countdownLabel(session, now)}
        </span>
      </div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold text-navy-900 dark:text-white truncate">
            {session.title}
          </p>
          <p className="text-sm text-navy-500 dark:text-navy-300">
            {session.day} &middot; {formatTime12(session.startTime)}&ndash;{formatTime12(session.endTime)}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
            isBlack
              ? 'bg-lecture-soft text-lecture dark:bg-navy-700 dark:text-navy-100'
              : 'bg-study-soft text-study dark:bg-navy-700 dark:text-study-dark'
          }`}
        >
          {TYPE_LABEL[session.type]}
        </span>
      </div>
      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-navy-500 dark:text-navy-300">
        View details <ArrowRight size={12} />
      </span>
    </button>
  )
}
