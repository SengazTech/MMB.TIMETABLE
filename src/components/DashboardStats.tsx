import { BookOpen, CalendarCheck, GraduationCap, PenLine, Clock } from 'lucide-react'
import type { Day, Session } from '../types'
import { durationLabel, timeToMinutes } from '../utils/time'

interface DashboardStatsProps {
  sessions: Session[]
  today: Day
}

function totalStudyHours(sessions: Session[]): string {
  const minutes = sessions.reduce((sum, s) => sum + (timeToMinutes(s.endTime) - timeToMinutes(s.startTime)), 0)
  const hours = minutes / 60
  return hours % 1 === 0 ? `${hours}h` : `${hours.toFixed(1)}h`
}

export default function DashboardStats({ sessions, today }: DashboardStatsProps) {
  const lectureCount = sessions.filter((s) => s.type === 'lecture').length
  const selfStudyCount = sessions.filter((s) => s.type === 'self-study').length
  const personalCount = sessions.filter((s) => s.type === 'personal').length
  const todaysSessions = sessions.filter((s) => s.day === today)

  const stats = [
    {
      label: 'Total sessions',
      value: sessions.length,
      icon: CalendarCheck,
      tint: 'text-navy-600 dark:text-navy-200',
    },
    {
      label: 'Lecturer classes',
      value: lectureCount,
      icon: GraduationCap,
      tint: 'text-lecture dark:text-navy-100',
    },
    {
      label: 'Self study',
      value: selfStudyCount,
      icon: BookOpen,
      tint: 'text-study dark:text-study-dark',
    },
    {
      label: 'Personal activities',
      value: personalCount,
      icon: PenLine,
      tint: 'text-navy-600 dark:text-navy-200',
    },
    {
      label: 'Weekly study time',
      value: totalStudyHours(sessions),
      icon: Clock,
      tint: 'text-navy-600 dark:text-navy-200',
    },
    {
      label: `Today (${today})`,
      value: todaysSessions.length,
      icon: CalendarCheck,
      tint: 'text-navy-600 dark:text-navy-200',
      helper: todaysSessions.length
        ? `${durationLabel(
            todaysSessions[0].startTime,
            todaysSessions[todaysSessions.length - 1].endTime,
          )} span`
        : 'Free day',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map(({ label, value, icon: Icon, tint, helper }) => (
        <div
          key={label}
          className="rounded-xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800 px-4 py-3 shadow-card"
        >
          <div className={`flex items-center gap-1.5 text-xs font-medium text-navy-500 dark:text-navy-300`}>
            <Icon size={14} className={tint} />
            <span className="truncate">{label}</span>
          </div>
          <p className="mt-1.5 font-display text-2xl font-semibold text-navy-900 dark:text-white">{value}</p>
          {helper && <p className="text-[11px] text-navy-400 dark:text-navy-400 mt-0.5">{helper}</p>}
        </div>
      ))}
    </div>
  )
}
