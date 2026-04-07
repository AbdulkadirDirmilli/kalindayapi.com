'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Save,
  Send,
  Plus,
  X,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Settings,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'

interface SmsSettings {
  id: string | null
  netgsmUsername: string
  netgsmPassword: string
  netgsmHeader: string
  senderNames: string
  isActive: boolean
}

export default function SmsAyarlarPage() {
  const [settings, setSettings] = useState<SmsSettings>({
    id: null,
    netgsmUsername: '',
    netgsmPassword: '',
    netgsmHeader: '',
    senderNames: '[]',
    isActive: true,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [newSenderName, setNewSenderName] = useState('')
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  // Test SMS state
  const [testPhone, setTestPhone] = useState('')
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  // Fetch settings
  const fetchSettings = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/sms/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Ayarlar yüklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  // Parse sender names
  const getSenderNames = (): string[] => {
    try {
      return JSON.parse(settings.senderNames)
    } catch {
      return []
    }
  }

  // Add sender name
  const addSenderName = () => {
    if (!newSenderName.trim()) return
    const names = getSenderNames()
    if (!names.includes(newSenderName.trim())) {
      names.push(newSenderName.trim())
      setSettings(prev => ({ ...prev, senderNames: JSON.stringify(names) }))
    }
    setNewSenderName('')
  }

  // Remove sender name
  const removeSenderName = (name: string) => {
    const names = getSenderNames().filter(n => n !== name)
    setSettings(prev => ({ ...prev, senderNames: JSON.stringify(names) }))
  }

  // Save settings
  const handleSave = async () => {
    setIsSaving(true)
    setResult(null)

    try {
      const response = await fetch('/api/admin/sms/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: 'Ayarlar başarıyla kaydedildi' })
        setSettings(data)
      } else {
        setResult({ success: false, message: data.error || 'Ayarlar kaydedilemedi' })
      }
    } catch (error) {
      console.error('Kaydetme hatası:', error)
      setResult({ success: false, message: 'Bağlantı hatası oluştu' })
    } finally {
      setIsSaving(false)
    }
  }

  // Send test SMS
  const handleTestSms = async () => {
    if (!testPhone.trim()) {
      setTestResult({ success: false, message: 'Test telefon numarası girin' })
      return
    }

    setIsTesting(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/admin/sms/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Bu bir test SMS mesajıdır. Kalında Yapı SMS sistemi başarıyla çalışıyor.',
          senderName: settings.netgsmHeader,
          recipients: [testPhone.trim()],
        }),
      })

      const data = await response.json()

      if (data.success) {
        setTestResult({ success: true, message: 'Test SMS başarıyla gönderildi!' })
      } else {
        setTestResult({ success: false, message: data.error || 'Test SMS gönderilemedi' })
      }
    } catch (error) {
      console.error('Test SMS hatası:', error)
      setTestResult({ success: false, message: 'Bağlantı hatası oluştu' })
    } finally {
      setIsTesting(false)
    }
  }

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="SMS Ayarları" subtitle="NetGSM API ayarlarını yapılandırın" />
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

  return (
    <div>
      <AdminHeader title="SMS Ayarları" subtitle="NetGSM API ayarlarını yapılandırın" />

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
            <button onClick={() => setResult(null)} className="ml-auto p-1 hover:bg-black/10 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sol Kolon - API Ayarları */}
          <div className="space-y-6">
            {/* NetGSM API Bilgileri */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text">NetGSM API Bilgileri</h3>
                  <p className="text-xs text-text-muted">API bağlantı bilgilerini girin</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Kullanıcı Adı *
                  </label>
                  <input
                    type="text"
                    value={settings.netgsmUsername}
                    onChange={(e) => setSettings(prev => ({ ...prev, netgsmUsername: e.target.value }))}
                    className="input w-full"
                    placeholder="NetGSM kullanıcı adınız"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Şifre *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={settings.netgsmPassword}
                      onChange={(e) => setSettings(prev => ({ ...prev, netgsmPassword: e.target.value }))}
                      className="input w-full pr-10"
                      placeholder="NetGSM şifreniz"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Varsayılan Başlık (Header) *
                  </label>
                  <input
                    type="text"
                    value={settings.netgsmHeader}
                    onChange={(e) => setSettings(prev => ({ ...prev, netgsmHeader: e.target.value }))}
                    className="input w-full"
                    placeholder="KALINDA YAPI"
                  />
                  <p className="text-xs text-text-muted mt-1">
                    NetGSM'de tanımlı gönderici başlığı
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-text">SMS Sistemi Aktif</p>
                    <p className="text-xs text-text-muted">SMS gönderimini aç/kapat</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.isActive}
                      onChange={(e) => setSettings(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Gönderici Adları */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text mb-4">Gönderici Adları</h3>
              <p className="text-xs text-text-muted mb-4">
                SMS gönderirken kullanılabilecek başlıklar. NetGSM'de tanımlı olmalıdır.
              </p>

              {/* Mevcut İsimler */}
              <div className="flex flex-wrap gap-2 mb-4">
                {getSenderNames().map((name, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {name}
                    <button
                      onClick={() => removeSenderName(name)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {getSenderNames().length === 0 && (
                  <p className="text-sm text-text-muted">Henüz gönderici adı eklenmemiş</p>
                )}
              </div>

              {/* Yeni İsim Ekle */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSenderName}
                  onChange={(e) => setNewSenderName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSenderName()}
                  className="input flex-1"
                  placeholder="Yeni gönderici adı"
                />
                <button
                  onClick={addSenderName}
                  disabled={!newSenderName.trim()}
                  className="btn btn-outline"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Kaydet Butonu */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn btn-primary w-full py-3"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Ayarları Kaydet
                </>
              )}
            </button>
          </div>

          {/* Sağ Kolon - Test SMS */}
          <div>
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-text">Test SMS Gönder</h3>
                  <p className="text-xs text-text-muted">Ayarları test edin</p>
                </div>
              </div>

              {/* Test Result */}
              {testResult && (
                <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
                  testResult.success
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}>
                  {testResult.success ? (
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span className="text-sm">{testResult.message}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Test Telefon Numarası
                  </label>
                  <input
                    type="text"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    className="input w-full"
                    placeholder="05XX XXX XX XX"
                  />
                </div>

                <div className="bg-surface rounded-lg p-4">
                  <p className="text-xs text-text-muted mb-2">Test Mesajı:</p>
                  <p className="text-sm text-text">
                    Bu bir test SMS mesajıdır. Kalında Yapı SMS sistemi başarıyla çalışıyor.
                  </p>
                </div>

                <button
                  onClick={handleTestSms}
                  disabled={isTesting || !settings.isActive || !settings.netgsmUsername}
                  className="btn btn-outline w-full"
                >
                  {isTesting ? (
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
                      Test SMS Gönder
                    </>
                  )}
                </button>

                {!settings.isActive && (
                  <p className="text-xs text-amber-600 text-center">
                    SMS sistemi pasif durumda. Test göndermek için aktif edin.
                  </p>
                )}
              </div>
            </div>

            {/* Bilgi Kartı */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-medium text-blue-800 mb-2">NetGSM Hakkında</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• NetGSM hesabınızda yeterli bakiye olmalıdır</li>
                <li>• Gönderici adları NetGSM'de tanımlı olmalıdır</li>
                <li>• IYS kaydı olan numaralara gönderim yapılabilir</li>
                <li>• API bilgileri NetGSM panelinden alınabilir</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
