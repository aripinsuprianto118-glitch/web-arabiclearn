import { useState, useRef } from 'react'
import type { UserProfile, Page, Language } from '../types'
import { tr } from '../i18n'
import Header from '../components/Header'
import { sentenceQuestions } from '../data/mockData'

interface Level2Props {
  user: UserProfile
  onNavigate: (page: Page) => void
  onLanguageChange: (lang: Language) => void
  darkMode: boolean
  onAnswer: () => void
  onComplete: (xp: number) => void
}

export default function Level2Page({ user, onNavigate, onLanguageChange, darkMode, onAnswer, onComplete }: Level2Props) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [mode, setMode] = useState<'click' | 'type'>('click')
  const [sentence, setSentence] = useState<string[]>([])
  const [typedAnswer, setTypedAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [answeredFirst, setAnsweredFirst] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [finished, setFinished] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const lang = user.language
  const q = sentenceQuestions[currentIdx]
  const total = sentenceQuestions.length
  const allWords = [...q.correctOrder, ...q.distractors].sort(() => Math.random() - 0.5)

  const bg = darkMode ? 'bg-[#080c18]' : 'bg-slate-50'
  const card = darkMode ? 'bg-[#0f1629] border-white/8' : 'bg-white border-black/8'
  const text = darkMode ? 'text-slate-100' : 'text-slate-800'
  const subtext = darkMode ? 'text-slate-400' : 'text-slate-500'

  const progressPct = ((currentIdx + (checked ? 1 : 0)) / total) * 100

  function addWord(word: string) {
    if (sentence.includes(word)) return
    if (!answeredFirst) { onAnswer(); setAnsweredFirst(true) }
    setSentence(s => [...s, word])
    setChecked(false)
  }

  function removeWord(idx: number) {
    setSentence(s => s.filter((_, i) => i !== idx))
    setChecked(false)
  }

  function clearAll() {
    setSentence([])
    setChecked(false)
  }

  function handlePlayAudio() {
    setPlaying(true)
    if (audioRef.current) {
      const src = new URL(`audio/${q.audioFile}`, import.meta.env.BASE_URL).href
      audioRef.current.src = src
      audioRef.current.load()
      audioRef.current.play().catch(() => {})
    }
    setTimeout(() => setPlaying(false), 2000)
  }

  function isClickCorrect() {
    if (sentence.length !== q.correctOrder.length) return false
    return sentence.every((w, i) => w === q.correctOrder[i])
  }

  function isTypeCorrect() {
    const normalized = typedAnswer.trim().replace(/\s+/g, ' ')
    const expected = q.correctOrder.join(' ').replace(/[أإآ]/g, 'ا')
    const input = normalized.replace(/[أإآ]/g, 'ا').replace(/[ؗ-ًؚ-ٟ]/g, '')
    const exp = expected.replace(/[ؗ-ًؚ-ٟ]/g, '')
    return input === exp || normalized === q.fullSentence
  }

  const isCorrect = mode === 'click' ? isClickCorrect() : isTypeCorrect()

  function handleCheck() {
    if (!answeredFirst) { onAnswer(); setAnsweredFirst(true) }
    setChecked(true)
    if (isCorrect) setCorrectCount(c => c + 1)
  }

  function handleTryAgain() {
    setSentence([])
    setTypedAnswer('')
    setChecked(false)
  }

  function handleNext() {
    if (currentIdx + 1 >= total) {
      setFinished(true)
    } else {
      setCurrentIdx(i => i + 1)
      setSentence([])
      setTypedAnswer('')
      setChecked(false)
    }
  }

  function handleFinish() {
    const xp = Math.round((correctCount / total) * 60) + (correctCount === total ? 20 : 0)
    onComplete(xp)
    onNavigate('dashboard')
  }

  // ── Final score screen ─────────────────────
  if (finished) {
    const pct = Math.round((correctCount / total) * 100)
    const xp = Math.round((correctCount / total) * 60) + (correctCount === total ? 20 : 0)
    return (
      <div className={`min-h-screen ${bg} geometric-bg`}>
        <Header user={user} onNavigate={onNavigate} onLanguageChange={onLanguageChange} darkMode={darkMode} />
        <div className="pt-28 pb-16 px-4 max-w-md mx-auto flex flex-col items-center text-center">
          <div className="text-7xl mb-4 animate-bounce-slow">
            {pct === 100 ? '🏆' : pct >= 70 ? '🎉' : '📖'}
          </div>
          <h2 className={`text-3xl font-black ${text} mb-2`}>{tr(lang, 'levelComplete')}</h2>
          <p className={`${subtext} mb-8`}>
            {lang === 'id' ? 'Kuis Level 2 — Menyusun Kalimat Selesai!' : 'Level 2 Sentence Building Complete!'}
          </p>
          <div className={`w-full ${card} border rounded-2xl p-6 mb-6`}>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-black text-teal-400">{correctCount}/{total}</p>
                <p className={`text-xs ${subtext} mt-1`}>{lang === 'id' ? 'Benar' : 'Correct'}</p>
              </div>
              <div>
                <p className="text-3xl font-black text-purple-400">{pct}%</p>
                <p className={`text-xs ${subtext} mt-1`}>{lang === 'id' ? 'Akurasi' : 'Accuracy'}</p>
              </div>
              <div>
                <p className="text-3xl font-black text-amber-500">+{xp}</p>
                <p className={`text-xs ${subtext} mt-1`}>XP</p>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              {[1, 2, 3].map(s => (
                <span key={s} className={`text-3xl ${pct >= s * 34 ? '' : 'grayscale opacity-30'}`}>⭐</span>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <button
              onClick={handleFinish}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 active:scale-95 text-white font-black text-lg transition-all shadow-lg shadow-teal-500/20"
            >
              🏠 {tr(lang, 'backToDashboard')}
            </button>
            <button
              onClick={() => { setCurrentIdx(0); setSentence([]); setTypedAnswer(''); setChecked(false); setCorrectCount(0); setFinished(false) }}
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
      <audio ref={audioRef} />

      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        {/* Progress row */}
        <div className="flex items-center gap-3 mb-4 animate-fade-in-up">
          <button onClick={() => onNavigate('dashboard')} className={`text-sm font-semibold ${subtext} hover:text-amber-500 transition-colors`}>✕</button>
          <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full bg-teal-500 transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
          <span className={`text-sm font-black ${text}`}>{currentIdx + 1}<span className={subtext}>/{total}</span></span>
        </div>

        {/* Level badge + score */}
        <div className="flex items-center gap-2 mb-5 animate-fade-in-up">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30">
            🔤 Mutawassith · {tr(lang, 'level')} 2
          </span>
          <span className={`text-xs ${subtext}`}>
            {lang === 'id' ? `Soal ${currentIdx + 1} dari ${total}` : `Question ${currentIdx + 1} of ${total}`}
          </span>
          <span className="ml-auto text-xs font-bold text-teal-400">✓ {correctCount} {lang === 'id' ? 'benar' : 'correct'}</span>
        </div>

        {/* Instruction card + audio */}
        <div className={`${card} border rounded-2xl p-5 mb-4 animate-fade-in-up`}>
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-bold uppercase tracking-wider ${subtext} mb-1`}>{tr(lang, 'instruction')}</p>
              <p className={`text-xl font-black ${text}`}>
                {`"${q.instruction[lang] || q.instruction['en']}"`}
              </p>
              <p className={`arabic-text text-base text-amber-400/70 mt-1`}>{q.fullSentence}</p>
            </div>
            <button
              onClick={handlePlayAudio}
              className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all
                ${playing
                  ? 'bg-teal-500 text-white animate-pulse-glow'
                  : darkMode ? 'bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 border border-teal-500/30' : 'bg-teal-50 text-teal-600 hover:bg-teal-100 border border-teal-200'
                }`}
              title={`${tr(lang, 'playAudio')} — replace ${q.audioFile} with your MP3`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </div>

        {/* Mode toggle */}
        <div className={`${card} border rounded-2xl p-1 mb-4 flex animate-fade-in-up`}>
          <button
            onClick={() => { setMode('click'); setSentence([]); setChecked(false) }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'click' ? 'bg-teal-500 text-white' : `${subtext} hover:text-teal-400`}`}
          >
            🖱 {tr(lang, 'clickMode')}
          </button>
          <button
            onClick={() => { setMode('type'); setTypedAnswer(''); setChecked(false) }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'type' ? 'bg-teal-500 text-white' : `${subtext} hover:text-teal-400`}`}
          >
            ⌨️ {tr(lang, 'typeMode')}
          </button>
        </div>

        {mode === 'click' ? (
          <>
            {/* Answer area */}
            <div className={`${card} border rounded-2xl p-5 mb-4 min-h-16 animate-fade-in-up`}>
              <div className="flex items-center justify-between mb-3">
                <p className={`text-xs font-bold uppercase tracking-wider ${subtext}`}>{tr(lang, 'yourAnswer')}</p>
                <button onClick={clearAll} className={`text-xs font-semibold ${subtext} hover:text-red-400 transition-colors`}>{tr(lang, 'clearAll')} ✕</button>
              </div>
              <div className="flex flex-wrap gap-2 min-h-10 items-center">
                {sentence.length === 0 ? (
                  <p className={`text-sm ${subtext} italic`}>
                    {lang === 'id' ? 'Klik kata di bawah untuk menyusun kalimat...' : 'Click words below to build the sentence...'}
                  </p>
                ) : sentence.map((w, i) => (
                  <button
                    key={i}
                    onClick={() => removeWord(i)}
                    className="px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 arabic-text text-lg font-semibold word-chip hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Word bank */}
            <div className={`${card} border rounded-2xl p-5 mb-4 animate-fade-in-up`}>
              <p className={`text-xs font-bold uppercase tracking-wider ${subtext} mb-3`}>{tr(lang, 'availableWords')}</p>
              <div className="flex flex-wrap gap-2">
                {allWords.map(w => {
                  const used = sentence.includes(w)
                  return (
                    <button
                      key={w}
                      onClick={() => !used && addWord(w)}
                      disabled={used}
                      className={`px-4 py-2 rounded-xl border arabic-text text-lg font-semibold word-chip transition-all
                        ${used
                          ? darkMode ? 'bg-white/3 border-white/5 text-slate-600 cursor-not-allowed' : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                          : darkMode ? 'bg-white/5 border-white/15 text-slate-200 hover:bg-teal-500/10 hover:border-teal-500/30 hover:text-teal-300' : 'bg-white border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-300'
                        }`}
                    >
                      {w}
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <div className={`${card} border rounded-2xl p-5 mb-4 animate-fade-in-up`}>
            <p className={`text-xs font-bold uppercase tracking-wider ${subtext} mb-3`}>{tr(lang, 'yourAnswer')}</p>
            <textarea
              value={typedAnswer}
              onChange={e => { setTypedAnswer(e.target.value); setChecked(false); if (!answeredFirst) { onAnswer(); setAnsweredFirst(true) } }}
              placeholder={lang === 'id' ? 'Ketik jawaban dalam bahasa Arab...' : 'Type your Arabic answer here...'}
              dir="rtl"
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border outline-none resize-none transition-colors arabic-text text-xl
                ${darkMode ? 'bg-white/5 border-white/10 text-slate-100 placeholder-slate-600 focus:border-teal-500' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-teal-500'}`}
            />
            <p className={`text-xs ${subtext} mt-2`}>
              {lang === 'id' ? `Jawaban: ${q.fullSentence}` : `Answer: ${q.fullSentence}`}
            </p>
          </div>
        )}

        {/* Feedback */}
        {checked && (
          <div className={`${card} border rounded-2xl p-5 mb-4 animate-fade-in-up ${isCorrect ? 'border-teal-500/50' : 'border-red-500/50'}`}>
            <div className="flex items-start gap-3">
              <span className="text-3xl">{isCorrect ? '🎉' : '😅'}</span>
              <div>
                <p className={`font-black text-base ${isCorrect ? 'text-teal-400' : 'text-red-400'}`}>
                  {isCorrect ? tr(lang, 'correct') : tr(lang, 'incorrect')}
                </p>
                <p className={`text-sm ${subtext} mt-0.5`}>
                  {lang === 'id'
                    ? `Kalimat yang benar: ${q.fullSentence}`
                    : `Correct sentence: ${q.fullSentence}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="animate-fade-in-up">
          {!checked ? (
            <button
              onClick={handleCheck}
              disabled={mode === 'click' ? sentence.length === 0 : !typedAnswer.trim()}
              className="w-full py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-white font-black text-lg transition-all shadow-lg shadow-teal-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
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
              onClick={handleTryAgain}
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
