import type { Day } from '../types'
import { DAYS } from '../data/timetable'

interface DaySelectorProps {
  selected: Day
  today: Day
  onSelect: (day: Day) => void
}

export default function DaySelector({ selected, today, onSelect }: DaySelectorProps) {
  return (
    <div
      role="tablist"
      aria-label="Select day"
      className="sticky top-[104px] sm:top-[112px] z-20 -mx-4 sm:mx-0 px-4 sm:px-0 py-2 bg-parchment/95 dark:bg-navy-900/95 backdrop-blur no-print"
    >
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {DAYS.map((day) => {
          const isSelected = day === selected
          const isToday = day === today
          return (
            <button
              key={day}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelect(day)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium border transition-colors ${
                isSelected
                  ? 'bg-navy-800 text-white border-navy-800 dark:bg-navy-100 dark:text-navy-900 dark:border-navy-100'
                  : 'bg-white text-navy-600 border-navy-200 dark:bg-navy-800 dark:text-navy-300 dark:border-navy-600'
              }`}
            >
              {day.slice(0, 3)}
              {isToday && (
                <span
                  className={`ml-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${
                    isSelected ? 'bg-white dark:bg-navy-900' : 'bg-study'
                  }`}
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
