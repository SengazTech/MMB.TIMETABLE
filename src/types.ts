export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type SessionType = 'lecture' | 'self-study' | 'personal'

// The visual color exactly as marked in the source timetable image.
// Kept independent from `type` because a small number of entries (e.g. CHURCH)
// are marked black in the source image while belonging to a personal category.
export type SessionColor = 'black' | 'green'

export interface TimePeriod {
  id: string
  startTime: string // "HH:MM" 24hr
  endTime: string // "HH:MM" 24hr
  isBreak?: boolean
  label: string // display label, e.g. "05:00–06:00"
}

export interface Session {
  id: string
  day: Day
  periodId: string
  startTime: string
  endTime: string
  title: string
  code?: string // room/class code, e.g. "A11-BIO"
  type: SessionType
  color: SessionColor
}

export interface SessionMeta {
  notes: string
  completed: boolean
}

export type SessionMetaMap = Record<string, SessionMeta>

export interface FilterState {
  day: Day | 'All'
  type: SessionType | 'All'
  subject: string // free text, matched against title/code
  period: string | 'All' // periodId
}
