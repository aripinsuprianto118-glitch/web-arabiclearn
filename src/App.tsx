import { useState, useEffect } from 'react'
import type { Page, UserProfile, Language } from './types'
import LoginPage from './pages/LoginPage'
import OnboardingModal from './pages/OnboardingModal'
import WelcomePage from './pages/WelcomePage'
import DashboardPage from './pages/DashboardPage'
import Level1Page from './pages/Level1Page'
import Level2Page from './pages/Level2Page'
import Level3Page from './pages/Level3Page'
import ProfilePage from './pages/ProfilePage'

const DEFAULT_USER: UserProfile = {
  name: '',
  age: '',
  profession: '',
  streak: 0,
  avatar: null,
  darkMode: true,
  language: 'en',
  streakHistory: [],
  completedLevels: [],
  xp: 0,
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

export default function App() {
  const [page, setPage] = useState<Page>('login')
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER)
  const [darkMode, setDarkMode] = useState(true)
  const [streakStarted, setStreakStarted] = useState(false)

  // Apply dark/light class to root
  useEffect(() => {
    document.documentElement.style.backgroundColor = darkMode ? '#080c18' : '#f8fafc'
    document.documentElement.style.color = darkMode ? '#e2e8f0' : '#1e293b'
  }, [darkMode])

  function handleLogin() {
    setPage('onboarding')
  }

  function handleOnboardingComplete(data: Partial<UserProfile>) {
    setUser(u => ({ ...u, ...data }))
    setPage('welcome')
  }

  function handleStartLearning() {
    setPage('dashboard')
  }

  function handleNavigate(p: Page) {
    if (p === 'login') {
      setUser(DEFAULT_USER)
      setStreakStarted(false)
    }
    setPage(p)
  }

  function handleLanguageChange(lang: Language) {
    setUser(u => ({ ...u, language: lang }))
  }

  function handleToggleDarkMode() {
    setDarkMode(v => !v)
    setUser(u => ({ ...u, darkMode: !u.darkMode }))
  }

  function handleUpdateUser(data: Partial<UserProfile>) {
    setUser(u => ({ ...u, ...data }))
  }

  function handleFirstAnswer() {
    if (streakStarted) return
    setStreakStarted(true)
    const today = getTodayStr()
    setUser(u => {
      const alreadyToday = u.streakHistory.includes(today)
      if (alreadyToday) return u
      return {
        ...u,
        streak: u.streak + 1,
        streakHistory: [...u.streakHistory, today],
      }
    })
  }

  function handleLevelComplete(xp: number, levelId: number) {
    setUser(u => ({
      ...u,
      xp: u.xp + xp,
      completedLevels: u.completedLevels.includes(levelId)
        ? u.completedLevels
        : [...u.completedLevels, levelId],
    }))
  }

  const rootStyle = {
    minHeight: '100vh',
    backgroundColor: darkMode ? '#080c18' : '#f8fafc',
    color: darkMode ? '#e2e8f0' : '#1e293b',
    fontFamily: "'Nunito', sans-serif",
  }

  return (
    <div style={rootStyle}>
      {page === 'login' && (
        <LoginPage onLogin={handleLogin} darkMode={darkMode} />
      )}

      {page === 'onboarding' && (
        <>
          {/* Show a blurred bg while onboarding */}
          <div className={`min-h-screen ${darkMode ? 'bg-[#080c18]' : 'bg-slate-50'} geometric-bg`} />
          <OnboardingModal onComplete={handleOnboardingComplete} darkMode={darkMode} />
        </>
      )}

      {page === 'welcome' && (
        <WelcomePage user={user} onStart={handleStartLearning} darkMode={darkMode} />
      )}

      {page === 'dashboard' && (
        <DashboardPage
          user={user}
          onNavigate={handleNavigate}
          onLanguageChange={handleLanguageChange}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
      )}

      {page === 'level1' && (
        <Level1Page
          user={user}
          onNavigate={handleNavigate}
          onLanguageChange={handleLanguageChange}
          darkMode={darkMode}
          onAnswer={handleFirstAnswer}
          onComplete={(xp) => handleLevelComplete(xp, 1)}
        />
      )}

      {page === 'level2' && (
        <Level2Page
          user={user}
          onNavigate={handleNavigate}
          onLanguageChange={handleLanguageChange}
          darkMode={darkMode}
          onAnswer={handleFirstAnswer}
          onComplete={(xp) => handleLevelComplete(xp, 2)}
        />
      )}

      {page === 'level3' && (
        <Level3Page
          user={user}
          onNavigate={handleNavigate}
          onLanguageChange={handleLanguageChange}
          darkMode={darkMode}
          onAnswer={handleFirstAnswer}
          onComplete={(xp) => handleLevelComplete(xp, 3)}
        />
      )}

      {page === 'profile' && (
        <ProfilePage
          user={user}
          onNavigate={handleNavigate}
          onLanguageChange={handleLanguageChange}
          onUpdateUser={handleUpdateUser}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
      )}
    </div>
  )
}
