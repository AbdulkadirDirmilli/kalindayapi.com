import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - SMS ayarlarını getir
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const settings = await prisma.smsSettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    if (!settings) {
      // Varsayılan ayarları döndür (şifre olmadan)
      return NextResponse.json({
        id: null,
        netgsmUsername: '',
        netgsmHeader: '',
        senderNames: JSON.stringify([
          'KALİNDA YAPI',
          'KALİNDA EMLAK',
          'KALINDA YAPI'
        ]),
        isActive: false
      })
    }

    // Şifreyi gizle
    return NextResponse.json({
      ...settings,
      netgsmPassword: settings.netgsmPassword ? '********' : ''
    })
  } catch (error) {
    console.error('SMS ayarları getirilemedi:', error)
    return NextResponse.json(
      { error: 'Ayarlar yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// POST - SMS ayarlarını kaydet/güncelle
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const { netgsmUsername, netgsmPassword, netgsmHeader, senderNames, isActive } = body

    if (!netgsmUsername || netgsmUsername.trim() === '') {
      return NextResponse.json(
        { error: 'NetGSM kullanıcı adı zorunludur' },
        { status: 400 }
      )
    }

    if (!netgsmHeader || netgsmHeader.trim() === '') {
      return NextResponse.json(
        { error: 'NetGSM başlık (header) zorunludur' },
        { status: 400 }
      )
    }

    // Mevcut ayarları kontrol et
    const existingSettings = await prisma.smsSettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    const data = {
      netgsmUsername: netgsmUsername.trim(),
      netgsmHeader: netgsmHeader.trim(),
      senderNames: typeof senderNames === 'string' ? senderNames : JSON.stringify(senderNames || []),
      isActive: isActive ?? true
    }

    // Şifre sadece değiştirilmişse güncelle
    if (netgsmPassword && netgsmPassword !== '********') {
      Object.assign(data, { netgsmPassword: netgsmPassword.trim() })
    }

    let settings
    if (existingSettings) {
      settings = await prisma.smsSettings.update({
        where: { id: existingSettings.id },
        data
      })
    } else {
      if (!netgsmPassword || netgsmPassword.trim() === '') {
        return NextResponse.json(
          { error: 'NetGSM şifresi zorunludur' },
          { status: 400 }
        )
      }
      settings = await prisma.smsSettings.create({
        data: {
          ...data,
          netgsmPassword: netgsmPassword.trim()
        }
      })
    }

    return NextResponse.json({
      ...settings,
      netgsmPassword: '********'
    })
  } catch (error) {
    console.error('SMS ayarları kaydedilemedi:', error)
    return NextResponse.json(
      { error: 'Ayarlar kaydedilirken hata oluştu' },
      { status: 500 }
    )
  }
}
