# MMB Study Timetable

A production-quality, fully responsive weekly timetable app for Medical
Microbiology (MMB), built from the uploaded timetable image. React + TypeScript
+ Vite + Tailwind CSS.

## Run it locally

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
# 1. Unzip the project, then move into it
cd mmb-timetable

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`) in your browser —
or on your phone's browser if it's on the same Wi-Fi network, using the
"Network" URL Vite also prints.

## Build for production

```bash
npm run build
npm run preview   # serve the production build locally to test it
```

The build output goes to `dist/` — you can deploy that folder to any static
host (Netlify, Vercel, GitHub Pages, etc.).

## Project structure

```
src/
  data/timetable.ts       Source-of-truth timetable data (from your image)
  types.ts                TypeScript types for sessions, filters, etc.
  utils/time.ts           Time formatting, countdowns, "next session" logic
  utils/subject.ts        Subject grouping for the Subject filter
  hooks/useLocalStorage.ts  Persists edits, notes, and theme across visits
  hooks/useCurrentTime.ts   Ticks every 30s to keep "now" indicators live
  components/             One file per UI piece (see below)
  App.tsx                 Wires everything together
```

### Key components

- **Header** — title, live day/date/time, color legend
- **DashboardStats** — total sessions, lecture/self-study/personal counts, weekly hours, today's count
- **NextSession** — next upcoming session with a live countdown
- **SearchBar / FilterPanel** — search by subject/room/day/type, filter by day/type/subject/period
- **DaySelector** — mobile day tabs
- **TimetableGrid** — full desktop weekly grid, with the 12:00–13:00 break column visually distinct and a live "NOW" highlight
- **MobileAgenda** — genuinely mobile-first daily agenda (not a squeezed table)
- **TimetableCard** — the clickable session card (color-coded black = lecturer, green = self-study/personal)
- **SessionModal** — full details, notes (saved locally), mark-complete, study timer, and (in edit mode) inline editing + delete
- **StudyTimer** — simple start/pause/reset stopwatch for self-study sessions
- **EditTimetable** — toggle edit mode, add sessions, print/export/import data, reset to the original timetable
- **WeeklySummary** — sessions-per-day bar overview and completion progress

## Data notes

Every subject/room code (e.g. `A11-BIO`, `BIO-LB 1`, `CL-COMP`) is kept
**exactly** as it appears in your uploaded image — nothing was reformatted,
split, or "corrected." Colors are preserved from the source: black entries
are lecturer/fixed classes, green entries are self-study or personal
activities (including `CHURCH`, which is marked black in the source image
even though it's categorized as a personal activity for filtering).

## Editing the timetable

Click **Edit timetable** to turn on edit mode. You can then:
- Add new sessions via **Add session**
- Click any existing session to edit its title, day, time, or type, or delete it
- Use **Reset to original** at any time to restore exactly the timetable from your image

All edits, notes, completion status, and your theme preference are saved in
your browser's `localStorage`, so they persist between visits on the same
device/browser. Use **Export data** / **Import data** to back up or move your
data between devices.
