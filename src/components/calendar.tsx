import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCalendar } from '@/hooks/useCalendar'

export function Calendar() {
  const {
    monthName,
    calendarDays,
    calendarData,
    days,
    getColorClass,
    handlePrevMonth,
    handleNextMonth,
  } = useCalendar()

  return (
    <div className="pb-20">
      <Card className="bg-slate-800 border-slate-700 p-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">{monthName}</CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-slate-700 hover:bg-slate-600 border-slate-600"
                onClick={handlePrevMonth}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-slate-700 hover:bg-slate-600 border-slate-600"
                onClick={handleNextMonth}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {days.map((day) => (
              <div key={day} className="text-center">
                <p className="text-xs font-medium text-slate-400 uppercase">{day}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium ${
                  day ? getColorClass(calendarData[day]) : 'bg-slate-900'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
            <p className="text-sm font-medium text-white">Legend</p>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-teal-600 rounded"></div>
                <span className="text-slate-400">All done</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-slate-400">Partial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-600 rounded"></div>
                <span className="text-slate-400">Skipped</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}