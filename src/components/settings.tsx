import { useSettings } from '@/hooks/useSettings'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, Trash2 } from 'lucide-react'

export function Settings() {
  const {
    user,
    darkMode,
    setDarkMode,
    notificationsEnabled,
    setNotificationsEnabled,
    reminderTime,
    setReminderTime,
    handleLogout,
    handleExportData,
    handleDeleteAccount,
  } = useSettings()

  return (
    <div className="space-y-4 pb-20">
      <Card className="bg-slate-800 border-slate-700 p-4">
        <CardHeader>
          <CardTitle className="text-white mb-4">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-slate-400 mb-1">Name</p>
            <p className="text-white font-medium">{user?.name || 'User'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Email</p>
            <p className="text-white font-medium">{user?.email || 'user@example.com'}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700 p-4">
        <CardHeader>
          <CardTitle className="text-white mb-4">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-white text-sm">Dark Mode</label>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-purple-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-white text-sm">Daily Reminder</label>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationsEnabled ? 'bg-purple-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {notificationsEnabled && (
            <div>
              <label className="text-white text-sm mb-2 block">Reminder Time</label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg w-full"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700 p-4">
        <CardHeader>
          <CardTitle className="text-white mb-4">Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            onClick={handleExportData}
            variant="outline"
            className="w-full bg-slate-700 hover:bg-slate-600 border-slate-600 text-white"
          >
            📥 Export Data (CSV)
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700 p-4">
        <CardHeader>
          <CardTitle className="text-white mb-4">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            onClick={handleLogout}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Log Out
          </Button>
          <Button
            onClick={handleDeleteAccount}
            variant="outline"
            className="w-full bg-red-900/30 hover:bg-red-900/50 border-red-700 text-red-300 flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            Delete Account
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700 p-4">
        <CardContent className="pt-4">
          <div className="text-center space-y-2">
            <p className="text-white font-medium">HabitFlow</p>
            <p className="text-slate-400 text-sm">v1.0.0</p>
            <p className="text-slate-500 text-xs">Build better habits, one day at a time</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}