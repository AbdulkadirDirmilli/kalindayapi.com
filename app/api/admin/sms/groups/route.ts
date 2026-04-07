import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Tüm SMS gruplarını listele
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const groups = await prisma.smsGroup.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { contacts: true }
        }
      }
    })

    return NextResponse.json(groups)
  } catch (error) {
    console.error('SMS grupları listelenemedi:', error)
    return NextResponse.json(
      { error: 'Gruplar yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// POST - Yeni SMS grubu oluştur
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const { name } = body

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Grup adı zorunludur' },
        { status: 400 }
      )
    }

    // Aynı isimde grup var mı kontrol et
    const existingGroup = await prisma.smsGroup.findUnique({
      where: { name: name.trim() }
    })

    if (existingGroup) {
      return NextResponse.json(
        { error: 'Bu isimde bir grup zaten mevcut' },
        { status: 400 }
      )
    }

    const group = await prisma.smsGroup.create({
      data: {
        name: name.trim()
      },
      include: {
        _count: {
          select: { contacts: true }
        }
      }
    })

    return NextResponse.json(group, { status: 201 })
  } catch (error) {
    console.error('SMS grubu oluşturulamadı:', error)
    return NextResponse.json(
      { error: 'Grup oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}
