import { Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-700 transition-colors"
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  )
}
