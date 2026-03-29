'use client'

import { useState, useEffect } from 'react'
import {
  Mail,
  Phone,
  Clock,
  Eye,
  Trash2,
  Check,
  Archive,
  X,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import ConfirmDialog from '@/components/admin/ui/ConfirmDialog'

interface Contact {
  id: string
  ad: string
  email: string
  telefon: string | null
  konu: string | null
  mesaj: string
  durum: string
  notlar: string | null
  createdAt: string
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function IletisimPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [filterDurum, setFilterDurum] = useState('')

  const fetchContacts = async (page = 1) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', page.toString())
      params.set('limit', '10')
      if (filterDurum) params.set('durum', filterDurum)

      const response = await fetch(`/api/admin/iletisim?${params}`)
      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Mesajlar yuklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [filterDurum])

  const handleStatusChange = async (id: string, durum: string) => {
    try {
      const response = await fetch(`/api/admin/iletisim/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ durum }),
      })

      if (response.ok) {
        const updated = await response.json()
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? updated : c))
        )
        if (selectedContact?.id === id) {
          setSelectedContact(updated)
        }
      }
    } catch (error) {
      console.error('Durum guncellenemedi:', error)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/iletisim/${deleteId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setContacts((prev) => prev.filter((c) => c.id !== deleteId))
        if (selectedContact?.id === deleteId) {
          setSelectedContact(null)
        }
      }
    } catch (error) {
      console.error('Mesaj silinemedi:', error)
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const getDurumColor = (durum: string) => {
    switch (durum) {
      case 'yeni':
        return 'bg-red-100 text-red-600'
      case 'okundu':
        return 'bg-yellow-100 text-yellow-700'
      case 'cevaplandi':
        return 'bg-green-100 text-green-600'
      case 'arsivlendi':
        return 'bg-gray-100 text-gray-500'
      default:
        return 'bg-gray-100 text-gray-500'
    }
  }

  const getDurumLabel = (durum: string) => {
    switch (durum) {
      case 'yeni':
        return 'Yeni'
      case 'okundu':
        return 'Okundu'
      case 'cevaplandi':
        return 'Cevaplandi'
      case 'arsivlendi':
        return 'Arsivlendi'
      default:
        return durum
    }
  }

  return (
    <div>
      <AdminHeader title="Mesajlar" subtitle="Iletisim formlarindan gelen mesajlar" />

      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Message List - Hide on mobile when contact selected */}
          <div className={`flex-1 min-w-0 ${selectedContact ? 'hidden lg:block' : ''}`}>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <select
                value={filterDurum}
                onChange={(e) => setFilterDurum(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Tum Mesajlar</option>
                <option value="yeni">Yeni</option>
                <option value="okundu">Okundu</option>
                <option value="cevaplandi">Cevaplandi</option>
                <option value="arsivlendi">Arsivlendi</option>
              </select>

              <span className="text-sm text-gray-500">
                {pagination.total} mesaj
              </span>
            </div>

            {/* Message List */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {isLoading ? (
                <div className="p-12 text-center text-gray-500">
                  <div className="flex items-center justify-center gap-2">
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
              ) : contacts.length === 0 ? (
                <div className="p-12 text-center">
                  <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Henuz mesaj yok</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => {
                        setSelectedContact(contact)
                        if (contact.durum === 'yeni') {
                          handleStatusChange(contact.id, 'okundu')
                        }
                      }}
                      className={`px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedContact?.id === contact.id ? 'bg-gray-50' : ''
                      } ${contact.durum === 'yeni' ? 'font-medium' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-2 overflow-hidden">
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm text-gray-900">{contact.ad}</span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${getDurumColor(contact.durum)}`}
                            >
                              {getDurumLabel(contact.durum)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-0.5">
                            {contact.konu || 'Genel'}
                          </p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            {contact.mesaj}
                          </p>
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-1 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          <span className="hidden sm:inline">
                            {new Date(contact.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                          <span className="sm:hidden">
                            {new Date(contact.createdAt).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <p className="text-sm text-gray-500">
                    Sayfa {pagination.page} / {pagination.totalPages}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fetchContacts(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                    >
                      Onceki
                    </button>
                    <button
                      onClick={() => fetchContacts(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                    >
                      Sonraki
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Message Detail - Mobile Only */}
          {selectedContact && (
            <div className="lg:hidden">
              <button
                onClick={() => setSelectedContact(null)}
                className="flex items-center gap-2 text-gray-600 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Geri</span>
              </button>

              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Gonderen</p>
                    <p className="font-medium text-gray-900">{selectedContact.ad}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Email</p>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      {selectedContact.email}
                    </a>
                  </div>

                  {selectedContact.telefon && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Telefon</p>
                      <a
                        href={`tel:${selectedContact.telefon}`}
                        className="text-primary hover:underline flex items-center gap-1 text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        {selectedContact.telefon}
                      </a>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Konu</p>
                    <p className="text-gray-700">{selectedContact.konu || 'Genel'}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Mesaj</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {selectedContact.mesaj}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Tarih</p>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedContact.createdAt).toLocaleString('tr-TR')}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-400 mb-2">Durum</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedContact.id, 'okundu')}
                        className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1 ${
                          selectedContact.durum === 'okundu'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-100 hover:bg-yellow-100'
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        Okundu
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedContact.id, 'cevaplandi')}
                        className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1 ${
                          selectedContact.durum === 'cevaplandi'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 hover:bg-green-100'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        Cevaplandi
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedContact.id, 'arsivlendi')}
                        className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1 ${
                          selectedContact.durum === 'arsivlendi'
                            ? 'bg-gray-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <Archive className="w-3 h-3" />
                        Arsivle
                      </button>
                    </div>
                  </div>

                  {/* Delete */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setDeleteId(selectedContact.id)}
                      className="w-full px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Mesaji Sil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Message Detail - Desktop Only */}
          <div className="hidden lg:block w-96 flex-shrink-0">
            {selectedContact ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-primary">Mesaj Detayi</h3>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Gonderen</p>
                    <p className="font-medium">{selectedContact.ad}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Email</p>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      {selectedContact.email}
                    </a>
                  </div>

                  {selectedContact.telefon && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Telefon</p>
                      <a
                        href={`tel:${selectedContact.telefon}`}
                        className="text-primary hover:underline flex items-center gap-1 text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        {selectedContact.telefon}
                      </a>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Konu</p>
                    <p>{selectedContact.konu || 'Genel'}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Mesaj</p>
                    <p className="text-sm whitespace-pre-wrap">
                      {selectedContact.mesaj}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Tarih</p>
                    <p className="text-sm">
                      {new Date(selectedContact.createdAt).toLocaleString('tr-TR')}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-400 mb-2">Durum</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedContact.id, 'okundu')}
                        className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1 ${
                          selectedContact.durum === 'okundu'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-100 hover:bg-yellow-100'
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        Okundu
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedContact.id, 'cevaplandi')}
                        className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1 ${
                          selectedContact.durum === 'cevaplandi'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 hover:bg-green-100'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        Cevaplandi
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedContact.id, 'arsivlendi')}
                        className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1 ${
                          selectedContact.durum === 'arsivlendi'
                            ? 'bg-gray-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <Archive className="w-3 h-3" />
                        Arsivle
                      </button>
                    </div>
                  </div>

                  {/* Delete */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setDeleteId(selectedContact.id)}
                      className="w-full px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Mesaji Sil
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Mail className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">
                  Detaylarini gormek icin bir mesaj secin
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Mesaji Sil"
        message="Bu mesaji silmek istediginizden emin misiniz?"
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
