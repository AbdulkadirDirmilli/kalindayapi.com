'use client'

import Link from 'next/link'
import {
  Users,
  FileText,
  Send,
  History,
  Settings,
  ChevronRight,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'

const smsMenuItems = [
  {
    href: '/admin/sms/kisiler',
    title: 'Kişiler',
    description: 'Kişi ve grupları yönet',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    href: '/admin/sms/sablonlar',
    title: 'Şablonlar',
    description: 'Mesaj şablonları',
    icon: FileText,
    color: 'bg-green-500',
  },
  {
    href: '/admin/sms/gonder',
    title: 'SMS Gönder',
    description: 'Toplu SMS gönder',
    icon: Send,
    color: 'bg-orange-500',
  },
  {
    href: '/admin/sms/gecmis',
    title: 'Geçmiş',
    description: 'Gönderim kayıtları',
    icon: History,
    color: 'bg-purple-500',
  },
  {
    href: '/admin/sms/ayarlar',
    title: 'Ayarlar',
    description: 'NetGSM API',
    icon: Settings,
    color: 'bg-gray-500',
  },
]

export default function SmsPage() {
  return (
    <div>
      <AdminHeader
        title="SMS Yönetimi"
        subtitle="NetGSM entegrasyonu ile SMS gönderimi"
      />

      <div className="p-3 sm:p-6">
        {/* Mobil: Compact liste görünümü */}
        <div className="sm:hidden space-y-2">
          {smsMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-lg border border-border p-3 flex items-center gap-3 active:bg-surface transition-colors"
              >
                <div
                  className={`${item.color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-text text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-muted truncate">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
              </Link>
            )
          })}
        </div>

        {/* Tablet ve Desktop: Grid görünümü */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {smsMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-xl border border-border p-5 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`${item.color} w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-light mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
