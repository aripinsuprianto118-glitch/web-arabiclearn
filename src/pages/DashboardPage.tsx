import type { UserProfile, Page } from '../types'
import { tr } from '../i18n'
import Header from '../components/Header'
import type { Language } from '../types'

interface DashboardPageProps {
  user: UserProfile
  onNavigate: (page: Page) => void
  onLanguageChange: (lang: Language) => void
  darkMode: boolean
  onToggleDarkMode: () => void
}

const levels = [
  {
    id: 1,
    page: 'level1' as Page,
    emoji: '📚',
    color: 'from-amber-500 to-yellow-500',
    glow: 'shadow-amber-500/30',
    badge: 'Mubtadi\'',
    badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    titleKey: 'vocabularyQuiz',
    desc: { en: 'Learn basic Arabic vocabulary with images', id: 'Pelajari kosakata Arab dasar dengan gambar', ar: 'تعلم المفردات الأساسية بالصور' },
    xp: 50,
    duration: '5 min',
    unlocked: true,
  },
  {
    id: 2,
    page: 'level2' as Page,
    emoji: '🔤',
    color: 'from-teal-500 to-cyan-500',
    glow: 'shadow-teal-500/30',
    badge: 'Mutawassith',
    badgeColor: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    titleKey: 'sentenceBuilding',
    desc: { en: 'Build Arabic sentences by arranging words', id: 'Susun kalimat bahasa Arab dengan menyusun kata', ar: 'بناء جمل عربية بترتيب الكلمات' },
    xp: 80,
    duration: '7 min',
    unlocked: true,
  },
  {
    id: 3,
    page: 'level3' as Page,
    emoji: '📖',
    color: 'from-purple-500 to-violet-500',
    glow: 'shadow-purple-500/30',
    badge: 'Mutaqaddim',
    badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    titleKey: 'readingStory',
    desc: { en: 'Read an Arabic story and answer questions', id: 'Baca cerita bahasa Arab dan jawab pertanyaan', ar: 'اقرأ قصة عربية وأجب عن الأسئلة' },
    xp: 120,
    duration: '10 min',
    unlocked: true,
  },
]

const socialLinks = [
  { icon: '📘', label: 'Facebook', href: '#' },
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '🐦', label: 'Twitter', href: '#' },
  { icon: '💼', label: 'LinkedIn', href: '#' },
]

