import type { FilterState } from '../types'
import { DAYS, TIME_PERIODS } from '../data/timetable'

interface FilterPanelProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  subjects: string[]
  onReset: () => void
}

const TYPE_OPTIONS: Array<{ value: FilterState['type']; label: string }> = [
  { value: 'All', label: 'All' },
  { value: 'lecture', label: 'Lecturer classes' },
  { value: 'self-study', label: 'Self study' },
  { value: 'personal', label: 'Personal activities' },
]

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  onChange: (v: string) => void
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-navy-500 dark:text-navy-300">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-2.5 py-2 text-sm text-navy-800 dark:text-navy-100"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function FilterPanel({ filters, onChange, subjects, onReset }: FilterPanelProps) {
  return (
    <div className="no-print grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800 p-4 shadow-card">
      <Select
        label="Day"
        value={filters.day}
        onChange={(v) => onChange({ ...filters, day: v as FilterState['day'] })}
        options={[{ value: 'All', label: 'All days' }, ...DAYS.map((d) => ({ value: d, label: d }))]}
      />
      <Select
        label="Activity type"
        value={filters.type}
        onChange={(v) => onChange({ ...filters, type: v as FilterState['type'] })}
        options={TYPE_OPTIONS}
      />
      <Select
        label="Subject"
        value={filters.subject}
        onChange={(v) => onChange({ ...filters, subject: v })}
        options={[{ value: 'All', label: 'All subjects' }, ...subjects.map((s) => ({ value: s, label: s }))]}
      />
      <Select
        label="Time period"
        value={filters.period}
        onChange={(v) => onChange({ ...filters, period: v })}
        options={[
          { value: 'All', label: 'All periods' },
          ...TIME_PERIODS.filter((p) => !p.isBreak).map((p) => ({ value: p.id, label: p.label })),
        ]}
      />
      <button
        type="button"
        onClick={onReset}
        className="col-span-2 sm:col-span-4 justify-self-start text-xs font-medium text-navy-500 hover:text-navy-800 dark:text-navy-300 dark:hover:text-white underline underline-offset-2"
      >
        Clear all filters
      </button>
    </div>
  )
}
