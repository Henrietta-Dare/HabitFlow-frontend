import { create } from 'zustand'

export interface User {
  id: string
  email: string
  name: string
  darkMode?: boolean
  reminderTime?: string
}

export interface Habit {
  habitId: string
  name: string
  emoji: string
  color: string
  frequency: 'daily' | 'weekly' | 'custom'
  goal?: string
  selectedDays?: string[]
  isActive: boolean
  currentStreak: number
  longestStreak: number
  createdAt: string
  updatedAt: string
}

export interface Completion {
  completionId: string
  habitId: string
  completedDate: string
  isCompleted: boolean
  notes?: string
  createdAt: string
}

export interface Analytics {
  todayCompleted: number
  todayTotal: number
  weekCompletionRate: number
  longestStreak: number
  activeDays: number
  avgCompletion: number
  perfectWeeks: number
}

interface HabitStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void

  habits: Habit[]
  setHabits: (habits: Habit[]) => void
  addHabit: (habit: Habit) => void
  updateHabit: (habitId: string, updatedHabit: Partial<Habit>) => void
  deleteHabit: (habitId: string) => void

  completions: Completion[]
  setCompletions: (completions: Completion[]) => void
  addCompletion: (completion: Completion) => void
  toggleCompletion: (habitId: string, date: string) => void

  analytics: Analytics | null
  setAnalytics: (analytics: Analytics) => void

  darkMode: boolean
  setDarkMode: (isDarkMode: boolean) => void

  currentView: 'dashboard' | 'calendar' | 'settings' | 'addHabit'
  setCurrentView: (view: 'dashboard' | 'calendar' | 'settings' | 'addHabit') => void

  isLoading: boolean
  setLoading: (loading: boolean) => void

  error: string | null
  setError: (error: string | null) => void
  clearError: () => void
}

export const useHabitStore = create<HabitStore>((set, get) => ({
  user: null,
  token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: typeof localStorage !== 'undefined' ? !!localStorage.getItem('token') : false,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (typeof localStorage !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    }
    set({ token, isAuthenticated: !!token })
  },
  logout: () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token')
    }
    set({ user: null, token: null, isAuthenticated: false, habits: [], completions: [] })
  },

  habits: [],
  setHabits: (habits) => set({ habits }),
  addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
  updateHabit: (habitId, updatedHabit) =>
    set((state) => ({
      habits: state.habits.map((h) => (h.habitId === habitId ? { ...h, ...updatedHabit } : h)),
    })),
  deleteHabit: (habitId) =>
    set((state) => ({
      habits: state.habits.filter((h) => h.habitId !== habitId),
    })),

  completions: [],
  setCompletions: (completions) => set({ completions }),
  addCompletion: (completion) =>
    set((state) => ({
      completions: [...state.completions, completion],
    })),
  toggleCompletion: (habitId, date) => {
    const state = get()
    const existing = state.completions.find((c) => c.habitId === habitId && c.completedDate === date)

    if (existing) {
      set((state) => ({
        completions: state.completions.filter(
          (c) => !(c.habitId === habitId && c.completedDate === date)
        ),
      }))
    } else {
      set((state) => ({
        completions: [
          ...state.completions,
          {
            completionId: `${habitId}-${date}`,
            habitId,
            completedDate: date,
            isCompleted: true,
            createdAt: new Date().toISOString(),
          } as Completion,
        ],
      }))
    }
  },

  analytics: null,
  setAnalytics: (analytics) => set({ analytics }),

  darkMode: typeof localStorage !== 'undefined' ? localStorage.getItem('theme') !== 'light' : true,
  setDarkMode: (isDarkMode) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    }
    set({ darkMode: isDarkMode })
  },

  currentView: 'dashboard',
  setCurrentView: (view) => set({ currentView: view }),

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))