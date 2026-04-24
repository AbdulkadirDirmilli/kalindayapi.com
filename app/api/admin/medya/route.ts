import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { readdir, stat, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

interface MediaFile {
  filename: string
  url: string
  thumbnailUrl?: string
  type: 'image' | 'video'
  size: number
  createdAt: string
}

// GET - List all media files
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const uploadsBase = path.join(process.cwd(), 'public', 'uploads')
    const ilanlarDir = path.join(uploadsBase, 'ilanlar')
    const videosDir = path.join(uploadsBase, 'videos')
    const thumbnailsDir = path.join(uploadsBase, 'thumbnails')

    const files: MediaFile[] = []

    // Get image files
    if (existsSync(ilanlarDir)) {
      const imageFiles = await readdir(ilanlarDir)
      for (const filename of imageFiles) {
        const filePath = path.join(ilanlarDir, filename)
        const stats = await stat(filePath)
        if (stats.isFile()) {
          const hasThumbnail = existsSync(path.join(thumbnailsDir, filename))
          files.push({
            filename,
            url: `/uploads/ilanlar/${filename}`,
            thumbnailUrl: hasThumbnail ? `/uploads/thumbnails/${filename}` : undefined,
            type: 'image',
            size: stats.size,
            createdAt: stats.birthtime.toISOString(),
          })
        }
      }
    }

    // Get video files
    if (existsSync(videosDir)) {
      const videoFiles = await readdir(videosDir)
      for (const filename of videoFiles) {
        const filePath = path.join(videosDir, filename)
        const stats = await stat(filePath)
        if (stats.isFile()) {
          files.push({
            filename,
            url: `/uploads/videos/${filename}`,
            type: 'video',
            size: stats.size,
            createdAt: stats.birthtime.toISOString(),
          })
        }
      }
    }

    // Sort by creation date (newest first)
    files.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ files, total: files.length })
  } catch (error) {
    console.error('Medya listeleme hatası:', error)
    return NextResponse.json(
      { error: 'Medya dosyaları listelenemedi' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a media file
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')
    const type = searchParams.get('type') as 'image' | 'video'

    if (!filename || !type) {
      return NextResponse.json({ error: 'Dosya adı ve tipi gerekli' }, { status: 400 })
    }

    const uploadsBase = path.join(process.cwd(), 'public', 'uploads')
    const subDir = type === 'video' ? 'videos' : 'ilanlar'
    const filePath = path.join(uploadsBase, subDir, filename)

    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 404 })
    }

    // Delete the file
    await unlink(filePath)

    // Delete thumbnail if exists (for images)
    if (type === 'image') {
      const thumbnailPath = path.join(uploadsBase, 'thumbnails', filename)
      if (existsSync(thumbnailPath)) {
        await unlink(thumbnailPath)
      }
    }

    return NextResponse.json({ success: true, message: 'Dosya silindi' })
  } catch (error) {
    console.error('Medya silme hatası:', error)
    return NextResponse.json(
      { error: 'Dosya silinirken hata oluştu' },
      { status: 500 }
    )
  }
}
