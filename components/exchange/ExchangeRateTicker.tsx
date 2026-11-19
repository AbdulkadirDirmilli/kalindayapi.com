'use client';

import { useCurrency } from '@/components/providers/CurrencyProvider';
import { cn } from '@/lib/utils';

interface ExchangeRateTickerProps {
  /**
   * 'inline'  — ana sayfadaki hızlı erişim satırı için sade metin görünümü
   * 'badge'   — kendi zemini olan rozet görünümü
   */
  variant?: 'inline' | 'badge';
  /** Koyu zemin üzerinde mi gösteriliyor */
  onDark?: boolean;
  className?: string;
}

export default function ExchangeRateTicker({
  variant = 'inline',
  onDark = false,
  className,
}: ExchangeRateTickerProps) {
  const { rates, isLoading } = useCurrency();

  if (isLoading) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-2 animate-pulse',
          variant === 'badge' && 'px-3 py-1.5 rounded-lg',
          variant === 'badge' && (onDark ? 'bg-white/10' : 'bg-primary/5'),
          className
        )}
      >
        <span className={cn('h-4 w-24 rounded', onDark ? 'bg-white/20' : 'bg-primary/10')} />
      </span>
    );
  }

  if (!rates) return null;

  const symbolClass = onDark ? 'text-carolina' : 'text-primary';
  const valueClass = onDark ? 'text-white' : 'text-ink';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-sm font-semibold',
        variant === 'badge' && 'px-3 py-1.5 rounded-lg',
        variant === 'badge' && (onDark ? 'bg-white/10' : 'bg-primary/5'),
        className
      )}
    >
      <span className="inline-flex items-center gap-1">
        <span className={cn('font-bold', symbolClass)}>$</span>
        <span className={cn('tabular-nums', valueClass)}>
          {rates.rates.USD.toFixed(2)}
        </span>
      </span>

      <span className={cn('w-px h-3.5', onDark ? 'bg-white/30' : 'bg-border-strong')} />

      <span className="inline-flex items-center gap-1">
        <span className={cn('font-bold', symbolClass)}>€</span>
        <span className={cn('tabular-nums', valueClass)}>
          {rates.rates.EUR.toFixed(2)}
        </span>
      </span>

      {rates.source === 'fallback' && (
        <span className="text-xs opacity-60" title="Güncel kur alınamadı">~</span>
      )}
    </span>
  );
}
