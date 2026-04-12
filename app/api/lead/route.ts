import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendLeadSms } from '@/lib/lead-sms'
import { sendLeadEmailNotification } from '@/lib/lead-email'

// Turkish phone validation: accepts 05XX XXX XX XX or variants
const TURKISH_PHONE_REGEX = /^(0?5\d{9}|905\d{9}|\+905\d{9})$/

function cleanPhone(raw: string): string {
  return raw.replace(/[\s\-()]/g, '')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, listingId, listingTitle } = body

    // --- Validation ---
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return Response.json({ error: 'Ad Soyad en az 2 karakter olmalıdır.' }, { status: 400 })
    }

    if (!phone || typeof phone !== 'string') {
      return Response.json({ error: 'Telefon numarası zorunludur.' }, { status: 400 })
    }

    const cleanedPhone = cleanPhone(phone)
    if (!TURKISH_PHONE_REGEX.test(cleanedPhone)) {
      return Response.json({ error: 'Geçerli bir Türk telefon numarası giriniz. (05XX XXX XX XX)' }, { status: 400 })
    }

    if (!listingId || typeof listingId !== 'string') {
      return Response.json({ error: 'İlan bilgisi eksik.' }, { status: 400 })
    }

    if (!listingTitle || typeof listingTitle !== 'string') {
      return Response.json({ error: 'İlan başlığı eksik.' }, { status: 400 })
    }

    // Normalize phone to 0XXXXXXXXXX format for storage
    let normalizedPhone = cleanedPhone
    if (normalizedPhone.startsWith('+90')) normalizedPhone = '0' + normalizedPhone.substring(3)
    else if (normalizedPhone.startsWith('90') && normalizedPhone.length === 12) normalizedPhone = '0' + normalizedPhone.substring(2)
    else if (!normalizedPhone.startsWith('0')) normalizedPhone = '0' + normalizedPhone

    // --- Duplicate check ---
    const existing = await prisma.lead.findUnique({
      where: {
        phone_listingId: {
          phone: normalizedPhone,
          listingId,
        },
      },
    })

    if (existing) {
      return Response.json(
        { error: 'Bu ilan için daha önce bilgi talebinde bulundunuz.' },
        { status: 409 }
      )
    }

    // --- Save to DB ---
    await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: normalizedPhone,
        listingId,
        listingTitle: listingTitle.trim(),
      },
    })

    // --- Send notifications (fire-and-forget, don't block response) ---
    const smsPromise = sendLeadSms({
      name: name.trim(),
      phone: normalizedPhone,
      listingTitle: listingTitle.trim(),
    }).catch(err => console.error('Lead SMS hatası:', err))

    const emailPromise = sendLeadEmailNotification({
      name: name.trim(),
      phone: normalizedPhone,
      listingId,
      listingTitle: listingTitle.trim(),
    }).catch(err => console.error('Lead email hatası:', err))

    // Wait for both but don't fail the request if they error
    await Promise.allSettled([smsPromise, emailPromise])

    return Response.json({ success: true, message: 'Bilgi talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.' })
  } catch (error) {
    console.error('Lead API hatası:', error)
    return Response.json({ error: 'Bir hata oluştu. Lütfen tekrar deneyiniz.' }, { status: 500 })
  }
}
