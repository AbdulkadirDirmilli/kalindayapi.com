import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - SMS kişilerini listele (pagination, arama, filtreleme)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const groupId = searchParams.get('groupId') || ''

    const skip = (page - 1) * limit

    // Where koşulları
    const where: Record<string, unknown> = {}

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { note: { contains: search } }
      ]
    }

    if (groupId) {
      where.groupId = groupId
    }

    // Toplam sayı
    const total = await prisma.smsContact.count({ where })

    // Kişileri getir
    const contacts = await prisma.smsContact.findMany({
      where,
      include: {
        group: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    })

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('SMS kişileri listelenemedi:', error)
    return NextResponse.json(
      { error: 'Kişiler yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// POST - Yeni SMS kişisi ekle
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

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

    const contact = await prisma.smsContact.create({
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

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error('SMS kişisi oluşturulamadı:', error)
    return NextResponse.json(
      { error: 'Kişi oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}

// DELETE - Toplu silme
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const { ids } = body

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Silinecek kişi seçilmedi' },
        { status: 400 }
      )
    }

    await prisma.smsContact.deleteMany({
      where: {
        id: { in: ids }
      }
    })

    return NextResponse.json({ success: true, deletedCount: ids.length })
  } catch (error) {
    console.error('SMS kişileri silinemedi:', error)
    return NextResponse.json(
      { error: 'Kişiler silinirken hata oluştu' },
      { status: 500 }
    )
  }
}
