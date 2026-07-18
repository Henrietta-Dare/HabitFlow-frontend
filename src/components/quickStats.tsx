import { Card, CardContent } from '@/components/ui/card'
import type { Analytics } from '@/store/habitStore'

interface QuickStatsProps {
  stats?: Analytics
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Card className="bg-slate-800 border-slate-700 p-4">
        <CardContent className="pt-4 pb-4 text-center">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Today</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">
            {stats?.todayCompleted || 0}/{stats?.todayTotal || 0}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="pt-4 pb-4 text-center">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Streak</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">
            🔥 {stats?.longestStreak || 0}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="pt-4 pb-4 text-center">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Week</p>
          <p className="text-2xl font-bold text-teal-400 mt-1">
            {stats?.weekCompletionRate || 0}%
          </p>
        </CardContent>
      </Card>
    </div>
  )
}