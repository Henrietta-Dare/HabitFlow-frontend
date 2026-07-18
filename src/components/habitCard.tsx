import { Button } from '@/components/ui/button'
import type { Habit } from '@/store/habitStore'
import { useHabitCard } from '@/hooks/useHabitCard'

interface HabitCardProps {
  habit: Habit
  isCompleted: boolean
  onToggle: () => Promise<void>
}

export function HabitCard({ habit, isCompleted, onToggle }: HabitCardProps) {
  const { isLoading, handleToggle } = useHabitCard(onToggle)

  const getEmojiBgColor = (color: string): string => {
    const colorMap: Record<string, string> = {
      '#d85a30': 'bg-orange-100', // Coral
      '#0f6e56': 'bg-emerald-100', // Teal
      '#534ab7': 'bg-purple-100', // Purple
      '#ba7517': 'bg-amber-100', // Amber
      '#378add': 'bg-blue-100', // Blue
      '#d4537e': 'bg-pink-100', // Pink
    }
    return colorMap[color] || 'bg-slate-100'
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors">
      <div
        className={`w-11 h-11 rounded-full ${getEmojiBgColor(habit.color)} flex items-center justify-center flex-shrink-0`}
      >
        <span className="text-lg">{habit.emoji}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-white truncate">{habit.name}</p>
        <p className="text-xs text-slate-400 mt-0.5">
          +{habit.currentStreak || 0} day streak
        </p>
      </div>

      <Button
        size="sm"
        variant={isCompleted ? 'default' : 'outline'}
        className={`w-10 h-10 rounded-full p-0 flex-shrink-0 transition-all ${
          isCompleted
            ? 'bg-teal-600 hover:bg-teal-700 border-teal-600'
            : 'bg-slate-600 hover:bg-slate-500 border-slate-500'
        }`}
        onClick={handleToggle}
        disabled={isLoading}
      >
        <span className="text-base font-bold">
          {isCompleted ? '✓' : '○'}
        </span>
      </Button>
    </div>
  )
}