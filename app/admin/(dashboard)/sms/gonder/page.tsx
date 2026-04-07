'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Send,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  X,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'

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
  group: { id: string; name: string } | null
}

interface SmsTemplate {
  id: string
  title: string
  message: string
}

interface SmsSettings {
  id: string | null
  netgsmUsername: string
  netgsmHeader: string
  senderNames: string
  isActive: boolean
}

export default function SmsGonderPage() {
  // Data states
  const [groups, setGroups] = useState<SmsGroup[]>([])
  const [contacts, setContacts] = useState<SmsContact[]>([])
  const [templates, setTemplates] = useState<SmsTemplate[]>([])
  const [settings, setSettings] = useState<SmsSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Form states
  const [senderName, setSenderName] = useState('')
  const [message, setMessage] = useState('')
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  // UI states
  const [showTemplates, setShowTemplates] = useState(false)
  const [showContacts, setShowContacts] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const [groupsRes, contactsRes, templatesRes, settingsRes] = await Promise.all([
        fetch('/api/admin/sms/groups'),
        fetch('/api/admin/sms/contacts?limit=1000'),
        fetch('/api/admin/sms/templates'),
        fetch('/api/admin/sms/settings')
      ])

      if (groupsRes.ok) {
        const data = await groupsRes.json()
        setGroups(data)
      }

      if (contactsRes.ok) {
        const data = await contactsRes.json()
        setContacts(data.contacts || [])
      }

      if (templatesRes.ok) {
        const data = await templatesRes.json()
        setTemplates(data)
      }

      if (settingsRes.ok) {
        const data = await settingsRes.json()
        setSettings(data)
        // Varsayılan sender name
        if (data.netgsmHeader) {
          setSenderName(data.netgsmHeader)
        }
      }
    } catch (error) {
      console.error('Veri yüklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Grup seçildiğinde kişileri filtrele
  useEffect(() => {
    if (selectedGroupId) {
      const groupContacts = contacts.filter(c => c.group?.id === selectedGroupId)
      setSelectedContactIds(groupContacts.map(c => c.id))
    }
  }, [selectedGroupId, contacts])

  // Tümünü seç
  useEffect(() => {
    if (selectAll) {
      setSelectedContactIds(contacts.map(c => c.id))
    }
  }, [selectAll, contacts])

  // Seçili kişilerin telefon numaraları
  const selectedRecipients = contacts
    .filter(c => selectedContactIds.includes(c.id))
    .map(c => c.phone)

  // Karakter ve SMS sayısı
  const getCharacterInfo = (text: string) => {
    const length = text.length
    const smsCount = Math.ceil(length / 160) || 1
    return { length, smsCount }
  }

  // Şablon uygula
  const applyTemplate = (template: SmsTemplate) => {
    setMessage(template.message)
    setShowTemplates(false)
  }

  // Kişi seçimi toggle
  const toggleContact = (contactId: string) => {
    setSelectedContactIds(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    )
    setSelectAll(false)
    setSelectedGroupId('')
  }

  // SMS Gönder
  const handleSend = async () => {
    if (!message.trim() || selectedRecipients.length === 0 || !senderName) return

    setIsSending(true)
    setResult(null)

    try {
      const response = await fetch('/api/admin/sms/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          senderName: senderName.trim(),
          recipients: selectedRecipients
        })
      })

      const data = await response.json()

      if (data.success) {
        setResult({ success: true, message: data.message })
        // Formu temizle
        setMessage('')
        setSelectedContactIds([])
        setSelectAll(false)
        setSelectedGroupId('')
      } else {
        setResult({ success: false, message: data.error || 'SMS gönderilemedi' })
      }
    } catch (error) {
      console.error('SMS gönderme hatası:', error)
      setResult({ success: false, message: 'Bağlantı hatası oluştu' })
    } finally {
      setIsSending(false)
      setShowConfirmModal(false)
    }
  }

  // Sender names listesi
  const senderNames = settings?.senderNames
    ? JSON.parse(settings.senderNames)
    : ['KALİNDA YAPI', 'KALİNDA EMLAK', 'KALINDA YAPI']

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="SMS Gönder" subtitle="Kişilere veya gruplara SMS gönderin" />
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-text-light">
              <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Yükleniyor...
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Ayarlar yapılmamışsa uyarı göster
  if (!settings?.isActive || !settings?.netgsmUsername) {
    return (
      <div>
        <AdminHeader title="SMS Gönder" subtitle="Kişilere veya gruplara SMS gönderin" />
        <div className="p-4 sm:p-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-amber-500 mb-4" />
            <h3 className="text-lg font-semibold text-amber-800 mb-2">SMS Ayarları Yapılandırılmamış</h3>
            <p className="text-amber-700 mb-4">
              SMS göndermek için önce NetGSM API ayarlarını yapılandırmanız gerekiyor.
            </p>
            <a href="/admin/sms/ayarlar" className="btn btn-primary">
              Ayarları Yapılandır
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AdminHeader title="SMS Gönder" subtitle="Kişilere veya gruplara SMS gönderin" />

      <div className="p-4 sm:p-6">
        {/* Result Message */}
        {result && (
          <div className={`mb-4 p-4 rounded-xl flex items-center gap-3 ${
            result.success
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {result.success ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{result.message}</span>
            <button
              onClick={() => setResult(null)}
              className="ml-auto p-1 hover:bg-black/10 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Kolon - Mesaj Formu */}
          <div className="lg:col-span-2 space-y-4">
            {/* Gönderici Adı */}
            <div className="bg-white rounded-xl border border-border p-4">
              <label className="block text-sm font-medium text-text mb-2">
                Gönderici Adı *
              </label>
              <select
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="input w-full"
              >
                <option value="">Gönderici Seçin</option>
                {senderNames.map((name: string, index: number) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </select>
              <p className="text-xs text-text-muted mt-1">
                NetGSM'de tanımlı gönderici adlarından birini seçin
              </p>
            </div>

            {/* Mesaj */}
            <div className="bg-white rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-text">
                  Mesaj İçeriği *
                </label>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <FileText className="w-4 h-4" />
                  Şablon Kullan
                </button>
              </div>

              {/* Şablon Seçici */}
              {showTemplates && (
                <div className="mb-3 p-3 bg-surface rounded-lg">
                  <p className="text-xs text-text-muted mb-2">Şablon seçin:</p>
                  <div className="flex flex-wrap gap-2">
                    {templates.length === 0 ? (
                      <p className="text-sm text-text-light">Henüz şablon yok</p>
                    ) : (
                      templates.map(template => (
                        <button
                          key={template.id}
                          onClick={() => applyTemplate(template)}
                          className="text-xs px-3 py-1.5 bg-white border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                        >
                          {template.title}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input w-full h-40 resize-none"
                placeholder="SMS mesajınızı buraya yazın..."
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-text-muted">
                  Değişkenler: {'{isim}'} - Alıcının adı
                </p>
                <p className="text-xs text-text-muted">
                  {getCharacterInfo(message).length} karakter / {getCharacterInfo(message).smsCount} SMS
                </p>
              </div>
            </div>

            {/* Önizleme */}
            {message && (
              <div className="bg-white rounded-xl border border-border p-4">
                <h4 className="text-sm font-medium text-text mb-2">Mesaj Önizleme</h4>
                <div className="bg-surface rounded-lg p-3">
                  <p className="text-sm text-text whitespace-pre-wrap">
                    {message.replace('{isim}', 'Ahmet Bey')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sağ Kolon - Alıcılar */}
          <div className="space-y-4">
            {/* Alıcı Seçimi */}
            <div className="bg-white rounded-xl border border-border p-4">
              <h4 className="text-sm font-medium text-text mb-3">Alıcılar</h4>

              {/* Grup Seçimi */}
              <div className="mb-3">
                <label className="block text-xs text-text-muted mb-1">Gruba Göre Seç</label>
                <select
                  value={selectedGroupId}
                  onChange={(e) => {
                    setSelectedGroupId(e.target.value)
                    setSelectAll(false)
                  }}
                  className="input w-full text-sm"
                >
                  <option value="">Grup Seçin</option>
                  {groups.map(group => (
                    <option key={group.id} value={group.id}>
                      {group.name} ({group._count?.contacts || 0} kişi)
                    </option>
                  ))}
                </select>
              </div>

              {/* Tümünü Seç */}
              <label className="flex items-center gap-2 p-2 bg-surface rounded-lg mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => {
                    setSelectAll(e.target.checked)
                    setSelectedGroupId('')
                    if (!e.target.checked) {
                      setSelectedContactIds([])
                    }
                  }}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Tüm kişileri seç ({contacts.length})</span>
              </label>

              {/* Kişi Listesi */}
              <div className="relative">
                <button
                  onClick={() => setShowContacts(!showContacts)}
                  className="w-full flex items-center justify-between p-2 bg-surface rounded-lg text-sm"
                >
                  <span>Kişi seç ({selectedContactIds.length} seçili)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showContacts ? 'rotate-180' : ''}`} />
                </button>

                {showContacts && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {contacts.length === 0 ? (
                      <p className="p-3 text-sm text-text-light text-center">Kişi bulunamadı</p>
                    ) : (
                      contacts.map(contact => (
                        <label
                          key={contact.id}
                          className="flex items-center gap-2 p-2 hover:bg-surface cursor-pointer border-b border-border last:border-0"
                        >
                          <input
                            type="checkbox"
                            checked={selectedContactIds.includes(contact.id)}
                            onChange={() => toggleContact(contact.id)}
                            className="w-4 h-4 rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text truncate">{contact.name}</p>
                            <p className="text-xs text-text-muted">{contact.phone}</p>
                          </div>
                        </label>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Özet */}
            <div className="bg-white rounded-xl border border-border p-4">
              <h4 className="text-sm font-medium text-text mb-3">Gönderim Özeti</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-light">Gönderici:</span>
                  <span className="font-medium">{senderName || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light">Alıcı Sayısı:</span>
                  <span className="font-medium">{selectedRecipients.length} kişi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light">SMS Sayısı:</span>
                  <span className="font-medium">{getCharacterInfo(message).smsCount} SMS/kişi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light">Toplam SMS:</span>
                  <span className="font-medium text-primary">
                    {selectedRecipients.length * getCharacterInfo(message).smsCount} SMS
                  </span>
                </div>
              </div>
            </div>

            {/* Gönder Butonu */}
            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={!message.trim() || selectedRecipients.length === 0 || !senderName}
              className="btn btn-primary w-full py-3"
            >
              <Send className="w-5 h-5" />
              SMS Gönder
            </button>
          </div>
        </div>
      </div>

      {/* Onay Modalı */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-primary">SMS Gönderimini Onayla</h3>
            </div>
            <div className="p-6">
              <div className="bg-surface rounded-lg p-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-light">Gönderici:</span>
                    <span className="font-medium">{senderName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-light">Alıcı Sayısı:</span>
                    <span className="font-medium">{selectedRecipients.length} kişi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-light">Toplam SMS:</span>
                    <span className="font-medium text-primary">
                      {selectedRecipients.length * getCharacterInfo(message).smsCount} SMS
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-light">
                Bu işlem geri alınamaz. SMS'ler seçilen kişilere gönderilecektir.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn btn-outline"
                disabled={isSending}
              >
                İptal
              </button>
              <button
                onClick={handleSend}
                disabled={isSending}
                className="btn btn-primary"
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Gönder
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
