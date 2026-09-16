import { Microscope } from 'lucide-react'
import type { Day } from '../types'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {
  today: Day
  dateLabel: string
  timeLabel: string
  isDark: boolean
  onToggleTheme: () => void
}

export default function Header({ today, dateLabel, timeLabel, isDark, onToggleTheme }: HeaderProps) {
  return (
    <header className="border-b border-navy-100 dark:border-navy-700 bg-white/90 dark:bg-navy-800/90 backdrop-blur sticky top-0 z-30 no-print">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-800 dark:bg-navy-100 text-white dark:text-navy-800">
            <Microscope size={22} strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-navy-900 dark:text-white truncate">
              MMB Study Timetable
            </h1>
            <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-300 truncate">
              Medical Microbiology &middot; Weekly Academic Schedule
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <div className="hidden md:block text-right leading-tight">
            <p className="text-sm font-semibold text-navy-800 dark:text-navy-50">{today}</p>
            <p className="text-xs text-navy-500 dark:text-navy-300">
              {dateLabel} &middot; {timeLabel}
            </p>
          </div>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-3 flex items-center gap-4 text-xs text-navy-600 dark:text-navy-300">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-lecture" aria-hidden="true" />
          Lecturer class
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-study" aria-hidden="true" />
          Self study / personal
        </span>
        <span className="md:hidden ml-auto text-navy-500 dark:text-navy-400">{today}, {dateLabel}</span>
      </div>
    </header>
  )
}
