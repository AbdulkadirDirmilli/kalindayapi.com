'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Save,
  X,
  Trash2,
  Image as ImageIcon,
  Upload,
  GripVertical,
  MapPin,
  ChevronDown,
  ChevronUp,
  Check,
  Play,
} from 'lucide-react'
import { konumVerisi, getIlceler, getMahalleler, getIlceKoordinatlari } from '@/data/konum'
import { getOzelliklerByTip, emlakTipleri, getAllEmlakTipleri } from '@/data/ozellikler'
import { INSAAT_DURUMU_OPTIONS } from '@/lib/utils'

interface Ortak {
  id: string
  ad: string
  unvan: string
  telefon: string
  whatsapp: string | null
  email: string | null
  foto: string | null
}

interface IlanFormData {
  baslik: string
  slug: string
  kategori: 'satilik' | 'kiralik'
  tip: string
  altTip: string
  fiyat: number
  paraBirimi: string
  il: string
  ilce: string
  mahalle: string
  koordinatLat: number | null
  koordinatLng: number | null
  // Konut
  brutMetrekare: number | null
  netMetrekare: number | null
  metrekare: number | null
  odaSayisi: string
  banyoSayisi: number | null
  tuvaletSayisi: number | null
  balkonSayisi: number | null
  kat: number | null
  toplamKat: number | null
  binaYasi: number | null
  binaTipi: string
  kullanimDurumu: string
  insaatDurumu: string
  // Isitma
  isitma: string
  yakitTipi: string
  enerjiSinifi: string
  // Boolean
  esyali: boolean
  balkon: boolean
  asansor: boolean
  otopark: boolean
  guvenlik: boolean
  havuz: boolean
  bahce: boolean
  bahceMetrekare: number | null
  // Detayli ozellikler
  icOzellikler: string[]
  disOzellikler: string[]
  muhitOzellikleri: string[]
  guvenlikOzellikleri: string[]
  cephe: string[]
  manzara: string[]
  // Arsa
  imarDurumu: string
  emsal: string
  gabari: string
  taks: number | null
  kaks: number | null
  yolCephesi: number | null
  derinlik: number | null
  arsaTipi: string
  egim: string
  zemin: string
  altyapi: boolean
  altyapiDetay: string[]
  tarimOzellikleri: string[]
  adaNo: string
  parselNo: string
  paftaNo: string
  // Ticari
  ticariTip: string
  cepheGenisligi: number | null
  tavanYuksekligi: number | null
  personelKapasitesi: number | null
  depoOzellikleri: string[]
  // Insaat durumu
  insaatDurumu: string
  // Tapu
  tapuDurumu: string
  krediyeUygun: boolean
  takasaUygun: boolean
  isyeriRuhsati: boolean
  // Video
  videoUrl: string
  // Danisman
  danismanId: string | null
  aciklama: string
  oneCikan: boolean
  durum: 'aktif' | 'pasif' | 'satildi' | 'kiralandi'
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
  altTip: '',
  fiyat: 0,
  paraBirimi: 'TL',
  il: 'Muğla',
  ilce: '',
  mahalle: '',
  koordinatLat: null,
  koordinatLng: null,
  brutMetrekare: null,
  netMetrekare: null,
  metrekare: null,
  odaSayisi: '',
  banyoSayisi: null,
  tuvaletSayisi: null,
  balkonSayisi: null,
  kat: null,
  toplamKat: null,
  binaYasi: null,
  binaTipi: '',
  kullanimDurumu: '',
  insaatDurumu: '',
  isitma: '',
  yakitTipi: '',
  enerjiSinifi: '',
  esyali: false,
  balkon: false,
  asansor: false,
  otopark: false,
  guvenlik: false,
  havuz: false,
  bahce: false,
  bahceMetrekare: null,
  icOzellikler: [],
  disOzellikler: [],
  muhitOzellikleri: [],
  guvenlikOzellikleri: [],
  cephe: [],
  manzara: [],
  imarDurumu: '',
  emsal: '',
  gabari: '',
  taks: null,
  kaks: null,
  yolCephesi: null,
  derinlik: null,
  arsaTipi: '',
  egim: '',
  zemin: '',
  altyapi: false,
  altyapiDetay: [],
  tarimOzellikleri: [],
  adaNo: '',
  parselNo: '',
  paftaNo: '',
  ticariTip: '',
  cepheGenisligi: null,
  tavanYuksekligi: null,
  personelKapasitesi: null,
  depoOzellikleri: [],
  insaatDurumu: '',
  tapuDurumu: '',
  krediyeUygun: false,
  takasaUygun: false,
  isyeriRuhsati: false,
  videoUrl: '',
  danismanId: null,
  aciklama: '',
  oneCikan: false,
  durum: 'aktif',
  ilanNo: '',
  fotograflar: [],
}

