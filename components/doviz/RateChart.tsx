'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar } from 'lucide-react';
import { getHistoricalRates, getRateStatistics } from '@/lib/exchangeHistory';
import { cn } from '@/lib/utils';

type Period = 7 | 30 | 90;
type Currency = 'USD' | 'EUR' | 'GBP';

const CURRENCY_COLORS: Record<Currency, string> = {
  USD: '#22c55e',
  EUR: '#3b82f6',
  GBP: '#a855f7',
};

export default function RateChart() {
  const [period, setPeriod] = useState<Period>(30);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');

  const history = getHistoricalRates(period);
  const stats = getRateStatistics(selectedCurrency);

  // Calculate chart data
  const rates = history.map((h) => h[selectedCurrency]);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const range = maxRate - minRate || 1;

  // Generate SVG path
  const chartWidth = 100;
  const chartHeight = 40;
  const points = rates.map((rate, index) => {
    const x = (index / (rates.length - 1)) * chartWidth;
    const y = chartHeight - ((rate - minRate) / range) * chartHeight;
    return `${x},${y}`;
  });
  const pathD = `M ${points.join(' L ')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-[#C9A84C]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0B1F3A]">Kur Grafiği</h2>
            <p className="text-sm text-gray-500">Tarihsel kur verileri</p>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {([7, 30, 90] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                period === p
                  ? 'bg-[#0B1F3A] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {p} Gün
            </button>
          ))}
        </div>
      </div>

      {/* Currency Tabs */}
      <div className="flex gap-2 mb-6">
        {(['USD', 'EUR', 'GBP'] as Currency[]).map((currency) => (
          <button
            key={currency}
            onClick={() => setSelectedCurrency(currency)}
            className={cn(
              'flex-1 py-3 text-sm font-bold rounded-xl transition-all',
              selectedCurrency === currency
                ? 'text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
            style={{
              backgroundColor:
                selectedCurrency === currency ? CURRENCY_COLORS[currency] : undefined,
            }}
          >
            {currency}/TRY
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative h-40 sm:h-48 mb-6 bg-gray-50 rounded-xl p-3 sm:p-4">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={(i * chartHeight) / 4}
              x2={chartWidth}
              y2={(i * chartHeight) / 4}
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          ))}

          {/* Area fill */}
          <path
            d={`${pathD} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`}
            fill={`${CURRENCY_COLORS[selectedCurrency]}20`}
          />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke={CURRENCY_COLORS[selectedCurrency]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Current point */}
          <circle
            cx={chartWidth}
            cy={chartHeight - ((rates[rates.length - 1] - minRate) / range) * chartHeight}
            r="3"
            fill={CURRENCY_COLORS[selectedCurrency]}
          />
        </svg>

        {/* Y-axis labels - Hidden on mobile */}
        <div className="absolute left-1 sm:left-0 top-2 sm:top-0 h-full hidden sm:flex flex-col justify-between text-xs text-gray-400">
          <span>₺{maxRate.toFixed(2)}</span>
          <span>₺{((maxRate + minRate) / 2).toFixed(2)}</span>
          <span>₺{minRate.toFixed(2)}</span>
        </div>

        {/* Mobile: Min/Max only */}
        <div className="absolute right-2 top-2 sm:hidden text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
          <span className="text-green-600">↓₺{minRate.toFixed(2)}</span>
          <span className="mx-1">|</span>
          <span className="text-red-600">↑₺{maxRate.toFixed(2)}</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
          <p className="text-xs text-gray-500 mb-1">Güncel</p>
          <p className="text-base sm:text-lg font-bold text-[#0B1F3A]">₺{stats.current.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
          <p className="text-xs text-gray-500 mb-1">En Düşük ({period}g)</p>
          <p className="text-base sm:text-lg font-bold text-green-600">
            ₺{(period === 7 ? stats.min7d : stats.min30d).toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
          <p className="text-xs text-gray-500 mb-1">En Yüksek ({period}g)</p>
          <p className="text-base sm:text-lg font-bold text-red-600">
            ₺{(period === 7 ? stats.max7d : stats.max30d).toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
          <p className="text-xs text-gray-500 mb-1">Ortalama ({period}g)</p>
          <p className="text-base sm:text-lg font-bold text-[#C9A84C]">
            ₺{(period === 7 ? stats.avg7d : stats.avg30d).toFixed(2)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
