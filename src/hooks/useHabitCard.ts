import { useState } from 'react'

export const useHabitCard = (onToggle: () => Promise<void>) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      await onToggle()
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleToggle }
}
