import { useState } from 'react'
import { useHabitStore } from '@/store/habitStore'
import { habitService } from '@/services/api'

export const COLORS = [
  { name: 'Coral', value: '#d85a30' },
  { name: 'Teal', value: '#0f6e56' },
  { name: 'Purple', value: '#534ab7' },
  { name: 'Amber', value: '#ba7517' },
  { name: 'Blue', value: '#378add' },
  { name: 'Pink', value: '#d4537e' },
]

export const useAddHabit = () => {
  const { addHabit, setCurrentView } = useHabitStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [habitName, setHabitName] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'custom'>('daily')
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({})
  const [goal, setGoal] = useState('')
  const [selectedColor, setSelectedColor] = useState('#534ab7')

  const resetForm = () => {
    setHabitName('')
    setSelectedEmoji(null)
    setFrequency('daily')
    setSelectedDays({})
    setGoal('')
    setSelectedColor('#534ab7')
    setError(null)
  }

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }))
  }

  const handleClose = () => {
    resetForm()
    setCurrentView('dashboard')
  }

  const handleSubmit = async () => {
    if (!habitName.trim()) {
      setError('Please enter a habit name')
      return
    }

    if (!selectedEmoji) {
      setError('Please select an emoji')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const habitData = {
        name: habitName,
        emoji: selectedEmoji,
        color: selectedColor,
        frequency,
        goal: goal || undefined,
        selectedDays:
          frequency !== 'daily'
            ? Object.keys(selectedDays).filter((d) => selectedDays[d])
            : undefined,
        isActive: true,
        currentStreak: 0,
        longestStreak: 0,
      }

      const response = await habitService.create(habitData as any)
      addHabit(response.data)
      handleClose()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create habit')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    habitName,
    setHabitName,
    selectedEmoji,
    setSelectedEmoji,
    frequency,
    setFrequency,
    selectedDays,
    handleDayToggle,
    goal,
    setGoal,
    selectedColor,
    setSelectedColor,
    handleSubmit,
    handleClose,
    COLORS,
    DAYS,
    // EMOJIS,
  }
}
