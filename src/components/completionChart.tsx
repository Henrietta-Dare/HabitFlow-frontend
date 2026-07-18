import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Analytics } from '@/store/habitStore'
import { useCompletionChart } from '@/hooks/useCompletionChart'

interface CompletionChartProps {
  analyticsData?: Analytics
  onPeriodChange?: (period: 'month' | '6m' | 'year') => Promise<{
    date: string
    completion: number
  }[]>
}

export function CompletionChart({ analyticsData, onPeriodChange }: CompletionChartProps) {
  const { period, setPeriod, chartData, isLoading } = useCompletionChart(onPeriodChange)

  return (
    <Card className="bg-slate-800 border-slate-700 p-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Completion Rate</CardTitle>
          <div className="flex gap-2">
            {(['month', '6m', 'year'] as const).map((p) => (
              <Button
                key={p}
                size="sm"
                variant={period === p ? 'default' : 'outline'}
                className={`text-xs px-2 py-1 h-auto ${
                  period === p
                    ? 'bg-purple-600 hover:bg-purple-700 border-purple-600'
                    : 'bg-slate-700 hover:bg-slate-600 border-slate-600'
                }`}
                onClick={() => setPeriod(p)}
              >
                {p === 'month' ? 'Month' : p === '6m' ? '6M' : 'Year'}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="w-full h-60 bg-slate-900 rounded-lg p-2">
          {chartData.length > 0 && !isLoading ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" domain={[0, 100]} style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Line
                  type="monotone"
                  dataKey="completion"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  isAnimationActive
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              {isLoading ? 'Loading chart...' : 'No data'}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Avg Completion</p>
            <p className="text-xl font-bold text-purple-400">
              {analyticsData?.avgCompletion || 82}%
            </p>
          </div>
          <div className="bg-slate-900 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Active Days</p>
            <p className="text-xl font-bold text-teal-400">
              {analyticsData?.activeDays || 24}/30
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}