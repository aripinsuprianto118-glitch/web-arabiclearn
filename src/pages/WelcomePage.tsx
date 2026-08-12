import type { UserProfile } from '../types'
import { tr } from '../i18n'

interface WelcomePageProps {
  user: UserProfile
  onStart: () => void
  darkMode: boolean
}

const goals = [
  {
    arabic: 'أَنْ يَفْهَمَ الطُّلَّابُ الْمُفْرَدَاتِ الْجَدِيدَةَ فَهْمًا صَحِيحًا.',
    translation: 'Agar siswa memahami kosakata baru dengan benar.',
    icon: '📖',
  },
  {
    arabic: 'أَنْ يَنْطِقَ الطُّلَّابُ الْكَلِمَاتِ وَالْجُمَلَ نُطْقًا سَلِيمًا.',
    translation: 'Agar siswa dapat melafalkan kata dan kalimat dengan pelafalan yang benar.',
    icon: '🗣️',
  },
  {
    arabic: 'أَنْ يَسْتَخْدِمَ الطُّلَّابُ الْمُفْرَدَاتِ الْجَدِيدَةَ فِي جُمَلٍ مُفِيدَةٍ.',
    translation: 'Agar siswa dapat menggunakan kosakata baru dalam kalimat yang bermakna.',
    icon: '✍️',
  },
  {
    arabic: 'أَنْ يُجِيبَ الطُّلَّابُ عَنِ الْأَسْئِلَةِ الْمُتَعَلِّقَةِ بِالنَّصِّ إِجَابَةً صَحِيحَةً.',
    translation: 'Agar siswa dapat menjawab pertanyaan yang berkaitan dengan teks dengan benar.',
    icon: '💡',
  },
  {
    arabic: 'أَنْ يَكْتَسِبَ الطُّلَّابُ مَهَارَةَ الِاسْتِمَاعِ وَالْكَلَامِ وَالْقِرَاءَةِ فِي اللُّغَةِ الْعَرَبِيَّةِ.',
    translation: 'Agar siswa memperoleh keterampilan menyimak, berbicara, dan membaca dalam bahasa Arab.',
    icon: '🌟',
  },
]

export default function WelcomePage({ user, onStart, darkMode }: WelcomePageProps) {
  const lang = user.language
  const bg = darkMode ? 'bg-[#080c18]' : 'bg-slate-50'
  const card = darkMode ? 'bg-[#0f1629] border-white/8' : 'bg-white border-black/8'
  const text = darkMode ? 'text-slate-100' : 'text-slate-800'
  const subtext = darkMode ? 'text-slate-400' : 'text-slate-500'
  const arabicText = darkMode ? 'text-amber-300' : 'text-amber-700'

  return (
    <div className={`min-h-screen ${bg} geometric-bg flex flex-col`}>
      <div className="fixed top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto w-full px-4 py-16 flex flex-col">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <span className="text-amber-500 text-sm font-bold">مرحباً {user.name || 'يا طالب'}!</span>
          </div>
          <h1 className={`text-4xl font-black ${text} mb-3`}>
            {tr(lang, 'learningGoals')}
          </h1>
          <p className={`${subtext}`}>
            أهداف تعلم اللغة العربية — Tujuan Pembelajaran Bahasa Arab
          </p>
        </div>

        {/* Goals */}
        <div className="space-y-4 mb-12">
          {goals.map((goal, i) => (
            <div
              key={i}
              className={`${card} border rounded-2xl p-5 animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-amber-500/10 flex items-center justify-center text-xl">
                  {goal.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`arabic-text text-lg leading-relaxed mb-2 ${arabicText} font-semibold`}>
                    {goal.arabic}
                  </p>
                  <p className={`text-sm leading-relaxed ${subtext}`}>{goal.translation}</p>
                </div>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full border-2 border-amber-500/30 flex items-center justify-center text-amber-500 font-black text-sm`}>
                  {i + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Start button */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-95 text-white font-black text-xl transition-all shadow-2xl shadow-amber-500/30"
          >
            <span>{tr(lang, 'startLearning')}</span>
            <span className="text-2xl">🚀</span>
          </button>
          <p className={`mt-4 text-sm ${subtext}`}>بِسْمِ اللهِ نَبْدَأُ — Mari kita mulai bersama</p>
        </div>
      </div>
    </div>
  )
}
