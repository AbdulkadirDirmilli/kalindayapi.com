import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import IlanForm from '@/components/admin/ilan/IlanForm'

interface Props {
  params: Promise<{ id: string }>
}

async function getIlan(id: string) {
  const ilan = await prisma.ilan.findUnique({
    where: { id },
    include: {
      fotograflar: {
        orderBy: { sira: 'asc' },
      },
    },
  })

  if (!ilan) {
    notFound()
  }

  return ilan
}

export default async function DuzenleIlanPage({ params }: Props) {
  const { id } = await params
  const ilan = await getIlan(id)

  const initialData = {
    ...ilan,
    fotograflar: ilan.fotograflar.map((f) => f.url),
  }

  return (
    <div>
      <AdminHeader
        title="İlan Düzenle"
        subtitle={ilan.baslik}
      />
      <div className="p-6">
        <IlanForm initialData={initialData} ilanId={id} />
      </div>
    </div>
  )
}
