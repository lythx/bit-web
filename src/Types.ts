type Language = 'en' | 'se' | 'no'

type LangStrings = { [lang in Language]: string }

interface PrizeData {
  year: number
  date: Date
  category: LangStrings
  reward: number
}

type Order = 'asc' | 'desc'

export const languages = ['en', 'se', 'no'] as const
 
export type { Language, LangStrings, PrizeData, Order }
