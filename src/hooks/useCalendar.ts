import { useState, useEffect } from 'react'

type DayStatus = 'complete' | 'partial' | 'skipped'

interface CalendarDay {
  [key: number]: DayStatus
}

export const useCalendar = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [calendarData, setCalendarData] = useState<CalendarDay>({})

  const year = date.getFullYear()
  const month = date.getMonth()

  useEffect(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const data: CalendarDay = {}

    for (let i = 1; i <= daysInMonth; i++) {
      const rand = Math.random()
      if (rand < 0.3) {
        data[i] = 'skipped'
      } else if (rand < 0.6) {
        data[i] = 'partial'
      } else {
        data[i] = 'complete'
      }
    }

    setCalendarData(data)
  }, [month, year])

  const getColorClass = (status?: DayStatus): string => {
    switch (status) {
      case 'complete':
        return 'bg-teal-600 text-white'
      case 'partial':
        return 'bg-orange-500 text-white'
      case 'skipped':
        return 'bg-slate-600 text-slate-400'
      default:
        return 'bg-slate-800 text-slate-500'
    }
  }

  const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const handlePrevMonth = () => setDate(new Date(year, month - 1))
  const handleNextMonth = () => setDate(new Date(year, month + 1))

  return {
    date,
    calendarData,
    getColorClass,
    monthName,
    calendarDays,
    days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    handlePrevMonth,
    handleNextMonth,
  }
}
