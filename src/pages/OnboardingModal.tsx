import { useState } from 'react'
import type { UserProfile } from '../types'

interface OnboardingModalProps {
  onComplete: (data: Partial<UserProfile>) => void
  darkMode: boolean
}

const professions = [
  { value: 'student', emoji: '🎒', label: 'Siswa (Sekolah)' },
  { value: 'university', emoji: '🎓', label: 'Mahasiswa' },
  { value: 'parent', emoji: '👨‍👩‍👧', label: 'Orang Tua' },
  { value: 'teacher', emoji: '👩‍🏫', label: 'Guru / Pengajar' },
  { value: 'professional', emoji: '💼', label: 'Profesional' },
  { value: 'other', emoji: '✨', label: 'Lainnya' },
]

export default function OnboardingModal({ onComplete, darkMode }: OnboardingModalProps) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [profession, setProfession] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const overlay = 'fixed inset-0 z-50 flex items-center justify-center p-4'
  const card = darkMode ? 'bg-[#0f1629] border-white/10' : 'bg-white border-black/10'
  const text = darkMode ? 'text-slate-100' : 'text-slate-800'
  const subtext = darkMode ? 'text-slate-400' : 'text-slate-500'
  const inputCls = darkMode
    ? 'bg-white/5 border-white/10 text-slate-100 placeholder-slate-500 focus:border-amber-500'
    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-amber-500'

  function validateStep1() {
    if (!name.trim()) { setErrors({ name: 'Nama wajib diisi.' }); return false }
    setErrors({})
    return true
  }
  function validateStep2() {
    if (!age.trim() || isNaN(Number(age)) || Number(age) < 5 || Number(age) > 99) {
      setErrors({ age: 'Masukkan usia yang valid.' }); return false
    }
    setErrors({})
    return true
  }
  function validateStep3() {
    if (!profession) { setErrors({ profession: 'Pilih profesi Anda.' }); return false }
    setErrors({})
    return true
  }

  function handleNext() {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
  }

  function handleFinish() {
    if (!validateStep3()) return
    onComplete({ name: name.trim(), age, profession })
  }

  const steps = [
    { num: 1, label: 'Nama' },
    { num: 2, label: 'Usia' },
    { num: 3, label: 'Profesi' },
  ]

  return (
    <div className={overlay}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className={`relative w-full max-w-md ${card} border rounded-2xl shadow-2xl p-8 animate-fade-in-up`}>
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map(s => (
            <div key={s.num} className={`flex items-center gap-2`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${step === s.num ? 'bg-amber-500 text-white scale-110' : step > s.num ? 'bg-teal-500 text-white' : darkMode ? 'bg-white/10 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
                {step > s.num ? '✓' : s.num}
              </div>
              {s.num < 3 && (
                <div className={`w-12 h-0.5 transition-all ${step > s.num ? 'bg-teal-500' : darkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        <h2 className={`text-2xl font-black text-center mb-1 ${text}`}>Lengkapi Profil Anda</h2>
        <p className={`text-center text-sm mb-8 ${subtext}`}>Langkah {step} dari 3</p>

        {step === 1 && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">👋</div>
              <p className={`font-semibold ${subtext}`}>Halo! Siapa nama Anda?</p>
            </div>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleNext()}
              placeholder="Nama lengkap Anda..."
              autoFocus
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors text-center text-lg font-semibold ${inputCls}`}
            />
            {errors.name && <p className="text-red-400 text-sm text-center">{errors.name}</p>}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎂</div>
              <p className={`font-semibold ${subtext}`}>Berapa usia Anda?</p>
            </div>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleNext()}
              placeholder="Contoh: 20"
              min="5"
              max="99"
              autoFocus
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors text-center text-lg font-semibold ${inputCls}`}
            />
            {errors.age && <p className="text-red-400 text-sm text-center">{errors.age}</p>}
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-5">
              <div className="text-5xl mb-3">💼</div>
              <p className={`font-semibold ${subtext}`}>Apa profesi Anda?</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {professions.map(p => (
                <button
                  key={p.value}
                  onClick={() => setProfession(p.value)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all text-left
                    ${profession === p.value
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                      : darkMode
                        ? 'border-white/8 hover:border-white/20 text-slate-300'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                >
                  <span className="text-xl">{p.emoji}</span>
                  <span className="text-sm font-semibold">{p.label}</span>
                </button>
              ))}
            </div>
            {errors.profession && <p className="text-red-400 text-sm text-center mt-2">{errors.profession}</p>}
          </div>
        )}

        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className={`flex-1 py-3 rounded-xl border font-bold transition-all ${darkMode ? 'border-white/10 text-slate-300 hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              ← Kembali
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-white font-bold transition-all shadow-lg shadow-amber-500/20"
            >
              Lanjut →
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-95 text-white font-bold transition-all shadow-lg shadow-amber-500/20"
            >
              Selesai! 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
