import { LucideIcon } from 'lucide-react'
import clsx from 'clsx'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'primary' | 'accent' | 'success' | 'error' | 'warning'
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'primary',
}: StatsCardProps) {
  const colors = {
    primary: 'bg-primary text-white',
    accent: 'bg-accent text-primary',
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    warning: 'bg-amber-500 text-white',
  }

  const iconBg = {
    primary: 'bg-white/20',
    accent: 'bg-primary/10',
    success: 'bg-white/20',
    error: 'bg-white/20',
    warning: 'bg-white/20',
  }

  return (
    <div className={clsx('rounded-xl p-4 sm:p-6', colors[color])}>
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm opacity-80 truncate">{title}</p>
          <p className="text-xl sm:text-3xl font-bold mt-1">{value}</p>
          {trend && (
            <p
              className={clsx(
                'text-xs sm:text-sm mt-2',
                trend.isPositive ? 'text-green-200' : 'text-red-200'
              )}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}% bu ay
            </p>
          )}
        </div>
        <div className={clsx('p-2 sm:p-3 rounded-xl flex-shrink-0', iconBg[color])}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
    </div>
  )
}
