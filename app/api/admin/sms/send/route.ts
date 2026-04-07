import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface SendSmsRequest {
  message: string
  senderName: string
  recipients: string[] // Telefon numaraları
}

// NetGSM API'ye SMS gönder
async function sendToNetGSM(
  username: string,
  password: string,
  header: string,
  message: string,
  recipients: string[]
): Promise<{ success: boolean; jobId?: string; error?: string }> {
  try {
    // NetGSM XML API
    const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>
<mainbody>
  <header>
    <company dession="yes"/>
    <usercode>${username}</usercode>
    <password>${password}</password>
    <startdate></startdate>
    <stopdate></stopdate>
    <type>1:n</type>
    <msgheader>${header}</msgheader>
  </header>
  <body>
    <msg><![CDATA[${message}]]></msg>
    ${recipients.map(phone => `<no>${phone}</no>`).join('\n    ')}
  </body>
</mainbody>`

    const response = await fetch('https://api.netgsm.com.tr/sms/send/xml', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml; charset=utf-8'
      },
      body: xmlBody
    })

    const responseText = await response.text()

    // NetGSM yanıt kodları
    // 00: Başarılı
    // 20: Post hatalı
    // 30: Kullanıcı adı/şifre hatalı
    // 40: Mesaj başlığı hatalı
    // 50: IYS kontrol hatası
    // 51: IYS numarası hatalı
    // 70: Hatalı sorgulama

    if (responseText.startsWith('00')) {
      const jobId = responseText.split(' ')[1] || ''
      return { success: true, jobId }
    } else if (responseText.startsWith('20')) {
      return { success: false, error: 'Post verisi hatalı' }
    } else if (responseText.startsWith('30')) {
      return { success: false, error: 'Kullanıcı adı veya şifre hatalı' }
    } else if (responseText.startsWith('40')) {
      return { success: false, error: 'Mesaj başlığı (sender name) hatalı veya tanımsız' }
    } else if (responseText.startsWith('50')) {
      return { success: false, error: 'IYS kontrol hatası' }
    } else if (responseText.startsWith('51')) {
      return { success: false, error: 'IYS marka numarası hatalı' }
    } else if (responseText.startsWith('70')) {
      return { success: false, error: 'Hatalı sorgulama' }
    } else {
      return { success: false, error: `Bilinmeyen hata: ${responseText}` }
    }
  } catch (error) {
    console.error('NetGSM API hatası:', error)
    return { success: false, error: 'NetGSM API bağlantı hatası' }
  }
}

// POST - SMS Gönder
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body: SendSmsRequest = await request.json()
    const { message, senderName, recipients } = body

    // Validasyon
    if (!message || message.trim() === '') {
      return NextResponse.json(
        { error: 'Mesaj içeriği zorunludur' },
        { status: 400 }
      )
    }

    if (!senderName || senderName.trim() === '') {
      return NextResponse.json(
        { error: 'Gönderici adı zorunludur' },
        { status: 400 }
      )
    }

    if (!recipients || recipients.length === 0) {
      return NextResponse.json(
        { error: 'En az bir alıcı seçilmelidir' },
        { status: 400 }
      )
    }

    // SMS ayarlarını getir
    const settings = await prisma.smsSettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    if (!settings || !settings.isActive) {
      return NextResponse.json(
        { error: 'SMS ayarları yapılandırılmamış veya devre dışı' },
        { status: 400 }
      )
    }

    // Telefon numaralarını temizle
    const cleanRecipients = recipients.map(phone => {
      let clean = phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '')
      // Türkiye formatına çevir
      if (clean.startsWith('+90')) {
        clean = clean.substring(3)
      } else if (clean.startsWith('90') && clean.length === 12) {
        clean = clean.substring(2)
      } else if (clean.startsWith('0') && clean.length === 11) {
        clean = clean.substring(1)
      }
      return clean
    }).filter(phone => phone.length === 10) // 10 haneli numaralar

    if (cleanRecipients.length === 0) {
      return NextResponse.json(
        { error: 'Geçerli telefon numarası bulunamadı' },
        { status: 400 }
      )
    }

    // NetGSM'e gönder
    const result = await sendToNetGSM(
      settings.netgsmUsername,
      settings.netgsmPassword,
      senderName,
      message,
      cleanRecipients
    )

    // Log oluştur
    const log = await prisma.smsLog.create({
      data: {
        message: message.trim(),
        senderName: senderName.trim(),
        recipients: JSON.stringify(cleanRecipients),
        totalSent: cleanRecipients.length,
        successCount: result.success ? cleanRecipients.length : 0,
        failedCount: result.success ? 0 : cleanRecipients.length,
        status: result.success ? 'sent' : 'failed',
        errorMessage: result.error || null,
        netgsmJobId: result.jobId || null
      }
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `${cleanRecipients.length} kişiye SMS başarıyla gönderildi`,
        jobId: result.jobId,
        logId: log.id
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error,
        logId: log.id
      }, { status: 400 })
    }
  } catch (error) {
    console.error('SMS gönderme hatası:', error)
    return NextResponse.json(
      { error: 'SMS gönderilirken hata oluştu' },
      { status: 500 }
    )
  }
}
