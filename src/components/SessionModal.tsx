import { useEffect, useRef } from 'react'
import { CheckCircle2, Circle, Trash2, X } from 'lucide-react'
import type { Day, Session, SessionMeta } from '../types'
import { DAYS } from '../data/timetable'
import { durationLabel, formatTime12 } from '../utils/time'
import StudyTimer from './StudyTimer'

interface SessionModalProps {
  session: Session
  meta: SessionMeta
  editMode: boolean
  onClose: () => void
  onUpdateMeta: (patch: Partial<SessionMeta>) => void
  onUpdateSession: (patch: Partial<Session>) => void
  onDelete: () => void
}

const TYPE_LABEL: Record<Session['type'], string> = {
  lecture: 'Lecturer class',
  'self-study': 'Self study',
  personal: 'Personal',
}

export default function SessionModal({
  session,
  meta,
  editMode,
  onClose,
  onUpdateMeta,
  onUpdateSession,
  onDelete,
}: SessionModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const isBlack = session.color === 'black'

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-navy-900/50 backdrop-blur-sm no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-white dark:bg-navy-800 shadow-xl max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800 px-5 py-4">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              isBlack ? 'bg-lecture-soft text-lecture dark:bg-navy-700 dark:text-navy-200' : 'bg-study-soft text-study dark:bg-navy-700 dark:text-study-dark'
            }`}
          >
            {TYPE_LABEL[session.type]}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="flex h-8 w-8 items-center justify-center rounded-full text-navy-400 hover:bg-navy-100 dark:hover:bg-navy-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-5">
          <div>
            <h2 id="session-modal-title" className="font-display text-xl font-semibold text-navy-900 dark:text-white">
              {session.title}
            </h2>
            <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">
              {session.day} &middot; {formatTime12(session.startTime)}&ndash;{formatTime12(session.endTime)} &middot;{' '}
              {durationLabel(session.startTime, session.endTime)}
            </p>
          </div>

          {editMode && (
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-navy-100 dark:border-navy-700 p-3.5">
              <label className="col-span-2 flex flex-col gap-1 text-xs font-medium text-navy-500 dark:text-navy-300">
                Title / code
                <input
                  type="text"
                  value={session.title}
                  onChange={(e) => onUpdateSession({ title: e.target.value })}
                  className="rounded-md border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-900 px-2.5 py-1.5 text-sm text-navy-800 dark:text-navy-100"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium text-navy-500 dark:text-navy-300">
                Day
                <select
                  value={session.day}
                  onChange={(e) => onUpdateSession({ day: e.target.value as Day })}
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
                Type
                <select
                  value={session.type}
                  onChange={(e) =>
                    onUpdateSession({
                      type: e.target.value as Session['type'],
                      color: e.target.value === 'lecture' ? 'black' : 'green',
                    })
                  }
                  className="rounded-md border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-900 px-2.5 py-1.5 text-sm text-navy-800 dark:text-navy-100"
                >
                  <option value="lecture">Lecturer class</option>
                  <option value="self-study">Self study</option>
                  <option value="personal">Personal</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium text-navy-500 dark:text-navy-300">
                Start time
                <input
                  type="time"
                  value={session.startTime}
                  onChange={(e) => onUpdateSession({ startTime: e.target.value })}
                  className="rounded-md border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-900 px-2.5 py-1.5 text-sm text-navy-800 dark:text-navy-100"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium text-navy-500 dark:text-navy-300">
                End time
                <input
                  type="time"
                  value={session.endTime}
                  onChange={(e) => onUpdateSession({ endTime: e.target.value })}
                  className="rounded-md border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-900 px-2.5 py-1.5 text-sm text-navy-800 dark:text-navy-100"
                />
              </label>
            </div>
          )}

          <button
            type="button"
            onClick={() => onUpdateMeta({ completed: !meta.completed })}
            className="flex w-full items-center gap-2 rounded-lg border border-navy-100 dark:border-navy-700 px-3.5 py-2.5 text-sm font-medium text-navy-700 dark:text-navy-100 hover:bg-navy-50 dark:hover:bg-navy-700"
          >
            {meta.completed ? (
              <CheckCircle2 size={18} className="text-study dark:text-study-dark" />
            ) : (
              <Circle size={18} className="text-navy-300" />
            )}
            {meta.completed ? 'Marked as completed' : 'Mark as completed'}
          </button>

          {session.type === 'self-study' && <StudyTimer />}

          <div>
            <label htmlFor="session-notes" className="block text-xs font-medium text-navy-500 dark:text-navy-300 mb-1.5">
              Notes
            </label>
            <textarea
              id="session-notes"
              value={meta.notes}
              onChange={(e) => onUpdateMeta({ notes: e.target.value })}
              placeholder="e.g. Read chapter 3 before class, bring lab coat…"
              rows={3}
              className="w-full rounded-lg border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-900 px-3 py-2 text-sm text-navy-800 dark:text-navy-100 placeholder:text-navy-400 focus:border-navy-400"
            />
          </div>

          {editMode && (
            <button
              type="button"
              onClick={onDelete}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-3.5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
            >
              <Trash2 size={15} />
              Delete this session
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
