import { useHabitStore } from '@/store/habitStore'

export const useNavigation = () => {
  const { currentView, setCurrentView } = useHabitStore()

  return { currentView, setCurrentView }
}
