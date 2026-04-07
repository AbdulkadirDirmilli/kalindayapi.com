'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Upload,
  ChevronLeft,
  ChevronRight,
  Users,
  Phone,
  Check,
  X,
  FolderPlus,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import ConfirmDialog from '@/components/admin/ui/ConfirmDialog'

interface SmsGroup {
  id: string
  name: string
  _count?: {
    contacts: number
  }
}

interface SmsContact {
  id: string
  name: string
  phone: string
  note: string | null
  groupId: string | null
  group: {
    id: string
    name: string
  } | null
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function SmsKisilerPage() {
  // State
  const [contacts, setContacts] = useState<SmsContact[]>([])
  const [groups, setGroups] = useState<SmsGroup[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Form states
  const [showAddForm, setShowAddForm] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isBulkDeleting, setIsBulkDeleting] = useState(false)
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    groupId: '',
    note: '',
  })

  // Group form
  const [newGroupName, setNewGroupName] = useState('')
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)

  // Import state
  const [importText, setImportText] = useState('')
  const [isImporting, setIsImporting] = useState(false)

  // Fetch groups
  const fetchGroups = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/sms/groups')
      if (response.ok) {
        const data = await response.json()
        setGroups(data)
      }
    } catch (error) {
      console.error('Gruplar yüklenemedi:', error)
    }
  }, [])

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      if (search) params.append('search', search)
      if (selectedGroup) params.append('groupId', selectedGroup)

      const response = await fetch(`/api/admin/sms/contacts?${params}`)
      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Kişiler yüklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }, [pagination.page, pagination.limit, search, selectedGroup])

  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setPagination((prev) => ({ ...prev, page: 1 }))
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  // Handlers
  const handleAddContact = async () => {
    try {
      const response = await fetch('/api/admin/sms/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowAddForm(false)
        setFormData({ name: '', phone: '', groupId: '', note: '' })
        fetchContacts()
      }
    } catch (error) {
      console.error('Kişi eklenemedi:', error)
    }
  }

  const handleEditContact = (contact: SmsContact) => {
    setEditingId(contact.id)
    setFormData({
      name: contact.name,
      phone: contact.phone,
      groupId: contact.groupId || '',
      note: contact.note || '',
    })
  }

  const handleUpdateContact = async () => {
    if (!editingId) return

    try {
      const response = await fetch(`/api/admin/sms/contacts/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setEditingId(null)
        setFormData({ name: '', phone: '', groupId: '', note: '' })
        fetchContacts()
      }
    } catch (error) {
      console.error('Kişi güncellenemedi:', error)
    }
  }

  const handleDeleteContact = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/sms/contacts/${deleteId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchContacts()
      }
    } catch (error) {
      console.error('Kişi silinemedi:', error)
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return

    setIsBulkDeleting(true)
    try {
      const response = await fetch('/api/admin/sms/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      })

      if (response.ok) {
        setSelectedIds([])
        fetchContacts()
      }
    } catch (error) {
      console.error('Kişiler silinemedi:', error)
    } finally {
      setIsBulkDeleting(false)
      setShowBulkDeleteConfirm(false)
    }
  }

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return

    setIsCreatingGroup(true)
    try {
      const response = await fetch('/api/admin/sms/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newGroupName.trim() }),
      })

      if (response.ok) {
        setNewGroupName('')
        setShowGroupModal(false)
        fetchGroups()
      }
    } catch (error) {
      console.error('Grup oluşturulamadı:', error)
    } finally {
      setIsCreatingGroup(false)
    }
  }

  const handleImport = async () => {
    if (!importText.trim()) return

    setIsImporting(true)
    try {
      // Parse CSV/text
      const lines = importText.trim().split('\n')
      const contacts = lines.map((line) => {
        const parts = line.split(/[,;\t]/).map((p) => p.trim())
        return {
          name: parts[0] || '',
          phone: parts[1] || '',
          group: parts[2] || '',
        }
      }).filter((c) => c.name && c.phone)

      const response = await fetch('/api/admin/sms/contacts/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacts }),
      })

      if (response.ok) {
        const result = await response.json()
        alert(`${result.success} kişi başarıyla içe aktarıldı. ${result.failed} kişi aktarılamadı.`)
        setImportText('')
        setShowImportModal(false)
        fetchContacts()
        fetchGroups()
      }
    } catch (error) {
      console.error('İçe aktarma hatası:', error)
    } finally {
      setIsImporting(false)
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === contacts.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(contacts.map((c) => c.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div>
      <AdminHeader
        title="SMS Kişileri"
        subtitle="SMS göndereceğiniz kişileri yönetin"
      />

      <div className="p-4 sm:p-6">
        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-border p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="İsim veya telefon ara..."
                className="input pl-10 w-full"
              />
            </div>

            {/* Group Filter */}
            <select
              value={selectedGroup}
              onChange={(e) => {
                setSelectedGroup(e.target.value)
                setPagination((prev) => ({ ...prev, page: 1 }))
              }}
              className="input w-full sm:w-48"
            >
              <option value="">Tüm Gruplar</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name} ({group._count?.contacts || 0})
                </option>
              ))}
            </select>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowGroupModal(true)}
                className="btn btn-outline"
                title="Yeni Grup"
              >
                <FolderPlus className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="btn btn-outline"
              >
                <Upload className="w-5 h-5" />
                <span className="hidden sm:inline">İçe Aktar</span>
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Yeni Kişi</span>
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm text-text-light">
                {selectedIds.length} kişi seçildi
              </span>
              <button
                onClick={() => setShowBulkDeleteConfirm(true)}
                className="btn btn-outline text-error border-error hover:bg-error hover:text-white"
              >
                <Trash2 className="w-4 h-4" />
                Seçilenleri Sil
              </button>
            </div>
          )}
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-4">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Yeni Kişi Ekle
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  İsim *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="input"
                  placeholder="Ad Soyad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Telefon *
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="input"
                  placeholder="05XX XXX XX XX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Grup
                </label>
                <select
                  value={formData.groupId}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, groupId: e.target.value }))
                  }
                  className="input"
                >
                  <option value="">Grup Seçin</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Not
                </label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, note: e.target.value }))
                  }
                  className="input"
                  placeholder="Opsiyonel not"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setFormData({ name: '', phone: '', groupId: '', note: '' })
                }}
                className="btn btn-outline"
              >
                İptal
              </button>
              <button onClick={handleAddContact} className="btn btn-primary">
                Kaydet
              </button>
            </div>
          </div>
        )}

        {/* Contacts Table */}
        {isLoading ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-text-light">
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
        ) : contacts.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <Users className="w-12 h-12 mx-auto text-text-muted mb-4" />
            <p className="text-text-light mb-4">Henüz kişi eklenmemiş</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary"
            >
              <Plus className="w-5 h-5" />
              İlk Kişiyi Ekle
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === contacts.length}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-border"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text">
                      İsim
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text">
                      Telefon
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text hidden md:table-cell">
                      Grup
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text hidden lg:table-cell">
                      Not
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-text">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-surface/50">
                      {editingId === contact.id ? (
                        <>
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              disabled
                              className="w-4 h-4 rounded border-border"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              className="input text-sm py-1"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                              className="input text-sm py-1"
                            />
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <select
                              value={formData.groupId}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  groupId: e.target.value,
                                }))
                              }
                              className="input text-sm py-1"
                            >
                              <option value="">Grup Yok</option>
                              {groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                  {group.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <input
                              type="text"
                              value={formData.note}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  note: e.target.value,
                                }))
                              }
                              className="input text-sm py-1"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={handleUpdateContact}
                                className="p-2 hover:bg-success/10 rounded-lg transition-colors"
                              >
                                <Check className="w-4 h-4 text-success" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(null)
                                  setFormData({
                                    name: '',
                                    phone: '',
                                    groupId: '',
                                    note: '',
                                  })
                                }}
                                className="p-2 hover:bg-error/10 rounded-lg transition-colors"
                              >
                                <X className="w-4 h-4 text-error" />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(contact.id)}
                              onChange={() => toggleSelect(contact.id)}
                              className="w-4 h-4 rounded border-border"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-medium text-text">
                              {contact.name}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-text-light">
                              <Phone className="w-4 h-4" />
                              {contact.phone}
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            {contact.group ? (
                              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                                {contact.group.name}
                              </span>
                            ) : (
                              <span className="text-text-muted">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <span className="text-sm text-text-light truncate max-w-[200px] block">
                              {contact.note || '-'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleEditContact(contact)}
                                className="p-2 hover:bg-surface rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4 text-primary" />
                              </button>
                              <button
                                onClick={() => setDeleteId(contact.id)}
                                className="p-2 hover:bg-error/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-error" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                <span className="text-sm text-text-light">
                  Toplam {pagination.total} kişi
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: prev.page - 1,
                      }))
                    }
                    disabled={pagination.page === 1}
                    className="p-2 hover:bg-surface rounded-lg transition-colors disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm">
                    {pagination.page} / {pagination.totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: prev.page + 1,
                      }))
                    }
                    disabled={pagination.page === pagination.totalPages}
                    className="p-2 hover:bg-surface rounded-lg transition-colors disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-primary">
                Toplu Kişi İçe Aktar
              </h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-text-light mb-4">
                Her satıra bir kişi yazın. Format: İsim, Telefon, Grup (opsiyonel)
              </p>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="input w-full h-48 font-mono text-sm"
                placeholder="Ahmet Yılmaz, 05321234567, Müşteriler&#10;Mehmet Kaya, 05339876543, Aile&#10;Ayşe Demir, 05551112233"
              />
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowImportModal(false)
                  setImportText('')
                }}
                className="btn btn-outline"
              >
                İptal
              </button>
              <button
                onClick={handleImport}
                disabled={isImporting || !importText.trim()}
                className="btn btn-primary"
              >
                {isImporting ? 'İçe Aktarılıyor...' : 'İçe Aktar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Group Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-primary">
                Yeni Grup Oluştur
              </h3>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-text mb-1">
                Grup Adı
              </label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="input w-full"
                placeholder="Örn: Müşteriler, Aile, İş Arkadaşları"
              />
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowGroupModal(false)
                  setNewGroupName('')
                }}
                className="btn btn-outline"
              >
                İptal
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={isCreatingGroup || !newGroupName.trim()}
                className="btn btn-primary"
              >
                {isCreatingGroup ? 'Oluşturuluyor...' : 'Oluştur'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Kişiyi Sil"
        message="Bu kişiyi silmek istediğinizden emin misiniz?"
        confirmText="Sil"
        cancelText="İptal"
        onConfirm={handleDeleteContact}
        onCancel={() => setDeleteId(null)}
        variant="danger"
        isLoading={isDeleting}
      />

      {/* Bulk Delete Confirmation */}
      <ConfirmDialog
        isOpen={showBulkDeleteConfirm}
        title="Kişileri Sil"
        message={`${selectedIds.length} kişiyi silmek istediğinizden emin misiniz?`}
        confirmText="Hepsini Sil"
        cancelText="İptal"
        onConfirm={handleBulkDelete}
        onCancel={() => setShowBulkDeleteConfirm(false)}
        variant="danger"
        isLoading={isBulkDeleting}
      />
    </div>
  )
}
