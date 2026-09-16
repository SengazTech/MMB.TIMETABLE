import { useEffect, useState } from 'react'

/** Re-renders every 30s so "now" indicators and countdowns stay fresh. */
export function useCurrentTime(intervalMs = 30000): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return now
}
