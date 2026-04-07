import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Tek bir kişiyi getir
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

    const contact = await prisma.smsContact.findUnique({
      where: { id },
      include: {
        group: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (!contact) {
      return NextResponse.json({ error: 'Kişi bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error('SMS kişisi getirilemedi:', error)
    return NextResponse.json(
      { error: 'Kişi yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// PUT - Kişiyi güncelle
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
    const { name, phone, groupId, note } = body

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'İsim zorunludur' },
        { status: 400 }
      )
    }

    if (!phone || phone.trim() === '') {
      return NextResponse.json(
        { error: 'Telefon numarası zorunludur' },
        { status: 400 }
      )
    }

    // Telefon numarasını temizle
    const cleanPhone = phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '')

    const contact = await prisma.smsContact.update({
      where: { id },
      data: {
        name: name.trim(),
        phone: cleanPhone,
        groupId: groupId || null,
        note: note?.trim() || null
      },
      include: {
        group: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('SMS kişisi güncellenemedi:', error)
    return NextResponse.json(
      { error: 'Kişi güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// DELETE - Kişiyi sil
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

    await prisma.smsContact.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('SMS kişisi silinemedi:', error)
    return NextResponse.json(
      { error: 'Kişi silinirken hata oluştu' },
      { status: 500 }
    )
  }
}
