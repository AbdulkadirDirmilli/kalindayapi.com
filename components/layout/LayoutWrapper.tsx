'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import SideContactBar from './SideContactBar'
import ScrollToTop from './ScrollToTop'
import CookieConsent from '../CookieConsent'
import { CurrencyProvider } from '../providers/CurrencyProvider'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    // Admin panelinde sadece children render et
    return <>{children}</>
  }

  // Public sayfalar için tam layout
  return (
    <CurrencyProvider>
      <ScrollToTop />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <SideContactBar />
      <CookieConsent />
    </CurrencyProvider>
  )
}
