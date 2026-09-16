import type { Day, Session } from '../types'

export const DAY_ORDER: Day[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export function getTodayName(date: Date = new Date()): Day {
  return DAY_ORDER[date.getDay()]
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function nowMinutes(date: Date = new Date()): number {
  return date.getHours() * 60 + date.getMinutes()
}

export function formatTime12(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`
}

export function durationLabel(start: string, end: string): string {
  const mins = timeToMinutes(end) - timeToMinutes(start)
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (h && m) return `${h}h ${m}m`
  if (h) return `${h}h`
  return `${m}m`
}

export function isSessionActive(session: Session, day: Day, minutesNow: number): boolean {
  if (session.day !== day) return false
  return minutesNow >= timeToMinutes(session.startTime) && minutesNow < timeToMinutes(session.endTime)
}

/**
 * Finds the next upcoming session relative to `date`, searching forward
 * through the week (today first, then following days) using DAY_ORDER.
 */
export function findNextSession(sessions: Session[], date: Date = new Date()): Session | null {
  const todayIndex = date.getDay()
  const minutesNow = nowMinutes(date)

  for (let offset = 0; offset < 8; offset++) {
    const dayIndex = (todayIndex + offset) % 7
    const day = DAY_ORDER[dayIndex]
    const candidates = sessions
      .filter((s) => s.day === day)
      .filter((s) => (offset === 0 ? timeToMinutes(s.startTime) > minutesNow : true))
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))
    if (candidates.length > 0) return candidates[0]
  }
  return null
}

export function countdownLabel(session: Session, date: Date = new Date()): string {
  const today = getTodayName(date)
  let daysAhead = DAY_ORDER.indexOf(session.day) - DAY_ORDER.indexOf(today)
  if (daysAhead < 0) daysAhead += 7

  const target = new Date(date)
  target.setDate(date.getDate() + daysAhead)
  const [h, m] = session.startTime.split(':').map(Number)
  target.setHours(h, m, 0, 0)

  let diffMs = target.getTime() - date.getTime()
  if (diffMs < 0) diffMs += 7 * 24 * 60 * 60 * 1000

  const totalMinutes = Math.round(diffMs / 60000)
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const mins = totalMinutes % 60

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${mins}m`
  return `${mins}m`
}
