'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';
import { RateChange } from '@/types/exchange';
import { cn } from '@/lib/utils';

interface LiveRateCardProps {
  currency: string;
  currencyName: string;
  symbol: string;
  data: RateChange;
  icon: React.ReactNode;
  className?: string;
}

export default function LiveRateCard({
  currency,
  currencyName,
  symbol,
  data,
  icon,
  className,
}: LiveRateCardProps) {
  const { rate, change, changePercent, direction } = data;

  const directionColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    stable: 'text-gray-500',
  };

  const directionBg = {
    up: 'bg-green-500/10',
    down: 'bg-red-500/10',
    stable: 'bg-gray-500/10',
  };

  const DirectionIcon = direction === 'up' ? TrendingUp : direction === 'down' ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100',
        'hover:shadow-xl transition-shadow duration-300',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C9A84C]/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A84C]/20 via-[#C9A84C]/10 to-white border border-[#C9A84C]/30 flex items-center justify-center text-2xl shadow-sm">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-[#0B1F3A] text-lg">{currency}/TRY</h3>
            <p className="text-sm text-gray-500">{currencyName}</p>
          </div>
        </div>
        <div className={cn('p-2 rounded-lg', directionBg[direction])}>
          <DirectionIcon className={cn('w-5 h-5', directionColors[direction])} />
        </div>
      </div>

      {/* Rate Display */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#0B1F3A] tabular-nums animate-ticker-glow speakable-rate">
            {symbol}{rate.toFixed(currency === 'XAU' ? 0 : 4)}
          </span>
          <span className="text-lg text-gray-400">₺</span>
        </div>
      </div>

      {/* Change Info */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <span className={cn('text-sm font-medium', directionColors[direction])}>
            {change >= 0 ? '+' : ''}{change.toFixed(4)} ₺
          </span>
          <span className={cn(
            'text-xs px-2 py-0.5 rounded-full font-medium',
            directionBg[direction],
            directionColors[direction]
          )}>
            {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
          </span>
        </div>
        <span className="text-xs text-gray-400">günlük değişim</span>
      </div>

      {/* Animated pulse indicator */}
      <div className="absolute bottom-4 right-4">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>
    </motion.div>
  );
}
