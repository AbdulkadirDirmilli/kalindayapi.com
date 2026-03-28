import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SessionProvider from '@/components/providers/SessionProvider'
import AdminSidebar from '@/components/admin/layout/AdminSidebar'

export const metadata = {
  title: 'Admin Panel | Kalinda Yapi',
  robots: 'noindex, nofollow',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/giris')
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-surface">
        <AdminSidebar
          user={{
            name: session.user.name,
            email: session.user.email,
          }}
        />
        <main className="lg:ml-64 min-h-screen transition-all duration-300">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}
