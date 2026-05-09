import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Site yayına alınma tarihi
const LAUNCH_DATE = new Date('2026-04-03T00:00:00Z');

// Başlangıç ziyaretçi sayısı
const BASE_VISITORS = 101;

// Günün başlangıcını al (UTC)
function getStartOfDay(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

// Her 3 günde 2 artış hesapla
function calculateBonusVisitors(daysSinceLaunch: number): number {
  // Her 3 günde 2 artış = (gün / 3) * 2
  return Math.floor(daysSinceLaunch / 3) * 2;
}

// Simüle edilmiş online kullanıcı sayısı (20 dk'da bir, 5 dk boyunca 1-5 arası)
function getSimulatedOnline(): number {
  const now = new Date();
  const minutes = now.getMinutes();

  // Her 20 dakikada bir (0, 20, 40 dk) 5 dakika boyunca aktif
  // 0-4, 20-24, 40-44 dakikaları arasında aktif
  const cycleMinute = minutes % 20;

  if (cycleMinute < 5) {
    // Aktif dönem: 1-5 arası rastgele değer
    // Seed olarak dakika ve saat kullan (aynı dakikada aynı değer)
    const seed = now.getHours() * 60 + minutes;
    const random = ((seed * 9301 + 49297) % 233280) / 233280;
    return Math.floor(random * 5) + 1; // 1-5 arası
  }

  return 0;
}

export async function GET() {
  try {
    const now = new Date();
    const today = getStartOfDay(now);
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    // Toplam istatistikler (yayın tarihinden itibaren)
    const allTimeStats = await prisma.siteStats.aggregate({
      _sum: {
        totalVisits: true,
        uniqueVisitors: true,
      },
      where: {
        date: {
          gte: LAUNCH_DATE,
        },
      },
    });

    // Bugünkü istatistikler
    const todayStats = await prisma.siteStats.findUnique({
      where: { date: today },
    });

    // Şu an sitede olan kişi sayısı (son 5 dakikadaki unique ziyaretçiler)
    const onlineNow = await prisma.siteVisit.groupBy({
      by: ['visitorHash'],
      where: {
        visitedAt: {
          gte: fiveMinutesAgo,
        },
      },
    });

    // Yayın tarihinden bu yana geçen gün sayısı
    const daysSinceLaunch = Math.floor((now.getTime() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24));

    // Bonus ziyaretçi hesapla (her 3 günde 2)
    const bonusVisitors = calculateBonusVisitors(Math.max(0, daysSinceLaunch));

    // Gerçek ziyaretçi + başlangıç değeri + bonus
    const realVisitors = allTimeStats._sum.uniqueVisitors || 0;
    const totalVisitors = BASE_VISITORS + bonusVisitors + realVisitors;

    // Gerçek online + simüle edilmiş (minimum 1 - mevcut ziyaretçi)
    const realOnline = onlineNow.length;
    const simulatedOnline = getSimulatedOnline();
    const totalOnline = Math.max(1, realOnline + simulatedOnline);

    return NextResponse.json({
      launchDate: LAUNCH_DATE.toISOString(),
      daysSinceLaunch: Math.max(0, daysSinceLaunch),
      allTime: {
        totalVisits: (allTimeStats._sum.totalVisits || 0) + BASE_VISITORS + bonusVisitors,
        uniqueVisitors: totalVisitors,
      },
      today: {
        totalVisits: todayStats?.totalVisits || 0,
        uniqueVisitors: todayStats?.uniqueVisitors || 0,
      },
      online: totalOnline,
    });
  } catch (error) {
    console.error('Analytics stats error:', error);
    // Hata durumunda da mantıklı değerler göster
    const now = new Date();
    const daysSinceLaunch = Math.floor((now.getTime() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24));
    const bonusVisitors = calculateBonusVisitors(Math.max(0, daysSinceLaunch));

    return NextResponse.json({
      launchDate: LAUNCH_DATE.toISOString(),
      daysSinceLaunch: Math.max(0, daysSinceLaunch),
      allTime: {
        totalVisits: BASE_VISITORS + bonusVisitors,
        uniqueVisitors: BASE_VISITORS + bonusVisitors
      },
      today: { totalVisits: 0, uniqueVisitors: 0 },
      online: Math.max(1, getSimulatedOnline()),
    });
  }
}
