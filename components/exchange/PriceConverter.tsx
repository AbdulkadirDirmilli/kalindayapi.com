'use client';

import { motion } from 'framer-motion';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { getEquivalentPrices } from '@/lib/currencyUtils';
import { cn } from '@/lib/utils';

interface PriceConverterProps {
  priceInTRY: number;
  size?: 'sm' | 'md' | 'lg';
  suffix?: string;
  showEquivalents?: boolean;
  className?: string;
}

export default function PriceConverter({
  priceInTRY,
  size = 'md',
  suffix,
  showEquivalents = false,
  className,
}: PriceConverterProps) {
  const { selectedCurrency, rates, formatConvertedPrice, isLoading } = useCurrency();

  const formattedPrice = formatConvertedPrice(priceInTRY);

  // Get equivalent prices in other currencies
  const equivalents = showEquivalents
    ? getEquivalentPrices(priceInTRY, rates?.rates || null, selectedCurrency)
    : [];

  const sizeClasses = {
    sm: 'text-lg font-bold',
    md: 'text-xl sm:text-2xl font-bold',
    lg: 'text-2xl sm:text-3xl md:text-4xl font-bold',
  };

  const suffixSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm sm:text-lg',
  };

  const equivalentSizeClasses = {
    sm: 'text-xs',
    md: 'text-xs sm:text-sm',
    lg: 'text-sm',
  };

  return (
    <div className={cn('inline-block', className)}>
      <motion.div
        key={`${selectedCurrency}-${priceInTRY}`}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className={cn(sizeClasses[size], 'text-[#C9A84C]')}>
          {isLoading ? (
            <span className="inline-block w-24 h-6 bg-gray-200 animate-pulse rounded" />
          ) : (
            formattedPrice
          )}
        </span>
        {suffix && (
          <span className={cn(suffixSizeClasses[size], 'font-normal text-gray-400 ml-0.5')}>
            {suffix}
          </span>
        )}
      </motion.div>

      {showEquivalents && equivalents.length > 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={cn(equivalentSizeClasses[size], 'text-gray-500 mt-1')}
        >
          <span className="opacity-60">~</span>{' '}
          {equivalents.map((eq, index) => (
            <span key={eq.currency}>
              {eq.formatted}
              {index < equivalents.length - 1 && (
                <span className="mx-1.5 opacity-40">|</span>
              )}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
