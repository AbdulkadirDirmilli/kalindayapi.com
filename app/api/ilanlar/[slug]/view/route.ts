import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

const VISITOR_COOKIE_NAME = '_vid'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year in seconds

function generateVisitorId(): string {
  return crypto.randomUUID()
}

// Her 5 günde 1 otomatik artış hesapla
function calculateBonusViews(publishDate: Date): number {
  const now = new Date()
  const diffTime = now.getTime() - publishDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return Math.floor(diffDays / 5)
}

// POST - Görüntülenme sayısını artır
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const cookieStore = await cookies()

    // Get or create visitor ID
    let visitorId = cookieStore.get(VISITOR_COOKIE_NAME)?.value
    const isNewVisitor = !visitorId

    if (!visitorId) {
      visitorId = generateVisitorId()
    }

    // Find the ilan
    const ilan = await prisma.ilan.findUnique({
      where: { slug },
      select: { id: true, viewCount: true, yayinTarihi: true }
    })

    if (!ilan) {
      return NextResponse.json(
        { error: 'Ilan bulunamadi' },
        { status: 404 }
      )
    }

    // Check if this visitor has already viewed this ilan
    const existingView = await prisma.ilanView.findUnique({
      where: {
        ilanId_visitorId: {
          ilanId: ilan.id,
          visitorId: visitorId
        }
      }
    })

    let realViewCount = ilan.viewCount
    let isNewView = false

    if (!existingView) {
      // New view - create record and increment count
      await prisma.$transaction([
        prisma.ilanView.create({
          data: {
            ilanId: ilan.id,
            visitorId: visitorId
          }
        }),
        prisma.ilan.update({
          where: { id: ilan.id },
          data: { viewCount: { increment: 1 } }
        })
      ])
      realViewCount += 1
      isNewView = true
    }

    // Toplam görüntülenme = gerçek + bonus (her 5 günde 1)
    const bonusViews = calculateBonusViews(ilan.yayinTarihi)
    const totalViewCount = realViewCount + bonusViews

    // Create response with cookie
    const response = NextResponse.json({
      viewCount: totalViewCount,
      isNewView
    })

    // Set visitor ID cookie if it's a new visitor
    if (isNewVisitor) {
      response.cookies.set(VISITOR_COOKIE_NAME, visitorId, {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: false, // Client-side access allowed
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      })
    }

    return response
  } catch (error) {
    console.error('View count error:', error instanceof Error ? error.message : error)
    console.error('Full error:', error)
    return NextResponse.json(
      { error: 'View count update failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// GET - Mevcut görüntülenme sayısını getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const ilan = await prisma.ilan.findUnique({
      where: { slug },
      select: { viewCount: true, yayinTarihi: true }
    })

    if (!ilan) {
      return NextResponse.json(
        { error: 'Ilan bulunamadi' },
        { status: 404 }
      )
    }

    // Toplam görüntülenme = gerçek + bonus (her 5 günde 1)
    const bonusViews = calculateBonusViews(ilan.yayinTarihi)
    const totalViewCount = ilan.viewCount + bonusViews

    return NextResponse.json({
      viewCount: totalViewCount
    })
  } catch (error) {
    console.error('View count fetch error:', error)
    return NextResponse.json(
      { error: 'View count fetch failed' },
      { status: 500 }
    )
  }
}
