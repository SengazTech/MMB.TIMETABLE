import { Search, SlidersHorizontal, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onToggleFilters: () => void
  filtersActive: boolean
  filtersOpen: boolean
}

export default function SearchBar({ value, onChange, onToggleFilters, filtersActive, filtersOpen }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 no-print">
      <div className="relative flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search subject, room code, or day…"
          aria-label="Search timetable"
          className="w-full rounded-lg border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-800 py-2.5 pl-9 pr-9 text-sm text-navy-900 dark:text-white placeholder:text-navy-400 focus:border-navy-400"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
          >
            <X size={15} />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={onToggleFilters}
        aria-expanded={filtersOpen}
        aria-label="Toggle filters"
        className={`relative flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border transition-colors ${
          filtersOpen
            ? 'border-navy-800 bg-navy-800 text-white dark:border-navy-100 dark:bg-navy-100 dark:text-navy-900'
            : 'border-navy-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-700'
        }`}
      >
        <SlidersHorizontal size={16} />
        {filtersActive && !filtersOpen && (
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-study border-2 border-parchment dark:border-navy-900" />
        )}
      </button>
    </div>
  )
}
