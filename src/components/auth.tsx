import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AuthPage() {
  const {
    view,
    setView,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    error,
    infoMessage,
    resetForm,
    handleLogin,
    handleSignup,
    handleForgotPassword,
  } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-2xl">
              {view === 'login'
                ? 'Welcome back'
                : view === 'signup'
                ? 'Create an account'
                : 'Reset your password'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {error && (
              <div className="rounded-lg border border-red-700 bg-red-900/20 p-3 text-sm text-red-200">
                {error}
              </div>
            )}
            {infoMessage && (
              <div className="rounded-lg border border-emerald-700 bg-emerald-900/20 p-3 text-sm text-emerald-200">
                {infoMessage}
              </div>
            )}

            {view === 'signup' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-4">Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label className="text-white mb-4">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              {view !== 'forgot' && (
                <div>
                  <Label className="text-white mb-4">Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              )}

              {view === 'signup' && (
                <div>
                  <Label className="text-white mb-4">Confirm Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              )}
            </div>

            <Button
              onClick={
                view === 'login'
                  ? handleLogin
                  : view === 'signup'
                  ? handleSignup
                  : handleForgotPassword
              }
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isLoading
                ? 'Working...'
                : view === 'login'
                ? 'Login'
                : view === 'signup'
                ? 'Sign up'
                : 'Send reset email'}
            </Button>

            {view === 'login' && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setView('forgot')
                    resetForm()
                  }}
                  className="text-sm font-medium text-purple-300 hover:text-purple-200"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <p className="text-center text-sm text-slate-400">
              {view === 'login'
                ? 'Need an account?'
                : view === 'signup'
                ? 'Already have an account?'
                : 'Remembered your password?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setView(view === 'login' ? 'signup' : 'login')
                  resetForm()
                }}
                className="font-medium text-purple-300 hover:text-purple-200"
              >
                {view === 'login' ? 'Sign up' : 'Login'}
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
