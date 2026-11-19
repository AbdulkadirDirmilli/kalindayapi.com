'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2 } from 'lucide-react'

const IZINLI = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAKS_BOYUT = 10 * 1024 * 1024 // 10MB — /api/upload ile ayni limit

interface ImageUploaderProps {
  /** Mevcut gorselin URL'i (varsa onizleme gosterilir). */
  value?: string | null
  onChange: (url: string | null) => void
  /** Yuklemenin gidecegi alt klasor; /api/upload beyaz listesinde olmali. */
  folder?: 'ilanlar' | 'danismanlar'
  label?: string
  /** Onizleme dairesi mi olsun (profil fotografi icin). */
  circle?: boolean
}

/**
 * Tek gorsel yukleme alani. Sunucu tarafinda /api/upload gorseli WebP'e
 * cevirip yeniden boyutlandiriyor; burada yalnizca secim, onizleme ve
 * ilerleme gosterimi var.
 */
export default function ImageUploader({
  value,
  onChange,
  folder = 'ilanlar',
  label = 'Fotoğraf',
  circle = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [yukleniyor, setYukleniyor] = useState(false)
  const [ilerleme, setIlerleme] = useState(0)
  const [hata, setHata] = useState<string | null>(null)

  const yukle = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', folder)

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) setIlerleme(Math.round((e.loaded / e.total) * 100))
      })
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText).url)
          } catch {
            reject(new Error('Sunucu yanıtı okunamadı'))
          }
        } else {
          reject(new Error('Yükleme başarısız'))
        }
      })
      xhr.addEventListener('error', () => reject(new Error('Yükleme hatası')))
      xhr.open('POST', '/api/upload')
      xhr.send(fd)
    })

  const sec = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = '' // ayni dosya tekrar secilebilsin
    if (!file) return

    setHata(null)
    if (!IZINLI.includes(file.type)) {
      setHata('Sadece JPEG, PNG, WebP veya GIF yükleyebilirsiniz.')
      return
    }
    if (file.size > MAKS_BOYUT) {
      setHata('Dosya boyutu en fazla 10 MB olabilir.')
      return
    }

    setYukleniyor(true)
    setIlerleme(0)
    try {
      onChange(await yukle(file))
    } catch (err) {
      setHata(err instanceof Error ? err.message : 'Yükleme başarısız')
    } finally {
      setYukleniyor(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1.5">{label}</label>

      <div className="flex items-center gap-4">
        {value ? (
          <div className={`relative w-20 h-20 overflow-hidden border border-border ${circle ? 'rounded-full' : 'rounded-lg'}`}>
            <Image src={value} alt="" fill sizes="80px" className="object-cover" />
          </div>
        ) : (
          <div className={`w-20 h-20 grid place-items-center bg-surface border border-dashed border-border text-text-muted ${circle ? 'rounded-full' : 'rounded-lg'}`}>
            <Upload className="w-5 h-5" />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={yukleniyor}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-border hover:bg-surface disabled:opacity-50 transition-colors"
            >
              {yukleniyor ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {yukleniyor ? `Yükleniyor %${ilerleme}` : value ? 'Değiştir' : 'Yükle'}
            </button>

            {value && !yukleniyor && (
              <button
                type="button"
                onClick={() => onChange(null)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg text-error hover:bg-surface transition-colors"
              >
                <X className="w-4 h-4" />
                Kaldır
              </button>
            )}
          </div>
          <p className="text-xs text-text-muted">JPEG, PNG, WebP · en fazla 10 MB</p>
        </div>
      </div>

      <input ref={inputRef} type="file" accept={IZINLI.join(',')} onChange={sec} className="hidden" />
      {hata && <p className="text-sm text-error mt-2">{hata}</p>}
    </div>
  )
}
