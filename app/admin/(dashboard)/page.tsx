import { Building2, Briefcase, Mail, Users, TrendingUp, Clock } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import StatsCard from '@/components/admin/dashboard/StatsCard'
import Link from 'next/link'

async function getDashboardStats() {
  const [
    ilanCount,
    hizmetCount,
    ortakCount,
    contactCount,
    recentIlanlar,
    recentContacts,
  ] = await Promise.all([
    prisma.ilan.count(),
    prisma.hizmet.count(),
    prisma.ortak.count(),
    prisma.contactForm.count({ where: { durum: 'yeni' } }),
    prisma.ilan.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        baslik: true,
        kategori: true,
        durum: true,
        createdAt: true,
      },
    }),
    prisma.contactForm.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        ad: true,
        konu: true,
        durum: true,
        createdAt: true,
      },
    }),
  ])

  return {
    ilanCount,
    hizmetCount,
    ortakCount,
    contactCount,
    recentIlanlar,
    recentContacts,
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        subtitle="Kalinda Yapi yonetim paneline hos geldiniz"
      />

      <div className="p-4 sm:p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatsCard
            title="Toplam Ilan"
            value={stats.ilanCount}
            icon={Building2}
            color="primary"
          />
          <StatsCard
            title="Hizmetler"
            value={stats.hizmetCount}
            icon={Briefcase}
            color="accent"
          />
          <StatsCard
            title="Yeni Mesaj"
            value={stats.contactCount}
            icon={Mail}
            color="error"
          />
          <StatsCard
            title="Ortaklar"
            value={stats.ortakCount}
            icon={Users}
            color="success"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Listings */}
          <div className="bg-white rounded-xl border border-border">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-primary">Son Ilanlar</h2>
              </div>
              <Link
                href="/admin/ilanlar"
                className="text-sm text-accent hover:text-accent-dark"
              >
                Tumunu Gor
              </Link>
            </div>
            <div className="p-4">
              {stats.recentIlanlar.length === 0 ? (
                <p className="text-text-light text-sm py-4 text-center">
                  Henuz ilan eklenmemis
                </p>
              ) : (
                <ul className="space-y-3">
                  {stats.recentIlanlar.map((ilan) => (
                    <li
                      key={ilan.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div>
                        <p className="font-medium text-sm text-text">
                          {ilan.baslik}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              ilan.kategori === 'satilik'
                                ? 'bg-success/10 text-success'
                                : 'bg-accent/10 text-accent-dark'
                            }`}
                          >
                            {ilan.kategori === 'satilik' ? 'Satilik' : 'Kiralik'}
                          </span>
                          <span className="text-xs text-text-muted flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(ilan.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/admin/ilanlar/${ilan.id}/duzenle`}
                        className="text-xs text-primary hover:text-primary-light"
                      >
                        Duzenle
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl border border-border">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-primary">Son Mesajlar</h2>
              </div>
              <Link
                href="/admin/iletisim"
                className="text-sm text-accent hover:text-accent-dark"
              >
                Tumunu Gor
              </Link>
            </div>
            <div className="p-4">
              {stats.recentContacts.length === 0 ? (
                <p className="text-text-light text-sm py-4 text-center">
                  Henuz mesaj gelmemis
                </p>
              ) : (
                <ul className="space-y-3">
                  {stats.recentContacts.map((contact) => (
                    <li
                      key={contact.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div>
                        <p className="font-medium text-sm text-text">
                          {contact.ad}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-text-muted">
                            {contact.konu || 'Genel'}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              contact.durum === 'yeni'
                                ? 'bg-error/10 text-error'
                                : 'bg-success/10 text-success'
                            }`}
                          >
                            {contact.durum === 'yeni' ? 'Yeni' : 'Okundu'}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(contact.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">
            Hizli Islemler
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <Link
              href="/admin/ilanlar/yeni"
              className="bg-white rounded-xl border border-border p-4 hover:border-primary transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                <Building2 className="w-5 h-5 text-primary group-hover:text-white" />
              </div>
              <p className="font-medium text-sm text-text">Yeni Ilan Ekle</p>
            </Link>
            <Link
              href="/admin/hizmetler"
              className="bg-white rounded-xl border border-border p-4 hover:border-primary transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent transition-colors">
                <Briefcase className="w-5 h-5 text-accent-dark group-hover:text-primary" />
              </div>
              <p className="font-medium text-sm text-text">Hizmetleri Yonet</p>
            </Link>
            <Link
              href="/admin/medya"
              className="bg-white rounded-xl border border-border p-4 hover:border-primary transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mb-3 group-hover:bg-success group-hover:text-white transition-colors">
                <TrendingUp className="w-5 h-5 text-success group-hover:text-white" />
              </div>
              <p className="font-medium text-sm text-text">Medya Yukle</p>
            </Link>
            <Link
              href="/admin/iletisim"
              className="bg-white rounded-xl border border-border p-4 hover:border-primary transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center mb-3 group-hover:bg-error group-hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-error group-hover:text-white" />
              </div>
              <p className="font-medium text-sm text-text">Mesajlari Gor</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
