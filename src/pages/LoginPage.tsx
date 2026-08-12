import { useState } from 'react'

interface LoginPageProps {
  onLogin: () => void
  darkMode: boolean
}

export default function LoginPage({ onLogin, darkMode }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const bg = darkMode ? 'bg-[#080c18]' : 'bg-slate-50'
  const card = darkMode ? 'bg-[#0f1629] border-white/8' : 'bg-white border-black/8'
  const text = darkMode ? 'text-slate-100' : 'text-slate-800'
  const subtext = darkMode ? 'text-slate-400' : 'text-slate-500'
  const inputCls = darkMode
    ? 'bg-white/5 border-white/10 text-slate-100 placeholder-slate-500 focus:border-amber-500'
    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-amber-500'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!password.trim()) { setError('Please enter your password.'); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 800)
  }

  function handleGoogle() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 600)
  }

  return (
    <div className={`min-h-screen ${bg} geometric-bg flex items-center justify-center p-4`}>
      {/* Decorative blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl mb-4 animate-pulse-glow">
            <span className="text-white text-3xl font-black">ع</span>
          </div>
          <h1 className={`text-3xl font-black ${text}`}>ArabiLearn</h1>
          <p className={`mt-1 ${subtext}`}>
            {isSignUp ? 'Create your account' : 'Continue your Arabic learning journey'}
          </p>
        </div>

        <div className={`${card} border rounded-2xl p-8 shadow-2xl`}>
          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border ${darkMode ? 'border-white/10 hover:bg-white/5 text-slate-200' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} font-semibold transition-all mb-6 disabled:opacity-50`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className={`absolute inset-0 flex items-center`}>
              <div className={`w-full border-t ${darkMode ? 'border-white/8' : 'border-slate-200'}`} />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className={`px-3 ${darkMode ? 'bg-[#0f1629] text-slate-500' : 'bg-white text-slate-400'}`}>or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${subtext}`}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${inputCls}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${subtext}`}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${inputCls}`}
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm font-medium">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-white font-bold text-base transition-all shadow-lg shadow-amber-500/20 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Loading...
                </span>
              ) : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className={`text-center mt-5 text-sm ${subtext}`}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(v => !v)}
              className="text-amber-500 font-bold hover:text-amber-400 transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        <p className={`text-center mt-6 text-xs ${subtext}`}>
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
      </div>
    </div>
  )
}
