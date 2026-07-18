import type { Analytics, Completion, Habit, User } from '@/store/habitStore'
import axios, { type AxiosInstance } from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)


interface AuthResponse {
  token: string
  user: User
}

interface HabitResponse {
  habits: Habit[]
  summary?: {
    todayCompleted: number
    todayTotal: number
    weekCompletionRate: number
    longestStreak: number
  }
}

interface CompletionResponse {
  completions: Completion[]
}

interface AnalyticsResponse extends Analytics {}


export const authService = {
  signup: (email: string, password: string, name: string) =>
    apiClient.post<AuthResponse>('/api/auth/signup', { email, password, name }),

  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/api/auth/login', { email, password }),

  logout: () => localStorage.removeItem('token'),

  refreshToken: () =>
    apiClient.post<AuthResponse>('/api/auth/refresh-token'),

  forgotPassword: (email: string) =>
    apiClient.post('/api/auth/forgot-password', { email }),
}


export const habitService = {
  getAll: () =>
    apiClient.get<HabitResponse>('/api/habits'),

  getById: (habitId: string) =>
    apiClient.get<Habit>(`/api/habits/${habitId}`),

  create: (habitData: Omit<Habit, 'habitId' | 'createdAt' | 'updatedAt'>) =>
    apiClient.post<Habit>('/api/habits', habitData),

  update: (habitId: string, habitData: Partial<Habit>) =>
    apiClient.put<Habit>(`/api/habits/${habitId}`, habitData),

  delete: (habitId: string) =>
    apiClient.delete(`/api/habits/${habitId}`),
}


export const completionService = {
  getToday: () =>
    apiClient.get<CompletionResponse>('/api/completions/today'),

  getByDate: (date: string) =>
    apiClient.get<CompletionResponse>(`/api/completions?date=${date}`),

  getByHabit: (habitId: string, fromDate: string, toDate: string) =>
    apiClient.get<CompletionResponse>(`/api/completions/habit/${habitId}`, {
      params: { fromDate, toDate },
    }),

  create: (completionData: Omit<Completion, 'completionId' | 'createdAt'>) =>
    apiClient.post<Completion>('/api/completions', completionData),

  update: (completionId: string, completionData: Partial<Completion>) =>
    apiClient.put<Completion>(`/api/completions/${completionId}`, completionData),

  delete: (completionId: string) =>
    apiClient.delete(`/api/completions/${completionId}`),
}


export const analyticsService = {
  getSummary: () =>
    apiClient.get<AnalyticsResponse>('/api/analytics/summary'),

  getCompletionRate: (period: 'month' | '6m' | 'year' = 'month') =>
    apiClient.get<{ date: string; completion: number }[]>(
      `/api/analytics/completion-rate?period=${period}`
    ),

  getCalendarData: (month: number, year: number) =>
    apiClient.get<{ date: string; dayStatus: 'complete' | 'partial' | 'skipped' }[]>(
      '/api/analytics/calendar',
      {
        params: { month, year },
      }
    ),

  getStreakHistory: (habitId: string) =>
    apiClient.get(`/api/analytics/streaks/${habitId}`),
}


export const userService = {
  getSettings: () =>
    apiClient.get('/api/user/settings'),

  updateSettings: (settings: Record<string, any>) =>
    apiClient.put('/api/user/settings', settings),

  getProfile: () =>
    apiClient.get<User>('/api/user/profile'),

  updateProfile: (profileData: Partial<User>) =>
    apiClient.put<User>('/api/user/profile', profileData),

  changePassword: (oldPassword: string, newPassword: string) =>
    apiClient.post('/api/user/change-password', {
      oldPassword,
      newPassword,
    }),

  deleteAccount: () =>
    apiClient.delete('/api/user/account'),

  exportData: () =>
    apiClient.get('/api/user/export-data', {
      responseType: 'blob',
    }),
}

export default apiClient