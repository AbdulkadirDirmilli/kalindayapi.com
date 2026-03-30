'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Edit,
  Trash2,
  Phone,
  Mail,
  User,
  Check,
  X,
  Users,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import ConfirmDialog from '@/components/admin/ui/ConfirmDialog'

interface Ortak {
  id: string
  slug: string
  ad: string
  unvan: string
  telefon: string
  whatsapp: string | null
  email: string | null
  biyografi: string | null
  foto: string | null
  uzmanlikAlanlari: string
  sira: number
  aktif: boolean
}

export default function OrtaklarPage() {
  const [ortaklar, setOrtaklar] = useState<Ortak[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  // Form state
  const [formData, setFormData] = useState<Partial<Ortak>>({
    ad: '',
    slug: '',
    unvan: '',
    telefon: '',
    whatsapp: '',
    email: '',
    biyografi: '',
    foto: '',
    uzmanlikAlanlari: '[]',
    aktif: true,
  })

  const fetchOrtaklar = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/ortaklar')
      if (response.ok) {
        const data = await response.json()
        setOrtaklar(data)
      }
    } catch (error) {
      console.error('Ortaklar yuklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrtaklar()
  }, [])

  const handleEdit = (ortak: Ortak) => {
    setEditingId(ortak.id)
    setFormData({
      ad: ortak.ad,
      slug: ortak.slug,
      unvan: ortak.unvan,
      telefon: ortak.telefon,
      whatsapp: ortak.whatsapp || '',
      email: ortak.email || '',
      biyografi: ortak.biyografi || '',
      foto: ortak.foto || '',
      uzmanlikAlanlari: ortak.uzmanlikAlanlari,
      aktif: ortak.aktif,
    })
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
  }

  const handleSave = async (isNew = false) => {
    try {
      const url = isNew
        ? '/api/admin/ortaklar'
        : `/api/admin/ortaklar/${editingId}`
      const method = isNew ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || generateSlug(formData.ad || ''),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (isNew) {
          setOrtaklar((prev) => [...prev, data])
          setShowAddForm(false)
        } else {
          setOrtaklar((prev) =>
            prev.map((o) => (o.id === editingId ? data : o))
          )
          setEditingId(null)
        }
        setFormData({
          ad: '',
          slug: '',
          unvan: '',
          telefon: '',
          whatsapp: '',
          email: '',
          biyografi: '',
          foto: '',
          uzmanlikAlanlari: '[]',
          aktif: true,
        })
      }
    } catch (error) {
      console.error('Ortak kaydedilemedi:', error)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/ortaklar/${deleteId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setOrtaklar((prev) => prev.filter((o) => o.id !== deleteId))
      }
    } catch (error) {
      console.error('Ortak silinemedi:', error)
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const parseUzmanlik = (str: string): string[] => {
    try {
      return JSON.parse(str)
    } catch {
      return []
    }
  }

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="Ortaklar" subtitle="Şirket ortaklarını yönetin" />
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
      <AdminHeader title="Ortaklar" subtitle="Şirket ortaklarını yönetin" />

      <div className="p-4 sm:p-6">
        {/* Add Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5" />
            Yeni Ortak Ekle
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Yeni Ortak Ekle
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  value={formData.ad || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ad: e.target.value,
                      slug: generateSlug(e.target.value),
                    }))
                  }
                  className="input"
                  placeholder="Ad Soyad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Unvan *
                </label>
                <input
                  type="text"
                  value={formData.unvan || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, unvan: e.target.value }))
                  }
                  className="input"
                  placeholder="Gayrimenkul Danışmanı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Telefon *
                </label>
                <input
                  type="text"
                  value={formData.telefon || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, telefon: e.target.value }))
                  }
                  className="input"
                  placeholder="+90 5XX XXX XX XX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="input"
                  placeholder="email@kalindayapi.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text mb-1">
                  Biyografi
                </label>
                <textarea
                  value={formData.biyografi || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      biyografi: e.target.value,
                    }))
                  }
                  className="input"
                  rows={3}
                  placeholder="Kısa biyografi..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="btn btn-outline"
              >
                İptal
              </button>
              <button onClick={() => handleSave(true)} className="btn btn-primary">
                Kaydet
              </button>
            </div>
          </div>
        )}

        {/* Ortak List */}
        {ortaklar.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <Users className="w-12 h-12 mx-auto text-text-muted mb-4" />
            <p className="text-text-light mb-4">Henüz ortak eklenmemiş</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ortaklar.map((ortak) => (
              <div
                key={ortak.id}
                className="bg-white rounded-xl border border-border overflow-hidden"
              >
                {editingId === ortak.id ? (
                  <div className="p-4">
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData.ad || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, ad: e.target.value }))
                        }
                        className="input text-sm"
                        placeholder="Ad Soyad"
                      />
                      <input
                        type="text"
                        value={formData.unvan || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            unvan: e.target.value,
                          }))
                        }
                        className="input text-sm"
                        placeholder="Unvan"
                      />
                      <input
                        type="text"
                        value={formData.telefon || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            telefon: e.target.value,
                          }))
                        }
                        className="input text-sm"
                        placeholder="Telefon"
                      />
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="input text-sm"
                        placeholder="Email"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(false)}
                          className="flex-1 btn btn-primary text-sm py-2"
                        >
                          <Check className="w-4 h-4" />
                          Kaydet
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
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {ortak.foto ? (
                            <img
                              src={ortak.foto}
                              alt={ortak.ad}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-8 h-8 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-text">{ortak.ad}</h3>
                          <p className="text-sm text-text-light">{ortak.unvan}</p>
                          <div className="mt-2 space-y-1">
                            <a
                              href={`tel:${ortak.telefon}`}
                              className="flex items-center gap-1 text-xs text-text-muted hover:text-primary"
                            >
                              <Phone className="w-3 h-3" />
                              {ortak.telefon}
                            </a>
                            {ortak.email && (
                              <a
                                href={`mailto:${ortak.email}`}
                                className="flex items-center gap-1 text-xs text-text-muted hover:text-primary"
                              >
                                <Mail className="w-3 h-3" />
                                {ortak.email}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Uzmanlik Alanlari */}
                      <div className="mt-4 flex flex-wrap gap-1">
                        {parseUzmanlik(ortak.uzmanlikAlanlari).map(
                          (alan, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                            >
                              {alan}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          ortak.aktif
                            ? 'bg-success/10 text-success'
                            : 'bg-text-muted/10 text-text-muted'
                        }`}
                      >
                        {ortak.aktif ? 'Aktif' : 'Pasif'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(ortak)}
                          className="p-2 hover:bg-surface rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-primary" />
                        </button>
                        <button
                          onClick={() => setDeleteId(ortak.id)}
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
        title="Ortağı Sil"
        message="Bu ortağı silmek istediğinizden emin misiniz?"
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
