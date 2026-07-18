import { useEffect } from 'react'
import { useHabitStore } from '@/store/habitStore'

export const useApp = () => {
  const { currentView, darkMode, isAuthenticated } = useHabitStore()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('light', !darkMode)
    }
  }, [darkMode])

  return { currentView, darkMode, isAuthenticated }
}
