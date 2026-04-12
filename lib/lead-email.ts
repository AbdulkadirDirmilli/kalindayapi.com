import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const LEAD_NOTIFICATION_EMAILS = (process.env.LEAD_NOTIFICATION_EMAILS || process.env.NOTIFICATION_EMAIL || 'info@kalindayapi.com')
  .split(',')
  .map(e => e.trim())
const FROM_EMAIL = process.env.FROM_EMAIL || 'bildirim@kalindayapi.com'

interface LeadEmailData {
  name: string
  phone: string
  listingId: string
  listingTitle: string
}

export async function sendLeadEmailNotification(data: LeadEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY bulunamadı, lead e-postası gönderilmedi')
    return { success: false, error: 'API key eksik' }
  }

  try {
    const { name, phone, listingTitle } = data

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0B1F3A; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 22px; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #0B1F3A; margin-bottom: 5px; }
            .field-value { background: white; padding: 10px; border-radius: 4px; border: 1px solid #eee; }
            .footer { text-align: center; padding: 15px; color: #666; font-size: 12px; }
            .badge { display: inline-block; background: #C9A84C; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Yeni İlan Bilgi Talebi</h1>
            </div>
            <div class="content">
              <p><span class="badge">Yeni Lead</span></p>

              <div class="field">
                <div class="field-label">Ad Soyad</div>
                <div class="field-value">${name}</div>
              </div>

              <div class="field">
                <div class="field-label">Telefon</div>
                <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
              </div>

              <div class="field">
                <div class="field-label">İlgilenilen İlan</div>
                <div class="field-value">${listingTitle}</div>
              </div>
            </div>
            <div class="footer">
              <p>Bu bildirim kalindayapi.com ilan favori butonundan oluşturulmuştur.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const textContent = `Yeni İlan Bilgi Talebi

Ad Soyad: ${name}
Telefon: ${phone}
İlan: ${listingTitle}

---
Bu bildirim kalindayapi.com üzerinden gönderilmiştir.`

    const result = await resend.emails.send({
      from: `Kalinda Yapı <${FROM_EMAIL}>`,
      to: LEAD_NOTIFICATION_EMAILS,
      subject: `Yeni Bilgi Talebi: ${listingTitle}`,
      html: htmlContent,
      text: textContent,
    })

    console.log('Lead e-postası gönderildi:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('Lead e-posta gönderme hatası:', error)
    return { success: false, error }
  }
}
