# HabitFlow Frontend

HabitFlow is a mobile-first habit tracker. This repository contains the web client: a React 19 + TypeScript single-page app built with Vite, styled with Tailwind CSS and shadcn/ui components, with global state in Zustand and a REST backend reached through Axios.

Users can sign up or log in, create habits with a frequency, colour and optional goal, tick them off each day, and see their progress as stats, a monthly calendar and a completion-rate chart.

> **Status:** early development (`v0.0.0`). 

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [Backend API contract](#backend-api-contract)
- [Data model](#data-model)
- [Theming](#theming)
- [Adding UI components](#adding-ui-components)
- [Known limitations](#known-limitations)
- [Contributing](#contributing)

---

## Features

| Area | What it does |
| --- | --- |
| **Authentication** | Login, sign-up (with password confirmation) and forgot-password screens. The JWT returned by the backend is stored in `localStorage` and attached to every request. |
| **Dashboard** | Today's date, quick stats (today's completed/total, longest streak, weekly rate), the list of habits with a completion toggle, and a completion-rate chart. |
| **Add habit** | Name, frequency (`daily`, `weekly`, `custom`), days of the week for non-daily habits, optional goal, and one of six accent colours. |
| **Calendar** | Month view with previous/next navigation. Each day is colour-coded as *complete*, *partial* or *skipped*. |
| **Completion chart** | Area chart (Recharts) with a period switcher: month, 6 months, year. |
| **Settings** | Dark/light mode toggle, daily-reminder toggle and time, data export, logout and account deletion. |
| **Navigation** | Fixed bottom tab bar: Home, Add, Calendar, Settings. |

---

## Tech stack

| Concern | Library |
| --- | --- |
| Framework | [React 19](https://react.dev) |
| Language | TypeScript 6 |
| Build tool / dev server | [Vite 8](https://vite.dev) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com), `tw-animate-css` |
| UI primitives | [shadcn/ui](https://ui.shadcn.com) on [Radix UI](https://www.radix-ui.com) |
| Icons | [lucide-react](https://lucide.dev) |
| State management | [Zustand 5](https://zustand.docs.pmnd.rs) |
| HTTP client | [Axios](https://axios-http.com) |
| Charts | [Recharts 3](https://recharts.org) |
| Dates | `date-fns`, `react-day-picker` |
| Font | Geist (via `@fontsource-variable/geist`) |
| Linting | ESLint 10 with `typescript-eslint`, `react-hooks` and `react-refresh` plugins |

---

## Getting started

### Prerequisites

- **Node.js 20.19+ or 22.12+** (required by Vite 8)
- **npm** (a `package-lock.json` is committed)
- A running **HabitFlow backend** that exposes the [API below](#backend-api-contract). Without one the UI loads, but every data request fails.

### 1. Install dependencies

```bash
git clone <repo-url>
cd HabitFlow-Frontend
npm install
```

### 2. Configure the API URL

Create a `.env.local` file in the project root:

```env
VITE_API_URL=http://localhost:5000
```

### 3. Run the dev server

```bash
npm run dev
```

Vite prints the local URL, usually <http://localhost:5173>.

### 4. Build for production

```bash
npm run build     # type-checks with tsc -b, then bundles into dist/
npm run preview   # serves dist/ locally so you can check the build
```

`dist/` is a static bundle. You can host it on any static host (Netlify, Vercel, S3 + CloudFront, Nginx and so on). Because the app doesn't use URL routing, no SPA fallback rewrite is needed except for the `/login` redirect described under [Known limitations](#known-limitations).

---

## Configuration

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `VITE_API_URL` | No | `http://localhost:5000` | Base URL of the HabitFlow backend. All API paths are appended to it, for example `${VITE_API_URL}/api/habits`. |

Vite exposes only variables prefixed with `VITE_` to client code, and it bakes them in **at build time**. If you change the value, restart `npm run dev` or rebuild. Don't put secrets in these variables: they end up in the public JavaScript bundle.

---

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with hot module replacement. |
| `npm run build` | Runs a TypeScript project build (`tsc -b`), then a production Vite build into `dist/`. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint over the whole project. |

---

## Project structure

```
HabitFlow-Frontend/
├── index.html                 # Vite HTML entry
├── vite.config.ts             # Vite config; defines the "@" → src/ alias
├── tailwind.config.js         # Tailwind theme (shadcn CSS-variable tokens)
├── postcss.config.js
├── components.json            # shadcn/ui CLI configuration
├── eslint.config.js
├── tsconfig*.json
├── public/                    # Static assets served as-is
└── src/
    ├── main.tsx               # React root
    ├── App.tsx                # App shell: auth gate, view switcher, nav
    ├── index.css              # Tailwind layers, theme tokens, light-mode overrides
    ├── App.css
    ├── assets/
    ├── components/
    │   ├── auth.tsx           # Login / sign-up / forgot-password page
    │   ├── dashboard.tsx      # Home screen
    │   ├── quickStats.tsx     # Three stat tiles on the dashboard
    │   ├── habitCard.tsx      # Single habit row with completion toggle
    │   ├── completionChart.tsx# Recharts area chart with a period switcher
    │   ├── calendar.tsx       # Monthly status calendar
    │   ├── addHabitModal.tsx  # "Add habit" page (exports AddHabitPage)
    │   ├── settings.tsx       # Preferences and account actions
    │   ├── navigation.tsx     # Bottom tab bar
    │   └── ui/                # shadcn/ui primitives (button, card, dialog, …)
    ├── hooks/                 # One hook per screen or component; holds the logic
    │   ├── useApp.ts
    │   ├── useAuth.ts
    │   ├── useHabits.ts       # useHabits, useCompletions, useAnalytics
    │   ├── useAddHabit.ts
    │   ├── useHabitCard.ts
    │   ├── useCalendar.ts
    │   ├── useCompletionChart.ts
    │   ├── useNavigation.ts
    │   └── useSettings.ts
    ├── services/
    │   └── api.ts             # Axios instance, interceptors and typed service objects
    ├── store/
    │   └── habitStore.ts      # Zustand store and shared domain types
    └── lib/
        └── utils.ts           # cn() class-name helper
```

Import from `src/` with the `@/` alias, for example `import { useHabitStore } from '@/store/habitStore'`.

---

## Architecture

### Component → hook → store/service

Each screen follows the same three layers:

1. **Components** (`src/components/*.tsx`) render only. They read everything they need from a hook.
2. **Hooks** (`src/hooks/*.ts`) hold local form state, validation and event handlers, and call the API.
3. **Store** (`src/store/habitStore.ts`) holds state that several screens share. **Services** (`src/services/api.ts`) handle all HTTP traffic.

```
AddHabitPage ──► useAddHabit ──► habitService.create() ──► POST /api/habits
                       │
                       └──► useHabitStore.addHabit() / setCurrentView('dashboard')
```

New features should follow this pattern: put logic in a hook and keep the component presentational.

### Global state (Zustand)

`useHabitStore` is a single store with these slices:

| Slice | Fields | Notes |
| --- | --- | --- |
| Auth | `user`, `token`, `isAuthenticated`, `setUser`, `setToken`, `logout` | `token` is read from and written to `localStorage['token']`. `logout()` also clears habits and completions. |
| Habits | `habits`, `setHabits`, `addHabit`, `updateHabit`, `deleteHabit` | |
| Completions | `completions`, `setCompletions`, `addCompletion`, `toggleCompletion` | `toggleCompletion` is a local-only toggle. The dashboard uses `useCompletions().toggleHabitCompletion`, which calls the API. |
| Analytics | `analytics`, `setAnalytics` | |
| UI | `darkMode`, `setDarkMode`, `currentView`, `setCurrentView`, `isLoading`, `error` | `darkMode` is stored in `localStorage['theme']`. |

### Navigation

The app has **no URL router**. The current screen is the store's `currentView` (`'dashboard' | 'calendar' | 'settings' | 'addHabit'`), and `App.tsx` renders the matching component. To move between screens, call `setCurrentView(...)` from the store or from `useNavigation()`.

`react-router-dom` is installed but not used yet.

### HTTP layer

`src/services/api.ts` creates one Axios instance (`apiClient`) with two interceptors:

- **Request:** if `localStorage['token']` is set, it adds `Authorization: Bearer <token>`.
- **Response:** on a `401`, it removes the token and redirects the browser to `/login`.

API calls are grouped into typed service objects: `authService`, `habitService`, `completionService`, `analyticsService` and `userService`.

Hooks read errors from `err.response.data.message`, so the backend should return `{ "message": "..." }` in error responses.

---

## Backend API contract

The frontend expects the backend to provide the endpoints below. Paths are relative to `VITE_API_URL`, and every endpoint except the auth ones expects a Bearer token.

### Auth: `authService`

| Method | Path | Body | Response |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | `{ email, password, name }` | `{ token, user }` |
| POST | `/api/auth/login` | `{ email, password }` | `{ token, user }` |
| POST | `/api/auth/refresh-token` | none | `{ token, user }` |
| POST | `/api/auth/forgot-password` | `{ email }` | any 2xx |

### Habits: `habitService`

| Method | Path | Body | Response |
| --- | --- | --- | --- |
| GET | `/api/habits` | none | `{ habits: Habit[], summary?: {...} }` |
| GET | `/api/habits/:habitId` | none | `Habit` |
| POST | `/api/habits` | `Habit` without `habitId`, `createdAt`, `updatedAt` | `Habit` |
| PUT | `/api/habits/:habitId` | `Partial<Habit>` | `Habit` |
| DELETE | `/api/habits/:habitId` | none | any 2xx |

### Completions: `completionService`

| Method | Path | Params / body | Response |
| --- | --- | --- | --- |
| GET | `/api/completions/today` | none | `{ completions: Completion[] }` |
| GET | `/api/completions?date=YYYY-MM-DD` | none | `{ completions: Completion[] }` |
| GET | `/api/completions/habit/:habitId` | `?fromDate&toDate` | `{ completions: Completion[] }` |
| POST | `/api/completions` | `{ habitId, completedDate, isCompleted, notes? }` | `Completion` |
| PUT | `/api/completions/:completionId` | `Partial<Completion>` | `Completion` |
| DELETE | `/api/completions/:completionId` | none | any 2xx |

### Analytics: `analyticsService`

| Method | Path | Params | Response |
| --- | --- | --- | --- |
| GET | `/api/analytics/summary` | none | `Analytics` |
| GET | `/api/analytics/completion-rate` | `?period=month\|6m\|year` | `{ date, completion }[]` |
| GET | `/api/analytics/calendar` | `?month&year` | `{ date, dayStatus: 'complete'\|'partial'\|'skipped' }[]` |
| GET | `/api/analytics/streaks/:habitId` | none | not yet typed |

### User: `userService`

| Method | Path | Body | Response |
| --- | --- | --- | --- |
| GET / PUT | `/api/user/settings` | settings object (PUT) | settings object |
| GET / PUT | `/api/user/profile` | `Partial<User>` (PUT) | `User` |
| POST | `/api/user/change-password` | `{ oldPassword, newPassword }` | any 2xx |
| DELETE | `/api/user/account` | none | any 2xx |
| GET | `/api/user/export-data` | none | file (blob) |

---


```



## Theming

- **Dark mode is the default.** The preference is stored in `localStorage['theme']` as `'dark'` or `'light'`.
- `useApp` toggles a `light` class on `<body>`. `src/index.css` then remaps the Tailwind slate utilities (`bg-slate-900`, `text-white` and so on) to light colours under `body.light`, so components can use the dark palette directly.
- The shadcn/ui primitives in `src/components/ui/` use the CSS-variable tokens (`--background`, `--primary`, …) defined in `index.css` and `tailwind.config.js`.
- Habit accent colours come from the `COLORS` list in `src/hooks/useAddHabit.ts`: Coral, Teal, Purple, Amber, Blue and Pink.

---

## Adding UI components

The project is set up for the shadcn/ui CLI (see `components.json`). To add a primitive:

```bash
npx shadcn@latest add <component>
```

Generated files go in `src/components/ui/`. Use `cn()` from `@/lib/utils` to merge class names.

---




## Contributing

1. Branch from `Development`. `main` is the release branch.
2. Keep the component → hook → service/store layering described in [Architecture](#architecture).
3. Run `npm run lint` and `npm run build` before you open a PR. The build also type-checks the project.
4. Use [Conventional Commits](https://www.conventionalcommits.org) messages (`feat:`, `fix:`, `docs:` …), as the existing history does.
5. Open a pull request against `Development` that describes the change, and add screenshots for UI changes.

Bug reports and feature requests are welcome as issues.
