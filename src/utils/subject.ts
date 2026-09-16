import type { Session } from '../types'

// Known subject keywords that appear inside the exact codes from the source
// timetable (e.g. "A11-BIO" contains "BIO", "A7-MATHS" contains "MATHS").
// Used only to group/filter — the original title/code string is never altered.
const KNOWN_SUBJECTS = ['BIO', 'PHY', 'CHEM', 'COMP', 'MATHS', 'MATH', 'ACOS']

export function deriveSubject(session: Session): string {
  const upper = session.title.toUpperCase()
  const match = KNOWN_SUBJECTS.find((subj) => upper.includes(subj))
  if (match) return match === 'MATH' ? 'MATHS' : match
  return session.title // e.g. CHURCH, BIBLE STUDY, MPHAKATI — already a subject/activity
}

export function uniqueSubjects(sessions: Session[]): string[] {
  const set = new Set(sessions.map(deriveSubject))
  return Array.from(set).sort()
}
