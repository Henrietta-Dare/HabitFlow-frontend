import './App.css'
import { useApp } from '@/hooks/useApp'
import { Dashboard } from './components/dashboard'
import { Calendar } from './components/calendar'
import { Settings } from './components/settings'
import { AddHabitPage } from './components/addHabitModal'
import { Navigation } from './components/navigation'
import { AuthPage } from './components/auth'

function App() {
  const { currentView, darkMode, isAuthenticated } = useApp()

  if (isAuthenticated) {
    return <AuthPage />
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
      <div className="max-w-md mx-auto pb-24 px-4 pt-4">
        {currentView === 'dashboard' && <Dashboard />}

        {currentView === 'calendar' && <Calendar />}

        {currentView === 'settings' && <Settings />}
        {currentView === 'addHabit' && <AddHabitPage />}
      </div>

      <Navigation />
    </div>
  )
}

export default App