# HabitFlow Frontend

HabitFlow is a React + Vite habit-tracking frontend built to help users log daily habits, view progress, and manage preferences in a clean mobile-first interface.

## Features

- Login / signup / forgot password screens
- Habit creation flow with frequency, and custom schedule
- Interactive dashboard with habit cards and completion toggle
- Calendar view with status visualization
- Analytics chart for completion rate
- Global dark/light mode persisted in local storage
- Settings page for profile, preferences, export data, and account actions
- Centralized global state using Zustand
- API integration via Axios with auth token support

## Tech stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Zustand
- Axios
- Recharts
- Radix UI + shadcn-style components

## Installation

```bash
git clone <repo-url>
cd HabitFlow-Frontend
npm install
```

## Environment

Create a `.env` or `.env.local` file with the API backend URL:

```env
VITE_API_URL=http://localhost:5000
```

## Development

```bash
npm run dev
```

Open the app at the local URL shown in the terminal.

## Build

```bash
npm run build
```

## Scripts

- `npm run dev` — start local development server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run preview` — preview production build

## Project structure

- `src/App.tsx` — main app shell and view routing
- `src/store/habitStore.ts` — global Zustand state for auth, habits, analytics, theme, and navigation
- `src/components/` — page and UI components
- `src/hooks/` — reusable hooks for app state and behavior
- `src/services/api.ts` — Axios client and backend service methods
- `src/components/ui/` — shared form and layout primitives

## Notes

- Auth flow uses token persistence in `localStorage`
- Dark mode is stored in `localStorage` and applied globally
- Navigation is handled via `currentView` state rather than a router
- The app is designed for quick habit entry and tracking with a mobile-friendly layout

## Contributing

Contributions are welcome. Open an issue or PR for enhancements, bug fixes, or feature requests.
