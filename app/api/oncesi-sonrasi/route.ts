import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Public endpoint for oncesi-sonrasi gallery
export async function GET() {
  try {
    const projeler = await prisma.oncesiSonrasi.findMany({
      where: { aktif: true },
      orderBy: { sira: 'asc' },
    })

    return NextResponse.json(projeler)
  } catch (error) {
    console.error('Oncesi-sonrasi listesi hatasi:', error)
    return NextResponse.json(
      { error: 'Projeler yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}
