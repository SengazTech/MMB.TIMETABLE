import { useState } from 'react'
import { Download, PencilLine, Plus, Printer, RotateCcw, Upload } from 'lucide-react'
import type { Day, Session } from '../types'
import { DAYS, TIME_PERIODS } from '../data/timetable'

interface EditTimetableProps {
  editMode: boolean
  onToggleEditMode: () => void
  onAddSession: (session: Omit<Session, 'id'>) => void
  onReset: () => void
  onExport: () => void
  onImport: (file: File) => void
  onPrint: () => void
}

const emptyDraft = {
  day: 'Monday' as Day,
  periodId: TIME_PERIODS[0].id,
  title: '',
  type: 'self-study' as Session['type'],
}

export default function EditTimetable({
  editMode,
  onToggleEditMode,
  onAddSession,
  onReset,
  onExport,
  onImport,
  onPrint,
}: EditTimetableProps) {
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState(emptyDraft)

  const selectablePeriods = TIME_PERIODS.filter((p) => !p.isBreak)

  function handleAdd() {
    if (!draft.title.trim()) return
    const period = selectablePeriods.find((p) => p.id === draft.periodId) ?? selectablePeriods[0]
    onAddSession({
      day: draft.day,
      periodId: period.id,
      startTime: period.startTime,
      endTime: period.endTime,
      title: draft.title.trim(),
      type: draft.type,
      color: draft.type === 'lecture' ? 'black' : 'green',
    })
    setDraft(emptyDraft)
    setShowForm(false)
  }

  return (
    <div className="no-print space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onToggleEditMode}
          aria-pressed={editMode}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium border transition-colors ${
            editMode
              ? 'bg-navy-800 text-white border-navy-800 dark:bg-navy-100 dark:text-navy-900'
              : 'border-navy-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-700'
          }`}
        >
          <PencilLine size={14} />
          {editMode ? 'Editing timetable' : 'Edit timetable'}
        </button>

        {editMode && (
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-navy-200 dark:border-navy-600 px-3 py-2 text-xs font-medium text-navy-600 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-700"
          >
            <Plus size={14} />
            Add session
          </button>
        )}

        <button
          type="button"
          onClick={onPrint}
          className="flex items-center gap-1.5 rounded-lg border border-navy-200 dark:border-navy-600 px-3 py-2 text-xs font-medium text-navy-600 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-700"
        >
          <Printer size={14} />
          Print / PDF
        </button>

        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-1.5 rounded-lg border border-navy-200 dark:border-navy-600 px-3 py-2 text-xs font-medium text-navy-600 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-700"
        >
          <Download size={14} />
          Export data
        </button>

        <label className="flex items-center gap-1.5 rounded-lg border border-navy-200 dark:border-navy-600 px-3 py-2 text-xs font-medium text-navy-600 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-700 cursor-pointer">
          <Upload size={14} />
          Import data
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onImport(file)
              e.target.value = ''
            }}
          />
        </label>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-lg border border-navy-200 dark:border-navy-600 px-3 py-2 text-xs font-medium text-navy-600 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-700"
        >
          <RotateCcw size={14} />
          Reset to original
        </button>
      </div>

      {showForm && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 rounded-xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800 p-4 shadow-card">
          <label className="col-span-2 sm:col-span-2 flex flex-col gap-1 text-xs font-medium text-navy-500 dark:text-navy-300">
            Title / code
            <input
              type="text"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="e.g. REVISION"
              className="rounded-md border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-900 px-2.5 py-1.5 text-sm text-navy-800 dark:text-navy-100"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-navy-500 dark:text-navy-300">
            Day
            <select
              value={draft.day}
              onChange={(e) => setDraft({ ...draft, day: e.target.value as Day })}
              className="rounded-md border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-900 px-2.5 py-1.5 text-sm text-navy-800 dark:text-navy-100"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-navy-500 dark:text-navy-300">
            Time period
            <select
              value={draft.periodId}
              onChange={(e) => setDraft({ ...draft, periodId: e.target.value })}
              className="rounded-md border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-900 px-2.5 py-1.5 text-sm text-navy-800 dark:text-navy-100"
            >
              {selectablePeriods.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-navy-500 dark:text-navy-300">
            Type
            <select
              value={draft.type}
              onChange={(e) => setDraft({ ...draft, type: e.target.value as Session['type'] })}
              className="rounded-md border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-900 px-2.5 py-1.5 text-sm text-navy-800 dark:text-navy-100"
            >
              <option value="lecture">Lecturer class</option>
              <option value="self-study">Self study</option>
              <option value="personal">Personal</option>
            </select>
          </label>
          <button
            type="button"
            onClick={handleAdd}
            className="col-span-2 sm:col-span-5 justify-self-start rounded-lg bg-study px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
          >
            Add to timetable
          </button>
        </div>
      )}
    </div>
  )
}
