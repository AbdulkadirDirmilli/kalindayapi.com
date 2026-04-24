'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Upload,
  Image as ImageIcon,
  Video,
  Trash2,
  Copy,
  Check,
  X,
  FileImage,
  Film,
  RefreshCw,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import ConfirmDialog from '@/components/admin/ui/ConfirmDialog'

interface MediaFile {
  filename: string
  url: string
  thumbnailUrl?: string
  type: 'image' | 'video'
  size: number
  createdAt: string
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function MedyaPage() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [deleteFile, setDeleteFile] = useState<MediaFile | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all')
  const [dragActive, setDragActive] = useState(false)

  const fetchFiles = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/medya')
      if (response.ok) {
        const data = await response.json()
        setFiles(data.files)
      }
    } catch (error) {
      console.error('Medya dosyaları yüklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    const totalFiles = fileList.length
    let uploaded = 0

    for (const file of Array.from(fileList)) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          uploaded++
          setUploadProgress(Math.round((uploaded / totalFiles) * 100))
        } else {
          const error = await response.json()
          console.error('Yükleme hatası:', error)
        }
      } catch (error) {
        console.error('Yükleme hatası:', error)
      }
    }

    setIsUploading(false)
    setUploadProgress(0)
    fetchFiles()
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleUpload(e.dataTransfer.files)
  }

  const handleDelete = async () => {
    if (!deleteFile) return

    setIsDeleting(true)
    try {
      const response = await fetch(
        `/api/admin/medya?filename=${encodeURIComponent(deleteFile.filename)}&type=${deleteFile.type}`,
        { method: 'DELETE' }
      )

      if (response.ok) {
        setFiles((prev) => prev.filter((f) => f.filename !== deleteFile.filename))
        if (selectedFile?.filename === deleteFile.filename) {
          setSelectedFile(null)
        }
      }
    } catch (error) {
      console.error('Silme hatası:', error)
    } finally {
      setIsDeleting(false)
      setDeleteFile(null)
    }
  }

  const copyUrl = (url: string) => {
    const fullUrl = window.location.origin + url
    navigator.clipboard.writeText(fullUrl)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const filteredFiles = files.filter((f) => {
    if (filter === 'all') return true
    return f.type === filter
  })

  const imageCount = files.filter((f) => f.type === 'image').length
  const videoCount = files.filter((f) => f.type === 'video').length

  return (
    <div>
      <AdminHeader title="Medya Yönetimi" subtitle="Yüklenen dosyaları yönetin" />

      <div className="p-4 sm:p-6">
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors mb-6 ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => handleUpload(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 mb-1">
            {isUploading
              ? `Yükleniyor... %${uploadProgress}`
              : 'Dosyaları sürükleyip bırakın veya tıklayın'}
          </p>
          <p className="text-xs text-gray-400">
            Resimler (JPEG, PNG, WebP, GIF - max 10MB) veya Videolar (MP4, WebM, MOV - max 100MB)
          </p>
          {isUploading && (
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Filters & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Tümü ({files.length})
            </button>
            <button
              onClick={() => setFilter('image')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 ${
                filter === 'image'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <FileImage className="w-4 h-4" />
              Resimler ({imageCount})
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 ${
                filter === 'video'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Film className="w-4 h-4" />
              Videolar ({videoCount})
            </button>
          </div>
          <button
            onClick={fetchFiles}
            disabled={isLoading}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-1.5"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Yenile
          </button>
        </div>

        {/* File Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {isLoading ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <RefreshCw className="w-8 h-8 mx-auto text-gray-400 animate-spin mb-3" />
                <p className="text-gray-500">Yükleniyor...</p>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <ImageIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Henüz dosya yüklenmemiş</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {filteredFiles.map((file) => (
                  <div
                    key={file.filename}
                    onClick={() => setSelectedFile(file)}
                    className={`relative group bg-white border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedFile?.filename === file.filename
                        ? 'ring-2 ring-primary border-primary'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    <div className="aspect-square bg-gray-100 relative">
                      {file.type === 'image' ? (
                        <img
                          src={file.thumbnailUrl || file.url}
                          alt={file.filename}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="w-10 h-10 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-1 right-1">
                        {file.type === 'video' ? (
                          <span className="bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                            Video
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-gray-600 truncate">{file.filename}</p>
                      <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* File Details Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            {selectedFile ? (
              <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-primary">Dosya Detayı</h3>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Preview */}
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                  {selectedFile.type === 'image' ? (
                    <img
                      src={selectedFile.url}
                      alt={selectedFile.filename}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <video
                      src={selectedFile.url}
                      controls
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Dosya Adı</p>
                    <p className="text-sm break-all">{selectedFile.filename}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Tür</p>
                    <p className="text-sm flex items-center gap-1">
                      {selectedFile.type === 'image' ? (
                        <>
                          <FileImage className="w-4 h-4" /> Resim
                        </>
                      ) : (
                        <>
                          <Film className="w-4 h-4" /> Video
                        </>
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Boyut</p>
                    <p className="text-sm">{formatFileSize(selectedFile.size)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Yüklenme Tarihi</p>
                    <p className="text-sm">
                      {new Date(selectedFile.createdAt).toLocaleString('tr-TR')}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">URL</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={selectedFile.url}
                        className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1.5"
                      />
                      <button
                        onClick={() => copyUrl(selectedFile.url)}
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded"
                      >
                        {copiedUrl === selectedFile.url ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <button
                      onClick={() => setDeleteFile(selectedFile)}
                      className="w-full px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Dosyayı Sil
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hidden lg:block">
                <ImageIcon className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                <p className="text-sm text-gray-500">
                  Detayları görmek için bir dosya seçin
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteFile}
        title="Dosyayı Sil"
        message={`"${deleteFile?.filename}" dosyasını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
        confirmText="Sil"
        cancelText="İptal"
        onConfirm={handleDelete}
        onCancel={() => setDeleteFile(null)}
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  )
}
