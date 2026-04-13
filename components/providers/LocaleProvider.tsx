'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'

// Dictionary tip tanımı - any kullanıyoruz çünkü tam Dictionary tipi server'da
type Dictionary = Record<string, any>

interface LocaleContextType {
  locale: Locale
  dict: Dictionary
}

const defaultDict: Dictionary = {}

const LocaleContext = createContext<LocaleContextType>({ locale: 'tr', dict: defaultDict })

export function LocaleProvider({
  children,
  locale,
  dictionary,
}: {
  children: ReactNode
  locale: Locale
  dictionary?: Dictionary
}) {
  const [dict, setDict] = useState<Dictionary>(dictionary || defaultDict)

  // Client-side'da dictionary'yi yükle (eğer prop olarak gelmemişse)
  useEffect(() => {
    if (!dictionary) {
      import(`@/lib/i18n/dictionaries/${locale}.json`)
        .then((module) => setDict(module.default))
        .catch(() => setDict(defaultDict))
    }
  }, [locale, dictionary])

  return (
    <LocaleContext.Provider value={{ locale, dict }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
