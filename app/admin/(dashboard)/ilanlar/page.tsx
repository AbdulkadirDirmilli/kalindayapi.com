'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Building2,
  Home,
  MapPin,
  X,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import DataTable from '@/components/admin/ui/DataTable'
import ConfirmDialog from '@/components/admin/ui/ConfirmDialog'

interface Ilan {
  id: string
  baslik: string
  slug: string
  kategori: string
  tip: string
  fiyat: number
  paraBirimi: string
  il: string
  ilce: string
  durum: string
  ilanNo: string
  createdAt: string
  fotograflar: { url: string }[]
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function IlanlarPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [ilanlar, setIlanlar] = useState<Ilan[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [kategori, setKategori] = useState(searchParams.get('kategori') || '')
  const [tip, setTip] = useState(searchParams.get('tip') || '')
  const [durum, setDurum] = useState(searchParams.get('durum') || '')

  const fetchIlanlar = async (page = 1) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', page.toString())
      params.set('limit', '10')
      if (search) params.set('search', search)
      if (kategori) params.set('kategori', kategori)
      if (tip) params.set('tip', tip)
      if (durum) params.set('durum', durum)

      const response = await fetch(`/api/admin/ilanlar?${params}`)
      if (response.ok) {
        const data = await response.json()
        setIlanlar(data.ilanlar)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Ilanlar yuklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchIlanlar()
  }, [search, kategori, tip, durum])

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/ilanlar/${deleteId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setIlanlar((prev) => prev.filter((ilan) => ilan.id !== deleteId))
        setPagination((prev) => ({ ...prev, total: prev.total - 1 }))
      }
    } catch (error) {
      console.error('Ilan silinemedi:', error)
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const formatPrice = (fiyat: number, birim: string) => {
    return new Intl.NumberFormat('tr-TR').format(fiyat) + ' ' + birim
  }

  const columns = [
    {
      key: 'baslik',
      header: 'Ilan',
      render: (ilan: Ilan) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center overflow-hidden">
            {ilan.fotograflar?.[0]?.url ? (
              <img
                src={ilan.fotograflar[0].url}
                alt={ilan.baslik}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="w-6 h-6 text-text-muted" />
            )}
          </div>
          <div>
            <p className="font-medium text-text line-clamp-1">{ilan.baslik}</p>
            <p className="text-xs text-text-muted">{ilan.ilanNo}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'kategori',
      header: 'Kategori',
      render: (ilan: Ilan) => (
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            ilan.kategori === 'satilik'
              ? 'bg-success/10 text-success'
              : 'bg-accent/10 text-accent-dark'
          }`}
        >
          {ilan.kategori === 'satilik' ? 'Satilik' : 'Kiralik'}
        </span>
      ),
    },
    {
      key: 'tip',
      header: 'Tip',
      render: (ilan: Ilan) => (
        <span className="text-sm capitalize">{ilan.tip}</span>
      ),
    },
    {
      key: 'fiyat',
      header: 'Fiyat',
      render: (ilan: Ilan) => (
        <span className="font-medium text-primary">
          {formatPrice(ilan.fiyat, ilan.paraBirimi)}
        </span>
      ),
    },
    {
      key: 'konum',
      header: 'Konum',
      render: (ilan: Ilan) => (
        <div className="flex items-center gap-1 text-sm text-text-light">
          <MapPin className="w-4 h-4" />
          {ilan.ilce}, {ilan.il}
        </div>
      ),
    },
    {
      key: 'durum',
      header: 'Durum',
      render: (ilan: Ilan) => (
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            ilan.durum === 'aktif'
              ? 'bg-success/10 text-success'
              : ilan.durum === 'pasif'
              ? 'bg-text-muted/10 text-text-muted'
              : 'bg-error/10 text-error'
          }`}
        >
          {ilan.durum === 'aktif'
            ? 'Aktif'
            : ilan.durum === 'pasif'
            ? 'Pasif'
            : 'Satildi'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Islemler',
      className: 'text-right',
      render: (ilan: Ilan) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/ilanlar/${ilan.id}`}
            target="_blank"
            className="p-2 hover:bg-surface rounded-lg transition-colors"
            title="Onizle"
          >
            <Eye className="w-4 h-4 text-text-light" />
          </Link>
          <Link
            href={`/admin/ilanlar/${ilan.id}/duzenle`}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
            title="Duzenle"
          >
            <Edit className="w-4 h-4 text-primary" />
          </Link>
          <button
            onClick={() => setDeleteId(ilan.id)}
            className="p-2 hover:bg-error/10 rounded-lg transition-colors"
            title="Sil"
          >
            <Trash2 className="w-4 h-4 text-error" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <AdminHeader title="Ilanlar" subtitle="Emlak ilanlarini yonetin" />

      <div className="p-4 sm:p-6">
        {/* Actions Bar */}
        <div className="flex flex-col gap-4 mb-4 sm:mb-6">
          {/* Search and Add Button Row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Ilan ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
            {/* Add New Button */}
            <Link href="/admin/ilanlar/yeni" className="btn btn-primary flex-shrink-0">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Yeni Ilan</span>
            </Link>
          </div>

          {/* Filters Row - scrollable on mobile */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="input py-2 px-3 w-auto text-sm flex-shrink-0"
            >
              <option value="">Kategori</option>
              <option value="satilik">Satilik</option>
              <option value="kiralik">Kiralik</option>
            </select>

            <select
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="input py-2 px-3 w-auto text-sm flex-shrink-0"
            >
              <option value="">Tip</option>
              <option value="daire">Daire</option>
              <option value="villa">Villa</option>
              <option value="arsa">Arsa</option>
              <option value="ticari">Ticari</option>
            </select>

            <select
              value={durum}
              onChange={(e) => setDurum(e.target.value)}
              className="input py-2 px-3 w-auto text-sm flex-shrink-0"
            >
              <option value="">Durum</option>
              <option value="aktif">Aktif</option>
              <option value="pasif">Pasif</option>
              <option value="satildi">Satildi</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(search || kategori || tip || durum) && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-sm text-text-light">Filtreler:</span>
            {search && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                Arama: {search}
                <button onClick={() => setSearch('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {kategori && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {kategori === 'satilik' ? 'Satilik' : 'Kiralik'}
                <button onClick={() => setKategori('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {tip && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs capitalize">
                {tip}
                <button onClick={() => setTip('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {durum && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs capitalize">
                {durum}
                <button onClick={() => setDurum('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearch('')
                setKategori('')
                setTip('')
                setDurum('')
              }}
              className="text-xs text-error hover:underline"
            >
              Tumunu Temizle
            </button>
          </div>
        )}

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={ilanlar}
          keyExtractor={(ilan) => ilan.id}
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={(page) => fetchIlanlar(page)}
          isLoading={isLoading}
          emptyMessage="Henuz ilan eklenmemis"
        />
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Ilani Sil"
        message="Bu ilani silmek istediginizden emin misiniz? Bu islem geri alinamaz."
        confirmText="Sil"
        cancelText="Iptal"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  )
}
