import { useHabitStore } from '@/store/habitStore'
import { useHabits, useCompletions, useAnalytics } from '@/hooks/useHabits'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CompletionChart } from './completionChart'
import { QuickStats } from './quickStats'
import { HabitCard } from './habitCard'

export function Dashboard() {
  const { habits } = useHabits()
  const { completions, toggleHabitCompletion } = useCompletions()
  const { analytics } = useAnalytics()
  const { setCurrentView } = useHabitStore()

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const isHabitCompletedToday = (habitId: string): boolean => {
    const today = new Date().toISOString().split('T')[0]
    return completions.some(
      (c) => c.habitId === habitId && c.completedDate === today && c.isCompleted
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-900 to-amber-900 rounded-lg p-4 mb-4">
        <p className="text-sm text-slate-300 font-medium">Today</p>
        <p className="text-2xl font-bold text-white mt-1">{dateStr}</p>
      </div>

      <QuickStats stats={analytics ?? undefined} />

      <Card className="bg-slate-800 border-slate-700 p-4">
        <CardHeader>
          <CardTitle className="text-white">Today's Habits</CardTitle>
        </CardHeader>
        <CardContent>
          {habits.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400 mb-3">No habits yet</p>
              <Button
                onClick={() => setCurrentView('addHabit')}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium bg-transparent hover:bg-slate-700"
              >
                Create your first habit →
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.habitId}
                  habit={habit}
                  isCompleted={isHabitCompletedToday(habit.habitId)}
                  onToggle={() =>
                    toggleHabitCompletion(
                      habit.habitId,
                      new Date().toISOString().split('T')[0]
                    )
                  }
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CompletionChart analyticsData={analytics ?? undefined} />
    </div>
  )
}