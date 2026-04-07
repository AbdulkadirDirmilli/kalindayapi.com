'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  History,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  X,
} from 'lucide-react'
import AdminHeader from '@/components/admin/layout/AdminHeader'

interface SmsLog {
  id: string
  message: string
  senderName: string
  recipients: string
  totalSent: number
  successCount: number
  failedCount: number
  status: string
  errorMessage: string | null
  netgsmJobId: string | null
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  sent: { label: 'Gönderildi', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  failed: { label: 'Başarısız', color: 'bg-red-100 text-red-800', icon: XCircle },
  pending: { label: 'Bekliyor', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  partial: { label: 'Kısmen Gönderildi', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
}

export default function SmsGecmisPage() {
  const [logs, setLogs] = useState<SmsLog[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedLog, setSelectedLog] = useState<SmsLog | null>(null)

  // Fetch logs
  const fetchLogs = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      if (search) params.append('search', search)
      if (statusFilter) params.append('status', statusFilter)

      const response = await fetch(`/api/admin/sms/logs?${params}`)
      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Loglar yüklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }, [pagination.page, pagination.limit, search, statusFilter])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setPagination(prev => ({ ...prev, page: 1 }))
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  // Parse recipients
  const parseRecipients = (recipients: string): string[] => {
    try {
      return JSON.parse(recipients)
    } catch {
      return []
    }
  }

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div>
      <AdminHeader
        title="Gönderim Geçmişi"
        subtitle="Geçmiş SMS gönderimlerini görüntüleyin"
      />

      <div className="p-4 sm:p-6">
        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-border p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Mesaj veya gönderici ara..."
                className="input pl-10 w-full"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setPagination(prev => ({ ...prev, page: 1 }))
              }}
              className="input w-full sm:w-48"
            >
              <option value="">Tüm Durumlar</option>
              <option value="sent">Gönderildi</option>
              <option value="failed">Başarısız</option>
              <option value="pending">Bekliyor</option>
              <option value="partial">Kısmen Gönderildi</option>
            </select>
          </div>
        </div>

        {/* Logs Table */}
        {isLoading ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-text-light">
              <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Yükleniyor...
            </div>
          </div>
        ) : logs.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <History className="w-12 h-12 mx-auto text-text-muted mb-4" />
            <p className="text-text-light">Henüz SMS gönderimi yapılmamış</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text">Tarih</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text">Gönderici</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text hidden md:table-cell">Mesaj</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-text">Toplam</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-text hidden sm:table-cell">Başarılı</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-text hidden sm:table-cell">Başarısız</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-text">Durum</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-text">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {logs.map((log) => {
                    const status = statusConfig[log.status] || statusConfig.pending
                    const StatusIcon = status.icon
                    return (
                      <tr key={log.id} className="hover:bg-surface/50">
                        <td className="px-4 py-3 text-sm text-text-light whitespace-nowrap">
                          {formatDate(log.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium text-text text-sm">{log.senderName}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-sm text-text-light line-clamp-1 max-w-[200px]">
                            {log.message}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-sm font-medium text-text">{log.totalSent}</span>
                        </td>
                        <td className="px-4 py-3 text-center hidden sm:table-cell">
                          <span className="text-sm text-green-600 font-medium">{log.successCount}</span>
                        </td>
                        <td className="px-4 py-3 text-center hidden sm:table-cell">
                          <span className="text-sm text-red-600 font-medium">{log.failedCount}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${status.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            <span className="hidden sm:inline">{status.label}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => setSelectedLog(log)}
                            className="p-2 hover:bg-surface rounded-lg transition-colors"
                            title="Detay"
                          >
                            <Eye className="w-4 h-4 text-primary" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                <span className="text-sm text-text-light">
                  Toplam {pagination.total} kayıt
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="p-2 hover:bg-surface rounded-lg transition-colors disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm">
                    {pagination.page} / {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.totalPages}
                    className="p-2 hover:bg-surface rounded-lg transition-colors disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">Gönderim Detayı</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-text-muted mb-1">Tarih</p>
                  <p className="text-sm font-medium">{formatDate(selectedLog.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Gönderici</p>
                  <p className="text-sm font-medium">{selectedLog.senderName}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Durum</p>
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${statusConfig[selectedLog.status]?.color || statusConfig.pending.color}`}>
                    {statusConfig[selectedLog.status]?.label || 'Bekliyor'}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">NetGSM Job ID</p>
                  <p className="text-sm font-medium font-mono">{selectedLog.netgsmJobId || '-'}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-surface rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{selectedLog.totalSent}</p>
                  <p className="text-xs text-text-muted">Toplam</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-green-600">{selectedLog.successCount}</p>
                  <p className="text-xs text-green-700">Başarılı</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-red-600">{selectedLog.failedCount}</p>
                  <p className="text-xs text-red-700">Başarısız</p>
                </div>
              </div>

              {/* Error Message */}
              {selectedLog.errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-xs text-red-700 font-medium mb-1">Hata Mesajı</p>
                  <p className="text-sm text-red-800">{selectedLog.errorMessage}</p>
                </div>
              )}

              {/* Message */}
              <div className="mb-6">
                <p className="text-xs text-text-muted mb-2">Mesaj İçeriği</p>
                <div className="bg-surface rounded-lg p-4">
                  <p className="text-sm whitespace-pre-wrap">{selectedLog.message}</p>
                </div>
              </div>

              {/* Recipients */}
              <div>
                <p className="text-xs text-text-muted mb-2">
                  Alıcılar ({parseRecipients(selectedLog.recipients).length} kişi)
                </p>
                <div className="bg-surface rounded-lg p-4 max-h-40 overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {parseRecipients(selectedLog.recipients).map((phone, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-white border border-border rounded"
                      >
                        {phone}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
