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
  il: 'Mugla',
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
          reject(new Error('Yukleme basarisiz'))
        }
      })

      xhr.addEventListener('error', () => {
        setUploadProgress((prev) =>
          prev.map((p) => (p.name === file.name ? { ...p, status: 'error' } : p))
        )
        reject(new Error('Yukleme hatasi'))
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
        setError('Dosya yuklenirken hata olustu. Lutfen tekrar deneyin.')
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
        videoUrl: emptyToNull(formData.videoUrl),
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

      setSuccess('Ilan basariyla kaydedildi!')
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
              Slug <span className="text-xs text-gray-400">(otomatik)</span>
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              readOnly
              className="input bg-gray-50 text-gray-600 cursor-not-allowed"
              placeholder="Baslik girildikce olusturulur"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Ilan No <span className="text-xs text-gray-400">(otomatik)</span>
            </label>
            <input
              type="text"
              name="ilanNo"
              value={formData.ilanNo}
              readOnly
              className="input bg-gray-50 text-gray-600 cursor-not-allowed"
              placeholder="Yukleniyor..."
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
              <option value="satildi">Satildi</option>
              <option value="kiralandi">Kiralandi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Sorumlu Danisman *
            </label>
            <select
              name="danismanId"
              value={formData.danismanId || ''}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Danisman Secin</option>
              {ortaklar.map((ortak) => (
                <option key={ortak.id} value={ortak.id}>
                  {ortak.ad} - {ortak.unvan}
                </option>
              ))}
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
              <span className="text-sm font-medium text-text">One Cikan Ilan</span>
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
              Il *
            </label>
            <select
              name="il"
              value={formData.il}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="Mugla">Mugla</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Ilce *
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
              <option value="">Ilce Secin</option>
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
              <option value="">Mahalle Secin</option>
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
        <CollapsibleSection title="Konut Ozellikleri">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Brut m²
              </label>
              <input
                type="number"
                name="brutMetrekare"
                value={formData.brutMetrekare || ''}
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
                value={formData.netMetrekare || ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Oda Sayisi
              </label>
              <select
                name="odaSayisi"
                value={formData.odaSayisi}
                onChange={handleChange}
                className="input"
              >
                <option value="">Secin</option>
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
                  'Acik Plan',
                ].map((oda) => (
                  <option key={oda} value={oda}>
                    {oda}
                  </option>
                ))}
              </select>
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
                Tuvalet Sayisi
              </label>
              <input
                type="number"
                name="tuvaletSayisi"
                value={formData.tuvaletSayisi || ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Balkon Sayisi
              </label>
              <input
                type="number"
                name="balkonSayisi"
                value={formData.balkonSayisi || ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Bulundugu Kat
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
                Bina Kat Sayisi
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
                <option value="">Secin</option>
                {[
                  'Apartman',
                  'Rezidans',
                  'Villa',
                  'Mustakil Ev',
                  'Kooperatif',
                  'Konut Sitesi',
                  'Bahceli Ev',
                  'Koy Evi',
                  'Ciftlik Evi',
                  'Tarihi Konut',
                  'Yali',
                ].map((tip) => (
                  <option key={tip} value={tip}>
                    {tip}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Kullanim Durumu
              </label>
              <select
                name="kullanimDurumu"
                value={formData.kullanimDurumu}
                onChange={handleChange}
                className="input"
              >
                <option value="">Secin</option>
                {[
                  'Bos',
                  'Kiracili',
                  'Mal Sahibi Oturuyor',
                  'Proje Asamasinda',
                  'Insaat Halinde',
                ].map((durum) => (
                  <option key={durum} value={durum}>
                    {durum}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Isitma
              </label>
              <select
                name="isitma"
                value={formData.isitma}
                onChange={handleChange}
                className="input"
              >
                <option value="">Secin</option>
                {[
                  'Dogalgaz (Kombi)',
                  'Dogalgaz (Merkezi)',
                  'Merkezi Sistem',
                  'Merkezi Sistem (Pay Olcer)',
                  'Soba',
                  'Yerden Isitma',
                  'Klima',
                  'Somine',
                  'Fuel-Oil',
                  'Komur',
                  'Elektrikli Radyator',
                  'Gunes Enerjisi',
                  'Jeotermal',
                  'Isi Pompasi',
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
              { name: 'esyali', label: 'Esyali' },
              { name: 'balkon', label: 'Balkon' },
              { name: 'asansor', label: 'Asansor' },
              { name: 'otopark', label: 'Otopark' },
              { name: 'guvenlik', label: 'Guvenlik' },
              { name: 'havuz', label: 'Havuz' },
              { name: 'bahce', label: 'Bahce' },
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
        <CollapsibleSection title="Arsa / Arazi Ozellikleri">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Metrekare (m²) *
              </label>
              <input
                type="number"
                name="metrekare"
                value={formData.metrekare || ''}
                onChange={handleChange}
                className="input"
                min={0}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Imar Durumu
              </label>
              <select
                name="imarDurumu"
                value={formData.imarDurumu}
                onChange={handleChange}
                className="input"
              >
                <option value="">Secin</option>
                {[
                  'Konut Imarli',
                  'Ticari Imarli',
                  'Ticari + Konut Imarli',
                  'Tarla (Imarsiz)',
                  'Bag-Bahce',
                  'Zeytinlik',
                  'Mera',
                  'Orman',
                  'Sanayi Imarli',
                  'Turizm Imarli',
                  'Sit Alani',
                  'Ozel Koruma',
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
                <option value="">Secin</option>
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
                <option value="">Secin</option>
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
                value={formData.yolCephesi || ''}
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
                value={formData.derinlik || ''}
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
                <option value="">Secin</option>
                {['Kose Parsel', 'Ara Parsel', 'Cift Cephe', 'Ada', 'Sinir Parseli'].map(
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
                Egim
              </label>
              <select
                name="egim"
                value={formData.egim}
                onChange={handleChange}
                className="input"
              >
                <option value="">Secin</option>
                {['Duz', 'Hafif Egimli', 'Egimli', 'Cok Egimli', 'Dik', 'Yamac'].map((e) => (
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
                <option value="">Secin</option>
                {['Kaya', 'Kum', 'Toprak', 'Tasli', 'Verimli Toprak', 'Kayalik'].map((z) => (
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
                <option value="">Secin</option>
                {['Mustakil Tapu', 'Hisseli Tapu', 'Kadastro Parseli', 'Zilyetlik'].map(
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
              label="Altyapi"
              options={[
                'Elektrik',
                'Su',
                'Dogalgaz',
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
              label="Tarim Ozellikleri"
              options={[
                'Sulama Imkani',
                'Sera Yapilabilir',
                'Zeytin Agaci Var',
                'Meyve Agaci Var',
                'Narenciye Bahcesi',
                'Bag',
                'Tarla Urunu Yetistirilebilir',
                'Hayvanciliga Uygun',
                'Organik Tarima Uygun',
                'Traktor Girisi Var',
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
        <CollapsibleSection title="Ticari Ozellikler">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Brut m²
              </label>
              <input
                type="number"
                name="brutMetrekare"
                value={formData.brutMetrekare || ''}
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
                value={formData.netMetrekare || ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Cephe Genisligi (m)
              </label>
              <input
                type="number"
                name="cepheGenisligi"
                value={formData.cepheGenisligi || ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Tavan Yuksekligi (m)
              </label>
              <input
                type="number"
                name="tavanYuksekligi"
                value={formData.tavanYuksekligi || ''}
                onChange={handleChange}
                className="input"
                min={0}
                step={0.1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Bulundugu Kat
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
                Bina Kat Sayisi
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

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Personel Kapasitesi
              </label>
              <input
                type="number"
                name="personelKapasitesi"
                value={formData.personelKapasitesi || ''}
                onChange={handleChange}
                className="input"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Kullanim Durumu
              </label>
              <select
                name="kullanimDurumu"
                value={formData.kullanimDurumu}
                onChange={handleChange}
                className="input"
              >
                <option value="">Secin</option>
                {['Bos', 'Kiracili', 'Faal Calisiyor', 'Tadilat Gerekli'].map((d) => (
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
                <option value="">Secin</option>
                {['Kat Mulkiyetli', 'Kat Irtifakli', 'Hisseli Tapu', 'Isyeri Ruhsatli'].map(
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
              label="Depo/Fabrika Ozellikleri"
              options={[
                'Yukleme Rampasi',
                'TIR Girisi',
                'Forklift Kapasiteli',
                'Soguk Oda',
                'Yuksek Tavan',
                'Vinc',
                'Trifaze Elektrik',
                'Dogalgaz Hatti',
                'Sanayi Elektrigi',
                'Yangin Sistemi',
                'Paletli Stok Alani',
                'Istifleme Alani',
              ]}
              selected={formData.depoOzellikleri}
              onChange={(val) => handleArrayChange('depoOzellikleri', val)}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'asansor', label: 'Asansor' },
              { name: 'otopark', label: 'Otopark' },
              { name: 'guvenlik', label: 'Guvenlik' },
              { name: 'isyeriRuhsati', label: 'Isyeri Ruhsati Var' },
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
        <CollapsibleSection title="Detayli Ozellikler" defaultOpen={false}>
          <div className="space-y-6">
            <MultiSelect
              label="Ic Ozellikler"
              options={[
                'ADSL/Fiber Internet',
                'Akilli Ev Sistemi',
                'Alarm Sistemi',
                'Amerikan Kapi',
                'Amerikan Mutfak',
                'Ankastre Mutfak',
                'Banyo Jakuzili',
                'Barbeku',
                'Bulasik Makinesi',
                'Camasir Makinesi',
                'Camasir Odasi',
                'Celik Kapi',
                'Dusakabin',
                'Ebeveyn Banyosu',
                'Firin',
                'Giyinme Odasi',
                'Gomme Dolap',
                'Hilton Banyo',
                'Isyerine Uygun',
                'Jakuzi',
                'Kartonpiyer',
                'Kiler',
                'Klima',
                'Kuvet',
                'Laminat Zemin',
                'Mobilyali',
                'Panel Radyator',
                'Parke Zemin',
                'PVC Dograma',
                'Sauna',
                'Seramik Zemin',
                'Set Ustu Ocak',
                'Spot Aydinlatma',
                'Somine',
                'Teras',
                'Vestiyer',
              ]}
              selected={formData.icOzellikler}
              onChange={(val) => handleArrayChange('icOzellikler', val)}
            />

            <MultiSelect
              label="Dis Ozellikler"
              options={[
                'Arac Park Yeri',
                'Asansor',
                'Bahce',
                'Balkon',
                'Bahce Kati',
                'Cati Kati',
                'Deniz Gorunumu',
                'Denize Sifir',
                'Garaj',
                'Gunes Paneli',
                'Havuz',
                'Isicamli Pencere',
                'Jenerator',
                'Kablo TV',
                'Kapici',
                'Kapali Garaj',
                'Kapali Otopark',
                'Kis Bahcesi',
                'Mantolama',
                'Mustakil Girisli',
                'Otopark',
                'Panjur/Kepenk',
                'Spor Alani',
                'Sehir Gorunumu',
                'Tenis Kortu',
                'Yangin Merdiveni',
              ]}
              selected={formData.disOzellikler}
              onChange={(val) => handleArrayChange('disOzellikler', val)}
            />

            <MultiSelect
              label="Muhit Ozellikleri"
              options={[
                'AVM',
                'Belediye',
                'Cami',
                'Deniz',
                'Gol',
                'Hastane',
                'Havalimani',
                'Market',
                'Metro',
                'Minibu',
                'Eczane',
                'Okul',
                'Orman',
                'Otoban',
                'Otobus Duragi',
                'Park',
                'Plaj',
                'Polis',
                'Saglik Ocagi',
                'Sahil',
                'Spor Salonu',
                'Universite',
              ]}
              selected={formData.muhitOzellikleri}
              onChange={(val) => handleArrayChange('muhitOzellikleri', val)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MultiSelect
                label="Cephe"
                options={[
                  'Kuzey',
                  'Guney',
                  'Dogu',
                  'Bati',
                  'Kuzey-Dogu',
                  'Kuzey-Bati',
                  'Guney-Dogu',
                  'Guney-Bati',
                ]}
                selected={formData.cephe}
                onChange={(val) => handleArrayChange('cephe', val)}
              />

              <MultiSelect
                label="Manzara"
                options={[
                  'Deniz Manzarasi',
                  'Gol Manzarasi',
                  'Dag Manzarasi',
                  'Orman Manzarasi',
                  'Sehir Manzarasi',
                  'Doga Manzarasi',
                  'Havuz Manzarasi',
                  'Bahce Manzarasi',
                ]}
                selected={formData.manzara}
                onChange={(val) => handleArrayChange('manzara', val)}
              />
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* Aciklama */}
      <CollapsibleSection title="Aciklama">
        <textarea
          name="aciklama"
          value={formData.aciklama}
          onChange={handleChange}
          className="input min-h-[200px]"
          required
          placeholder="Ilan aciklamasini detayli bir sekilde yazin..."
        />
      </CollapsibleSection>

      {/* Fotograflar ve Videolar */}
      <CollapsibleSection title="Medya (Fotograf ve Video)">
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
              Fotograf ve videolari buraya surukleyin
            </p>
            <p className="text-sm text-gray-500 mb-4">
              veya dosya secmek icin tiklayin
            </p>
            <p className="text-xs text-gray-400">
              Fotograf: JPEG, PNG, WebP, GIF (maks. 10MB) | Video: MP4, WebM, MOV (maks. 100MB)
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Maksimum 50 medya dosyasi
            </p>
          </div>

          {/* Upload Progress */}
          {uploadProgress.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-text">Yukleniyor...</p>
              {uploadProgress.map((file, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text truncate max-w-[200px]">{file.name}</span>
                    <span className={`text-xs ${
                      file.status === 'done' ? 'text-green-600' :
                      file.status === 'error' ? 'text-red-600' : 'text-primary'
                    }`}>
                      {file.status === 'done' ? 'Tamamlandi' :
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
                Medya Dosyalari ({formData.fotograflar.length}/50)
              </label>
              <span className="text-xs text-gray-500">
                Siralamayi degistirmek icin surukleyin
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
                <p>Henuz medya eklenmemis</p>
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
              {ilanId ? 'Guncelle' : 'Kaydet'}
            </>
          )}
        </button>
      </div>
    </form>
  )
}