// Collapsible Section Component
function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="p-6">{children}</div>}
    </div>
  )
}

// MultiSelect Component
function MultiSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-text mb-2">{label}</label>
      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border border-border rounded-lg bg-gray-50">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => toggleOption(option)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              selected.includes(option)
                ? 'bg-primary text-white'
                : 'bg-white border border-border text-text hover:border-primary'
            }`}
          >
            {selected.includes(option) && <Check className="w-3 h-3 inline mr-1" />}
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function IlanForm({ initialData, ilanId }: IlanFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<IlanFormData>(() => {
    const initial = { ...defaultFormData, ...initialData }
    // Parse JSON arrays if they come as strings
    const jsonFields = [
      'icOzellikler',
      'disOzellikler',
      'muhitOzellikleri',
      'guvenlikOzellikleri',
      'cephe',
      'manzara',
      'altyapiDetay',
      'tarimOzellikleri',
      'depoOzellikleri',
    ]
    jsonFields.forEach((field) => {
      const val = initial[field as keyof IlanFormData]
      if (typeof val === 'string') {
        try {
          ;(initial as Record<string, unknown>)[field] = JSON.parse(val)
        } catch {
          ;(initial as Record<string, unknown>)[field] = []
        }
      }
    })
    return initial as IlanFormData
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [uploadingFiles, setUploadingFiles] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ name: string; progress: number; status: 'uploading' | 'done' | 'error' }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [ortaklar, setOrtaklar] = useState<Ortak[]>([])

  // Ilce ve mahalle listeleri
  const ilceler = getIlceler()
  const mahalleler = formData.ilce ? getMahalleler(formData.ilce) : []

  // Emlak tipi kategorileri
  const tumTipler = getAllEmlakTipleri()
  const ozellikler = getOzelliklerByTip(formData.tip)

  // Auto-koordinat update
  useEffect(() => {
    if (formData.ilce) {
      const koordinatlar = getIlceKoordinatlari(formData.ilce)
      if (koordinatlar) {
        setFormData((prev) => ({
          ...prev,
          koordinatLat: koordinatlar.lat,
          koordinatLng: koordinatlar.lng,
        }))
      }
    }
  }, [formData.ilce])

  // Yeni ilan icin otomatik ilan numarasi olustur
  useEffect(() => {
    if (!ilanId && !formData.ilanNo) {
      const generateIlanNo = async () => {
        try {
          const response = await fetch('/api/admin/ilanlar/next-number')
          if (response.ok) {
            const data = await response.json()
            setFormData((prev) => ({ ...prev, ilanNo: data.ilanNo }))
          }
        } catch (error) {
          // Hata durumunda tarih bazli numara olustur
          const now = new Date()
          const fallbackNo = `KY-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`
          setFormData((prev) => ({ ...prev, ilanNo: fallbackNo }))
        }
      }
      generateIlanNo()
    }
  }, [ilanId])

  // Ortaklari (danismanlari) yukle
  useEffect(() => {
    const fetchOrtaklar = async () => {
      try {
        const response = await fetch('/api/admin/ortaklar')
        if (response.ok) {
          const data = await response.json()
          setOrtaklar(data.filter((o: Ortak & { aktif: boolean }) => o.aktif))
        }
      } catch (error) {
        console.error('Ortaklar yuklenemedi:', error)
      }
    }
    fetchOrtaklar()
  }, [])

  const generateSlug = (text: string) => {
    const turkishMap: { [key: string]: string } = {
      ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', I: 'i', İ: 'i',
      ö: 'o', Ö: 'o', ş: 's', Ş: 's', ü: 'u', Ü: 'u',
    }
    return text
      .split('')
      .map((char) => turkishMap[char] || char)
      .join('')
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
      slug: generateSlug(value),
    }))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

  const handleArrayChange = (name: keyof IlanFormData, value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Photo handling
  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      fotograflar: prev.fotograflar.filter((_, i) => i !== index),
    }))
  }

  // Drag and drop for reordering
  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newPhotos = [...formData.fotograflar]
    const draggedPhoto = newPhotos[draggedIndex]
    newPhotos.splice(draggedIndex, 1)
    newPhotos.splice(index, 0, draggedPhoto)

    setFormData((prev) => ({ ...prev, fotograflar: newPhotos }))
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  // File upload with progress tracking
  const uploadFileWithProgress = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100)
          setUploadProgress((prev) =>
            prev.map((p) => (p.name === file.name ? { ...p, progress: percent } : p))
          )
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText)
          setUploadProgress((prev) =>
            prev.map((p) => (p.name === file.name ? { ...p, status: 'done', progress: 100 } : p))
          )
          resolve(data.url)
        } else {
          setUploadProgress((prev) =>
            prev.map((p) => (p.name === file.name ? { ...p, status: 'error' } : p))
          )
          reject(new Error('Yükleme başarısız'))
        }
      })

      xhr.addEventListener('error', () => {
        setUploadProgress((prev) =>
          prev.map((p) => (p.name === file.name ? { ...p, status: 'error' } : p))
        )
        reject(new Error('Yükleme hatası'))
      })

      xhr.open('POST', '/api/upload')
      xhr.send(formDataUpload)
    })
  }

  // File upload handler
  const handleFileUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return

      const remainingSlots = 50 - formData.fotograflar.length
      if (remainingSlots <= 0) {
        setError('Maksimum 50 medya ekleyebilirsiniz')
        return
      }

      setUploadingFiles(true)
      setError(null)

      const filesToUpload = Array.from(files).slice(0, remainingSlots)

      // Initialize progress state
      setUploadProgress(
        filesToUpload.map((file) => ({
          name: file.name,
          progress: 0,
          status: 'uploading' as const,
        }))
      )

      try {
        const uploadedUrls: string[] = []

        for (const file of filesToUpload) {
          try {
            const url = await uploadFileWithProgress(file)
            uploadedUrls.push(url)
          } catch {
            // Continue with other files even if one fails
          }
        }

        if (uploadedUrls.length > 0) {
          setFormData((prev) => ({
            ...prev,
            fotograflar: [...prev.fotograflar, ...uploadedUrls],
          }))
        }

        // Clear progress after a short delay
        setTimeout(() => {
          setUploadProgress([])
        }, 2000)
      } catch (err) {
        setError('Dosya yüklenirken hata oluştu. Lütfen tekrar deneyin.')
      } finally {
        setUploadingFiles(false)
      }
    },
    [formData.fotograflar.length]
  )

  // Drag and drop for file upload
  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      handleFileUpload(e.dataTransfer.files)
    },
    [handleFileUpload]
  )

  const handleDragOverFile = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      // Helper: convert empty strings to null
      const emptyToNull = (val: string | null | undefined) => val === '' ? null : val

      // Extract first video from fotograflar for videoUrl
      const firstVideoUrl = formData.fotograflar.find(
        (url: string) => url.includes('/videos/') || /\.(mp4|webm|mov|avi)$/i.test(url)
      ) || null

      // Prepare data - stringify arrays and convert empty strings to null
      const dataToSend = {
        ...formData,
        metrekare: formData.brutMetrekare || formData.metrekare,
        // Convert empty strings to null for optional fields
        altTip: emptyToNull(formData.altTip),
        mahalle: emptyToNull(formData.mahalle),
        binaTipi: emptyToNull(formData.binaTipi),
        kullanimDurumu: emptyToNull(formData.kullanimDurumu),
        isitma: emptyToNull(formData.isitma),
        yakitTipi: emptyToNull(formData.yakitTipi),
        enerjiSinifi: emptyToNull(formData.enerjiSinifi),
        imarDurumu: emptyToNull(formData.imarDurumu),
        emsal: emptyToNull(formData.emsal),
        gabari: emptyToNull(formData.gabari),
        arsaTipi: emptyToNull(formData.arsaTipi),
        egim: emptyToNull(formData.egim),
        zemin: emptyToNull(formData.zemin),
        ticariTip: emptyToNull(formData.ticariTip),
        tapuDurumu: emptyToNull(formData.tapuDurumu),
        videoUrl: firstVideoUrl,
        danismanId: emptyToNull(formData.danismanId),
        adaNo: emptyToNull(formData.adaNo),
        parselNo: emptyToNull(formData.parselNo),
        paftaNo: emptyToNull(formData.paftaNo),
        icOzellikler: JSON.stringify(formData.icOzellikler),
        disOzellikler: JSON.stringify(formData.disOzellikler),
        muhitOzellikleri: JSON.stringify(formData.muhitOzellikleri),
        guvenlikOzellikleri: JSON.stringify(formData.guvenlikOzellikleri),
        cephe: JSON.stringify(formData.cephe),
        manzara: JSON.stringify(formData.manzara),
        altyapiDetay: JSON.stringify(formData.altyapiDetay),
        tarimOzellikleri: JSON.stringify(formData.tarimOzellikleri),
        depoOzellikleri: JSON.stringify(formData.depoOzellikleri),
      }

      const url = ilanId ? `/api/admin/ilanlar/${ilanId}` : '/api/admin/ilanlar'
      const method = ilanId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        const data = await response.json()
        const errorDetail = data.details ? ` - ${data.details}` : ''
        throw new Error((data.error || 'Bir hata olustu') + errorDetail)
      }

      setSuccess('İlan başarıyla kaydedildi!')
      setTimeout(() => {
        router.push('/admin/ilanlar')
        router.refresh()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata olustu')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isArsa = ['arsa', 'tarla', 'arazi', 'bag', 'bahce', 'zeytinlik', 'arsaticari'].includes(
    formData.tip
  )
  const isTicari = [
    'ticari',
    'dukkan',
    'ofis',
    'plazakati',
    'ishanibinasi',
    'fabrika',
    'atolye',
    'depo',
    'diger',
  ].includes(formData.tip)
  const isKonut = !isArsa && !isTicari

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {success}
        </div>
      )}

      {/* Temel Bilgiler */}
      <CollapsibleSection title="Temel Bilgiler">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-text mb-1">
              İlan Başlığı *
            </label>
            <input
              type="text"
              name="baslik"
              value={formData.baslik}
              onChange={(e) => handleBaslikChange(e.target.value)}
              className="input"
              required
              placeholder="Örneğin: Ortaca Merkezde Satılık 3+1 Daire"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Slug <span className="text-xs text-gray-400">(otomatik)</span>
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              readOnly
              className="input bg-gray-50 text-gray-600 cursor-not-allowed"
              placeholder="Başlık girildikçe oluşturulur"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              İlan No <span className="text-xs text-gray-400">(otomatik)</span>
            </label>
            <input
              type="text"
              name="ilanNo"
              value={formData.ilanNo}
              readOnly
              className="input bg-gray-50 text-gray-600 cursor-not-allowed"
              placeholder="Yükleniyor..."
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
              <option value="satilik">Satılık</option>
              <option value="kiralik">Kiralık</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Emlak Tipi *
            </label>
            <select
              name="tip"
              value={formData.tip}
              onChange={handleChange}
              className="input"
            >
              <optgroup label="Konut">
                {emlakTipleri.konut.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Arsa / Arazi">
                {emlakTipleri.arsa.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Ticari">
                {emlakTipleri.ticari.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Turistik">
                {emlakTipleri.turistik.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Fiyat *
            </label>
            <input
              type="number"
              name="fiyat"
              value={formData.fiyat ?? ''}
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
              <option value="GBP">GBP</option>
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
              <option value="pasif">Pasif (Taslak)</option>
              <option value="satildi">Satıldı</option>
              <option value="kiralandi">Kiralandı</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              İnşaat Durumu
            </label>
            <select
              name="insaatDurumu"
              value={formData.insaatDurumu}
              onChange={handleChange}
              className="input"
            >
              <option value="">Seçiniz (Opsiyonel)</option>
              {INSAAT_DURUMU_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Sorumlu Danışman *
            </label>
            <select
              name="danismanId"
              value={formData.danismanId || ''}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Danışman Seçin</option>
              {ortaklar.map((ortak) => (
                <option key={ortak.id} value={ortak.id}>
                  {ortak.ad} - {ortak.unvan}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Insaat Durumu
            </label>
            <select
              name="insaatDurumu"
              value={formData.insaatDurumu}
              onChange={handleChange}
              className="input"
            >
              <option value="">Secin</option>
              <option value="Proje Asamasinda">Proje Asamasinda</option>
              <option value="Temel Asamasinda">Temel Asamasinda</option>
              <option value="Kaba Insaat">Kaba Insaat</option>
              <option value="Ince Insaat">Ince Insaat</option>
              <option value="Satisa Hazir">Satisa Hazir</option>
            </select>
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="oneCikan"
                checked={formData.oneCikan}
                onChange={handleChange}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-text">Öne Çıkan İlan</span>
            </label>
          </div>
        </div>
      </CollapsibleSection>

      {/* Konum */}
      <CollapsibleSection title="Konum">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              <MapPin className="w-4 h-4 inline mr-1" />
              İl *
            </label>
            <select
              name="il"
              value={formData.il}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="Muğla">Muğla</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              İlçe *
            </label>
            <select
              name="ilce"
              value={formData.ilce}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  ilce: e.target.value,
                  mahalle: '', // Reset mahalle when ilce changes
                }))
              }}
              className="input"
              required
            >
              <option value="">İlçe Seçin</option>
              {ilceler.map((ilce) => (
                <option key={ilce} value={ilce}>
                  {ilce}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Mahalle
            </label>
            <select
              name="mahalle"
              value={formData.mahalle}
              onChange={handleChange}
              className="input"
              disabled={!formData.ilce}
            >
              <option value="">Mahalle Seçin</option>
              {mahalleler.map((mahalle) => (
                <option key={mahalle} value={mahalle}>
                  {mahalle}
                </option>
              ))}
            </select>
          </div>

          {formData.koordinatLat && formData.koordinatLng && (
            <div className="md:col-span-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              Koordinatlar: {formData.koordinatLat.toFixed(4)}, {formData.koordinatLng.toFixed(4)}
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Konut Ozellikleri */}
      {isKonut && (
        <CollapsibleSection title="Konut Özellikleri">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Brut m²
              </label>
              <input
                type="number"
                name="brutMetrekare"
                value={formData.brutMetrekare ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Net m²
              </label>
              <input
                type="number"
                name="netMetrekare"
                value={formData.netMetrekare ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Oda Sayısı
              </label>
              <select
                name="odaSayisi"
                value={formData.odaSayisi}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {[
                  '1+0 (Studyo)',
                  '1+1',
                  '1.5+1',
                  '2+0',
                  '2+1',
                  '2.5+1',
                  '2+2',
                  '3+1',
                  '3.5+1',
                  '3+2',
                  '4+1',
                  '4.5+1',
                  '4+2',
                  '5+1',
                  '5+2',
                  '6+1',
                  '6+2',
                  '7+',
                  'Açık Plan',
                ].map((oda) => (
                  <option key={oda} value={oda}>
                    {oda}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Banyo Sayısı
              </label>
              <input
                type="number"
                name="banyoSayisi"
                value={formData.banyoSayisi ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Tuvalet Sayısı
              </label>
              <input
                type="number"
                name="tuvaletSayisi"
                value={formData.tuvaletSayisi ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Balkon Sayısı
              </label>
              <input
                type="number"
                name="balkonSayisi"
                value={formData.balkonSayisi ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Bulunduğu Kat
              </label>
              <input
                type="number"
                name="kat"
                value={formData.kat ?? ''}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Bina Kat Sayısı
              </label>
              <input
                type="number"
                name="toplamKat"
                value={formData.toplamKat ?? ''}
                onChange={handleChange}
                className="input"
                min={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Bina Yaşı
              </label>
              <input
                type="number"
                name="binaYasi"
                value={formData.binaYasi ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Bina Tipi
              </label>
              <select
                name="binaTipi"
                value={formData.binaTipi}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {[
                  'Apartman',
                  'Rezidans',
                  'Villa',
                  'Müstakil Ev',
                  'Kooperatif',
                  'Konut Sitesi',
                  'Bahçeli Ev',
                  'Köy Evi',
                  'Çiftlik Evi',
                  'Tarihi Konut',
                  'Yalı',
                ].map((tip) => (
                  <option key={tip} value={tip}>
                    {tip}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Kullanım Durumu
              </label>
              <select
                name="kullanimDurumu"
                value={formData.kullanimDurumu}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {[
                  'Boş',
                  'Kiracılı',
                  'Mal Sahibi Oturuyor',
                  'Proje Aşamasında',
                  'İnşaat Halinde',
                ].map((durum) => (
                  <option key={durum} value={durum}>
                    {durum}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Isıtma
              </label>
              <select
                name="isitma"
                value={formData.isitma}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {[
                  'Doğalgaz (Kombi)',
                  'Doğalgaz (Merkezi)',
                  'Merkezi Sistem',
                  'Merkezi Sistem (Pay Ölçer)',
                  'Soba',
                  'Yerden Isıtma',
                  'Klima',
                  'Somine',
                  'Fuel-Oil',
                  'Kömür',
                  'Elektrikli Radyatör',
                  'Güneş Enerjisi',
                  'Jeotermal',
                  'Isı Pompası',
                  'Yok',
                ].map((tip) => (
                  <option key={tip} value={tip}>
                    {tip}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Boolean Ozellikler */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: 'esyali', label: 'Eşyalı' },
              { name: 'balkon', label: 'Balkon' },
              { name: 'asansor', label: 'Asansör' },
              { name: 'otopark', label: 'Otopark' },
              { name: 'guvenlik', label: 'Güvenlik' },
              { name: 'havuz', label: 'Havuz' },
              { name: 'bahce', label: 'Bahçe' },
              { name: 'krediyeUygun', label: 'Krediye Uygun' },
              { name: 'takasaUygun', label: 'Takasa Uygun' },
            ].map((item) => (
              <label
                key={item.name}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  name={item.name}
                  checked={formData[item.name as keyof IlanFormData] as boolean}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border text-primary"
                />
                <span className="text-sm text-text">{item.label}</span>
              </label>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Arsa Ozellikleri */}
      {isArsa && (
        <CollapsibleSection title="Arsa / Arazi Özellikleri">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Metrekare (m²) *
              </label>
              <input
                type="number"
                name="metrekare"
                value={formData.metrekare ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                İmar Durumu
              </label>
              <select
                name="imarDurumu"
                value={formData.imarDurumu}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {[
                  'Konut İmarlı',
                  'Ticari İmarlı',
                  'Ticari + Konut İmarlı',
                  'Tarla (İmarsız)',
                  'Bağ-Bahçe',
                  'Zeytinlik',
                  'Mera',
                  'Orman',
                  'Sanayi İmarlı',
                  'Turizm İmarlı',
                  'Sit Alanı',
                  'Özel Koruma',
                  'Serbest',
                ].map((durum) => (
                  <option key={durum} value={durum}>
                    {durum}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Emsal (KAKS)
              </label>
              <select
                name="emsal"
                value={formData.emsal}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {[
                  '0.10',
                  '0.15',
                  '0.20',
                  '0.25',
                  '0.30',
                  '0.40',
                  '0.50',
                  '0.60',
                  '0.80',
                  '1.00',
                  '1.50',
                  '2.00',
                  '2.50',
                  '3.00',
                  'Serbest',
                ].map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Gabari
              </label>
              <select
                name="gabari"
                value={formData.gabari}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {[
                  '1 Kat',
                  '2 Kat',
                  '3 Kat',
                  '4 Kat',
                  '5 Kat',
                  '6-10 Kat',
                  '10+ Kat',
                  'Serbest',
                ].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Yol Cephesi (m)
              </label>
              <input
                type="number"
                name="yolCephesi"
                value={formData.yolCephesi ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Derinlik (m)
              </label>
              <input
                type="number"
                name="derinlik"
                value={formData.derinlik ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Ada No
              </label>
              <input
                type="text"
                name="adaNo"
                value={formData.adaNo}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Parsel No
              </label>
              <input
                type="text"
                name="parselNo"
                value={formData.parselNo}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Arsa Tipi
              </label>
              <select
                name="arsaTipi"
                value={formData.arsaTipi}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {['Köşe Parsel', 'Ara Parsel', 'Çift Cephe', 'Ada', 'Sınır Parseli'].map(
                  (t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Eğim
              </label>
              <select
                name="egim"
                value={formData.egim}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {['Düz', 'Hafif Eğimli', 'Eğimli', 'Çok Eğimli', 'Dik', 'Yamaç'].map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Zemin
              </label>
              <select
                name="zemin"
                value={formData.zemin}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {['Kaya', 'Kum', 'Toprak', 'Taşlı', 'Verimli Toprak', 'Kayalık'].map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Tapu Durumu
              </label>
              <select
                name="tapuDurumu"
                value={formData.tapuDurumu}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {['Müstakil Tapu', 'Hisseli Tapu', 'Kadastro Parseli', 'Zilyetlik'].map(
                  (t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Altyapi */}
          <div className="mt-6">
            <MultiSelect
              label="Altyapı"
              options={[
                'Elektrik',
                'Su',
                'Doğalgaz',
                'Kanalizasyon',
                'Yol',
                'Asfalt Yol',
                'Telefon/Internet',
                'DSI Suyu',
                'Derin Kuyu',
                'Artezyen',
              ]}
              selected={formData.altyapiDetay}
              onChange={(val) => handleArrayChange('altyapiDetay', val)}
            />
          </div>

          {/* Tarim Ozellikleri */}
          <div className="mt-4">
            <MultiSelect
              label="Tarım Özellikleri"
              options={[
                'Sulama İmkanı',
                'Sera Yapılabilir',
                'Zeytin Ağacı Var',
                'Meyve Ağacı Var',
                'Narenciye Bahçesi',
                'Bağ',
                'Tarla Ürünü Yetiştirilebilir',
                'Hayvancılığa Uygun',
                'Organik Tarıma Uygun',
                'Traktör Girişi Var',
              ]}
              selected={formData.tarimOzellikleri}
              onChange={(val) => handleArrayChange('tarimOzellikleri', val)}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'krediyeUygun', label: 'Krediye Uygun' },
              { name: 'takasaUygun', label: 'Takasa Uygun' },
            ].map((item) => (
              <label
                key={item.name}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  name={item.name}
                  checked={formData[item.name as keyof IlanFormData] as boolean}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border text-primary"
                />
                <span className="text-sm text-text">{item.label}</span>
              </label>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Ticari Ozellikler */}
      {isTicari && (
        <CollapsibleSection title="Ticari Özellikler">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Brut m²
              </label>
              <input
                type="number"
                name="brutMetrekare"
                value={formData.brutMetrekare ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Net m²
              </label>
              <input
                type="number"
                name="netMetrekare"
                value={formData.netMetrekare ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Cephe Genişliği (m)
              </label>
              <input
                type="number"
                name="cepheGenisligi"
                value={formData.cepheGenisligi ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Tavan Yüksekliği (m)
              </label>
              <input
                type="number"
                name="tavanYuksekligi"
                value={formData.tavanYuksekligi ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
                step={0.1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Bulunduğu Kat
              </label>
              <input
                type="number"
                name="kat"
                value={formData.kat ?? ''}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Bina Kat Sayısı
              </label>
              <input
                type="number"
                name="toplamKat"
                value={formData.toplamKat ?? ''}
                onChange={handleChange}
                className="input"
                min={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Bina Yaşı
              </label>
              <input
                type="number"
                name="binaYasi"
                value={formData.binaYasi ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Personel Kapasitesi
              </label>
              <input
                type="number"
                name="personelKapasitesi"
                value={formData.personelKapasitesi ?? ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Kullanım Durumu
              </label>
              <select
                name="kullanimDurumu"
                value={formData.kullanimDurumu}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {['Boş', 'Kiracılı', 'Faal Çalışıyor', 'Tadilat Gerekli'].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Tapu Durumu
              </label>
              <select
                name="tapuDurumu"
                value={formData.tapuDurumu}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seçin</option>
                {['Kat Mülkiyetli', 'Kat İrtifaklı', 'Hisseli Tapu', 'İşyeri Ruhsatlı'].map(
                  (t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Depo/Fabrika Ozellikleri */}
          <div className="mt-6">
            <MultiSelect
              label="Depo/Fabrika Özellikleri"
              options={[
                'Yükleme Rampası',
                'TIR Girişi',
                'Forklift Kapasiteli',
                'Soğuk Oda',
                'Yüksek Tavan',
                'Vinç',
                'Trifaze Elektrik',
                'Doğalgaz Hattı',
                'Sanayi Elektriği',
                'Yangın Sistemi',
                'Paletli Stok Alanı',
                'İstifleme Alanı',
              ]}
              selected={formData.depoOzellikleri}
              onChange={(val) => handleArrayChange('depoOzellikleri', val)}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'asansor', label: 'Asansör' },
              { name: 'otopark', label: 'Otopark' },
              { name: 'guvenlik', label: 'Güvenlik' },
              { name: 'isyeriRuhsati', label: 'İşyeri Ruhsatı Var' },
              { name: 'krediyeUygun', label: 'Krediye Uygun' },
              { name: 'takasaUygun', label: 'Takasa Uygun' },
            ].map((item) => (
              <label
                key={item.name}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  name={item.name}
                  checked={formData[item.name as keyof IlanFormData] as boolean}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border text-primary"
                />
                <span className="text-sm text-text">{item.label}</span>
              </label>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Detayli Ozellikler - Sadece Konut icin */}
      {isKonut && (
        <CollapsibleSection title="Detaylı Özellikler" defaultOpen={false}>
          <div className="space-y-6">
            <MultiSelect
              label="İç Özellikler"
              options={[
                'ADSL/Fiber Internet',
                'Akıllı Ev Sistemi',
                'Alarm Sistemi',
                'Amerikan Kapı',
                'Amerikan Mutfak',
                'Ankastre Mutfak',
                'Banyo Jakuzili',
                'Barbeku',
                'Bulaşık Makinesi',
                'Çamaşır Makinesi',
                'Çamaşır Odası',
                'Çelik Kapı',
                'Duşakabin',
                'Ebeveyn Banyosu',
                'Fırın',
                'Giyinme Odası',
                'Gömme Dolap',
                'Hilton Banyo',
                'İşyerine Uygun',
                'Jakuzi',
                'Kartonpiyer',
                'Kiler',
                'Klima',
                'Kuvet',
                'Laminat Zemin',
                'Mobilyalı',
                'Panel Radyatör',
                'Parke Zemin',
                'PVC Doğrama',
                'Sauna',
                'Seramik Zemin',
                'Set Üstü Ocak',
                'Spot Aydınlatma',
                'Somine',
                'Teras',
                'Vestiyer',
              ]}
              selected={formData.icOzellikler}
              onChange={(val) => handleArrayChange('icOzellikler', val)}
            />

            <MultiSelect
              label="Dış Özellikler"
              options={[
                'Araç Park Yeri',
                'Asansör',
                'Bahçe',
                'Balkon',
                'Bahçe Katı',
                'Çatı Katı',
                'Deniz Görünümü',
                'Denize Sıfır',
                'Garaj',
                'Güneş Paneli',
                'Havuz',
                'Isıcamlı Pencere',
                'Jeneratör',
                'Kablo TV',
                'Kapıcı',
                'Kapalı Garaj',
                'Kapalı Otopark',
                'Kış Bahçesi',
                'Mantolama',
                'Müstakil Girişli',
                'Otopark',
                'Panjur/Kepenk',
                'Spor Alanı',
                'Şehir Görünümü',
                'Tenis Kortu',
                'Yangın Merdiveni',
              ]}
              selected={formData.disOzellikler}
              onChange={(val) => handleArrayChange('disOzellikler', val)}
            />

            <MultiSelect
              label="Muhit Özellikleri"
              options={[
                'AVM',
                'Belediye',
                'Cami',
                'Deniz',
                'Göl',
                'Hastane',
                'Havalimanı',
                'Market',
                'Metro',
                'Minibüs',
                'Eczane',
                'Okul',
                'Orman',
                'Otoban',
                'Otobüs Durağı',
                'Park',
                'Plaj',
                'Polis',
                'Sağlık Ocağı',
                'Sahil',
                'Spor Salonu',
                'Üniversite',
              ]}
              selected={formData.muhitOzellikleri}
              onChange={(val) => handleArrayChange('muhitOzellikleri', val)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MultiSelect
                label="Cephe"
                options={[
                  'Kuzey',
                  'Güney',
                  'Doğu',
                  'Batı',
                  'Kuzey-Doğu',
                  'Kuzey-Batı',
                  'Güney-Doğu',
                  'Güney-Batı',
                ]}
                selected={formData.cephe}
                onChange={(val) => handleArrayChange('cephe', val)}
              />

              <MultiSelect
                label="Manzara"
                options={[
                  'Deniz Manzarası',
                  'Göl Manzarası',
                  'Dağ Manzarası',
                  'Orman Manzarası',
                  'Şehir Manzarası',
                  'Doğa Manzarası',
                  'Havuz Manzarası',
                  'Bahçe Manzarası',
                ]}
                selected={formData.manzara}
                onChange={(val) => handleArrayChange('manzara', val)}
              />
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* Aciklama */}
      <CollapsibleSection title="Açıklama">
        <textarea
          name="aciklama"
          value={formData.aciklama}
          onChange={handleChange}
          className="input min-h-[200px]"
          required
          placeholder="İlan açıklamasını detaylı bir şekilde yazın..."
        />
      </CollapsibleSection>

      {/* Fotograflar ve Videolar */}
      <CollapsibleSection title="Medya (Fotoğraf ve Video)">
        <div className="space-y-6">
          {/* Upload Area */}
          <div
            onDrop={handleFileDrop}
            onDragOver={handleDragOverFile}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              uploadingFiles ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'
            }`}
            onClick={() => !uploadingFiles && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium text-text mb-1">
              Fotoğraf ve videoları buraya sürükleyin
            </p>
            <p className="text-sm text-gray-500 mb-4">
              veya dosya seçmek için tıklayın
            </p>
            <p className="text-xs text-gray-400">
              Fotoğraf: JPEG, PNG, WebP, GIF (maks. 10MB) | Video: MP4, WebM, MOV (maks. 100MB)
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Maksimum 50 medya dosyası
            </p>
          </div>

          {/* Upload Progress */}
          {uploadProgress.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-text">Yükleniyor...</p>
              {uploadProgress.map((file, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text truncate max-w-[200px]">{file.name}</span>
                    <span className={`text-xs ${
                      file.status === 'done' ? 'text-green-600' :
                      file.status === 'error' ? 'text-red-600' : 'text-primary'
                    }`}>
                      {file.status === 'done' ? 'Tamamlandı' :
                       file.status === 'error' ? 'Hata!' : `%${file.progress}`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        file.status === 'done' ? 'bg-green-500' :
                        file.status === 'error' ? 'bg-red-500' : 'bg-primary'
                      }`}
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Media Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-text">
                Medya Dosyaları ({formData.fotograflar.length}/50)
              </label>
              <span className="text-xs text-gray-500">
                Sıralamayı değiştirmek için sürükleyin
              </span>
            </div>

            {formData.fotograflar.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {formData.fotograflar.map((url, index) => {
                  const isVideo = url.includes('/videos/') || /\.(mp4|webm|mov|avi)$/i.test(url)
                  return (
                    <div
                      key={index}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`relative group aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-move ${
                        draggedIndex === index ? 'opacity-50' : ''
                      }`}
                    >
                      {isVideo ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <video
                            src={url}
                            className="w-full h-full object-cover"
                            muted
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                              <Play className="w-6 h-6 text-primary ml-1" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={url}
                          alt={`Medya ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="w-5 h-5 text-white drop-shadow" />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-primary text-white text-xs rounded">
                          Kapak
                        </span>
                      )}
                      {isVideo && (
                        <span className="absolute top-1 left-8 px-2 py-0.5 bg-blue-500 text-white text-xs rounded">
                          Video
                        </span>
                      )}
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/50 text-white text-xs rounded">
                        {index + 1}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Henüz medya eklenmemiş</p>
              </div>
            )}
          </div>
        </div>
      </CollapsibleSection>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3 bg-white p-4 rounded-xl border border-border sticky bottom-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-outline"
        >
          <X className="w-5 h-5" />
          İptal
        </button>
        <button
          type="submit"
          disabled={isSubmitting || uploadingFiles}
          className="btn btn-primary"
        >
          {uploadingFiles ? (
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
              Dosyalar Yükleniyor...
            </>
          ) : isSubmitting ? (
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
              {ilanId ? 'Güncelle' : 'Kaydet'}
            </>
          )}
        </button>
      </div>
    </form>
  )
}
