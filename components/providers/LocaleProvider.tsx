'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'

interface LocaleContextType {
  locale: Locale
}

const LocaleContext = createContext<LocaleContextType>({ locale: 'tr' })

export function LocaleProvider({
  children,
  locale,
}: {
  children: ReactNode
  locale: Locale
}) {
  return (
    <LocaleContext.Provider value={{ locale }}>
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
