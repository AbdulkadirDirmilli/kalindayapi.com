'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, X, Plus, Trash2, Image as ImageIcon } from 'lucide-react'

interface IlanFormData {
  baslik: string
  slug: string
  kategori: 'satilik' | 'kiralik'
  tip: 'daire' | 'villa' | 'arsa' | 'ticari'
  fiyat: number
  paraBirimi: string
  il: string
  ilce: string
  mahalle: string
  koordinatLat: number | null
  koordinatLng: number | null
  metrekare: number | null
  odaSayisi: string
  banyoSayisi: number | null
  kat: number | null
  toplamKat: number | null
  binaYasi: number | null
  isitma: string
  esyali: boolean
  balkon: boolean
  asansor: boolean
  otopark: boolean
  guvenlik: boolean
  havuz: boolean
  bahce: boolean
  bahceMetrekare: number | null
  imarDurumu: string
  gabari: string
  yolCephesi: number | null
  altyapi: boolean
  aciklama: string
  oneCikan: boolean
  durum: 'aktif' | 'pasif' | 'satildi'
  ilanNo: string
  fotograflar: string[]
}

interface IlanFormProps {
  initialData?: Partial<IlanFormData>
  ilanId?: string
}

const defaultFormData: IlanFormData = {
  baslik: '',
  slug: '',
  kategori: 'satilik',
  tip: 'daire',
  fiyat: 0,
  paraBirimi: 'TL',
  il: 'Mugla',
  ilce: 'Ortaca',
  mahalle: '',
  koordinatLat: null,
  koordinatLng: null,
  metrekare: null,
  odaSayisi: '',
  banyoSayisi: null,
  kat: null,
  toplamKat: null,
  binaYasi: null,
  isitma: '',
  esyali: false,
  balkon: false,
  asansor: false,
  otopark: false,
  guvenlik: false,
  havuz: false,
  bahce: false,
  bahceMetrekare: null,
  imarDurumu: '',
  gabari: '',
  yolCephesi: null,
  altyapi: false,
  aciklama: '',
  oneCikan: false,
  durum: 'aktif',
  ilanNo: '',
  fotograflar: [],
}

