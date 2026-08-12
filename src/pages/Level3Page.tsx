import { useState } from 'react'
import type { UserProfile, Page, Language } from '../types'
import { tr } from '../i18n'
import Header from '../components/Header'
import { stories } from '../data/mockData'

interface Level3Props {
  user: UserProfile
  onNavigate: (page: Page) => void
  onLanguageChange: (lang: Language) => void
  darkMode: boolean
  onAnswer: () => void
  onComplete: (xp: number) => void
}

export default function Level3Page({ user, onNavigate, onLanguageChange, darkMode, onAnswer, onComplete }: Level3Props) {
  const [storyIdx, setStoryIdx] = useState(0)
  const [section, setSection] = useState<'read' | 'quiz'>('read')
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [answeredFirst, setAnsweredFirst] = useState(false)
  const [finished, setFinished] = useState(false)

  const lang = user.language
  const story = stories[storyIdx]
  const total = stories.length

  const bg = darkMode ? 'bg-[#080c18]' : 'bg-slate-50'
  const card = darkMode ? 'bg-[#0f1629] border-white/8' : 'bg-white border-black/8'
  const text = darkMode ? 'text-slate-100' : 'text-slate-800'
  const subtext = darkMode ? 'text-slate-400' : 'text-slate-500'

  const progressPct = ((storyIdx + (submitted ? 1 : 0)) / total) * 100
  const isCorrect = submitted && selectedAnswer === story.quiz.correct

  function handleSelectAnswer(id: string) {
    if (submitted) return
    if (!answeredFirst) { onAnswer(); setAnsweredFirst(true) }
    setSelectedAnswer(id)
  }

  function handleSubmit() {
    if (!selectedAnswer) return
    setSubmitted(true)
    if (selectedAnswer === story.quiz.correct) setCorrectCount(c => c + 1)
  }

  function handleNextStory() {
    if (storyIdx + 1 >= total) {
      setFinished(true)
    } else {
      setStoryIdx(i => i + 1)
      setSection('read')
      setSelectedAnswer(null)
      setSubmitted(false)
      setShowTranslation(false)
    }
  }

  function handleFinish() {
    const xp = Math.round((correctCount / total) * 90) + (correctCount === total ? 30 : 0)
    onComplete(xp)
    onNavigate('dashboard')
  }

  function getOptionStyle(optId: string) {
    if (!submitted) {
      return selectedAnswer === optId
        ? 'border-purple-500 bg-purple-500/10 text-purple-300'
        : darkMode ? 'border-white/8 hover:border-white/20 text-slate-300' : 'border-slate-200 hover:border-slate-300 text-slate-700'
    }
    if (optId === story.quiz.correct) return 'border-teal-500 bg-teal-500/10 text-teal-400'
    if (selectedAnswer === optId && optId !== story.quiz.correct) return 'border-red-500 bg-red-500/10 text-red-400'
    return darkMode ? 'border-white/5 text-slate-600' : 'border-slate-100 text-slate-400'
  }

  // ── Final score screen ──────────────────────
  if (finished) {
    const pct = Math.round((correctCount / total) * 100)
    const xp = Math.round((correctCount / total) * 90) + (correctCount === total ? 30 : 0)
    return (
      <div className={`min-h-screen ${bg} geometric-bg`}>
        <Header user={user} onNavigate={onNavigate} onLanguageChange={onLanguageChange} darkMode={darkMode} />
        <div className="pt-28 pb-16 px-4 max-w-md mx-auto flex flex-col items-center text-center">
          <div className="text-7xl mb-4 animate-bounce-slow">
            {pct === 100 ? '🏆' : pct >= 67 ? '🎉' : '📚'}
          </div>
          <h2 className={`text-3xl font-black ${text} mb-2`}>{tr(lang, 'levelComplete')}</h2>
          <p className={`${subtext} mb-8`}>
            {lang === 'id' ? 'Level 3 — Semua Cerita Selesai!' : 'Level 3 — All Stories Complete!'}
          </p>
          <div className={`w-full ${card} border rounded-2xl p-6 mb-6`}>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-black text-purple-400">{correctCount}/{total}</p>
                <p className={`text-xs ${subtext} mt-1`}>{lang === 'id' ? 'Kuis Benar' : 'Quiz Correct'}</p>
              </div>
              <div>
                <p className="text-3xl font-black text-amber-500">{pct}%</p>
                <p className={`text-xs ${subtext} mt-1`}>{lang === 'id' ? 'Akurasi' : 'Accuracy'}</p>
              </div>
              <div>
                <p className="text-3xl font-black text-teal-400">+{xp}</p>
                <p className={`text-xs ${subtext} mt-1`}>XP</p>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              {[1, 2, 3].map(s => (
                <span key={s} className={`text-3xl ${correctCount >= s ? '' : 'grayscale opacity-30'}`}>⭐</span>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <button
              onClick={handleFinish}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-400 hover:to-violet-400 active:scale-95 text-white font-black text-lg transition-all shadow-lg shadow-purple-500/20"
            >
              🏠 {tr(lang, 'backToDashboard')}
            </button>
            <button
              onClick={() => { setStoryIdx(0); setSection('read'); setSelectedAnswer(null); setSubmitted(false); setShowTranslation(false); setCorrectCount(0); setFinished(false) }}
              className={`w-full py-3 rounded-2xl border font-bold text-sm transition-all ${darkMode ? 'border-white/10 text-slate-300 hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              🔄 {lang === 'id' ? 'Ulangi' : 'Retry'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Story screen ───────────────────────────
  return (
    <div className={`min-h-screen ${bg} geometric-bg`}>
      <Header user={user} onNavigate={onNavigate} onLanguageChange={onLanguageChange} darkMode={darkMode} />

      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        {/* Progress row */}
        <div className="flex items-center gap-3 mb-4 animate-fade-in-up">
          <button onClick={() => onNavigate('dashboard')} className={`text-sm font-semibold ${subtext} hover:text-amber-500 transition-colors`}>✕</button>
          <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full bg-purple-500 transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
          <span className={`text-sm font-black ${text}`}>{storyIdx + 1}<span className={subtext}>/{total}</span></span>
        </div>

        {/* Level badge */}
        <div className="flex items-center gap-2 mb-5 animate-fade-in-up">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
            📖 Mutaqaddim · {tr(lang, 'level')} 3
          </span>
          <span className={`text-xs ${subtext}`}>
            {lang === 'id' ? `Cerita ${storyIdx + 1} dari ${total}` : `Story ${storyIdx + 1} of ${total}`}
          </span>
          <span className="ml-auto text-xs font-bold text-purple-400">✓ {correctCount} {lang === 'id' ? 'benar' : 'correct'}</span>
        </div>

        {/* Story thumbnails */}
        <div className="flex gap-2 mb-5 animate-fade-in-up">
          {stories.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                if (i < storyIdx || (i === storyIdx && submitted)) {
                  setStoryIdx(i)
                  setSection('read')
                  setSelectedAnswer(null)
                  setSubmitted(false)
                  setShowTranslation(false)
                }
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center
                ${i === storyIdx
                  ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                  : i < storyIdx
                    ? darkMode ? 'border-white/10 bg-white/5 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'
                    : darkMode ? 'border-white/5 text-slate-600 cursor-default' : 'border-slate-100 text-slate-300 cursor-default'
                }`}
            >
              {i < storyIdx ? '✓ ' : ''}{s.titleAr}
            </button>
          ))}
        </div>

        {/* Section tabs */}
        <div className={`${card} border rounded-2xl p-1 mb-5 flex animate-fade-in-up`}>
          <button
            onClick={() => setSection('read')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${section === 'read' ? 'bg-purple-500 text-white' : `${subtext} hover:text-purple-400`}`}
          >
            📖 {tr(lang, 'readStory')}
          </button>
          <button
            onClick={() => setSection('quiz')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${section === 'quiz' ? 'bg-purple-500 text-white' : `${subtext} hover:text-purple-400`}`}
          >
            ❓ {tr(lang, 'comprehensionQuiz')}
          </button>
        </div>

        {section === 'read' ? (
          <>
            {/* Story header */}
            <div className={`${card} border rounded-2xl p-6 mb-4 animate-fade-in-up`}>
              <p className={`text-xs font-bold uppercase tracking-wider ${subtext} mb-1`}>{tr(lang, 'readStory')}</p>
              <h2 className={`text-2xl font-black ${text}`}>
                {story.title[lang] || story.title['en']}
              </h2>
              <p className="arabic-text text-xl text-amber-400 font-bold mt-1">{story.titleAr}</p>
            </div>

            {/* Image */}
            <div className="rounded-2xl overflow-hidden mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <img
                src={story.image}
                alt={story.imageAlt}
                className="w-full h-52 object-cover"
              />
              <div className={`${darkMode ? 'bg-[#0f1629] border-white/8' : 'bg-white border-black/8'} px-4 py-2 border-b border-l border-r rounded-b-2xl`}>
                <p className={`text-xs ${subtext} italic text-center`}>
                  {lang === 'id' ? 'Ilustrasi cerita (placeholder )' : 'Story illustration (placeholder — replaceable)'}
                </p>
              </div>
            </div>

            {/* Arabic story text */}
            <div className={`${card} border rounded-2xl p-6 mb-4 animate-fade-in-up`} style={{ animationDelay: '0.15s' }}>
              <p className={`text-xs font-bold uppercase tracking-wider ${subtext} mb-3`}>
                {lang === 'id' ? 'Teks Bahasa Arab' : 'Arabic Text'}
              </p>
              <div className="arabic-text text-xl leading-loose text-amber-200 font-medium whitespace-pre-line">
                {story.textAr}
              </div>
            </div>

            {/* Translation toggle */}
            <div className={`${card} border rounded-2xl overflow-hidden mb-5 animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
              <button
                onClick={() => setShowTranslation(v => !v)}
                className={`w-full flex items-center justify-between px-5 py-4 text-sm font-bold ${subtext} hover:text-amber-400 transition-colors`}
              >
                <span>💡 {lang === 'id' ? 'Tampilkan Terjemahan' : 'Show Translation'}</span>
                <span className={`transition-transform duration-200 ${showTranslation ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {showTranslation && (
                <div className={`px-5 pb-5 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'} animate-fade-in-up`}>
                  <p className={`text-sm leading-relaxed ${subtext} mt-3`}>
                    {story.translation[lang === 'id' ? 'id' : 'en']}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSection('quiz')}
              className="w-full py-4 rounded-2xl bg-purple-500 hover:bg-purple-400 active:scale-95 text-white font-black text-lg transition-all shadow-lg shadow-purple-500/20"
            >
              {tr(lang, 'comprehensionQuiz')} →
            </button>
          </>
        ) : (
          <>
            {/* Quiz result banner */}
            {submitted && (
              <div className={`${card} border rounded-2xl p-5 mb-5 animate-fade-in-up ${isCorrect ? 'border-teal-500/50' : 'border-red-500/50'}`}>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{isCorrect ? '🎉' : '😅'}</span>
                  <div>
                    <p className={`font-black text-lg ${isCorrect ? 'text-teal-400' : 'text-red-400'}`}>
                      {isCorrect ? tr(lang, 'correct') : tr(lang, 'incorrect')}
                    </p>
                    <p className={`text-sm ${subtext} mt-0.5`}>
                      {story.quiz.explanation[lang === 'id' ? 'id' : 'en']}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Question */}
            <div className={`${card} border rounded-2xl p-5 mb-4 animate-fade-in-up`}>
              <p className={`text-xs font-bold uppercase tracking-wider ${subtext} mb-2`}>{tr(lang, 'comprehensionQuiz')}</p>
              <p className={`font-black ${text} text-lg`}>
                {story.quiz.question[lang] || story.quiz.question['en']}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-5 animate-fade-in-up">
              {story.quiz.options.map((opt, i) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectAnswer(opt.id)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border transition-all font-semibold animate-fade-in-up ${getOptionStyle(opt.id)}`}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <span className={`inline-flex w-7 h-7 rounded-full border mr-3 text-xs font-black items-center justify-center flex-shrink-0
                    ${selectedAnswer === opt.id && !submitted ? 'bg-purple-500 border-purple-500 text-white' : ''}`}>
                    {opt.id.toUpperCase()}
                  </span>
                  {opt.text[lang] || opt.text['en']}
                  {submitted && opt.id === story.quiz.correct && <span className="ml-2 text-teal-400">✓</span>}
                </button>
              ))}
            </div>

            {/* Action */}
            <div className="animate-fade-in-up">
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className="w-full py-4 rounded-2xl bg-purple-500 hover:bg-purple-400 active:scale-95 text-white font-black text-lg transition-all shadow-lg shadow-purple-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {tr(lang, 'submitAnswers')}
                </button>
              ) : (
                <button
                  onClick={handleNextStory}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-400 hover:to-violet-400 active:scale-95 text-white font-black text-lg transition-all shadow-lg shadow-purple-500/20"
                >
                  {storyIdx + 1 >= total
                    ? (lang === 'id' ? 'Lihat Hasil 🏆' : 'See Results 🏆')
                    : (lang === 'id' ? 'Cerita Berikutnya →' : 'Next Story →')}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
