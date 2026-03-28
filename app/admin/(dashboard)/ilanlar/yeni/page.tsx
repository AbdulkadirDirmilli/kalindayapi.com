import AdminHeader from '@/components/admin/layout/AdminHeader'
import IlanForm from '@/components/admin/ilan/IlanForm'

export default function YeniIlanPage() {
  return (
    <div>
      <AdminHeader title="Yeni Ilan" subtitle="Yeni bir emlak ilani olusturun" />
      <div className="p-6">
        <IlanForm />
      </div>
    </div>
  )
}
