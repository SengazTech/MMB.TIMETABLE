import type { Day, Session, TimePeriod } from '../types'

// Time periods exactly as they appear as columns in the source image.
// The 12:00–13:00 slot is a visual break (grey column), not a session slot.
export const TIME_PERIODS: TimePeriod[] = [
  { id: 'p1', startTime: '05:00', endTime: '06:00', label: '05:00–06:00' },
  { id: 'p2', startTime: '08:00', endTime: '10:00', label: '08:00–10:00' },
  { id: 'p3', startTime: '10:00', endTime: '12:00', label: '10:00–12:00' },
  { id: 'pbreak', startTime: '12:00', endTime: '13:00', label: '12:00–13:00', isBreak: true },
  { id: 'p5', startTime: '13:00', endTime: '15:00', label: '13:00–15:00' },
  { id: 'p6', startTime: '15:00', endTime: '17:00', label: '15:00–17:00' },
  { id: 'p7', startTime: '19:30', endTime: '22:00', label: '19:30–22:00' },
]

export const DAYS: Day[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

// Every entry below is transcribed directly from the uploaded timetable image.
// Room/subject codes are kept exactly as shown (e.g. "A11-BIO", "BIO-LB 1") —
// they are intentionally NOT split, corrected, or reformatted.
const raw: Array<[Day, string, string, string]> = [
  // day, periodId, title (exact code), type:color
  ['Monday', 'p1', 'MATHS', 'self-study:green'],
  ['Monday', 'p2', 'A11-BIO', 'lecture:black'],
  ['Monday', 'p3', 'B6-PHY', 'lecture:black'],
  ['Monday', 'p5', 'CHEM-LB', 'lecture:black'],
  ['Monday', 'p6', 'A12-COMP', 'lecture:black'],
  ['Monday', 'p7', 'BIO', 'self-study:green'],

  ['Tuesday', 'p1', 'MATHS', 'self-study:green'],
  ['Tuesday', 'p2', 'A7-MATHS', 'lecture:black'],
  ['Tuesday', 'p3', 'C1-CHEM', 'lecture:black'],
  ['Tuesday', 'p5', 'COMP', 'self-study:green'],
  ['Tuesday', 'p6', 'CHEM', 'self-study:green'],
  ['Tuesday', 'p7', 'PHY', 'self-study:green'],

  ['Wednesday', 'p1', 'MATHS', 'self-study:green'],
  ['Wednesday', 'p2', 'PHY-LB', 'lecture:black'],
  ['Wednesday', 'p3', 'C6-CHEM', 'lecture:black'],
  ['Wednesday', 'p5', 'CHEM', 'self-study:green'],
  ['Wednesday', 'p6', 'A4-ACOS', 'lecture:black'],
  ['Wednesday', 'p7', 'PHY', 'self-study:green'],

  ['Thursday', 'p1', 'MATHS', 'self-study:green'],
  ['Thursday', 'p2', 'BIO-LB 1', 'lecture:black'],
  ['Thursday', 'p3', 'BIO-LB 1', 'lecture:black'],
  ['Thursday', 'p5', 'C1-PHY', 'lecture:black'],
  ['Thursday', 'p6', 'B13-ACOS', 'lecture:black'],
  ['Thursday', 'p7', 'COMP', 'self-study:green'],

  ['Friday', 'p1', 'MATHS', 'self-study:green'],
  ['Friday', 'p2', 'CL-COMP', 'lecture:black'],
  ['Friday', 'p3', 'A8-MATH', 'lecture:black'],
  ['Friday', 'p5', 'BIO', 'self-study:green'],
  ['Friday', 'p6', 'COMP', 'self-study:green'],
  ['Friday', 'p7', 'ACOS', 'self-study:green'],

  // Saturday: 05:00, 08:00, 10:00 slots are empty in the source image
  ['Saturday', 'p5', 'BIBLE STUDY', 'personal:green'],
  ['Saturday', 'p6', 'ACOS', 'self-study:green'],
  ['Saturday', 'p7', 'CHEM', 'self-study:green'],

  ['Sunday', 'p1', 'PHY', 'self-study:green'],
  ['Sunday', 'p2', 'CHURCH', 'personal:black'],
  ['Sunday', 'p3', 'CHURCH', 'personal:black'],
  ['Sunday', 'p5', 'ACOS', 'personal:green'],
  ['Sunday', 'p6', 'MPHAKATI', 'personal:green'],
  ['Sunday', 'p7', 'BIO', 'self-study:green'],
]

function buildSessions(): Session[] {
  const periodsById = Object.fromEntries(TIME_PERIODS.map((p) => [p.id, p]))
  return raw.map(([day, periodId, title, typeColor], index) => {
    const [type, color] = typeColor.split(':') as [Session['type'], Session['color']]
    const period = periodsById[periodId]
    return {
      id: `${day.toLowerCase()}-${periodId}-${index}`,
      day,
      periodId,
      startTime: period.startTime,
      endTime: period.endTime,
      title,
      type,
      color,
    }
  })
}

// The original, immutable timetable — used for "Reset to Original Timetable".
export const ORIGINAL_TIMETABLE: Session[] = buildSessions()
