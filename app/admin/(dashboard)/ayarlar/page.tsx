'use client'

import { useState } from 'react'
import { Save, Building2, Phone, Mail, MapPin, Globe, Clock } from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'

export default function AyarlarPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    // Firma Bilgileri
    firmaAdi: 'Kalinda Yapi',
    slogan: 'Guvenilir Gayrimenkul & Yapi Cozumleri',
    kurulusYili: '2012',

    // Iletisim
    telefon1: '+90 537 053 07 54',
    telefon2: '+90 532 159 15 56',
    email: 'info@kalindayapi.com',
    web: 'www.kalindayapi.com',

    // Adres
    mahalle: 'Cumhuriyet Mahallesi',
    cadde: 'Ataturk Caddesi',
    no: '45/A',
    ilce: 'Ortaca',
    il: 'Mugla',
    postaKodu: '48600',

    // Calisma Saatleri
    haftaIci: '08:00 - 18:00',
    cumartesi: '09:00 - 14:00',
    pazar: 'Kapali',

    // Sosyal Medya
    instagram: 'kalindayapi',
    facebook: 'kalindayapi',
    youtube: 'kalindayapi',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // TODO: API call to save settings
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Ayarlar kaydedildi!')
  }

  return (
    <div>
      <AdminHeader
        title="Site Ayarlari"
        subtitle="Genel site ayarlarini yapilandirin"
      />

      <div className="p-4 sm:p-6 max-w-4xl">
        {/* Firma Bilgileri */}
        <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">Firma Bilgileri</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Firma Adi
              </label>
              <input
                type="text"
                name="firmaAdi"
                value={settings.firmaAdi}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Slogan
              </label>
              <input
                type="text"
                name="slogan"
                value={settings.slogan}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Kurulus Yili
              </label>
              <input
                type="text"
                name="kurulusYili"
                value={settings.kurulusYili}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Iletisim Bilgileri */}
        <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">Iletisim Bilgileri</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Telefon 1
              </label>
              <input
                type="text"
                name="telefon1"
                value={settings.telefon1}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Telefon 2
              </label>
              <input
                type="text"
                name="telefon2"
                value={settings.telefon2}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Website
              </label>
              <input
                type="text"
                name="web"
                value={settings.web}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Adres */}
        <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">Adres</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Mahalle
              </label>
              <input
                type="text"
                name="mahalle"
                value={settings.mahalle}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Cadde
              </label>
              <input
                type="text"
                name="cadde"
                value={settings.cadde}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                No
              </label>
              <input
                type="text"
                name="no"
                value={settings.no}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Ilce
              </label>
              <input
                type="text"
                name="ilce"
                value={settings.ilce}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Il
              </label>
              <input
                type="text"
                name="il"
                value={settings.il}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Posta Kodu
              </label>
              <input
                type="text"
                name="postaKodu"
                value={settings.postaKodu}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Calisma Saatleri */}
        <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">Calisma Saatleri</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Hafta Ici
              </label>
              <input
                type="text"
                name="haftaIci"
                value={settings.haftaIci}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Cumartesi
              </label>
              <input
                type="text"
                name="cumartesi"
                value={settings.cumartesi}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Pazar
              </label>
              <input
                type="text"
                name="pazar"
                value={settings.pazar}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Sosyal Medya */}
        <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">Sosyal Medya</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Instagram
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  @
                </span>
                <input
                  type="text"
                  name="instagram"
                  value={settings.instagram}
                  onChange={handleChange}
                  className="input pl-7"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Facebook
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  /
                </span>
                <input
                  type="text"
                  name="facebook"
                  value={settings.facebook}
                  onChange={handleChange}
                  className="input pl-7"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                YouTube
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  @
                </span>
                <input
                  type="text"
                  name="youtube"
                  value={settings.youtube}
                  onChange={handleChange}
                  className="input pl-7"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn btn-primary"
          >
            {isSaving ? (
              <>
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
                Kaydediliyor...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Kaydet
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
