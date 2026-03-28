'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Briefcase,
  Check,
  X,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import ConfirmDialog from '@/components/admin/ui/ConfirmDialog'

interface AltHizmet {
  id: string
  baslik: string
  aciklama: string
  ikon: string
}

interface SSS {
  id: string
  soru: string
  cevap: string
}

interface Hizmet {
  id: string
  slug: string
  baslik: string
  kisaAciklama: string
  uzunAciklama: string
  ikon: string
  sira: number
  aktif: boolean
  altHizmetler: AltHizmet[]
  sss: SSS[]
  bolgeler: { bolge: string }[]
}

export default function HizmetlerPage() {
  const [hizmetler, setHizmetler] = useState<Hizmet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Edit form state
  const [editForm, setEditForm] = useState<Partial<Hizmet>>({})

  const fetchHizmetler = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/hizmetler')
      if (response.ok) {
        const data = await response.json()
        setHizmetler(data)
      }
    } catch (error) {
      console.error('Hizmetler yuklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHizmetler()
  }, [])

  const handleEdit = (hizmet: Hizmet) => {
    setEditingId(hizmet.id)
    setEditForm({
      baslik: hizmet.baslik,
      kisaAciklama: hizmet.kisaAciklama,
      uzunAciklama: hizmet.uzunAciklama,
      ikon: hizmet.ikon,
      aktif: hizmet.aktif,
    })
  }

  const handleSave = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/hizmetler/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })

      if (response.ok) {
        const updated = await response.json()
        setHizmetler((prev) =>
          prev.map((h) => (h.id === id ? updated : h))
        )
        setEditingId(null)
      }
    } catch (error) {
      console.error('Hizmet guncellenemedi:', error)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/hizmetler/${deleteId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setHizmetler((prev) => prev.filter((h) => h.id !== deleteId))
      }
    } catch (error) {
      console.error('Hizmet silinemedi:', error)
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="Hizmetler" subtitle="Hizmetleri yonetin" />
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-text-light">
              <svg
                className="animate-spin w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Yukleniyor...
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AdminHeader title="Hizmetler" subtitle="Hizmetleri yonetin" />

      <div className="p-4 sm:p-6">
        {hizmetler.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <Briefcase className="w-12 h-12 mx-auto text-text-muted mb-4" />
            <p className="text-text-light mb-4">Henuz hizmet eklenmemis</p>
            <p className="text-sm text-text-muted">
              Hizmetleri JSON migrasyonu ile veya manuel olarak ekleyebilirsiniz
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {hizmetler.map((hizmet) => (
              <div
                key={hizmet.id}
                className="bg-white rounded-xl border border-border overflow-hidden"
              >
                {/* Header */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-4">
                    <div className="cursor-move text-text-muted">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      {editingId === hizmet.id ? (
                        <input
                          type="text"
                          value={editForm.baslik || ''}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              baslik: e.target.value,
                            }))
                          }
                          className="input py-1 px-2 text-sm"
                        />
                      ) : (
                        <h3 className="font-semibold text-text">
                          {hizmet.baslik}
                        </h3>
                      )}
                      <p className="text-sm text-text-muted">
                        {hizmet.altHizmetler.length} alt hizmet,{' '}
                        {hizmet.sss.length} SSS
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        hizmet.aktif
                          ? 'bg-success/10 text-success'
                          : 'bg-text-muted/10 text-text-muted'
                      }`}
                    >
                      {hizmet.aktif ? 'Aktif' : 'Pasif'}
                    </span>

                    {editingId === hizmet.id ? (
                      <>
                        <button
                          onClick={() => handleSave(hizmet.id)}
                          className="p-2 hover:bg-success/10 rounded-lg transition-colors"
                        >
                          <Check className="w-4 h-4 text-success" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 hover:bg-error/10 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-error" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(hizmet)}
                          className="p-2 hover:bg-surface rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-primary" />
                        </button>
                        <button
                          onClick={() => setDeleteId(hizmet.id)}
                          className="p-2 hover:bg-error/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-error" />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => toggleExpand(hizmet.id)}
                      className="p-2 hover:bg-surface rounded-lg transition-colors"
                    >
                      {expandedId === hizmet.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === hizmet.id && (
                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-border bg-surface/50">
                    {/* Kisa Aciklama */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-text mb-1">
                        Kisa Aciklama
                      </label>
                      {editingId === hizmet.id ? (
                        <textarea
                          value={editForm.kisaAciklama || ''}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              kisaAciklama: e.target.value,
                            }))
                          }
                          className="input text-sm"
                          rows={2}
                        />
                      ) : (
                        <p className="text-sm text-text-light">
                          {hizmet.kisaAciklama}
                        </p>
                      )}
                    </div>

                    {/* Alt Hizmetler */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-text mb-2">
                        Alt Hizmetler
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {hizmet.altHizmetler.map((alt) => (
                          <div
                            key={alt.id}
                            className="bg-white rounded-lg p-3 border border-border"
                          >
                            <p className="font-medium text-sm">{alt.baslik}</p>
                            <p className="text-xs text-text-muted mt-1">
                              {alt.aciklama}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SSS */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-text mb-2">
                        Sikca Sorulan Sorular
                      </h4>
                      <div className="space-y-2">
                        {hizmet.sss.map((sss) => (
                          <div
                            key={sss.id}
                            className="bg-white rounded-lg p-3 border border-border"
                          >
                            <p className="font-medium text-sm">{sss.soru}</p>
                            <p className="text-xs text-text-muted mt-1">
                              {sss.cevap}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bolgeler */}
                    <div>
                      <h4 className="text-sm font-medium text-text mb-2">
                        Hizmet Bolgeleri
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {hizmet.bolgeler.map((b, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                          >
                            {b.bolge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Hizmeti Sil"
        message="Bu hizmeti silmek istediginizden emin misiniz? Tum alt hizmetler ve SSS'ler de silinecektir."
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
