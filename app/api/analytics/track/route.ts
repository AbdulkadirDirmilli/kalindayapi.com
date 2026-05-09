import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// Site yayına alınma tarihi
const LAUNCH_DATE = new Date('2026-04-03T00:00:00Z');

// IP adresini hash'le (gizlilik için)
function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip + process.env.NEXTAUTH_SECRET).digest('hex').substring(0, 32);
}

// Günün başlangıcını al (UTC)
function getStartOfDay(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export async function POST(request: NextRequest) {
  try {
    // IP adresini al
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    const visitorHash = hashIP(ip);

    // User agent ve diğer bilgiler
    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;

    // Body'den path bilgisini al
    let path: string | undefined;
    try {
      const body = await request.json();
      path = body.path;
    } catch {
      // Body yoksa sorun değil
    }

    const now = new Date();
    const today = getStartOfDay(now);

    // Ziyareti kaydet
    await prisma.siteVisit.create({
      data: {
        visitorHash,
        userAgent,
        path,
        referrer,
        visitedAt: now,
      },
    });

    // Günlük istatistikleri güncelle
    const existingStats = await prisma.siteStats.findUnique({
      where: { date: today },
    });

    if (existingStats) {
      // Bugün bu ziyaretçi daha önce gelmiş mi?
      const todayStart = today;
      const todayEnd = new Date(today);
      todayEnd.setUTCHours(23, 59, 59, 999);

      const previousVisitToday = await prisma.siteVisit.count({
        where: {
          visitorHash,
          visitedAt: {
            gte: todayStart,
            lt: now, // Şu anki ziyaret hariç
          },
        },
      });

      // İstatistikleri güncelle
      await prisma.siteStats.update({
        where: { date: today },
        data: {
          pageViews: { increment: 1 },
          totalVisits: { increment: 1 },
          // Eğer bu ziyaretçi bugün ilk kez geliyorsa unique artır
          uniqueVisitors: previousVisitToday === 0 ? { increment: 1 } : undefined,
        },
      });
    } else {
      // Bugün için yeni istatistik kaydı oluştur
      await prisma.siteStats.create({
        data: {
          date: today,
          totalVisits: 1,
          uniqueVisitors: 1,
          pageViews: 1,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics track error:', error);
    // Hata olsa bile 200 dön - kullanıcı deneyimini etkilemesin
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
