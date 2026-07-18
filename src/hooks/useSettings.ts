import { useState } from 'react'
import { useHabitStore } from '@/store/habitStore'

export const useSettings = () => {
  const { user, logout, darkMode, setDarkMode } = useHabitStore()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [reminderTime, setReminderTime] = useState('09:00')

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout()
    }
  }

  const handleExportData = () => {
    alert('Export functionality will be implemented in the backend')
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure? This action cannot be undone.')) {
      alert('Account deletion will be implemented in the backend')
    }
  }

  return {
    user,
    darkMode,
    setDarkMode,
    notificationsEnabled,
    setNotificationsEnabled,
    reminderTime,
    setReminderTime,
    handleLogout,
    handleExportData,
    handleDeleteAccount,
  }
}
