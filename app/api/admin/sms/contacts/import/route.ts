import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface ImportContact {
  name: string
  phone: string
  group?: string
  note?: string
}

// POST - Toplu kişi import
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const { contacts } = body as { contacts: ImportContact[] }

    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
      return NextResponse.json(
        { error: 'İçe aktarılacak kişi bulunamadı' },
        { status: 400 }
      )
    }

    // Maksimum 1000 kişi
    if (contacts.length > 1000) {
      return NextResponse.json(
        { error: 'Tek seferde en fazla 1000 kişi içe aktarılabilir' },
        { status: 400 }
      )
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    }

    // Mevcut grupları getir
    const existingGroups = await prisma.smsGroup.findMany({
      select: { id: true, name: true }
    })
    const groupMap = new Map(existingGroups.map(g => [g.name.toLowerCase(), g.id]))

    // Her kişi için işlem yap
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i]

      // Validasyon
      if (!contact.name || contact.name.trim() === '') {
        results.failed++
        results.errors.push(`Satır ${i + 1}: İsim boş olamaz`)
        continue
      }

      if (!contact.phone || contact.phone.trim() === '') {
        results.failed++
        results.errors.push(`Satır ${i + 1}: Telefon numarası boş olamaz`)
        continue
      }

      // Telefon numarasını temizle
      const cleanPhone = contact.phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '')

      if (cleanPhone.length < 10) {
        results.failed++
        results.errors.push(`Satır ${i + 1}: Geçersiz telefon numarası`)
        continue
      }

      // Grup kontrolü - yoksa oluştur
      let groupId: string | null = null
      if (contact.group && contact.group.trim() !== '') {
        const groupName = contact.group.trim()
        const existingGroupId = groupMap.get(groupName.toLowerCase())

        if (existingGroupId) {
          groupId = existingGroupId
        } else {
          // Yeni grup oluştur
          try {
            const newGroup = await prisma.smsGroup.create({
              data: { name: groupName }
            })
            groupId = newGroup.id
            groupMap.set(groupName.toLowerCase(), newGroup.id)
          } catch {
            // Grup oluşturulamazsa devam et
          }
        }
      }

      try {
        await prisma.smsContact.create({
          data: {
            name: contact.name.trim(),
            phone: cleanPhone,
            groupId,
            note: contact.note?.trim() || null
          }
        })
        results.success++
      } catch (error) {
        results.failed++
        results.errors.push(`Satır ${i + 1}: Kayıt oluşturulamadı`)
        console.error(`Import error for contact ${i + 1}:`, error)
      }
    }

    return NextResponse.json({
      message: `${results.success} kişi başarıyla içe aktarıldı`,
      ...results
    })
  } catch (error) {
    console.error('Toplu import hatası:', error)
    return NextResponse.json(
      { error: 'İçe aktarma sırasında hata oluştu' },
      { status: 500 }
    )
  }
}
