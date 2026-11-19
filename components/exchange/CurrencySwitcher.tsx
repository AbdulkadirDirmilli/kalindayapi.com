'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { CURRENCY_CONFIG } from '@/lib/currencyUtils';
import { CurrencyCode } from '@/types/exchange';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';

interface CurrencySwitcherProps {
  variant?: 'default' | 'compact';
  /** Koyu zemin üzerinde mi gösteriliyor (varsayılan: açık zemin) */
  onDark?: boolean;
}

const CURRENCIES: CurrencyCode[] = ['TRY', 'USD', 'EUR'];

export default function CurrencySwitcher({
  variant = 'default',
  onDark = false,
}: CurrencySwitcherProps) {
  const { selectedCurrency, setCurrency } = useCurrency();
  const { dict } = useLocale();

  const t = dict?.currencySwitcher || {
    selectCurrency: "Para birimi seç"
  };
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentConfig = CURRENCY_CONFIG[selectedCurrency];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300',
          onDark
            ? 'bg-white/10 text-white hover:bg-white/20'
            : 'bg-primary/5 text-ink hover:bg-primary/10'
        )}
        aria-label={t.selectCurrency}
      >
        <span className={cn('font-bold text-sm sm:text-base', onDark ? 'text-carolina' : 'text-primary')}>
          {currentConfig.symbol}
        </span>
        {variant === 'default' && (
          <span className="hidden sm:inline">{selectedCurrency}</span>
        )}
        <ChevronDown
          className={cn(
            'w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-border"
          >
            <div className="p-1">
              {CURRENCIES.map((currency) => {
                const config = CURRENCY_CONFIG[currency];
                const isSelected = currency === selectedCurrency;

                return (
                  <button
                    key={currency}
                    onClick={() => {
                      setCurrency(currency);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors',
                      isSelected
                        ? 'bg-primary/[0.07] text-primary'
                        : 'hover:bg-surface text-ink'
                    )}
                  >
                    <span className="w-6 h-6 flex items-center justify-center bg-primary/5 rounded-full text-primary font-bold text-sm">
                      {config.symbol}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{currency}</p>
                      <p className="text-xs text-text-light">{config.name}</p>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
