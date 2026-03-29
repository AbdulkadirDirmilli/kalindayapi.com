import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Create new contact form submission (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { ad, email, telefon, konu, mesaj } = body

    // Validation
    if (!ad || typeof ad !== 'string' || ad.trim().length < 2) {
      return NextResponse.json(
        { error: 'Ad alanı gereklidir ve en az 2 karakter olmalıdır' },
        { status: 400 }
      )
    }

    if (!mesaj || typeof mesaj !== 'string' || mesaj.trim().length < 10) {
      return NextResponse.json(
        { error: 'Mesaj alanı gereklidir ve en az 10 karakter olmalıdır' },
        { status: 400 }
      )
    }

    // Email validation (if provided)
    if (email && typeof email === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Geçerli bir e-posta adresi giriniz' },
          { status: 400 }
        )
      }
    }

    // Create contact form entry
    const contact = await prisma.contactForm.create({
      data: {
        ad: ad.trim(),
        email: email?.trim() || '',
        telefon: telefon?.trim() || null,
        konu: konu?.trim() || null,
        mesaj: mesaj.trim(),
        durum: 'yeni',
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Mesajınız başarıyla gönderildi',
        id: contact.id
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Iletisim formu hatasi:', error)
    return NextResponse.json(
      { error: 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    )
  }
}
