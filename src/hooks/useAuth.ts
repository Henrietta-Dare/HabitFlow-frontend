import { useState } from 'react'
import { authService } from '@/services/api'
import { useHabitStore } from '@/store/habitStore'

export const useAuth = () => {
  const [view, setView] = useState<'login' | 'signup' | 'forgot'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [infoMessage, setInfoMessage] = useState<string | null>(null)

  const { setToken, setUser, setCurrentView } = useHabitStore()

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setError(null)
    setInfoMessage(null)
  }

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.login(email, password)
      setToken(response.data.token)
      setUser(response.data.user)
      setCurrentView('dashboard')
      resetForm()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all signup fields.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.signup(email, password, name)
      setToken(response.data.token)
      setUser(response.data.user)
      setCurrentView('dashboard')
      resetForm()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Email is required for password recovery.')
      return
    }

    setIsLoading(true)
    setError(null)
    setInfoMessage(null)

    try {
      await authService.forgotPassword(email)
      setInfoMessage('If that email is registered, you will receive password reset instructions shortly.')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Unable to send reset instructions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
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
  }
}
