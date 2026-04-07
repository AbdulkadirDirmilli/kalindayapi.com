import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Tek bir logu getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { id } = await params

    const log = await prisma.smsLog.findUnique({
      where: { id }
    })

    if (!log) {
      return NextResponse.json({ error: 'Log bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(log)
  } catch (error) {
    console.error('SMS logu getirilemedi:', error)
    return NextResponse.json(
      { error: 'Log yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}
