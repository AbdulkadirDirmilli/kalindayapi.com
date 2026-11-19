'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Phone, Mail, Users, MapPin } from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import ConfirmDialog from '@/components/admin/ui/ConfirmDialog'
import ImageUploader from '@/components/admin/ui/ImageUploader'
import { DanismanAvatar, type Cinsiyet } from '@/components/ui'

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
  cinsiyet: string | null
  deneyimYili: number | null
  /** JSON dizi string */
  bolgeler: string | null
  /** JSON dizi string */
  uzmanlikAlanlari: string
  sira: number
  aktif: boolean
}

type FormState = {
  ad: string
  slug: string
  unvan: string
  telefon: string
  whatsapp: string
  email: string
  biyografi: string
  foto: string | null
  cinsiyet: '' | 'erkek' | 'kadin'
  deneyimYili: string
  /** Virgulle ayrilmis; kaydederken JSON diziye cevrilir */
  bolgeler: string
  uzmanlikAlanlari: string
  sira: string
  aktif: boolean
}

const BOS_FORM: FormState = {
  ad: '', slug: '', unvan: '', telefon: '', whatsapp: '', email: '',
  biyografi: '', foto: null, cinsiyet: '', deneyimYili: '',
  bolgeler: '', uzmanlikAlanlari: '', sira: '', aktif: true,
}

/** '["a","b"]' -> 'a, b' */
function diziToMetin(json: string | null | undefined): string {
  if (!json) return ''
  try {
    const p = JSON.parse(json)
    return Array.isArray(p) ? p.join(', ') : ''
  } catch {
    return ''
  }
}

/** 'a, b' -> '["a","b"]' */
function metinToDizi(metin: string): string {
  return JSON.stringify(metin.split(',').map((s) => s.trim()).filter(Boolean))
}

