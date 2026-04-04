import sharp from 'sharp'

interface OptimizeResult {
  optimized: Buffer
  thumbnail: Buffer
}

const MAX_WIDTH = 1920
const THUMB_WIDTH = 400
const QUALITY = 80

export async function optimizeImage(buffer: Buffer): Promise<OptimizeResult> {
  const image = sharp(buffer).rotate() // auto-rotate based on EXIF

  const metadata = await image.metadata()
  const width = metadata.width || MAX_WIDTH

  // Optimized version: max 1920px wide, WebP, quality 80
  const optimized = await sharp(buffer)
    .rotate()
    .resize(width > MAX_WIDTH ? MAX_WIDTH : undefined, undefined, {
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY })
    .toBuffer()

  // Thumbnail: 400px wide, WebP, quality 75
  const thumbnail = await sharp(buffer)
    .rotate()
    .resize(THUMB_WIDTH, undefined, {
      withoutEnlargement: true,
    })
    .webp({ quality: 75 })
    .toBuffer()

  return { optimized, thumbnail }
}

export function changeExtToWebp(filename: string): string {
  return filename.replace(/\.[^.]+$/, '.webp')
}
