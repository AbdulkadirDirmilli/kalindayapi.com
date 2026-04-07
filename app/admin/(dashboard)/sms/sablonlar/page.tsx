'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  Copy,
  Check,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import ConfirmDialog from '@/components/admin/ui/ConfirmDialog'

interface SmsTemplate {
  id: string
  title: string
  message: string
  createdAt: string
  updatedAt: string
}

// Örnek şablon önerileri
const templateSuggestions = [
  {
    title: 'Bayram Mesajı',
    message: 'Sayın {isim}, Kalında Yapı ailesi olarak bayramınızı en içten dileklerimizle kutlarız. Mutlu bayramlar dileriz.'
  },
  {
    title: 'Kandil Mesajı',
    message: 'Değerli {isim}, Kandil gününüzü tebrik eder, hayırlara vesile olmasını dileriz. Kalında Yapı'
  },
  {
    title: 'Yılbaşı Mesajı',
    message: 'Sayın {isim}, yeni yılınızı kutlar, sağlık, mutluluk ve başarı dolu bir yıl geçirmenizi dileriz. Kalında Yapı'
  },
  {
    title: 'Yeni İlan Duyurusu',
    message: 'Sayın {isim}, bölgenizde yeni bir ilan yayınlandı! Detaylar için web sitemizi ziyaret edin. Kalında Yapı'
  },
  {
    title: 'Kampanya Duyurusu',
    message: 'Sayın {isim}, özel kampanyamızdan haberdar olun! Detaylı bilgi için bizi arayın. Kalında Yapı'
  }
]

export default function SmsSablonlarPage() {
  const [templates, setTemplates] = useState<SmsTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Form data
  const [formData, setFormData] = useState({
    title: '',
    message: ''
  })

  // Fetch templates
  const fetchTemplates = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/sms/templates')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
      }
    } catch (error) {
      console.error('Şablonlar yüklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTemplates()
  }, [fetchTemplates])

  // Handlers
  const handleAddTemplate = async () => {
    if (!formData.title.trim() || !formData.message.trim()) return

    try {
      const response = await fetch('/api/admin/sms/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setShowAddForm(false)
        setFormData({ title: '', message: '' })
        fetchTemplates()
      }
    } catch (error) {
      console.error('Şablon eklenemedi:', error)
    }
  }

  const handleEditTemplate = (template: SmsTemplate) => {
    setEditingId(template.id)
    setFormData({
      title: template.title,
      message: template.message
    })
  }

  const handleUpdateTemplate = async () => {
    if (!editingId || !formData.title.trim() || !formData.message.trim()) return

    try {
      const response = await fetch(`/api/admin/sms/templates/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setEditingId(null)
        setFormData({ title: '', message: '' })
        fetchTemplates()
      }
    } catch (error) {
      console.error('Şablon güncellenemedi:', error)
    }
  }

  const handleDeleteTemplate = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/sms/templates/${deleteId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchTemplates()
      }
    } catch (error) {
      console.error('Şablon silinemedi:', error)
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const handleUseSuggestion = (suggestion: { title: string; message: string }) => {
    setFormData({
      title: suggestion.title,
      message: suggestion.message
    })
    setShowAddForm(true)
  }

  const handleCopyMessage = async (template: SmsTemplate) => {
    try {
      await navigator.clipboard.writeText(template.message)
      setCopiedId(template.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Kopyalama hatası:', error)
    }
  }

  const getCharacterCount = (text: string) => {
    const length = text.length
    const smsCount = Math.ceil(length / 160) || 1
    return { length, smsCount }
  }

  return (
    <div>
      <AdminHeader
        title="SMS Şablonları"
        subtitle="Sık kullanılan SMS mesajlarını şablon olarak kaydedin"
      />

      <div className="p-4 sm:p-6">
        {/* Add Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5" />
            Yeni Şablon
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Yeni Şablon Oluştur
            </h3>

            {/* Quick Suggestions */}
            <div className="mb-4">
              <p className="text-sm text-text-light mb-2">Hızlı Şablonlar:</p>
              <div className="flex flex-wrap gap-2">
                {templateSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleUseSuggestion(suggestion)}
                    className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                  >
                    {suggestion.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Şablon Başlığı *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="input w-full"
                  placeholder="Örn: Bayram Mesajı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Mesaj İçeriği *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="input w-full h-32 resize-none"
                  placeholder="SMS mesajınızı yazın. {isim} gibi değişkenler kullanabilirsiniz."
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-text-muted">
                    Değişkenler: {'{isim}'} - Alıcının adı
                  </p>
                  <p className="text-xs text-text-muted">
                    {getCharacterCount(formData.message).length} karakter / {getCharacterCount(formData.message).smsCount} SMS
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setFormData({ title: '', message: '' })
                }}
                className="btn btn-outline"
              >
                İptal
              </button>
              <button
                onClick={handleAddTemplate}
                disabled={!formData.title.trim() || !formData.message.trim()}
                className="btn btn-primary"
              >
                Kaydet
              </button>
            </div>
          </div>
        )}

        {/* Templates List */}
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
        ) : templates.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <FileText className="w-12 h-12 mx-auto text-text-muted mb-4" />
            <p className="text-text-light mb-4">Henüz şablon oluşturulmamış</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary"
            >
              <Plus className="w-5 h-5" />
              İlk Şablonu Oluştur
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl border border-border overflow-hidden"
              >
                {editingId === template.id ? (
                  <div className="p-4">
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="input text-sm w-full"
                        placeholder="Şablon başlığı"
                      />
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="input text-sm w-full h-24 resize-none"
                        placeholder="Mesaj içeriği"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdateTemplate}
                          className="flex-1 btn btn-primary text-sm py-2"
                        >
                          <Check className="w-4 h-4" />
                          Kaydet
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null)
                            setFormData({ title: '', message: '' })
                          }}
                          className="flex-1 btn btn-outline text-sm py-2"
                        >
                          İptal
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="font-semibold text-text">{template.title}</h3>
                        <button
                          onClick={() => handleCopyMessage(template)}
                          className="p-1.5 hover:bg-surface rounded-lg transition-colors flex-shrink-0"
                          title="Mesajı Kopyala"
                        >
                          {copiedId === template.id ? (
                            <Check className="w-4 h-4 text-success" />
                          ) : (
                            <Copy className="w-4 h-4 text-text-muted" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-text-light line-clamp-4">
                        {template.message}
                      </p>
                      <p className="text-xs text-text-muted mt-2">
                        {getCharacterCount(template.message).length} karakter / {getCharacterCount(template.message).smsCount} SMS
                      </p>
                    </div>
                    <div className="px-4 py-3 border-t border-border flex items-center justify-between bg-surface/30">
                      <span className="text-xs text-text-muted">
                        {new Date(template.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-primary" />
                        </button>
                        <button
                          onClick={() => setDeleteId(template.id)}
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
        title="Şablonu Sil"
        message="Bu şablonu silmek istediğinizden emin misiniz?"
        confirmText="Sil"
        cancelText="İptal"
        onConfirm={handleDeleteTemplate}
        onCancel={() => setDeleteId(null)}
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  )
}