export default function IlanForm({ initialData, ilanId }: IlanFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<IlanFormData>({
    ...defaultFormData,
    ...initialData,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newPhotoUrl, setNewPhotoUrl] = useState('')

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleBaslikChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      baslik: value,
      slug: prev.slug || generateSlug(value),
    }))
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
          ? value === ''
            ? null
            : Number(value)
          : value,
    }))
  }

  const addPhoto = () => {
    if (newPhotoUrl && !formData.fotograflar.includes(newPhotoUrl)) {
      setFormData((prev) => ({
        ...prev,
        fotograflar: [...prev.fotograflar, newPhotoUrl],
      }))
      setNewPhotoUrl('')
    }
  }

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      fotograflar: prev.fotograflar.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const url = ilanId
        ? `/api/admin/ilanlar/${ilanId}`
        : '/api/admin/ilanlar'
      const method = ilanId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Bir hata olustu')
      }

      router.push('/admin/ilanlar')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata olustu')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isArsa = formData.tip === 'arsa'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
          {error}
        </div>
      )}

      {/* Temel Bilgiler */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">
          Temel Bilgiler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text mb-1">
              Ilan Basligi *
            </label>
            <input
              type="text"
              name="baslik"
              value={formData.baslik}
              onChange={(e) => handleBaslikChange(e.target.value)}
              className="input"
              required
              placeholder="Ornegin: Ortaca Merkezde Satilik 3+1 Daire"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Slug *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="input"
              required
              placeholder="ilan-url-adresi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Ilan No
            </label>
            <input
              type="text"
              name="ilanNo"
              value={formData.ilanNo}
              onChange={handleChange}
              className="input"
              placeholder="Otomatik olusturulur"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Kategori *
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="input"
            >
              <option value="satilik">Satilik</option>
              <option value="kiralik">Kiralik</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Tip *
            </label>
            <select
              name="tip"
              value={formData.tip}
              onChange={handleChange}
              className="input"
            >
              <option value="daire">Daire</option>
              <option value="villa">Villa</option>
              <option value="arsa">Arsa</option>
              <option value="ticari">Ticari</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Fiyat *
            </label>
            <input
              type="number"
              name="fiyat"
              value={formData.fiyat || ''}
              onChange={handleChange}
              className="input"
              required
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Para Birimi
            </label>
            <select
              name="paraBirimi"
              value={formData.paraBirimi}
              onChange={handleChange}
              className="input"
            >
              <option value="TL">TL</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Durum
            </label>
            <select
              name="durum"
              value={formData.durum}
              onChange={handleChange}
              className="input"
            >
              <option value="aktif">Aktif</option>
              <option value="pasif">Pasif</option>
              <option value="satildi">Satildi</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="oneCikan"
                checked={formData.oneCikan}
                onChange={handleChange}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm font-medium text-text">One Cikan</span>
            </label>
          </div>
        </div>
      </div>

      {/* Konum */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Konum</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Il *
            </label>
            <input
              type="text"
              name="il"
              value={formData.il}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Ilce *
            </label>
            <input
              type="text"
              name="ilce"
              value={formData.ilce}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Mahalle
            </label>
            <input
              type="text"
              name="mahalle"
              value={formData.mahalle}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Ozellikler */}
      {!isArsa && (
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Ozellikler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Metrekare
              </label>
              <input
                type="number"
                name="metrekare"
                value={formData.metrekare || ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Oda Sayisi
              </label>
              <input
                type="text"
                name="odaSayisi"
                value={formData.odaSayisi}
                onChange={handleChange}
                className="input"
                placeholder="3+1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Banyo Sayisi
              </label>
              <input
                type="number"
                name="banyoSayisi"
                value={formData.banyoSayisi || ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Kat
              </label>
              <input
                type="number"
                name="kat"
                value={formData.kat || ''}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Toplam Kat
              </label>
              <input
                type="number"
                name="toplamKat"
                value={formData.toplamKat || ''}
                onChange={handleChange}
                className="input"
                min={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Bina Yasi
              </label>
              <input
                type="number"
                name="binaYasi"
                value={formData.binaYasi || ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text mb-1">
                Isitma
              </label>
              <input
                type="text"
                name="isitma"
                value={formData.isitma}
                onChange={handleChange}
                className="input"
                placeholder="Dogalgaz Kombi"
              />
            </div>
          </div>

          {/* Boolean Ozellikler */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'esyali', label: 'Esyali' },
              { name: 'balkon', label: 'Balkon' },
              { name: 'asansor', label: 'Asansor' },
              { name: 'otopark', label: 'Otopark' },
              { name: 'guvenlik', label: 'Guvenlik' },
              { name: 'havuz', label: 'Havuz' },
              { name: 'bahce', label: 'Bahce' },
            ].map((item) => (
              <label
                key={item.name}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={item.name}
                  checked={formData[item.name as keyof IlanFormData] as boolean}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm text-text">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Arsa Ozellikleri */}
      {isArsa && (
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Arsa Ozellikleri
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Metrekare
              </label>
              <input
                type="number"
                name="metrekare"
                value={formData.metrekare || ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Imar Durumu
              </label>
              <input
                type="text"
                name="imarDurumu"
                value={formData.imarDurumu}
                onChange={handleChange}
                className="input"
                placeholder="Konut Imarli"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Gabari
              </label>
              <input
                type="text"
                name="gabari"
                value={formData.gabari}
                onChange={handleChange}
                className="input"
                placeholder="5 Kat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Yol Cephesi (m)
              </label>
              <input
                type="number"
                name="yolCephesi"
                value={formData.yolCephesi || ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="altyapi"
                  checked={formData.altyapi}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm text-text">Altyapi Mevcut</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Aciklama */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Aciklama</h2>
        <textarea
          name="aciklama"
          value={formData.aciklama}
          onChange={handleChange}
          className="input min-h-[150px]"
          required
          placeholder="Ilan aciklamasini yazin..."
        />
      </div>

      {/* Fotograflar */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Fotograflar</h2>

        {/* Photo URL Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newPhotoUrl}
            onChange={(e) => setNewPhotoUrl(e.target.value)}
            className="input flex-1"
            placeholder="Fotograf URL'si girin..."
          />
          <button
            type="button"
            onClick={addPhoto}
            className="btn btn-primary"
            disabled={!newPhotoUrl}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Photo Grid */}
        {formData.fotograflar.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.fotograflar.map((url, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-lg overflow-hidden bg-surface"
              >
                <img
                  src={url}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 p-1.5 bg-error text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {index === 0 && (
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-white text-xs rounded">
                    Kapak
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-text-muted">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Henuz fotograf eklenmemis</p>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-outline"
        >
          <X className="w-5 h-5" />
          Iptal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? (
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
    </form>
  )
}
