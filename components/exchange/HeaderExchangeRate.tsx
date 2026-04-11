'use client';

import { useCurrency } from '@/components/providers/CurrencyProvider';
import { cn } from '@/lib/utils';

interface HeaderExchangeRateProps {
  isScrolled?: boolean;
}

export default function HeaderExchangeRate({ isScrolled = false }: HeaderExchangeRateProps) {
  const { rates, isLoading } = useCurrency();

  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/10 animate-pulse">
        <div className="h-3 sm:h-4 w-14 sm:w-20 bg-gray-300/30 rounded" />
      </div>
    );
  }

  if (!rates) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 animate-ticker-pulse',
        isScrolled
          ? 'bg-[#0B1F3A]/5 text-[#0B1F3A]'
          : 'bg-white/10 text-white'
      )}
    >
      {/* USD */}
      <span className="flex items-center gap-0.5 sm:gap-1 animate-ticker-blink">
        <span className="animate-symbol-flash font-bold text-sm sm:text-base">$</span>
        <span className={cn(
          'tabular-nums animate-ticker-glow',
          isScrolled ? 'text-[#0B1F3A]' : 'text-white'
        )}>
          {rates.rates.USD.toFixed(2)}
        </span>
      </span>

      {/* Separator */}
      <span className={cn(
        'w-px h-3 sm:h-4',
        isScrolled ? 'bg-[#0B1F3A]/20' : 'bg-white/30'
      )} />

      {/* EUR */}
      <span className="flex items-center gap-0.5 sm:gap-1 animate-ticker-blink" style={{ animationDelay: '0.3s' }}>
        <span className="animate-symbol-flash font-bold text-sm sm:text-base" style={{ animationDelay: '0.3s' }}>€</span>
        <span className={cn(
          'tabular-nums animate-ticker-glow',
          isScrolled ? 'text-[#0B1F3A]' : 'text-white'
        )} style={{ animationDelay: '0.3s' }}>
          {rates.rates.EUR.toFixed(2)}
        </span>
      </span>

      {/* Fallback indicator */}
      {rates.source === 'fallback' && (
        <span className="text-xs opacity-60" title="Güncel kur alınamadı">~</span>
      )}
    </div>
  );
}
