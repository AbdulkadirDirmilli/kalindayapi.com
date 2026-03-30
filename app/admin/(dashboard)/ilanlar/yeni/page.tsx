import AdminHeader from '@/components/admin/layout/AdminHeader'
import IlanForm from '@/components/admin/ilan/IlanForm'

export default function YeniIlanPage() {
  return (
    <div>
      <AdminHeader title="Yeni İlan" subtitle="Yeni bir emlak ilanı oluşturun" />
      <div className="p-6">
        <IlanForm />
      </div>
    </div>
  )
}
