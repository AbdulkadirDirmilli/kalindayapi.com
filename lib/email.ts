import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Bildirim e-postası gönderilecek adresler (virgülle ayrılmış)
const NOTIFICATION_EMAILS = (process.env.NOTIFICATION_EMAIL || 'info@kalindayapi.com').split(',').map(e => e.trim());
const FROM_EMAIL = process.env.FROM_EMAIL || 'bildirim@kalindayapi.com';

interface ContactFormData {
  ad: string;
  email?: string;
  telefon?: string;
  konu?: string;
  mesaj: string;
}

/**
 * İletişim formu gönderildiğinde e-posta bildirimi gönder
 */
export async function sendContactFormNotification(data: ContactFormData) {
  // API key yoksa sessizce çık (development ortamı için)
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY bulunamadı, e-posta gönderilmedi');
    return { success: false, error: 'API key eksik' };
  }

  try {
    const { ad, email, telefon, konu, mesaj } = data;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0B1F3A; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #0B1F3A; margin-bottom: 5px; }
            .field-value { background: white; padding: 10px; border-radius: 4px; border: 1px solid #eee; }
            .message-box { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #C9A84C; }
            .footer { text-align: center; padding: 15px; color: #666; font-size: 12px; }
            .badge { display: inline-block; background: #C9A84C; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Yeni İletişim Formu Mesajı</h1>
            </div>
            <div class="content">
              <p><span class="badge">Yeni Mesaj</span></p>

              <div class="field">
                <div class="field-label">Ad Soyad</div>
                <div class="field-value">${ad}</div>
              </div>

              ${email ? `
              <div class="field">
                <div class="field-label">E-posta</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ` : ''}

              ${telefon ? `
              <div class="field">
                <div class="field-label">Telefon</div>
                <div class="field-value"><a href="tel:${telefon}">${telefon}</a></div>
              </div>
              ` : ''}

              ${konu ? `
              <div class="field">
                <div class="field-label">Konu</div>
                <div class="field-value">${konu}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="field-label">Mesaj</div>
                <div class="message-box">${mesaj.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Bu e-posta kalindayapi.com iletişim formundan gönderilmiştir.</p>
              <p><a href="https://www.kalindayapi.com/admin/iletisim">Admin Panelinde Görüntüle</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
Yeni İletişim Formu Mesajı

Ad Soyad: ${ad}
${email ? `E-posta: ${email}` : ''}
${telefon ? `Telefon: ${telefon}` : ''}
${konu ? `Konu: ${konu}` : ''}

Mesaj:
${mesaj}

---
Bu e-posta kalindayapi.com iletişim formundan gönderilmiştir.
Admin Paneli: https://www.kalindayapi.com/admin/iletisim
    `;

    const result = await resend.emails.send({
      from: `Kalinda Yapı <${FROM_EMAIL}>`,
      to: NOTIFICATION_EMAILS,
      subject: `Yeni İletişim Mesajı: ${konu || ad}`,
      html: htmlContent,
      text: textContent,
    });

    console.log('E-posta gönderildi:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    return { success: false, error };
  }
}
