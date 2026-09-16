import { useEffect, useMemo, useState } from 'react'
import type { Day, FilterState, Session, SessionMeta, SessionMetaMap } from './types'
import { ORIGINAL_TIMETABLE } from './data/timetable'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useCurrentTime } from './hooks/useCurrentTime'
import { getTodayName, findNextSession } from './utils/time'
import { deriveSubject, uniqueSubjects } from './utils/subject'

import Header from './components/Header'
import DashboardStats from './components/DashboardStats'
import NextSession from './components/NextSession'
import WeeklySummary from './components/WeeklySummary'
import SearchBar from './components/SearchBar'
import FilterPanel from './components/FilterPanel'
import DaySelector from './components/DaySelector'
import TimetableGrid from './components/TimetableGrid'
import MobileAgenda from './components/MobileAgenda'
import SessionModal from './components/SessionModal'
import EditTimetable from './components/EditTimetable'

const DEFAULT_FILTERS: FilterState = { day: 'All', type: 'All', subject: 'All', period: 'All' }
const DEFAULT_META: SessionMeta = { notes: '', completed: false }

function makeId(session: Omit<Session, 'id'>): string {
  return `${session.day.toLowerCase()}-${session.periodId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export default function App() {
  const [sessions, setSessions] = useLocalStorage<Session[]>('mmb-sessions', ORIGINAL_TIMETABLE)
  const [meta, setMeta] = useLocalStorage<SessionMetaMap>('mmb-session-meta', {})
  const [isDark, setIsDark] = useLocalStorage<boolean>('mmb-dark-mode', false)

  const now = useCurrentTime()
  const today = getTodayName(now)

  const [selectedDay, setSelectedDay] = useState<Day>(today)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const subjects = useMemo(() => uniqueSubjects(sessions), [sessions])

  const filteredSessions = useMemo(() => {
    const q = search.trim().toLowerCase()
    return sessions.filter((s) => {
      if (filters.day !== 'All' && s.day !== filters.day) return false
      if (filters.type !== 'All' && s.type !== filters.type) return false
      if (filters.subject !== 'All' && deriveSubject(s) !== filters.subject) return false
      if (filters.period !== 'All' && s.periodId !== filters.period) return false
      if (q) {
        const haystack = `${s.title} ${s.day} ${s.type} ${deriveSubject(s)}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [sessions, search, filters])

  const filtersActive =
    filters.day !== 'All' || filters.type !== 'All' || filters.subject !== 'All' || filters.period !== 'All'

  const nextSession = useMemo(() => findNextSession(sessions, now), [sessions, now])
  const activeSession = sessions.find((s) => s.id === activeSessionId) ?? null

  function updateSessionMeta(id: string, patch: Partial<SessionMeta>) {
    setMeta({ ...meta, [id]: { ...(meta[id] ?? DEFAULT_META), ...patch } })
  }

  function updateSession(id: string, patch: Partial<Session>) {
    setSessions(sessions.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  function addSession(draft: Omit<Session, 'id'>) {
    setSessions([...sessions, { ...draft, id: makeId(draft) }])
  }

  function deleteSession(id: string) {
    setSessions(sessions.filter((s) => s.id !== id))
    setActiveSessionId(null)
  }

  function resetTimetable() {
    if (window.confirm('Reset to the original timetable from your uploaded image? Edits and added sessions will be lost.')) {
      setSessions(ORIGINAL_TIMETABLE)
    }
  }

  function exportData() {
    const payload = JSON.stringify({ sessions, meta }, null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mmb-timetable.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function importData(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        if (Array.isArray(parsed.sessions)) setSessions(parsed.sessions)
        if (parsed.meta && typeof parsed.meta === 'object') setMeta(parsed.meta)
      } catch {
        window.alert('This file could not be read as a valid timetable export.')
      }
    }
    reader.readAsText(file)
  }

  const dateLabel = now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  const timeLabel = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="min-h-screen bg-parchment dark:bg-navy-900">
      <Header
        today={today}
        dateLabel={dateLabel}
        timeLabel={timeLabel}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-5 space-y-5">
        <DashboardStats sessions={sessions} today={today} />

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <NextSession session={nextSession} now={now} onOpen={(s) => setActiveSessionId(s.id)} />
          </div>
          <div className="hidden lg:block" />
        </div>

        <EditTimetable
          editMode={editMode}
          onToggleEditMode={() => setEditMode((v) => !v)}
          onAddSession={addSession}
          onReset={resetTimetable}
          onExport={exportData}
          onImport={importData}
          onPrint={() => window.print()}
        />

        <SearchBar
          value={search}
          onChange={setSearch}
          onToggleFilters={() => setFiltersOpen((v) => !v)}
          filtersActive={filtersActive}
          filtersOpen={filtersOpen}
        />

        {filtersOpen && (
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            subjects={subjects}
            onReset={() => setFilters(DEFAULT_FILTERS)}
          />
        )}

        <DaySelector selected={selectedDay} today={today} onSelect={setSelectedDay} />

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <TimetableGrid
              sessions={filteredSessions}
              meta={meta}
              today={today}
              now={now}
              onOpenSession={(s) => setActiveSessionId(s.id)}
            />
            <MobileAgenda
              day={selectedDay}
              sessions={filteredSessions}
              meta={meta}
              today={today}
              now={now}
              onOpenSession={(s) => setActiveSessionId(s.id)}
            />
            {filteredSessions.length === 0 && (
              <p className="text-center text-sm text-navy-400 py-6">No sessions match your search or filters.</p>
            )}
          </div>
          <WeeklySummary sessions={sessions} meta={meta} today={today} />
        </div>
      </main>

      {activeSession && (
        <SessionModal
          session={activeSession}
          meta={meta[activeSession.id] ?? DEFAULT_META}
          editMode={editMode}
          onClose={() => setActiveSessionId(null)}
          onUpdateMeta={(patch) => updateSessionMeta(activeSession.id, patch)}
          onUpdateSession={(patch) => updateSession(activeSession.id, patch)}
          onDelete={() => deleteSession(activeSession.id)}
        />
      )}
    </div>
  )
}
