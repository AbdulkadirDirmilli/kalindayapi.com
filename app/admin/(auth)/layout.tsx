import SessionProvider from '@/components/providers/SessionProvider'

export const metadata = {
  title: 'Giris | Kalinda Yapi Admin',
  robots: 'noindex, nofollow',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-surface">{children}</div>
    </SessionProvider>
  )
}
