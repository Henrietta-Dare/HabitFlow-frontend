import { useState, useEffect } from 'react'

interface ChartDataPoint {
  date: string
  completion: number
}

export const useCompletionChart = (onPeriodChange?: (period: 'month' | '6m' | 'year') => Promise<ChartDataPoint[]>) => {
  const [period, setPeriod] = useState<'month' | '6m' | 'year'>('month')
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (onPeriodChange) {
        setIsLoading(true)
        try {
          const data = await onPeriodChange(period)
          setChartData(data)
        } finally {
          setIsLoading(false)
        }
      } else {
        setChartData([
          { date: '1', completion: 65 },
          { date: '6', completion: 72 },
          { date: '11', completion: 68 },
          { date: '16', completion: 78 },
          { date: '21', completion: 82 },
          { date: '26', completion: 88 },
          { date: '30', completion: 92 },
        ])
      }
    }

    fetchData()
  }, [period, onPeriodChange])

  return {
    period,
    setPeriod,
    chartData,
    isLoading,
  }
}
