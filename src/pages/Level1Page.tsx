import { useState } from 'react'
import type { UserProfile, Page, Language } from '../types'
import { tr } from '../i18n'
import Header from '../components/Header'
import { vocabQuestions } from '../data/mockData'

interface Level1Props {
  user: UserProfile
  onNavigate: (page: Page) => void
  onLanguageChange: (lang: Language) => void
  darkMode: boolean
  onAnswer: () => void
  onComplete: (xp: number) => void
}

const OPTION_COLORS = [
  { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
  { bg: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30' },
  { bg: 'from-rose-500/20 to-pink-500/20', border: 'border-rose-500/30' },
  { bg: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30' },
]

export default function Level1Page({ user, onNavigate, onLanguageChange, darkMode, onAnswer, onComplete }: Level1Props) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const [shake, setShake] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [answeredFirst, setAnsweredFirst] = useState(false)
  const [finished, setFinished] = useState(false)

  const lang = user.language
  const q = vocabQuestions[currentIdx]
  const total = vocabQuestions.length

  const bg = darkMode ? 'bg-[#080c18]' : 'bg-slate-50'
  const card = darkMode ? 'bg-[#0f1629] border-white/8' : 'bg-white border-black/8'
  const text = darkMode ? 'text-slate-100' : 'text-slate-800'
  const subtext = darkMode ? 'text-slate-400' : 'text-slate-500'

  function handleSelect(id: string) {
    if (checked) return
    if (!answeredFirst) { onAnswer(); setAnsweredFirst(true) }
    setSelected(id)
  }

  function handleCheck() {
    if (!selected) return
    setChecked(true)
    const isCorrect = selected === q.correctId
    if (!isCorrect) {
      setShake(true)
      setTimeout(() => setShake(false), 450)
    } else {
      setCorrectCount(c => c + 1)
    }
  }

  function handleNext() {
    if (currentIdx + 1 >= total) {
      setFinished(true)
    } else {
      setCurrentIdx(i => i + 1)
      setSelected(null)
      setChecked(false)
    }
  }

  function handleRetry() {
    setSelected(null)
    setChecked(false)
  }

  function handleFinish() {
    const xp = Math.round((correctCount / total) * 50) + (correctCount === total ? 20 : 0)
    onComplete(xp)
    onNavigate('dashboard')
  }

  function getCardStyle(optId: string) {
    if (!checked) {
      return selected === optId
        ? 'border-amber-500 bg-amber-500/10 scale-105'
        : darkMode
          ? 'border-white/8 hover:border-amber-500/40 hover:bg-white/3'
          : 'border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
    }
    const isCorrect = optId === q.correctId
    const isSelected = optId === selected
    if (isCorrect) return 'border-teal-500 bg-teal-500/10'
    if (isSelected && !isCorrect) return 'border-red-500 bg-red-500/10'
    return darkMode ? 'border-white/4 opacity-40' : 'border-slate-100 opacity-40'
  }

  const isCorrect = checked && selected === q.correctId
  const progressPct = ((currentIdx + (checked ? 1 : 0)) / total) * 100

  // ── Final score screen ─────────────────────
  if (finished) {
    const pct = Math.round((correctCount / total) * 100)
    const xp = Math.round((correctCount / total) * 50) + (correctCount === total ? 20 : 0)
    return (
      <div className={`min-h-screen ${bg} geometric-bg`}>
        <Header user={user} onNavigate={onNavigate} onLanguageChange={onLanguageChange} darkMode={darkMode} />
        <div className="pt-28 pb-16 px-4 max-w-md mx-auto flex flex-col items-center text-center">
          <div className="text-7xl mb-4 animate-bounce-slow">
            {pct === 100 ? '🏆' : pct >= 70 ? '🎉' : '📚'}
          </div>
          <h2 className={`text-3xl font-black ${text} mb-2`}>{tr(lang, 'levelComplete')}</h2>
          <p className={`${subtext} mb-8`}>
            {lang === 'id' ? 'Kuis Level 1 — Kosakata Selesai!' : 'Level 1 Vocabulary Quiz Complete!'}
          </p>

          <div className={`w-full ${card} border rounded-2xl p-6 mb-6`}>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-black text-amber-500">{correctCount}/{total}</p>
                <p className={`text-xs ${subtext} mt-1`}>{lang === 'id' ? 'Benar' : 'Correct'}</p>
              </div>
              <div>
                <p className="text-3xl font-black text-purple-400">{pct}%</p>
                <p className={`text-xs ${subtext} mt-1`}>{lang === 'id' ? 'Akurasi' : 'Accuracy'}</p>
              </div>
              <div>
                <p className="text-3xl font-black text-teal-400">+{xp}</p>
                <p className={`text-xs ${subtext} mt-1`}>XP</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-2 mt-5">
              {[1, 2, 3].map(s => (
                <span key={s} className={`text-3xl ${pct >= s * 34 ? '' : 'grayscale opacity-30'}`}>⭐</span>
              ))}
            </div>

            <p className={`mt-4 text-sm ${subtext}`}>
              {pct === 100
                ? (lang === 'id' ? 'Sempurna! Semua benar! 🌟' : 'Perfect! All correct! 🌟')
                : pct >= 70
                  ? (lang === 'id' ? 'Bagus sekali! Terus berlatih.' : 'Great job! Keep practicing.')
                  : (lang === 'id' ? 'Pelajari lagi dan ulangi kuis ini.' : 'Study more and retry this quiz.')}
            </p>
          </div>

          <div className="w-full flex flex-col gap-3">
            <button
              onClick={handleFinish}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-95 text-white font-black text-lg transition-all shadow-lg shadow-amber-500/20"
            >
              🏠 {tr(lang, 'backToDashboard')}
            </button>
            <button
              onClick={() => { setCurrentIdx(0); setSelected(null); setChecked(false); setCorrectCount(0); setFinished(false) }}
              className={`w-full py-3 rounded-2xl border font-bold text-sm transition-all ${darkMode ? 'border-white/10 text-slate-300 hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              🔄 {lang === 'id' ? 'Ulangi Kuis' : 'Retry Quiz'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz screen ────────────────────────────
  return (
    <div className={`min-h-screen ${bg} geometric-bg`}>
      <Header user={user} onNavigate={onNavigate} onLanguageChange={onLanguageChange} darkMode={darkMode} />

      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        {/* Top nav + progress */}
        <div className="flex items-center gap-3 mb-4 animate-fade-in-up">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center gap-1.5 text-sm font-semibold ${subtext} hover:text-amber-500 transition-colors`}
          >
            ✕
          </button>
          {/* Progress bar */}
          <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className={`text-sm font-black ${text}`}>{currentIdx + 1}<span className={subtext}>/{total}</span></span>
        </div>

        {/* Level badge */}
        <div className="flex items-center gap-2 mb-5 animate-fade-in-up">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            📚 Mubtadi&apos; · {tr(lang, 'level')} 1
          </span>
          <span className={`text-xs ${subtext}`}>
            {lang === 'id' ? `Soal ${currentIdx + 1} dari ${total}` : `Question ${currentIdx + 1} of ${total}`}
          </span>
          <span className="ml-auto text-xs font-bold text-teal-400">
            ✓ {correctCount} {lang === 'id' ? 'benar' : 'correct'}
          </span>
        </div>

        {/* Question card */}
        <div className={`${card} border rounded-2xl p-6 mb-6 animate-fade-in-up`}>
          <p className={`text-xl font-black ${text}`}>{q.question[lang] || q.question['en']}</p>
          <p className={`text-sm ${subtext} mt-1`}>
            {lang === 'id' ? 'Pilih gambar yang benar' : lang === 'ar' ? 'اختر الصورة الصحيحة' : 'Select the correct image'}
          </p>
        </div>

        {/* Option cards */}
        <div className={`grid grid-cols-2 gap-4 mb-6 ${shake ? 'animate-shake' : ''}`}>
          {q.options.map((opt, i) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={checked && opt.id !== q.correctId && opt.id !== selected}
              className={`${card} border rounded-2xl p-5 text-center card-choice transition-all animate-fade-in-up ${getCardStyle(opt.id)}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* Emoji placeholder — replace with <img> when real images are ready */}
              <div className={`w-full aspect-square max-w-24 mx-auto rounded-xl bg-gradient-to-br ${OPTION_COLORS[i].bg} border ${OPTION_COLORS[i].border} flex items-center justify-center mb-3`}>
                <span className="text-5xl">{opt.emoji}</span>
              </div>
              <p className={`arabic-text text-2xl font-bold mb-0.5 ${text}`}>{opt.arabic}</p>
              <p className={`text-xs ${subtext}`}>{opt.transliteration}</p>
              {checked && opt.id === q.correctId && (
                <p className="text-teal-400 text-xs font-bold mt-1.5">✓ {lang === 'id' ? 'Benar' : 'Correct'}</p>
              )}
              {checked && opt.id === selected && opt.id !== q.correctId && (
                <p className="text-red-400 text-xs font-bold mt-1.5">✗ {lang === 'id' ? 'Salah' : 'Wrong'}</p>
              )}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {checked && (
          <div className={`${card} border rounded-2xl p-5 mb-5 animate-fade-in-up ${isCorrect ? 'border-teal-500/50' : 'border-red-500/50'}`}>
            <div className="flex items-start gap-3">
              <span className="text-3xl">{isCorrect ? '🎉' : '😅'}</span>
              <div>
                <p className={`font-black text-base ${isCorrect ? 'text-teal-400' : 'text-red-400'}`}>
                  {isCorrect ? tr(lang, 'correct') : tr(lang, 'incorrect')}
                </p>
                <p className={`text-sm ${subtext} mt-0.5`}>
                  {(() => {
                    const correctOpt = q.options.find(o => o.id === q.correctId)!
                    if (isCorrect) {
                      return lang === 'id'
                        ? `${correctOpt.arabic} artinya benar untuk pertanyaan ini.`
                        : `${correctOpt.arabic} (${correctOpt.transliteration}) is correct!`
                    }
                    return lang === 'id'
                      ? `Jawaban benar: ${correctOpt.arabic} (${correctOpt.transliteration}).`
                      : `Correct answer: ${correctOpt.arabic} (${correctOpt.transliteration}).`
                  })()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="animate-fade-in-up">
          {!checked ? (
            <button
              onClick={handleCheck}
              disabled={!selected}
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-white font-black text-lg transition-all shadow-lg shadow-amber-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {tr(lang, 'check')}
            </button>
          ) : isCorrect ? (
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 active:scale-95 text-white font-black text-lg transition-all shadow-lg shadow-teal-500/20"
            >
              {currentIdx + 1 >= total
                ? (lang === 'id' ? 'Lihat Hasil 🏆' : 'See Results 🏆')
                : (lang === 'id' ? 'Soal Berikutnya →' : 'Next Question →')}
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="w-full py-4 rounded-2xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-white font-black text-lg transition-all"
            >
              {tr(lang, 'tryAgain')} 🔄
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
