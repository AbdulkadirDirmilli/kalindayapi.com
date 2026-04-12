'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import SideContactBar from './SideContactBar'
import ScrollToTop from './ScrollToTop'
import CookieConsent from '../CookieConsent'
import { CurrencyProvider } from '../providers/CurrencyProvider'
import { LocaleProvider } from '../providers/LocaleProvider'
import type { Locale } from '@/lib/i18n'

interface LayoutWrapperProps {
  children: React.ReactNode
  locale?: Locale
}

export default function LayoutWrapper({ children, locale = 'tr' }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    // Admin panelinde sadece children render et
    return <>{children}</>
  }

  // Public sayfalar için tam layout
  return (
    <LocaleProvider locale={locale}>
      <CurrencyProvider>
        <ScrollToTop />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <SideContactBar />
        <CookieConsent />
      </CurrencyProvider>
    </LocaleProvider>
  )
}
