import type { Day, Session, SessionMetaMap } from '../types'
import { DAYS, TIME_PERIODS } from '../data/timetable'
import { isSessionActive, nowMinutes } from '../utils/time'
import TimetableCard from './TimetableCard'

interface TimetableGridProps {
  sessions: Session[]
  meta: SessionMetaMap
  today: Day
  now: Date
  onOpenSession: (session: Session) => void
  visibleDays?: Day[]
}

export default function TimetableGrid({ sessions, meta, today, now, onOpenSession, visibleDays }: TimetableGridProps) {
  const days = visibleDays ?? DAYS
  const minutesNow = nowMinutes(now)

  return (
    <div className="hidden md:block overflow-x-auto rounded-xl border border-navy-100 dark:border-navy-700 shadow-card print-area">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-navy-800 dark:bg-navy-950 text-white">
            <th scope="col" className="sticky left-0 z-10 bg-navy-800 dark:bg-navy-950 px-4 py-3 text-left font-display font-semibold w-32">
              Day
            </th>
            {TIME_PERIODS.map((period) => (
              <th
                key={period.id}
                scope="col"
                className={`px-3 py-3 text-left font-medium whitespace-nowrap ${
                  period.isBreak ? 'bg-navy-700 dark:bg-navy-800 text-navy-200' : ''
                }`}
              >
                {period.isBreak ? 'BREAK' : period.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => {
            const isToday = day === today
            return (
              <tr
                key={day}
                className={`border-t border-navy-100 dark:border-navy-700 ${
                  isToday ? 'bg-navy-50/70 dark:bg-navy-800/60' : 'bg-white dark:bg-navy-900'
                }`}
              >
                <th
                  scope="row"
                  className={`sticky left-0 z-10 px-4 py-3 text-left align-top font-display font-semibold ${
                    isToday ? 'bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-white' : 'bg-white dark:bg-navy-900 text-navy-700 dark:text-navy-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {day}
                    {isToday && <span className="h-1.5 w-1.5 rounded-full bg-study" aria-hidden="true" />}
                  </span>
                </th>
                {TIME_PERIODS.map((period) => {
                  if (period.isBreak) {
                    return (
                      <td key={period.id} className="bg-recess-soft dark:bg-navy-800 px-2 py-3 text-center align-middle">
                        <span className="text-[10px] font-medium uppercase tracking-wide text-navy-400 dark:text-navy-400">
                          &nbsp;
                        </span>
                      </td>
                    )
                  }
                  const session = sessions.find((s) => s.day === day && s.periodId === period.id)
                  const active = session ? isSessionActive(session, today, minutesNow) : false
                  return (
                    <td key={period.id} className="px-2 py-2 align-top min-w-[150px]">
                      {session ? (
                        <div className={active ? 'relative' : ''}>
                          {active && (
                            <span className="absolute -top-2 left-2 z-10 rounded-full bg-study px-1.5 py-0.5 text-[9px] font-semibold text-white shadow">
                              NOW
                            </span>
                          )}
                          <div className={active ? 'ring-2 ring-study rounded-lg' : ''}>
                            <TimetableCard
                              session={session}
                              meta={meta[session.id]}
                              onClick={() => onOpenSession(session)}
                              compact
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="h-full min-h-[54px] rounded-lg border border-dashed border-navy-100 dark:border-navy-700" />
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
