import { CheckCircle2, GraduationCap, Heart, NotebookPen } from 'lucide-react'
import type { Session, SessionMeta } from '../types'
import { formatTime12 } from '../utils/time'

interface TimetableCardProps {
  session: Session
  meta?: SessionMeta
  onClick: () => void
  compact?: boolean
}

const TYPE_LABEL: Record<Session['type'], string> = {
  lecture: 'Lecturer class',
  'self-study': 'Self study',
  personal: 'Personal',
}

const ICON: Record<Session['type'], typeof GraduationCap> = {
  lecture: GraduationCap,
  'self-study': NotebookPen,
  personal: Heart,
}

export default function TimetableCard({ session, meta, onClick, compact }: TimetableCardProps) {
  const isBlack = session.color === 'black'
  const Icon = ICON[session.type]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full text-left rounded-lg border bg-white dark:bg-navy-800 shadow-card transition-colors hover:border-navy-300 dark:hover:border-navy-500 ${
        isBlack ? 'border-l-4 border-l-lecture' : 'border-l-4 border-l-study'
      } border-navy-100 dark:border-navy-700 ${compact ? 'px-3 py-2' : 'px-3.5 py-3'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Icon size={13} className={isBlack ? 'text-lecture dark:text-navy-200' : 'text-study dark:text-study-dark'} />
          <span className="truncate font-semibold text-navy-900 dark:text-white text-sm">{session.title}</span>
        </div>
        {meta?.completed && (
          <CheckCircle2 size={15} className="shrink-0 text-study dark:text-study-dark" aria-label="Completed" />
        )}
      </div>
      <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">
        {formatTime12(session.startTime)}&ndash;{formatTime12(session.endTime)}
      </p>
      <span
        className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
          isBlack
            ? 'bg-lecture-soft text-lecture dark:bg-navy-700 dark:text-navy-200'
            : 'bg-study-soft text-study dark:bg-navy-700 dark:text-study-dark'
        }`}
      >
        {TYPE_LABEL[session.type]}
      </span>
    </button>
  )
}
