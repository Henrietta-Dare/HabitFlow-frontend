import { useNavigation } from '@/hooks/useNavigation'
import { Home, Plus, Calendar, Settings } from 'lucide-react'

type NavItem = {
  id: 'dashboard' | 'addHabit' | 'calendar' | 'settings'
  label: string
  icon: typeof Home
}

export function Navigation() {
  const { currentView, setCurrentView } = useNavigation()

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'addHabit', label: 'Add', icon: Plus },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id && item.id !== 'calendar'

          return (
            <button
              key={`${item.id}-${item.label}`}
              onClick={() => setCurrentView(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                isActive ? 'text-purple-400' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}