import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Site yayına alınma tarihi
const LAUNCH_DATE = new Date('2026-04-03T00:00:00Z');

// Günün başlangıcını al (UTC)
function getStartOfDay(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
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
        pageViews: true,
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

    return NextResponse.json({
      launchDate: LAUNCH_DATE.toISOString(),
      daysSinceLaunch: Math.max(0, daysSinceLaunch),
      allTime: {
        totalVisits: allTimeStats._sum.totalVisits || 0,
        uniqueVisitors: allTimeStats._sum.uniqueVisitors || 0,
        pageViews: allTimeStats._sum.pageViews || 0,
      },
      today: {
        totalVisits: todayStats?.totalVisits || 0,
        uniqueVisitors: todayStats?.uniqueVisitors || 0,
        pageViews: todayStats?.pageViews || 0,
      },
      online: onlineNow.length,
    });
  } catch (error) {
    console.error('Analytics stats error:', error);
    return NextResponse.json({
      launchDate: LAUNCH_DATE.toISOString(),
      daysSinceLaunch: 0,
      allTime: { totalVisits: 0, uniqueVisitors: 0, pageViews: 0 },
      today: { totalVisits: 0, uniqueVisitors: 0, pageViews: 0 },
      online: 0,
    });
  }
}
