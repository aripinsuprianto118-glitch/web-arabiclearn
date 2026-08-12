export type Page = 'login' | 'onboarding' | 'welcome' | 'dashboard' | 'level1' | 'level2' | 'level3' | 'profile'
export type Language = 'en' | 'id' | 'ar'

export interface UserProfile {
  name: string
  age: string
  profession: string
  streak: number
  avatar: string | null
  darkMode: boolean
  language: Language
  streakHistory: string[]
  completedLevels: number[]
  xp: number
}
