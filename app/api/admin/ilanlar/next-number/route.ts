import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    // En yuksek ilan numarasini bul
    const lastIlan = await prisma.ilan.findFirst({
      where: {
        ilanNo: {
          startsWith: 'KY-'
        }
      },
      orderBy: { ilanNo: 'desc' },
      select: { ilanNo: true },
    })

    let nextNumber = 1

    if (lastIlan?.ilanNo) {
      // KY-XXXX veya KY-YYYY-XXX formatindan numarayi cikart
      const parts = lastIlan.ilanNo.split('-')
      const lastPart = parts[parts.length - 1]
      const lastNumber = parseInt(lastPart, 10)
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1
      }
    }

    // Benzersiz numara olustur: KY-XXXXX (5 haneli)
    let ilanNo = `KY-${String(nextNumber).padStart(5, '0')}`

    // Numara zaten varsa, bir sonrakini dene (max 10 deneme)
    for (let i = 0; i < 10; i++) {
      const existing = await prisma.ilan.findUnique({
        where: { ilanNo },
        select: { id: true },
      })
      if (!existing) break
      nextNumber++
      ilanNo = `KY-${String(nextNumber).padStart(5, '0')}`
    }

    return NextResponse.json({ ilanNo, count: nextNumber })
  } catch (error) {
    console.error('Ilan numarasi olusturma hatasi:', error)
    return NextResponse.json(
      { error: 'Ilan numarasi olusturulamadi' },
      { status: 500 }
    )
  }
}
