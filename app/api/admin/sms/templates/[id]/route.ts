import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Tek bir şablonu getir
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

    const template = await prisma.smsTemplate.findUnique({
      where: { id }
    })

    if (!template) {
      return NextResponse.json({ error: 'Şablon bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(template)
  } catch (error) {
    console.error('SMS şablonu getirilemedi:', error)
    return NextResponse.json(
      { error: 'Şablon yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// PUT - Şablonu güncelle
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
    const { title, message } = body

    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'Şablon başlığı zorunludur' },
        { status: 400 }
      )
    }

    if (!message || message.trim() === '') {
      return NextResponse.json(
        { error: 'Mesaj içeriği zorunludur' },
        { status: 400 }
      )
    }

    const template = await prisma.smsTemplate.update({
      where: { id },
      data: {
        title: title.trim(),
        message: message.trim()
      }
    })

    return NextResponse.json(template)
  } catch (error) {
    console.error('SMS şablonu güncellenemedi:', error)
    return NextResponse.json(
      { error: 'Şablon güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// DELETE - Şablonu sil
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

    await prisma.smsTemplate.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('SMS şablonu silinemedi:', error)
    return NextResponse.json(
      { error: 'Şablon silinirken hata oluştu' },
      { status: 500 }
    )
  }
}
