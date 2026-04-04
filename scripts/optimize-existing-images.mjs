/**
 * Mevcut ilan fotoğraflarını optimize eder:
 * - WebP formatına dönüştürür (max 1920px, quality 80)
 * - Thumbnail oluşturur (400px, quality 75)
 * - Orijinal dosyaları /uploads/originals/ klasörüne yedekler
 * - DB update SQL'lerini db-updates.sql dosyasına yazar
 *
 * Kullanım:
 *   node scripts/optimize-existing-images.mjs
 *   sqlite3 prisma/dev.db < scripts/db-updates.sql
 */

import sharp from 'sharp'
import { readdir, mkdir, rename, writeFile, stat } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'ilanlar')
const THUMB_DIR = path.join(process.cwd(), 'public', 'uploads', 'thumbnails')
const BACKUP_DIR = path.join(process.cwd(), 'public', 'uploads', 'originals')
const SQL_FILE = path.join(process.cwd(), 'scripts', 'db-updates.sql')

const MAX_WIDTH = 1920
const THUMB_WIDTH = 400
const QUALITY = 80

async function main() {
  for (const dir of [THUMB_DIR, BACKUP_DIR]) {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true })
    }
  }

  const files = await readdir(UPLOADS_DIR)
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f))

  console.log(`${imageFiles.length} fotograf bulundu. Optimize ediliyor...\n`)

  let totalOriginal = 0
  let totalOptimized = 0
  let success = 0
  let failed = 0
  const sqlLines = ['BEGIN TRANSACTION;']

  for (const file of imageFiles) {
    const filePath = path.join(UPLOADS_DIR, file)
    const webpName = file.replace(/\.[^.]+$/, '.webp')

    try {
      const originalStat = await stat(filePath)
      totalOriginal += originalStat.size

      const buffer = await sharp(filePath).rotate().toBuffer()
      const metadata = await sharp(buffer).metadata()
      const width = metadata.width || MAX_WIDTH

      const optimized = await sharp(buffer)
        .resize(width > MAX_WIDTH ? MAX_WIDTH : undefined, undefined, {
          withoutEnlargement: true,
        })
        .webp({ quality: QUALITY })
        .toBuffer()

      const thumbnail = await sharp(buffer)
        .resize(THUMB_WIDTH, undefined, { withoutEnlargement: true })
        .webp({ quality: 75 })
        .toBuffer()

      totalOptimized += optimized.length

      // Backup original
      await rename(filePath, path.join(BACKUP_DIR, file))

      // Write optimized + thumbnail
      await writeFile(path.join(UPLOADS_DIR, webpName), optimized)
      await writeFile(path.join(THUMB_DIR, webpName), thumbnail)

      // SQL for DB update
      const oldUrl = `/uploads/ilanlar/${file}`
      const newUrl = `/uploads/ilanlar/${webpName}`
      sqlLines.push(`UPDATE IlanFoto SET url = '${newUrl}' WHERE url = '${oldUrl}';`)

      const savings = ((1 - optimized.length / originalStat.size) * 100).toFixed(0)
      console.log(`  OK: ${file} -> ${webpName} (${formatSize(originalStat.size)} -> ${formatSize(optimized.length)}, -%${savings})`)
      success++
    } catch (err) {
      console.error(`  HATA: ${file}: ${err.message}`)
      failed++
    }
  }

  sqlLines.push('COMMIT;')
  await writeFile(SQL_FILE, sqlLines.join('\n') + '\n')

  console.log('\n--- SONUC ---')
  console.log(`Basarili: ${success}`)
  console.log(`Hatali: ${failed}`)
  console.log(`Orijinal toplam: ${formatSize(totalOriginal)}`)
  console.log(`Optimize toplam: ${formatSize(totalOptimized)}`)
  if (totalOriginal > 0) {
    console.log(`Tasarruf: ${formatSize(totalOriginal - totalOptimized)} (-%${((1 - totalOptimized / totalOriginal) * 100).toFixed(0)})`)
  }
  console.log(`\nOrijinal dosyalar yedek: ${BACKUP_DIR}`)
  console.log(`DB SQL: ${SQL_FILE}`)
  console.log(`\nDB guncellemek icin: sqlite3 prisma/dev.db < scripts/db-updates.sql`)
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

main().catch(console.error)
