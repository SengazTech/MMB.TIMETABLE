import type { Day, Session, SessionMetaMap } from '../types'
import { DAYS } from '../data/timetable'

interface WeeklySummaryProps {
  sessions: Session[]
  meta: SessionMetaMap
  today: Day
}

export default function WeeklySummary({ sessions, meta, today }: WeeklySummaryProps) {
  const perDay = DAYS.map((day) => ({
    day,
    count: sessions.filter((s) => s.day === day).length,
  }))
  const maxCount = Math.max(...perDay.map((d) => d.count), 1)

  const completedCount = sessions.filter((s) => meta[s.id]?.completed).length
  const completionPct = sessions.length ? Math.round((completedCount / sessions.length) * 100) : 0

  return (
    <div className="rounded-xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800 p-5 shadow-card">
      <h2 className="font-display text-base font-semibold text-navy-900 dark:text-white">Weekly overview</h2>

      <div className="mt-4 space-y-2">
        {perDay.map(({ day, count }) => (
          <div key={day} className="flex items-center gap-3">
            <span
              className={`w-9 shrink-0 text-xs font-medium ${
                day === today ? 'text-navy-900 dark:text-white font-semibold' : 'text-navy-400 dark:text-navy-400'
              }`}
            >
              {day.slice(0, 3)}
            </span>
            <div className="h-2 flex-1 rounded-full bg-navy-50 dark:bg-navy-900 overflow-hidden">
              <div
                className={`h-full rounded-full ${day === today ? 'bg-study' : 'bg-navy-300 dark:bg-navy-600'}`}
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
            <span className="w-4 shrink-0 text-right text-xs text-navy-400">{count}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-navy-100 dark:border-navy-700">
        <div className="flex items-center justify-between text-xs font-medium text-navy-500 dark:text-navy-300">
          <span>Sessions completed</span>
          <span>
            {completedCount}/{sessions.length} &middot; {completionPct}%
          </span>
        </div>
        <div className="mt-1.5 h-2 rounded-full bg-navy-50 dark:bg-navy-900 overflow-hidden">
          <div className="h-full rounded-full bg-navy-700 dark:bg-navy-300" style={{ width: `${completionPct}%` }} />
        </div>
      </div>
    </div>
  )
}
