'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Mail,
  Image as ImageIcon,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  ExternalLink,
  Layers,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/ilanlar', label: 'İlanlar', icon: Building2 },
  { href: '/admin/hizmetler', label: 'Hizmetler', icon: Briefcase },
  { href: '/admin/oncesi-sonrasi', label: 'Öncesi-Sonrası', icon: Layers },
  { href: '/admin/iletisim', label: 'Mesajlar', icon: Mail, badge: 'unreadMessages' },
  { href: '/admin/medya', label: 'Medya', icon: ImageIcon },
  { href: '/admin/ortaklar', label: 'Ortaklar', icon: Users },
  { href: '/admin/ayarlar', label: 'Ayarlar', icon: Settings },
]

interface AdminSidebarProps {
  user: {
    name?: string | null
    email: string
  }
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(0)

  // Fetch unread message count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/iletisim?durum=yeni&limit=1')
      if (response.ok) {
        const data = await response.json()
        setUnreadMessages(data.pagination?.total || 0)
      }
    } catch (error) {
      console.error('Okunmamış mesaj sayısı alınamadı:', error)
    }
  }, [])

  useEffect(() => {
    fetchUnreadCount()
    // Refresh every 60 seconds
    const interval = setInterval(fetchUnreadCount, 60000)
    return () => clearInterval(interval)
  }, [fetchUnreadCount])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
    // Refresh unread count on route change
    fetchUnreadCount()
  }, [pathname, fetchUnreadCount])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/giris' })
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-primary z-40 flex items-center justify-between px-4">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Menu"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Kalinda"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-bold text-white">Kalinda</span>
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 mt-14"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 h-screen bg-primary text-white z-40 transition-all duration-300 flex flex-col',
          // Desktop
          'lg:translate-x-0',
          isCollapsed ? 'lg:w-20' : 'lg:w-64',
          // Mobile
          'w-64 mt-14 lg:mt-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ height: isMobileOpen ? 'calc(100vh - 3.5rem)' : '100vh' }}
      >
        {/* Desktop Header - Hidden on Mobile */}
        <div className="hidden lg:block p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div
              className={clsx(
                'flex items-center gap-3',
                isCollapsed && 'justify-center w-full'
              )}
            >
              <Image
                src="/logo.svg"
                alt="Kalinda"
                width={40}
                height={40}
                className="w-10 h-10 flex-shrink-0"
              />
              {!isCollapsed && (
                <div>
                  <h1 className="font-bold text-lg">Kalinda</h1>
                  <p className="text-xs text-white/60">Admin Panel</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <ChevronLeft
                className={clsx(
                  'w-5 h-5 transition-transform',
                  isCollapsed && 'rotate-180'
                )}
              />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            const badgeCount = item.badge === 'unreadMessages' ? unreadMessages : 0

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative',
                  active
                    ? 'bg-accent text-primary font-semibold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white',
                  isCollapsed && 'lg:justify-center'
                )}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {badgeCount > 0 && isCollapsed && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </div>
                <span className={clsx(isCollapsed && 'lg:hidden', 'flex items-center gap-2')}>
                  {item.label}
                  {badgeCount > 0 && !isCollapsed && (
                    <span className="bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                      {badgeCount > 99 ? '99+' : badgeCount}
                    </span>
                  )}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/10">
          <div className={clsx('mb-3 px-3', isCollapsed && 'lg:hidden')}>
            <p className="font-medium text-sm truncate">
              {user.name || 'Admin'}
            </p>
            <p className="text-xs text-white/60 truncate">{user.email}</p>
          </div>
          <Link
            href="/"
            target="_blank"
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-white/80 hover:bg-white/10 hover:text-white w-full mb-1',
              isCollapsed && 'lg:justify-center'
            )}
          >
            <ExternalLink className="w-5 h-5 flex-shrink-0" />
            <span className={clsx(isCollapsed && 'lg:hidden')}>Siteyi Gör</span>
          </Link>
          <button
            onClick={handleSignOut}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-white/80 hover:bg-white/10 hover:text-white w-full',
              isCollapsed && 'lg:justify-center'
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={clsx(isCollapsed && 'lg:hidden')}>Çıkış Yap</span>
          </button>
        </div>
      </aside>
    </>
  )
}
