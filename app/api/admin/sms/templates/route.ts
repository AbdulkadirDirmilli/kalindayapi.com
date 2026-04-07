import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Tüm SMS şablonlarını listele
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const templates = await prisma.smsTemplate.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error('SMS şablonları listelenemedi:', error)
    return NextResponse.json(
      { error: 'Şablonlar yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// POST - Yeni SMS şablonu oluştur
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

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

    const template = await prisma.smsTemplate.create({
      data: {
        title: title.trim(),
        message: message.trim()
      }
    })

    return NextResponse.json(template, { status: 201 })
  } catch (error) {
    console.error('SMS şablonu oluşturulamadı:', error)
    return NextResponse.json(
      { error: 'Şablon oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}
