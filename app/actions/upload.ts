'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { optimizeImage, changeExtToWebp } from '@/lib/image-optimize'

export async function uploadFile(formData: FormData): Promise<{ url?: string; filename?: string; type?: string; error?: string }> {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return { error: 'Yetkisiz erisim' }
    }

    const file = formData.get('file') as File | null

    if (!file) {
      return { error: 'Dosya bulunamadi' }
    }

    // Validate file type
    const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const videoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']
    const allowedTypes = [...imageTypes, ...videoTypes]
    const isVideo = videoTypes.includes(file.type)
    const isImage = imageTypes.includes(file.type)

    if (!allowedTypes.includes(file.type)) {
      return { error: 'Sadece JPEG, PNG, WebP, GIF, MP4, WebM, MOV ve AVI dosyalari kabul edilir' }
    }

    // Validate file size (max 10MB for images, 100MB for videos)
    const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return { error: isVideo ? 'Video boyutu maksimum 100MB olmalidir' : 'Dosya boyutu maksimum 10MB olmalidir' }
    }

    // Create uploads directories if they don't exist
    const subDir = isVideo ? 'videos' : 'ilanlar'
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', subDir)
    const thumbDir = path.join(process.cwd(), 'public', 'uploads', 'thumbnails')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }
    if (isImage && !existsSync(thumbDir)) {
      await mkdir(thumbDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const ext = file.name.split('.').pop()
    const baseFilename = `${timestamp}-${randomStr}.${ext}`

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let url: string
    let filename: string

    if (isImage) {
      // Optimize image: convert to WebP, resize, create thumbnail
      const { optimized, thumbnail } = await optimizeImage(buffer)
      filename = changeExtToWebp(baseFilename)

      await writeFile(path.join(uploadsDir, filename), optimized)
      await writeFile(path.join(thumbDir, filename), thumbnail)

      url = `/uploads/${subDir}/${filename}`
    } else {
      // Videos: save as-is
      filename = baseFilename
      await writeFile(path.join(uploadsDir, filename), buffer)
      url = `/uploads/${subDir}/${filename}`
    }

    return { url, filename, type: isVideo ? 'video' : 'image' }
  } catch (error) {
    console.error('Dosya yukleme hatasi:', error)
    return { error: 'Dosya yuklenirken hata olustu' }
  }
}
