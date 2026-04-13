'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Calculator } from 'lucide-react';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';

type ConvertCurrency = 'TRY' | 'USD' | 'EUR' | 'GBP';

// Fallback GBP rate (April 2026)
const FALLBACK_GBP_RATE = 60.00;

export default function CurrencyConverter() {
  const { rates } = useCurrency();
  const { dict } = useLocale();

  const t = dict?.exchangePage?.converter || {
    title: "Döviz Çevirici",
    subtitle: "Anlık kur ile hesaplama",
    amount: "Çevirmek İstediğiniz Miktar",
    result: "Sonuç",
    source: "Kaynak: TCMB • Son güncelleme:"
  };

  const currencies = dict?.exchangePage?.currencies || {
    TRY: "Türk Lirası",
    USD: "Amerikan Doları",
    EUR: "Euro",
    GBP: "İngiliz Sterlini"
  };

  const CURRENCY_INFO: Record<ConvertCurrency, { symbol: string; name: string; flag: string }> = {
    TRY: { symbol: '₺', name: currencies.TRY, flag: '🇹🇷' },
    USD: { symbol: '$', name: currencies.USD, flag: '🇺🇸' },
    EUR: { symbol: '€', name: currencies.EUR, flag: '🇪🇺' },
    GBP: { symbol: '£', name: currencies.GBP, flag: '🇬🇧' },
  };
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState<ConvertCurrency>('USD');
  const [toCurrency, setToCurrency] = useState<ConvertCurrency>('TRY');
  const [result, setResult] = useState<number>(0);

  const getRate = useCallback((currency: ConvertCurrency): number => {
    if (currency === 'TRY') return 1;
    if (currency === 'GBP') return rates?.rates?.GBP || FALLBACK_GBP_RATE;
    return rates?.rates?.[currency] || 1;
  }, [rates]);

  const convert = useCallback(() => {
    const numAmount = parseFloat(amount) || 0;
    const fromRate = getRate(fromCurrency);
    const toRate = getRate(toCurrency);

    // Convert to TRY first, then to target currency
    const inTRY = fromCurrency === 'TRY' ? numAmount : numAmount * fromRate;
    const converted = toCurrency === 'TRY' ? inTRY : inTRY / toRate;

    setResult(converted);
  }, [amount, fromCurrency, toCurrency, getRate]);

  useEffect(() => {
    convert();
  }, [convert]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatResult = (value: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const quickAmounts = [100, 500, 1000, 5000, 10000];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#C9A84C] flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0B1F3A]">{t.title}</h2>
          <p className="text-sm text-gray-500">{t.subtitle}</p>
        </div>
      </div>

      {/* Converter Form */}
      <div className="space-y-6">
        {/* From Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">{t.amount}</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 text-xl sm:text-2xl font-bold text-[#0B1F3A] bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#C9A84C] focus:ring-0 outline-none transition-colors"
                placeholder="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg sm:text-xl text-gray-400">
                {CURRENCY_INFO[fromCurrency].symbol}
              </span>
            </div>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value as ConvertCurrency)}
              className="w-full sm:w-32 px-3 py-3 sm:py-4 bg-[#0B1F3A] text-white font-bold rounded-xl cursor-pointer outline-none"
            >
              {Object.entries(CURRENCY_INFO).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {code}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Amounts */}
          <div className="flex flex-wrap gap-2 mt-2">
            {quickAmounts.map((qa) => (
              <button
                key={qa}
                onClick={() => setAmount(qa.toString())}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-lg transition-colors',
                  amount === qa.toString()
                    ? 'bg-[#C9A84C] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {qa.toLocaleString('tr-TR')}
              </button>
            ))}
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="p-3 bg-gray-100 hover:bg-[#C9A84C] hover:text-white rounded-full transition-colors group"
          >
            <ArrowRightLeft className="w-5 h-5 rotate-90" />
          </button>
        </div>

        {/* To Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">{t.result}</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="w-full px-4 py-3 sm:py-4 text-xl sm:text-2xl font-bold text-[#C9A84C] bg-[#C9A84C]/5 border-2 border-[#C9A84C]/20 rounded-xl">
                {formatResult(result)}
                <span className="text-lg sm:text-xl text-[#C9A84C]/60 ml-2">
                  {CURRENCY_INFO[toCurrency].symbol}
                </span>
              </div>
            </div>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value as ConvertCurrency)}
              className="w-full sm:w-32 px-3 py-3 sm:py-4 bg-[#0B1F3A] text-white font-bold rounded-xl cursor-pointer outline-none"
            >
              {Object.entries(CURRENCY_INFO).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 text-center">
            1 {fromCurrency} = {' '}
            <span className="font-bold text-[#0B1F3A]">
              {fromCurrency === toCurrency
                ? '1.0000'
                : (getRate(fromCurrency) / getRate(toCurrency)).toFixed(4)}
            </span>{' '}
            {toCurrency}
          </p>
          <p className="text-xs text-gray-400 text-center mt-1">
            {t.source} {new Date().toLocaleTimeString('tr-TR')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
