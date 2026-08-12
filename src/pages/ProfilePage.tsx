import { useState, useRef } from 'react'
import type { UserProfile, Page, Language } from '../types'
import { tr } from '../i18n'
import Header from '../components/Header'

interface ProfilePageProps {
  user: UserProfile
  onNavigate: (page: Page) => void
  onLanguageChange: (lang: Language) => void
  onUpdateUser: (data: Partial<UserProfile>) => void
  darkMode: boolean
  onToggleDarkMode: () => void
}

const professionLabels: Record<string, string> = {
  student: 'Siswa (Sekolah)',
  university: 'Mahasiswa',
  parent: 'Orang Tua',
  teacher: 'Guru / Pengajar',
  professional: 'Profesional',
  other: 'Lainnya',
}

export default function ProfilePage({ user, onNavigate, onLanguageChange, onUpdateUser, darkMode, onToggleDarkMode }: ProfilePageProps) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [age, setAge] = useState(user.age)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const lang = user.language

  const bg = darkMode ? 'bg-[#080c18]' : 'bg-slate-50'
  const card = darkMode ? 'bg-[#0f1629] border-white/8' : 'bg-white border-black/8'
  const text = darkMode ? 'text-slate-100' : 'text-slate-800'
  const subtext = darkMode ? 'text-slate-400' : 'text-slate-500'
  const inputCls = darkMode
    ? 'bg-white/5 border-white/10 text-slate-100 placeholder-slate-500 focus:border-amber-500'
    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-amber-500'
  const divider = darkMode ? 'border-white/5' : 'border-slate-100'

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      if (ev.target?.result) onUpdateUser({ avatar: ev.target.result as string })
    }
    reader.readAsDataURL(file)
  }

  function handleSave() {
    onUpdateUser({ name: name.trim() || user.name, age })
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const langs: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ]

  // Generate mock streak calendar for last 7 days
  const today = new Date()
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' })
    const active = user.streakHistory.includes(d.toISOString().split('T')[0]) || (i >= 7 - user.streak && user.streak > 0)
    return { date: dateStr, active }
  })

  return (
    <div className={`min-h-screen ${bg} geometric-bg`}>
      <Header user={user} onNavigate={onNavigate} onLanguageChange={onLanguageChange} darkMode={darkMode} />

      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
          <button onClick={() => onNavigate('dashboard')} className={`flex items-center gap-1.5 text-sm font-semibold ${subtext} hover:text-amber-500 transition-colors`}>
            ← {tr(lang, 'backToDashboard')}
          </button>
          <h1 className={`ml-auto text-xl font-black ${text}`}>{tr(lang, 'profile')}</h1>
        </div>

        {/* Avatar & name */}
        <div className={`${card} border rounded-2xl p-6 mb-5 animate-fade-in-up`}>
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500/40">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-black text-3xl">
                    {user.name ? user.name[0].toUpperCase() : '?'}
                  </div>
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg hover:bg-amber-400 transition-colors text-xs"
                title="Change photo"
              >
                📷
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </div>
            <div className="flex-1 min-w-0">
              {editing ? (
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border outline-none text-lg font-black mb-2 ${inputCls}`}
                />
              ) : (
                <h2 className={`text-2xl font-black ${text}`}>{user.name || 'User'}</h2>
              )}
              <p className={`text-sm ${subtext}`}>{professionLabels[user.profession] || user.profession || 'Belum diisi'}</p>
              <p className={`text-sm ${subtext}`}>{user.age ? `${user.age} tahun` : ''}</p>
            </div>
            <button
              onClick={() => editing ? handleSave() : setEditing(true)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${editing ? 'bg-amber-500 text-white hover:bg-amber-400' : darkMode ? 'bg-white/5 text-slate-300 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {editing ? (tr(lang, 'saveChanges')) : (tr(lang, 'editProfile'))}
            </button>
          </div>
          {editing && (
            <div className="mt-4 pt-4 border-t border-white/5 animate-fade-in-up">
              <label className={`block text-xs font-bold ${subtext} mb-1`}>{tr(lang, 'yourAge')}</label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border outline-none ${inputCls}`}
                min="5" max="99"
              />
            </div>
          )}
          {saved && (
            <p className="text-teal-400 text-sm font-bold mt-3 text-center animate-fade-in-up">✓ Profil berhasil disimpan!</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {[
            { label: tr(lang, 'dayStreak'), value: user.streak, icon: '🔥', color: 'text-amber-400' },
            { label: tr(lang, 'totalXP'), value: `${user.xp} XP`, icon: '⚡', color: 'text-purple-400' },
            { label: lang === 'id' ? 'Level Selesai' : 'Levels Done', value: user.completedLevels.length, icon: '✅', color: 'text-teal-400' },
          ].map((stat, i) => (
            <div key={i} className={`${card} border rounded-2xl p-4 text-center`}>
              <div className="text-2xl mb-1">{stat.icon}</div>
              <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
              <p className={`text-xs ${subtext}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Streak history */}
        <div className={`${card} border rounded-2xl p-5 mb-5 animate-fade-in-up`} style={{ animationDelay: '0.15s' }}>
          <h3 className={`font-black ${text} mb-4 flex items-center gap-2`}>
            🔥 {tr(lang, 'streakHistory')}
          </h3>
          <div className="flex gap-2 justify-between">
            {last7.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all
                  ${day.active ? 'bg-amber-500/20 border border-amber-500/40' : darkMode ? 'bg-white/3 border border-white/5' : 'bg-slate-50 border border-slate-200'}`}>
                  {day.active ? '🔥' : '○'}
                </div>
                <p className={`text-xs ${subtext} text-center`}>{day.date}</p>
              </div>
            ))}
          </div>
          <p className={`mt-3 text-sm ${subtext} text-center`}>
            {user.streak > 0
              ? `${user.streak} ${tr(lang, 'days')} ${tr(lang, 'activeStreak')}`
              : tr(lang, 'noStreakYet')}
          </p>
        </div>

        {/* Language setting */}
        <div className={`${card} border rounded-2xl p-5 mb-5 animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
          <h3 className={`font-black ${text} mb-4 flex items-center gap-2`}>
            🌐 {tr(lang, 'interfaceLang')}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {langs.map(l => (
              <button
                key={l.code}
                onClick={() => onLanguageChange(l.code)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all
                  ${lang === l.code
                    ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                    : darkMode ? 'border-white/8 hover:border-white/20 text-slate-300' : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
              >
                <span className="text-2xl">{l.flag}</span>
                <span className="text-xs font-bold">{l.label}</span>
                {lang === l.code && <span className="text-xs">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Dark/Light mode toggle */}
        <div className={`${card} border rounded-2xl p-5 mb-5 animate-fade-in-up`} style={{ animationDelay: '0.25s' }}>
          <h3 className={`font-black ${text} mb-4 flex items-center gap-2`}>
            🎨 {tr(lang, 'appearance')}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-semibold ${text}`}>
                {darkMode ? tr(lang, 'darkMode') : tr(lang, 'lightMode')}
              </p>
              <p className={`text-sm ${subtext}`}>
                {darkMode
                  ? (lang === 'id' ? 'Tampilan gelap aktif' : 'Dark appearance enabled')
                  : (lang === 'id' ? 'Tampilan terang aktif' : 'Light appearance enabled')}
              </p>
            </div>
            <button
              onClick={onToggleDarkMode}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${darkMode ? 'bg-amber-500' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 flex items-center justify-center text-xs
                ${darkMode ? 'translate-x-7' : 'translate-x-0'}`}>
                {darkMode ? '🌙' : '☀️'}
              </div>
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className={`border-t ${divider} pt-5 animate-fade-in-up`} style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => onNavigate('login')}
            className={`w-full py-3 rounded-2xl border border-red-500/30 text-red-400 font-bold hover:bg-red-500/10 transition-all`}
          >
            🚪 {tr(lang, 'logout')}
          </button>
        </div>
      </div>
    </div>
  )
}
