import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'

function formatElapsed(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0')
  const s = (totalSeconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function StudyTimer() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [running])

  return (
    <div className="rounded-lg border border-navy-100 dark:border-navy-700 bg-navy-50 dark:bg-navy-900 px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-navy-400">Study timer</p>
        <p className="font-display text-2xl font-semibold text-navy-900 dark:text-white tabular-nums">
          {formatElapsed(seconds)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          aria-label={running ? 'Pause timer' : 'Start timer'}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-study text-white hover:opacity-90"
        >
          {running ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false)
            setSeconds(0)
          }}
          aria-label="Reset timer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-200 dark:border-navy-600 text-navy-500 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-700"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  )
}
