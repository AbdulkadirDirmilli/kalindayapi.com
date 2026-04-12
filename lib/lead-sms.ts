import { prisma } from '@/lib/prisma'

interface LeadSmsData {
  name: string
  phone: string
  listingTitle: string
}

/**
 * Send lead notification SMS to team members via NetGSM.
 * Recipients are configured in SmsSettings; falls back to env vars.
 */
/**
 * NetGSM kimlik bilgilerini önce DB'den, yoksa env'den alır.
 */
async function getNetgsmCredentials() {
  // 1. Önce DB'deki SmsSettings'e bak
  const settings = await prisma.smsSettings.findFirst({
    orderBy: { createdAt: 'desc' },
  })

  if (settings && settings.isActive) {
    return {
      username: settings.netgsmUsername,
      password: settings.netgsmPassword,
      header: settings.netgsmHeader,
    }
  }

  // 2. DB'de yoksa env variable'lardan oku
  const username = process.env.NETGSM_USERNAME
  const password = process.env.NETGSM_PASSWORD
  const header = process.env.NETGSM_HEADER

  if (username && password && header) {
    return { username, password, header }
  }

  return null
}

function cleanPhoneNumber(phone: string): string {
  let clean = phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '')
  if (clean.startsWith('+90')) clean = clean.substring(3)
  else if (clean.startsWith('90') && clean.length === 12) clean = clean.substring(2)
  else if (clean.startsWith('0') && clean.length === 11) clean = clean.substring(1)
  return clean
}

export async function sendLeadSms(data: LeadSmsData): Promise<{ success: boolean; error?: string }> {
  try {
    const credentials = await getNetgsmCredentials()

    if (!credentials) {
      console.warn('NetGSM ayarları bulunamadı (ne DB ne de ENV) — lead SMS gönderilmedi')
      return { success: false, error: 'SMS ayarları yapılandırılmamış' }
    }

    // Notification recipients from env
    const recipientNumbers = (process.env.LEAD_SMS_RECIPIENTS || '').split(',').map(n => n.trim()).filter(Boolean)

    if (recipientNumbers.length === 0) {
      console.warn('LEAD_SMS_RECIPIENTS tanımlı değil — lead SMS gönderilmedi')
      return { success: false, error: 'SMS alıcıları tanımlı değil' }
    }

    // Clean phone numbers to 10-digit Turkish format
    const cleanRecipients = recipientNumbers
      .map(cleanPhoneNumber)
      .filter(phone => phone.length === 10)

    if (cleanRecipients.length === 0) {
      return { success: false, error: 'Geçerli alıcı numarası bulunamadı' }
    }

    const message = `${data.name} - ${data.phone} numarali ziyaretci, '${data.listingTitle}' ilani hakkinda bilgi istiyor.`

    const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>
<mainbody>
  <header>
    <company dession="yes"/>
    <usercode>${credentials.username}</usercode>
    <password>${credentials.password}</password>
    <startdate></startdate>
    <stopdate></stopdate>
    <type>1:n</type>
    <msgheader>${credentials.header}</msgheader>
  </header>
  <body>
    <msg><![CDATA[${message}]]></msg>
    ${cleanRecipients.map(phone => `<no>${phone}</no>`).join('\n    ')}
  </body>
</mainbody>`

    const response = await fetch('https://api.netgsm.com.tr/sms/send/xml', {
      method: 'POST',
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
      body: xmlBody,
    })

    const responseText = await response.text()

    if (responseText.startsWith('00')) {
      console.log('Lead SMS gönderildi:', responseText)
      return { success: true }
    }

    console.error('Lead SMS hatası:', responseText)
    return { success: false, error: `NetGSM hatası: ${responseText}` }
  } catch (error) {
    console.error('Lead SMS gönderme hatası:', error)
    return { success: false, error: 'SMS gönderim hatası' }
  }
}
