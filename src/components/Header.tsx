import { useState, useRef, useEffect } from 'react'
import type { UserProfile, Language, Page } from '../types'
import { tr } from '../i18n'

interface HeaderProps {
  user: UserProfile
  onNavigate: (page: Page) => void
  onLanguageChange: (lang: Language) => void
  darkMode: boolean
}

export default function Header({ user, onNavigate, onLanguageChange, darkMode }: HeaderProps) {
  const [langOpen, setLangOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const lang = user.language

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const langs: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ]

  const bg = darkMode ? 'bg-[#080c18]/90 border-white/5' : 'bg-white/90 border-black/5'
  const text = darkMode ? 'text-slate-100' : 'text-slate-800'
  const subtext = darkMode ? 'text-slate-400' : 'text-slate-500'
  const dropBg = darkMode ? 'bg-[#0f1629] border-white/10' : 'bg-white border-black/10'
  const hoverItem = darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${bg} backdrop-blur-xl border-b`}>
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:scale-105 transition-transform">
            ع
          </div>
          <span className={`font-black text-lg ${text} group-hover:text-amber-500 transition-colors`}>
            {tr(lang, 'appName')}
          </span>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${darkMode ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}>
            <span className={`text-lg ${user.streak > 0 ? 'animate-bounce-slow' : ''}`}>🔥</span>
            <span className={`font-bold text-sm text-amber-500`}>{user.streak}</span>
          </div>

          {/* XP */}
          <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full ${darkMode ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'}`}>
            <span className="text-sm">⚡</span>
            <span className="font-bold text-sm text-purple-400">{user.xp} XP</span>
          </div>

          {/* Language dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => { setLangOpen(v => !v); setProfileOpen(false) }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${darkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-slate-50'} transition-colors text-sm font-semibold ${subtext}`}
            >
              <span>{langs.find(l => l.code === lang)?.flag}</span>
              <span className="hidden sm:block">{langs.find(l => l.code === lang)?.label}</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <div className={`absolute right-0 top-12 w-44 ${dropBg} border rounded-xl shadow-2xl overflow-hidden`}>
                {langs.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { onLanguageChange(l.code); setLangOpen(false) }}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold ${text} ${hoverItem} transition-colors ${lang === l.code ? 'text-amber-500' : ''}`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                    {lang === l.code && <span className="ml-auto text-amber-500">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile avatar */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setProfileOpen(v => !v); setLangOpen(false) }}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-amber-500/40 hover:border-amber-500 transition-colors"
            >
              {user.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                  {user.name ? user.name[0].toUpperCase() : '?'}
                </div>
              )}
            </button>
            {profileOpen && (
              <div className={`absolute right-0 top-12 w-48 ${dropBg} border rounded-xl shadow-2xl overflow-hidden`}>
                <div className={`px-4 py-3 border-b ${darkMode ? 'border-white/5' : 'border-black/5'}`}>
                  <p className={`font-bold text-sm ${text}`}>{user.name || 'User'}</p>
                  <p className={`text-xs ${subtext}`}>{user.streak} day streak 🔥</p>
                </div>
                <button
                  onClick={() => { onNavigate('profile'); setProfileOpen(false) }}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold ${text} ${hoverItem} transition-colors`}
                >
                  <span>👤</span> {tr(lang, 'profile')}
                </button>
                <button
                  onClick={() => { onNavigate('login'); setProfileOpen(false) }}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-red-400 ${hoverItem} transition-colors`}
                >
                  <span>🚪</span> {tr(lang, 'logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
