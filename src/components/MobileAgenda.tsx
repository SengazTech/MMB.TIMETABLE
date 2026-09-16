import type { Day, Session, SessionMetaMap } from '../types'
import { TIME_PERIODS } from '../data/timetable'
import { isSessionActive, nowMinutes } from '../utils/time'
import TimetableCard from './TimetableCard'

interface MobileAgendaProps {
  day: Day
  sessions: Session[]
  meta: SessionMetaMap
  today: Day
  now: Date
  onOpenSession: (session: Session) => void
}

export default function MobileAgenda({ day, sessions, meta, today, now, onOpenSession }: MobileAgendaProps) {
  const minutesNow = nowMinutes(now)
  const isToday = day === today

  return (
    <div className="md:hidden space-y-2.5">
      {TIME_PERIODS.map((period) => {
        if (period.isBreak) {
          return (
            <div key={period.id} className="flex items-center gap-2 py-1 text-navy-400 dark:text-navy-500">
              <span className="h-px flex-1 bg-recess dark:bg-navy-700" />
              <span className="text-[11px] font-medium uppercase tracking-wide">Break &middot; {period.label}</span>
              <span className="h-px flex-1 bg-recess dark:bg-navy-700" />
            </div>
          )
        }
        const session = sessions.find((s) => s.day === day && s.periodId === period.id)
        const active = isToday && session ? isSessionActive(session, today, minutesNow) : false

        return (
          <div key={period.id} className="flex gap-3">
            <div className="w-14 shrink-0 pt-3 text-right text-[11px] font-medium text-navy-400 dark:text-navy-500">
              {period.startTime}
            </div>
            <div className="flex-1 min-w-0">
              {session ? (
                <div className="relative">
                  {active && (
                    <span className="absolute -top-2 left-3 z-10 rounded-full bg-study px-1.5 py-0.5 text-[9px] font-semibold text-white shadow">
                      NOW
                    </span>
                  )}
                  <div className={active ? 'ring-2 ring-study rounded-lg' : ''}>
                    <TimetableCard session={session} meta={meta[session.id]} onClick={() => onOpenSession(session)} />
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-navy-100 dark:border-navy-700 px-3.5 py-3 text-xs text-navy-300 dark:text-navy-600">
                  Free
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
