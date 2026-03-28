'use client'

import { useState } from 'react'
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  FolderOpen,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'

export default function MedyaPage() {
  const [copied, setCopied] = useState<string | null>(null)

  // Placeholder images from the existing public/images folder
  const existingImages = [
    '/images/listings/daire-1.jpg',
    '/images/listings/daire-2.jpg',
    '/images/listings/daire-3.jpg',
    '/images/listings/daire-4.jpg',
    '/images/listings/daire-5.jpg',
    '/images/listings/villa-1.jpg',
    '/images/listings/villa-2.jpg',
    '/images/listings/villa-3.jpg',
    '/images/listings/arsa-1.jpg',
    '/images/listings/arsa-2.jpg',
    '/images/listings/isyeri-1.jpg',
    '/images/listings/isyeri-2.jpg',
  ]

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(url)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Kopyalama hatasi:', err)
    }
  }

  return (
    <div>
      <AdminHeader
        title="Medya Kutuphanesi"
        subtitle="Resim ve dosyalari yonetin"
      />

      <div className="p-4 sm:p-6">
        {/* Upload Area */}
        <div className="bg-white rounded-xl border-2 border-dashed border-border p-6 sm:p-12 text-center mb-4 sm:mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">
            Dosya Yukle
          </h3>
          <p className="text-text-muted mb-4">
            Resimleri buraya surukleeyin veya secmek icin tiklayin
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="btn btn-primary cursor-pointer"
          >
            <FolderOpen className="w-5 h-5" />
            Dosya Sec
          </label>
          <p className="text-xs text-text-muted mt-4">
            PNG, JPG, WEBP - Maksimum 5MB
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <p className="text-sm text-primary">
            <strong>Not:</strong> Dosya yukleme ozelligi henuz aktif degil.
            Simdilik mevcut resimleri kullanabilirsiniz. Gorselleri
            <code className="mx-1 px-1 py-0.5 bg-white rounded">/public/images/</code>
            klasorune manuel olarak yukleyebilirsiniz.
          </p>
        </div>

        {/* Existing Images */}
        <h2 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">
          Mevcut Gorseller
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {existingImages.map((url) => (
            <div
              key={url}
              className="group relative aspect-square rounded-xl overflow-hidden bg-surface border border-border"
            >
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copyToClipboard(url)}
                  className="p-2 bg-white rounded-lg hover:bg-surface transition-colors"
                  title="URL'yi Kopyala"
                >
                  {copied === url ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4 text-primary" />
                  )}
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white truncate">
                  {url.split('/').pop()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {existingImages.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 mx-auto text-text-muted mb-4" />
            <p className="text-text-light">Henuz gorsel yuklenmemis</p>
          </div>
        )}
      </div>
    </div>
  )
}
