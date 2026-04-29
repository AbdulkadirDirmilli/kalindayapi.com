import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { optimizeImage, changeExtToWebp } from '@/lib/image-optimize'

// Route segment config for app router
export const maxDuration = 60 // seconds
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Increase body size limit for this route (100MB for videos)
export const fetchCache = 'force-no-store'

// POST - Upload file
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadi' }, { status: 400 })
    }

    // Validate file type
    const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const videoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']
    const allowedTypes = [...imageTypes, ...videoTypes]
    const isVideo = videoTypes.includes(file.type)
    const isImage = imageTypes.includes(file.type)

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Sadece JPEG, PNG, WebP, GIF, MP4, WebM, MOV ve AVI dosyalari kabul edilir' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB for images, 100MB for videos)
    const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: isVideo ? 'Video boyutu maksimum 100MB olmalidir' : 'Dosya boyutu maksimum 10MB olmalidir' },
        { status: 400 }
      )
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
      try {
        // Optimize image: convert to WebP, resize, create thumbnail
        const { optimized, thumbnail } = await optimizeImage(buffer)
        filename = changeExtToWebp(baseFilename)

        await writeFile(path.join(uploadsDir, filename), optimized)
        await writeFile(path.join(thumbDir, filename), thumbnail)

        url = `/uploads/${subDir}/${filename}`
      } catch (optimizeError) {
        // Sharp başarısız olursa orijinal dosyayı kaydet
        console.error('Resim optimizasyon hatasi, orijinal kaydediliyor:', optimizeError)
        filename = baseFilename
        await writeFile(path.join(uploadsDir, filename), buffer)
        url = `/uploads/${subDir}/${filename}`
      }
    } else {
      // Videos: save as-is
      filename = baseFilename
      await writeFile(path.join(uploadsDir, filename), buffer)
      url = `/uploads/${subDir}/${filename}`
    }

    return NextResponse.json({ url, filename, type: isVideo ? 'video' : 'image' }, { status: 201 })
  } catch (error) {
    console.error('Dosya yukleme hatasi:', error)
    return NextResponse.json(
      { error: 'Dosya yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}
