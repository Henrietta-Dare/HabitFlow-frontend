import { useAddHabit } from '@/hooks/useAddHabit'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AddHabitPage() {
  const {
    isLoading,
    error,
    habitName,
    setHabitName,
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
  } = useAddHabit()

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-6">
      <div className="flex items-start justify-between gap-4 rounded-xl bg-gradient-to-r from-purple-900 to-amber-900 p-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Add Habit</h1>
          <p className="text-sm text-slate-200 mt-1">Create a new habit to track your progress.</p>
        </div>
      </div>

      <div className="space-y-6">
          <div>
            <Label className="text-white mb-2 block">Habit name</Label>
            <Input
              placeholder="e.g., Meditation, Read, Workout"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
            <p className="text-xs text-slate-400 mt-1">Keep it short and specific</p>
          </div>

          
          <div>
            <Label className="text-white mb-2 block">Frequency</Label>
            <div className="space-y-2">
              {(['daily', 'weekly', 'custom'] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={`w-full p-3 rounded-lg text-left transition-all border ${
                    frequency === freq
                      ? 'bg-purple-600 border-purple-400'
                      : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <p
                    className={`font-medium ${
                      frequency === freq ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </p>
                  <p
                    className={`text-xs ${
                      frequency === freq ? 'text-purple-100' : 'text-slate-400'
                    }`}
                  >
                    {freq === 'daily' && 'Every day'}
                    {freq === 'weekly' && 'X times per week'}
                    {freq === 'custom' && 'Set your own pattern'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {(frequency === 'weekly' || frequency === 'custom') && (
            <div>
              <Label className="text-white mb-2 block">Days per week</Label>
              <div className="grid grid-cols-7 gap-2">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day)}
                    className={`p-2 rounded text-xs font-medium transition-all ${
                      selectedDays[day]
                        ? 'bg-purple-600 text-white border border-purple-400'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {day.substring(0, 1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label className="text-white mb-2 block">Goal (optional)</Label>
            <Input
              placeholder="e.g., 30 minutes, 8 glasses, 5 pages"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Color</Label>
            <div className="grid grid-cols-6 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-10 h-10 rounded-lg transition-all border-2 ${
                    selectedColor === color.value
                      ? 'border-white scale-110'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? 'Creating...' : 'Create Habit'}
            </Button>
            <Button
              onClick={handleClose}
              disabled={isLoading}
              variant="outline"
              className="flex-1 bg-slate-800 hover:bg-slate-700 border-slate-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
  )
}