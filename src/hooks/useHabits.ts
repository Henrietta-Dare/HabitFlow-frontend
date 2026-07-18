import { useEffect } from 'react'
import { useHabitStore } from '@/store/habitStore'
import { habitService, completionService, analyticsService } from '@/services/api'

export const useHabits = () => {
  const { habits, setHabits, isLoading, setLoading, error, setError } = useHabitStore()

  const fetchHabits = async () => {
    setLoading(true)
    try {
      const response = await habitService.getAll()
      setHabits(response.data.habits || [])
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch habits')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (useHabitStore.getState().isAuthenticated) {
      fetchHabits()
    }
  }, [])

  return { habits, isLoading, error, refetch: fetchHabits }
}

export const useCompletions = () => {
  const { completions, setCompletions, isLoading, setLoading, error, setError } = useHabitStore()

  const fetchToday = async () => {
    setLoading(true)
    try {
      const response = await completionService.getToday()
      setCompletions(response.data.completions || [])
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch completions')
    } finally {
      setLoading(false)
    }
  }

  const toggleHabitCompletion = async (habitId: string, date: string) => {
    try {
      const existing = completions.find(
        (c) => c.habitId === habitId && c.completedDate === date
      )

      if (existing) {
        await completionService.delete(existing.completionId)
      } else {
        await completionService.create({
          habitId,
          completedDate: date,
          isCompleted: true,
        })
      }

      await fetchToday()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to toggle completion')
    }
  }

  useEffect(() => {
    if (useHabitStore.getState().isAuthenticated) {
      fetchToday()
    }
  }, [])

  return { completions, isLoading, error, toggleHabitCompletion, refetch: fetchToday }
}

export const useAnalytics = () => {
  const { analytics, setAnalytics, isLoading, setLoading, error, setError } = useHabitStore()

  const fetchSummary = async () => {
    setLoading(true)
    try {
      const response = await analyticsService.getSummary()
      setAnalytics(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch analytics')
    } finally {
      setLoading(false)
    }
  }

  const fetchCompletionRate = async (period: 'month' | '6m' | 'year' = 'month') => {
    try {
      const response = await analyticsService.getCompletionRate(period)
      return response.data
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch completion rate')
      return []
    }
  }

  const fetchCalendarData = async (month: number, year: number) => {
    try {
      const response = await analyticsService.getCalendarData(month, year)
      return response.data
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch calendar data')
      return []
    }
  }

  useEffect(() => {
    if (useHabitStore.getState().isAuthenticated) {
      fetchSummary()
    }
  }, [])

  return {
    analytics,
    isLoading,
    error,
    refetch: fetchSummary,
    fetchCompletionRate,
    fetchCalendarData,
  }
}