export default function DashboardPage({ user, onNavigate, onLanguageChange, darkMode, onToggleDarkMode }: DashboardPageProps) {
  const lang = user.language
  const bg = darkMode ? 'bg-[#080c18]' : 'bg-slate-50'
  const card = darkMode ? 'bg-[#0f1629] border-white/8' : 'bg-white border-black/8'
  const text = darkMode ? 'text-slate-100' : 'text-slate-800'
  const subtext = darkMode ? 'text-slate-400' : 'text-slate-500'
  const divider = darkMode ? 'border-white/5' : 'border-slate-200'

  const completedCount = user.completedLevels.length

  return (
    <div className={`min-h-screen ${bg} geometric-bg`}>
      <Header
        user={user}
        onNavigate={onNavigate}
        onLanguageChange={onLanguageChange}
        darkMode={darkMode}
      />

      <div className="pt-24 pb-32 px-4 max-w-2xl mx-auto">
        {/* Welcome banner */}
        <div className={`${card} border rounded-2xl p-6 mb-8 animate-fade-in-up`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500/40 flex-shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-black text-xl">
                  {user.name ? user.name[0].toUpperCase() : '?'}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className={`text-xl font-black ${text}`}>
                مرحباً، {user.name || 'طالب'}! 👋
              </h2>
              <p className={`text-sm ${subtext}`}>
                {completedCount === 0
                  ? (lang === 'id' ? 'Mulai perjalanan belajar Anda hari ini!' : lang === 'ar' ? 'ابدأ رحلتك التعليمية اليوم!' : 'Start your learning journey today!')
                  : (lang === 'id' ? `${completedCount} level selesai. Teruskan!` : lang === 'ar' ? `أكملت ${completedCount} مستوى. أحسنت!` : `${completedCount} level(s) completed. Keep going!`)}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-center">
                <p className="text-amber-500 font-black text-xl">{user.streak}</p>
                <p className={`text-xs ${subtext}`}>🔥 Streak</p>
              </div>
              <div className="text-center">
                <p className="text-purple-400 font-black text-xl">{user.xp}</p>
                <p className={`text-xs ${subtext}`}>⚡ XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* XP Progress bar */}
        <div className={`${card} border rounded-2xl p-5 mb-8 animate-fade-in-up`} style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-bold ${subtext}`}>{lang === 'id' ? 'Progres XP' : lang === 'ar' ? 'تقدم XP' : 'XP Progress'}</span>
            <span className="text-amber-500 font-bold text-sm">{user.xp} / 300 XP</span>
          </div>
          <div className={`h-3 rounded-full ${darkMode ? 'bg-white/5' : 'bg-slate-100'} overflow-hidden`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-700"
              style={{ width: `${Math.min((user.xp / 300) * 100, 100)}%` }}
            />
          </div>
          <p className={`mt-2 text-xs ${subtext}`}>
            {lang === 'id' ? `${300 - Math.min(user.xp, 300)} XP lagi untuk naik level!` : lang === 'ar' ? `${300 - Math.min(user.xp, 300)} XP لترقية المستوى!` : `${300 - Math.min(user.xp, 300)} XP until next level!`}
          </p>
        </div>

        {/* Learning path heading */}
        <h2 className={`text-2xl font-black ${text} mb-6 text-center animate-fade-in-up`}>
          🗺️ {tr(lang, 'learningPath')}
        </h2>

        {/* Level cards — path layout */}
        <div className="relative">
          {/* Path connector */}
          <div className={`absolute left-1/2 -translate-x-1/2 top-16 bottom-16 w-0.5 ${darkMode ? 'bg-white/5' : 'bg-slate-200'} z-0`} />

          <div className="space-y-6 relative z-10">
            {levels.map((level, idx) => {
              const isCompleted = user.completedLevels.includes(level.id)
              const desc = level.desc[lang] || level.desc['en']

              return (
                <div
                  key={level.id}
                  className={`flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'} animate-fade-in-up`}
                  style={{ animationDelay: `${0.2 + idx * 0.15}s` }}
                >
                  <div className={`w-full max-w-sm`}>
                    <button
                      onClick={() => onNavigate(level.page)}
                      className={`w-full ${card} border rounded-2xl p-5 text-left level-node shadow-lg ${isCompleted ? level.glow : ''} group`}
                    >
                      {/* Level header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                          {isCompleted ? '✅' : level.emoji}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${level.badgeColor}`}>
                            {level.badge}
                          </span>
                          {isCompleted && (
                            <span className="text-xs font-bold text-teal-400">✓ {tr(lang, 'completed')}</span>
                          )}
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className={`flex items-center gap-2 mb-0.5`}>
                          <span className={`text-xs font-bold ${subtext}`}>{tr(lang, 'level')} {level.id}</span>
                        </div>
                        <h3 className={`text-lg font-black ${text} group-hover:text-amber-400 transition-colors`}>
                          {tr(lang, level.titleKey)}
                        </h3>
                      </div>

                      <p className={`text-sm ${subtext} mb-3 leading-relaxed`}>{desc}</p>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-amber-500">⚡ {level.xp} XP</span>
                        <span className={`text-xs font-semibold ${subtext}`}>⏱ {level.duration}</span>
                        <span className={`ml-auto text-xs font-bold ${darkMode ? 'text-slate-500 group-hover:text-amber-400' : 'text-slate-400 group-hover:text-amber-500'} transition-colors`}>
                          {isCompleted ? (lang === 'id' ? 'Ulangi →' : lang === 'ar' ? 'كرر ←' : 'Retry →') : (lang === 'id' ? 'Mulai →' : lang === 'ar' ? 'ابدأ ←' : 'Start →')}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer / About Us */}
      <footer className={`border-t ${divider} ${darkMode ? 'bg-[#080c18]' : 'bg-white'}`}>
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 mb-3">
              <span className="text-2xl">ع</span>
            </div>
            <h3 className={`text-xl font-black ${text} mb-1`}>{tr(lang, 'aboutUs')}</h3>
            <p className={`text-sm ${subtext} mb-1`}>{tr(lang, 'developedBy')}</p>
            <p className={`text-xs ${subtext}`}>
              {lang === 'id' ? 'Aplikasi belajar bahasa Arab berbasis gamifikasi' : lang === 'ar' ? 'تطبيق تعلم اللغة العربية القائم على الألعاب' : 'Gamified Arabic Language Learning Application'}
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'} transition-colors`}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className={`text-center mt-6 text-xs ${subtext}`}>
            © 2025 ArabiLearn · Made with ❤️ for Arabic learners
          </p>
        </div>
      </footer>
    </div>
  )
}
