import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Tek bir grubu getir
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

    const group = await prisma.smsGroup.findUnique({
      where: { id },
      include: {
        contacts: true,
        _count: {
          select: { contacts: true }
        }
      }
    })

    if (!group) {
      return NextResponse.json({ error: 'Grup bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(group)
  } catch (error) {
    console.error('SMS grubu getirilemedi:', error)
    return NextResponse.json(
      { error: 'Grup yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// PUT - Grubu güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { name } = body

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Grup adı zorunludur' },
        { status: 400 }
      )
    }

    // Aynı isimde başka grup var mı kontrol et
    const existingGroup = await prisma.smsGroup.findFirst({
      where: {
        name: name.trim(),
        NOT: { id }
      }
    })

    if (existingGroup) {
      return NextResponse.json(
        { error: 'Bu isimde bir grup zaten mevcut' },
        { status: 400 }
      )
    }

    const group = await prisma.smsGroup.update({
      where: { id },
      data: {
        name: name.trim()
      },
      include: {
        _count: {
          select: { contacts: true }
        }
      }
    })

    return NextResponse.json(group)
  } catch (error) {
    console.error('SMS grubu güncellenemedi:', error)
    return NextResponse.json(
      { error: 'Grup güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// DELETE - Grubu sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { id } = await params

    await prisma.smsGroup.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('SMS grubu silinemedi:', error)
    return NextResponse.json(
      { error: 'Grup silinirken hata oluştu' },
      { status: 500 }
    )
  }
}
