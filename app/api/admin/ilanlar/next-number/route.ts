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

    // Toplam ilan sayisini al
    const count = await prisma.ilan.count()

    // Sonraki numara: KY-0001, KY-0002, ...
    const nextNumber = count + 1
    const ilanNo = `KY-${String(nextNumber).padStart(4, '0')}`

    return NextResponse.json({ ilanNo, count: nextNumber })
  } catch (error) {
    console.error('Ilan numarasi olusturma hatasi:', error)
    return NextResponse.json(
      { error: 'Ilan numarasi olusturulamadi' },
      { status: 500 }
    )
  }
}