function slugUret(ad: string): string {
  const harita: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u',
  }
  return ad
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, (c) => harita[c] ?? c)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function DanismanlarAdminPage() {
  const [ortaklar, setOrtaklar] = useState<Ortak[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formAcik, setFormAcik] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [kaydediliyor, setKaydediliyor] = useState(false)
  const [hata, setHata] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(BOS_FORM)

  const alan = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((p) => ({ ...p, [k]: v }))

  const fetchOrtaklar = async () => {
    setIsLoading(true)
    try {
      const r = await fetch('/api/admin/ortaklar')
      if (r.ok) setOrtaklar(await r.json())
    } catch (e) {
      console.error('Danismanlar yuklenemedi:', e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrtaklar()
  }, [])

  const formuAc = (o?: Ortak) => {
    setHata(null)
    if (o) {
      setEditingId(o.id)
      setForm({
        ad: o.ad,
        slug: o.slug,
        unvan: o.unvan,
        telefon: o.telefon,
        whatsapp: o.whatsapp ?? '',
        email: o.email ?? '',
        biyografi: o.biyografi ?? '',
        foto: o.foto,
        cinsiyet: (o.cinsiyet as FormState['cinsiyet']) || '',
        deneyimYili: o.deneyimYili?.toString() ?? '',
        bolgeler: diziToMetin(o.bolgeler),
        uzmanlikAlanlari: diziToMetin(o.uzmanlikAlanlari),
        sira: o.sira?.toString() ?? '',
        aktif: o.aktif,
      })
    } else {
      setEditingId(null)
      setForm(BOS_FORM)
    }
    setFormAcik(true)
  }

  const formuKapat = () => {
    setFormAcik(false)
    setEditingId(null)
    setForm(BOS_FORM)
    setHata(null)
  }

  const kaydet = async () => {
    if (!form.ad.trim() || !form.unvan.trim() || !form.telefon.trim()) {
      setHata('Ad, unvan ve telefon zorunludur.')
      return
    }
    setKaydediliyor(true)
    setHata(null)
    try {
      const govde = {
        ad: form.ad.trim(),
        slug: (form.slug || slugUret(form.ad)).trim(),
        unvan: form.unvan.trim(),
        telefon: form.telefon.trim(),
        whatsapp: form.whatsapp.trim() || null,
        email: form.email.trim() || null,
        biyografi: form.biyografi.trim() || null,
        foto: form.foto || null,
        cinsiyet: form.cinsiyet || null,
        deneyimYili: form.deneyimYili === '' ? null : Number(form.deneyimYili),
        bolgeler: metinToDizi(form.bolgeler),
        uzmanlikAlanlari: metinToDizi(form.uzmanlikAlanlari),
        sira: form.sira === '' ? undefined : Number(form.sira),
        aktif: form.aktif,
      }

      const yeni = !editingId
      const r = await fetch(
        yeni ? '/api/admin/ortaklar' : `/api/admin/ortaklar/${editingId}`,
        {
          method: yeni ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(govde),
        }
      )

      if (!r.ok) {
        const d = await r.json().catch(() => ({}))
        setHata(d.error || 'Kaydedilemedi.')
        return
      }
      await fetchOrtaklar()
      formuKapat()
    } catch (e) {
      console.error(e)
      setHata('Kaydedilemedi.')
    } finally {
      setKaydediliyor(false)
    }
  }

  const sil = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      const r = await fetch(`/api/admin/ortaklar/${deleteId}`, { method: 'DELETE' })
      if (r.ok) {
        setOrtaklar((p) => p.filter((o) => o.id !== deleteId))
      } else {
        const d = await r.json().catch(() => ({}))
        setHata(d.error || 'Silinemedi.')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="Danışmanlar" subtitle="Gayrimenkul danışmanlarını yönetin" />
        <div className="p-4 sm:p-6 text-text-light">Yükleniyor...</div>
      </div>
    )
  }

  const girdi =
    'w-full px-3 py-2 rounded-lg border border-border bg-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
  const etiket = 'block text-sm font-medium text-ink mb-1.5'

  return (
    <div>
      <AdminHeader title="Danışmanlar" subtitle="Gayrimenkul danışmanlarını yönetin" />

      <div className="p-4 sm:p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => formuAc()}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Yeni Danışman
          </button>
        </div>

        {formAcik && (
          <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-6">
            <h3 className="text-lg font-semibold text-ink mb-5">
              {editingId ? 'Danışmanı Düzenle' : 'Yeni Danışman Ekle'}
            </h3>

            <div className="mb-5">
              <ImageUploader
                value={form.foto}
                onChange={(url) => alan('foto', url)}
                folder="danismanlar"
                label="Profil Fotoğrafı"
                circle
              />
              <p className="text-xs text-text-muted mt-2">
                Fotoğraf yüklenmezse cinsiyete göre renkli bir kişi ikonu gösterilir.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={etiket}>Ad Soyad *</label>
                <input
                  className={girdi}
                  value={form.ad}
                  onChange={(e) => {
                    alan('ad', e.target.value)
                    alan('slug', slugUret(e.target.value))
                  }}
                  placeholder="Örn. Ayşe YILMAZ"
                />
              </div>
              <div>
                <label className={etiket}>Unvan *</label>
                <input
                  className={girdi}
                  value={form.unvan}
                  onChange={(e) => alan('unvan', e.target.value)}
                  placeholder="Gayrimenkul Danışmanı"
                />
              </div>
              <div>
                <label className={etiket}>Telefon *</label>
                <input
                  className={girdi}
                  value={form.telefon}
                  onChange={(e) => alan('telefon', e.target.value)}
                  placeholder="+90 5XX XXX XX XX"
                />
              </div>
              <div>
                <label className={etiket}>WhatsApp</label>
                <input
                  className={girdi}
                  value={form.whatsapp}
                  onChange={(e) => alan('whatsapp', e.target.value)}
                  placeholder="905XXXXXXXXX (sadece rakam)"
                />
              </div>
              <div>
                <label className={etiket}>E-posta</label>
                <input
                  type="email"
                  className={girdi}
                  value={form.email}
                  onChange={(e) => alan('email', e.target.value)}
                  placeholder="ad@kalindayapi.com"
                />
              </div>
              <div>
                <label className={etiket}>Cinsiyet</label>
                <select
                  className={girdi}
                  value={form.cinsiyet}
                  onChange={(e) => alan('cinsiyet', e.target.value as FormState['cinsiyet'])}
                >
                  <option value="">Belirtilmedi</option>
                  <option value="erkek">Erkek (mavi ikon)</option>
                  <option value="kadin">Kadın (pembe ikon)</option>
                </select>
              </div>
              <div>
                <label className={etiket}>Deneyim (yıl)</label>
                <input
                  type="number"
                  min={0}
                  className={girdi}
                  value={form.deneyimYili}
                  onChange={(e) => alan('deneyimYili', e.target.value)}
                  placeholder="5"
                />
              </div>
              <div>
                <label className={etiket}>Sıra</label>
                <input
                  type="number"
                  min={0}
                  className={girdi}
                  value={form.sira}
                  onChange={(e) => alan('sira', e.target.value)}
                  placeholder="0 = en üstte"
                />
              </div>
              <div className="md:col-span-2">
                <label className={etiket}>Uzmanlık Bölgeleri</label>
                <input
                  className={girdi}
                  value={form.bolgeler}
                  onChange={(e) => alan('bolgeler', e.target.value)}
                  placeholder="Ortaca, Dalyan, Köyceğiz"
                />
                <p className="text-xs text-text-muted mt-1">Virgülle ayırın.</p>
              </div>
              <div className="md:col-span-2">
                <label className={etiket}>Uzmanlık Alanları</label>
                <input
                  className={girdi}
                  value={form.uzmanlikAlanlari}
                  onChange={(e) => alan('uzmanlikAlanlari', e.target.value)}
                  placeholder="Konut Satış, Kiralama, Yatırım Danışmanlığı"
                />
                <p className="text-xs text-text-muted mt-1">Virgülle ayırın.</p>
              </div>
              <div className="md:col-span-2">
                <label className={etiket}>Biyografi</label>
                <textarea
                  className={girdi}
                  rows={3}
                  value={form.biyografi}
                  onChange={(e) => alan('biyografi', e.target.value)}
                  placeholder="Kısa tanıtım..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="inline-flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={form.aktif}
                    onChange={(e) => alan('aktif', e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  Sitede yayında
                </label>
              </div>
            </div>

            {hata && <p className="text-sm text-error mt-4">{hata}</p>}

            <div className="flex justify-end gap-2 mt-5">
              <button onClick={formuKapat} className="btn btn-outline" disabled={kaydediliyor}>
                İptal
              </button>
              <button onClick={kaydet} className="btn btn-primary" disabled={kaydediliyor}>
                {kaydediliyor ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        )}

        {ortaklar.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <Users className="w-12 h-12 mx-auto text-text-muted mb-4" />
            <p className="text-text-light">Henüz danışman eklenmemiş</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ortaklar.map((o) => (
              <div key={o.id} className="bg-white rounded-xl border border-border p-5">
                <div className="flex items-start gap-3">
                  <DanismanAvatar
                    foto={o.foto}
                    cinsiyet={o.cinsiyet as Cinsiyet}
                    ad={o.ad}
                    size={56}
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-ink truncate">{o.ad}</h3>
                    <p className="text-sm text-text-light truncate">{o.unvan}</p>
                    <span
                      className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                        o.aktif ? 'bg-success/10 text-success' : 'bg-surface text-text-muted'
                      }`}
                    >
                      {o.aktif ? 'Yayında' : 'Pasif'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 text-sm text-text-light">
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    {o.telefon}
                  </p>
                  {o.email && (
                    <p className="flex items-center gap-2 truncate">
                      <Mail className="w-4 h-4 text-primary" />
                      {o.email}
                    </p>
                  )}
                  {diziToMetin(o.bolgeler) && (
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{diziToMetin(o.bolgeler)}</span>
                    </p>
                  )}
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  <button
                    onClick={() => formuAc(o)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-border hover:bg-surface transition-colors"
                  >
                    <Edit className="w-4 h-4" /> Düzenle
                  </button>
                  <button
                    onClick={() => setDeleteId(o.id)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm rounded-lg text-error hover:bg-error/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Danışmanı sil"
        message="Bu danışman kalıcı olarak silinecek. Bağlı ilanlar silinmez, ilandaki danışman bilgisi boşaltılır."
        confirmText="Sil"
        cancelText="Vazgeç"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={sil}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
