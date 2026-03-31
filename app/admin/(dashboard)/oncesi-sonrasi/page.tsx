'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  ImageIcon,
  GripVertical,
  Eye,
  EyeOff,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import ConfirmDialog from '@/components/admin/ui/ConfirmDialog'

interface OncesiSonrasi {
  id: string
  baslik: string
  kategori: string | null
  konum: string | null
  oncesiFoto: string
  sonrasiFoto: string
  sira: number
  aktif: boolean
}

const kategoriler = [
  { value: '', label: 'Kategori Seçin' },
  { value: 'İnşaat', label: 'İnşaat' },
  { value: 'Tadilat', label: 'Tadilat' },
  { value: 'Dekorasyon', label: 'Dekorasyon' },
  { value: 'Renovasyon', label: 'Renovasyon' },
]

export default function OncesiSonrasiPage() {
  const [projeler, setProjeler] = useState<OncesiSonrasi[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState<Partial<OncesiSonrasi>>({
    baslik: '',
    kategori: '',
    konum: '',
    oncesiFoto: '',
    sonrasiFoto: '',
    aktif: true,
  })

  const fetchProjeler = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/oncesi-sonrasi')
      if (response.ok) {
        const data = await response.json()
        setProjeler(data)
      }
    } catch (error) {
      console.error('Projeler yuklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjeler()
  }, [])

  const handleEdit = (proje: OncesiSonrasi) => {
    setEditingId(proje.id)
    setFormData({
      baslik: proje.baslik,
      kategori: proje.kategori || '',
      konum: proje.konum || '',
      oncesiFoto: proje.oncesiFoto,
      sonrasiFoto: proje.sonrasiFoto,
      aktif: proje.aktif,
    })
  }

  const handleSave = async (isNew = false) => {
    if (!formData.baslik || !formData.oncesiFoto || !formData.sonrasiFoto) {
      alert('Lütfen zorunlu alanları doldurun')
      return
    }

    setIsSaving(true)
    try {
      const url = isNew
        ? '/api/admin/oncesi-sonrasi'
        : `/api/admin/oncesi-sonrasi/${editingId}`
      const method = isNew ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        if (isNew) {
          setProjeler((prev) => [...prev, data])
          setShowAddForm(false)
        } else {
          setProjeler((prev) =>
            prev.map((p) => (p.id === editingId ? data : p))
          )
          setEditingId(null)
        }
        setFormData({
          baslik: '',
          kategori: '',
          konum: '',
          oncesiFoto: '',
          sonrasiFoto: '',
          aktif: true,
        })
      }
    } catch (error) {
      console.error('Proje kaydedilemedi:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/oncesi-sonrasi/${deleteId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProjeler((prev) => prev.filter((p) => p.id !== deleteId))
      }
    } catch (error) {
      console.error('Proje silinemedi:', error)
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const toggleAktif = async (proje: OncesiSonrasi) => {
    try {
      const response = await fetch(`/api/admin/oncesi-sonrasi/${proje.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...proje, aktif: !proje.aktif }),
      })

      if (response.ok) {
        const data = await response.json()
        setProjeler((prev) =>
          prev.map((p) => (p.id === proje.id ? data : p))
        )
      }
    } catch (error) {
      console.error('Durum guncellenemedi:', error)
    }
  }

  if (isLoading) {
    return (
      <div>
        <AdminHeader
          title="Öncesi - Sonrası Galerisi"
          subtitle="Referans projelerinizi yönetin"
        />
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
              Yükleniyor...
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AdminHeader
        title="Öncesi - Sonrası Galerisi"
        subtitle="Referans projelerinizi yönetin"
      />

      <div className="p-4 sm:p-6">
        {/* Add Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5" />
            Yeni Proje Ekle
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Yeni Proje Ekle
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text mb-1">
                  Proje Başlığı *
                </label>
                <input
                  type="text"
                  value={formData.baslik || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, baslik: e.target.value }))
                  }
                  className="input"
                  placeholder="Villa Projesi - Dalyan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Kategori
                </label>
                <select
                  value={formData.kategori || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, kategori: e.target.value }))
                  }
                  className="input"
                >
                  {kategoriler.map((k) => (
                    <option key={k.value} value={k.value}>
                      {k.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Konum
                </label>
                <input
                  type="text"
                  value={formData.konum || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, konum: e.target.value }))
                  }
                  className="input"
                  placeholder="Ortaca, Muğla"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Öncesi Fotoğraf URL *
                </label>
                <input
                  type="text"
                  value={formData.oncesiFoto || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, oncesiFoto: e.target.value }))
                  }
                  className="input"
                  placeholder="/images/projects/proje-oncesi.jpg"
                />
                {formData.oncesiFoto && (
                  <div className="mt-2 relative w-32 h-24 rounded overflow-hidden border">
                    <Image
                      src={formData.oncesiFoto}
                      alt="Öncesi"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Sonrası Fotoğraf URL *
                </label>
                <input
                  type="text"
                  value={formData.sonrasiFoto || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, sonrasiFoto: e.target.value }))
                  }
                  className="input"
                  placeholder="/images/projects/proje-sonrasi.jpg"
                />
                {formData.sonrasiFoto && (
                  <div className="mt-2 relative w-32 h-24 rounded overflow-hidden border">
                    <Image
                      src={formData.sonrasiFoto}
                      alt="Sonrası"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setFormData({
                    baslik: '',
                    kategori: '',
                    konum: '',
                    oncesiFoto: '',
                    sonrasiFoto: '',
                    aktif: true,
                  })
                }}
                className="btn btn-outline"
              >
                İptal
              </button>
              <button
                onClick={() => handleSave(true)}
                className="btn btn-primary"
                disabled={isSaving}
              >
                {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        )}

        {/* Project List */}
        {projeler.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <ImageIcon className="w-12 h-12 mx-auto text-text-muted mb-4" />
            <p className="text-text-light mb-4">Henüz proje eklenmemiş</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projeler.map((proje) => (
              <div
                key={proje.id}
                className={`bg-white rounded-xl border overflow-hidden ${
                  proje.aktif ? 'border-border' : 'border-red-200 bg-red-50/30'
                }`}
              >
                {editingId === proje.id ? (
                  <div className="p-4">
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData.baslik || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, baslik: e.target.value }))
                        }
                        className="input text-sm"
                        placeholder="Proje Başlığı"
                      />
                      <select
                        value={formData.kategori || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, kategori: e.target.value }))
                        }
                        className="input text-sm"
                      >
                        {kategoriler.map((k) => (
                          <option key={k.value} value={k.value}>
                            {k.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={formData.konum || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, konum: e.target.value }))
                        }
                        className="input text-sm"
                        placeholder="Konum"
                      />
                      <input
                        type="text"
                        value={formData.oncesiFoto || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, oncesiFoto: e.target.value }))
                        }
                        className="input text-sm"
                        placeholder="Öncesi Fotoğraf URL"
                      />
                      <input
                        type="text"
                        value={formData.sonrasiFoto || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, sonrasiFoto: e.target.value }))
                        }
                        className="input text-sm"
                        placeholder="Sonrası Fotoğraf URL"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(false)}
                          className="flex-1 btn btn-primary text-sm py-2"
                          disabled={isSaving}
                        >
                          <Check className="w-4 h-4" />
                          {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 btn btn-outline text-sm py-2"
                        >
                          <X className="w-4 h-4" />
                          İptal
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Image Preview */}
                    <div className="relative aspect-video bg-gray-100">
                      <div className="absolute inset-0 grid grid-cols-2">
                        <div className="relative border-r border-white/50">
                          <Image
                            src={proje.oncesiFoto}
                            alt={`${proje.baslik} - Öncesi`}
                            fill
                            className="object-cover"
                          />
                          <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            Öncesi
                          </span>
                        </div>
                        <div className="relative">
                          <Image
                            src={proje.sonrasiFoto}
                            alt={`${proje.baslik} - Sonrası`}
                            fill
                            className="object-cover"
                          />
                          <span className="absolute bottom-2 right-2 bg-accent text-primary text-xs px-2 py-1 rounded font-semibold">
                            Sonrası
                          </span>
                        </div>
                      </div>
                      {proje.kategori && (
                        <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                          {proje.kategori}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-text">{proje.baslik}</h3>
                      {proje.konum && (
                        <p className="text-sm text-text-light">{proje.konum}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                      <button
                        onClick={() => toggleAktif(proje)}
                        className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                          proje.aktif
                            ? 'bg-success/10 text-success'
                            : 'bg-text-muted/10 text-text-muted'
                        }`}
                      >
                        {proje.aktif ? (
                          <>
                            <Eye className="w-3 h-3" />
                            Aktif
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            Pasif
                          </>
                        )}
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(proje)}
                          className="p-2 hover:bg-surface rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-primary" />
                        </button>
                        <button
                          onClick={() => setDeleteId(proje.id)}
                          className="p-2 hover:bg-error/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-error" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Projeyi Sil"
        message="Bu projeyi silmek istediğinizden emin misiniz?"
        confirmText="Sil"
        cancelText="İptal"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  )
}
