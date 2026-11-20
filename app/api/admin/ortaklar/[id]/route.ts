import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ortakGuncelleSchema } from '@/lib/validations/ortak'
import { revalidateDanismanSayfalari } from '@/lib/revalidate-danismanlar'
import { yuklemeyiSil } from '@/lib/upload-temizle'

/**
 * Eski danisman fotografini diskten siler — ama yalnizca baska hicbir
 * Ortak kaydi ayni dosyaya isaret etmiyorsa. Ayni gorseli iki danismana
 * atamak mumkun oldugu icin bu kontrol sart; aksi halde birinin fotografi
 * degistirildiginde digerinin gorseli de kaybolurdu.
 */
async function eskiFotoyuSil(eskiFoto: string | null, hariçTutulanId: string) {
  if (!eskiFoto) return

  const baskaKullanan = await prisma.ortak.count({
    where: { foto: eskiFoto, id: { not: hariçTutulanId } },
  })
  if (baskaKullanan > 0) return

  await yuklemeyiSil(eskiFoto)
}

// GET - Get single ortak
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const { id } = await params

    const ortak = await prisma.ortak.findUnique({
      where: { id },
    })

    if (!ortak) {
      return NextResponse.json({ error: 'Ortak bulunamadi' }, { status: 404 })
    }

    return NextResponse.json(ortak)
  } catch (error) {
    console.error('Ortak getirme hatasi:', error)
    return NextResponse.json(
      { error: 'Ortak yuklenirken hata olustu' },
      { status: 500 }
    )
  }
}

// PUT - Update ortak
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const { id } = await params
    const parsed = ortakGuncelleSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Gecersiz veri' },
        { status: 400 }
      )
    }
    const body = parsed.data

    // Check if ortak exists
    const existingOrtak = await prisma.ortak.findUnique({
      where: { id },
    })

    if (!existingOrtak) {
      return NextResponse.json({ error: 'Ortak bulunamadi' }, { status: 404 })
    }

    // Check if slug is already used by another ortak
    if (body.slug && body.slug !== existingOrtak.slug) {
      const slugExists = await prisma.ortak.findUnique({
        where: { slug: body.slug },
      })
      if (slugExists) {
        return NextResponse.json(
          { error: 'Bu slug zaten kullaniliyor' },
          { status: 400 }
        )
      }
    }

    const { email, ...veri } = body
    const ortak = await prisma.ortak.update({
      where: { id },
      data: { ...veri, ...(email !== undefined ? { email: email || null } : {}) },
    })

    // Fotograf degistirildiyse (veya kaldirildiysa) eskisini diskten temizle.
    // `foto` gonderilmediyse dokunulmaz; `undefined` "degismedi" demek.
    if (veri.foto !== undefined && veri.foto !== existingOrtak.foto) {
      await eskiFotoyuSil(existingOrtak.foto, id)
    }

    revalidateDanismanSayfalari()

    return NextResponse.json(ortak)
  } catch (error) {
    console.error('Ortak guncelleme hatasi:', error)
    return NextResponse.json(
      { error: 'Ortak guncellenirken hata olustu' },
      { status: 500 }
    )
  }
}

// DELETE - Delete ortak
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const { id } = await params

    // Fotograf yolu silmeden once okunmali, sonra kayit ortadan kalkiyor.
    const silinecek = await prisma.ortak.findUnique({
      where: { id },
      select: { foto: true },
    })

    // Ilan.danismanId icin cascade tanimli degil; once bagli ilanlarin
    // danisman alani bosaltilmazsa silme FK ihlaliyle 500 veriyordu.
    const bagliIlan = await prisma.ilan.count({ where: { danismanId: id } })
    if (bagliIlan > 0) {
      await prisma.ilan.updateMany({
        where: { danismanId: id },
        data: { danismanId: null },
      })
    }

    await prisma.ortak.delete({ where: { id } })

    // Kayit gittikten sonra fotografi da temizle. DB islemi basarili oldugu
    // icin dosya silinemese bile istek basarisiz sayilmaz (bkz. yuklemeyiSil).
    await eskiFotoyuSil(silinecek?.foto ?? null, id)

    revalidateDanismanSayfalari()

    return NextResponse.json({
      message: 'Ortak basariyla silindi',
      bosaltilanIlan: bagliIlan,
    })
  } catch (error) {
    console.error('Ortak silme hatasi:', error)
    return NextResponse.json(
      { error: 'Ortak silinirken hata olustu' },
      { status: 500 }
    )
  }
}
