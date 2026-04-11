export type CurrencyCode = 'TRY' | 'USD' | 'EUR' | 'GBP';

export interface ExchangeRates {
  USD: number;
  EUR: number;
  GBP?: number;
}

export interface ExtendedRates extends ExchangeRates {
  GBP: number;
  XAU: number; // Altın (gram)
}

export interface RateChange {
  rate: number;
  change: number;
  changePercent: number;
  direction: 'up' | 'down' | 'stable';
}

export interface LiveRates {
  USD: RateChange;
  EUR: RateChange;
  GBP: RateChange;
  XAU: RateChange;
  lastUpdated: string;
  source: 'api' | 'cache' | 'fallback';
}

export interface HistoricalRate {
  date: string;
  USD: number;
  EUR: number;
  GBP: number;
}

export interface RateStatistics {
  currency: CurrencyCode | 'GBP';
  current: number;
  min7d: number;
  max7d: number;
  avg7d: number;
  min30d: number;
  max30d: number;
  avg30d: number;
}

export interface ExchangeRatesResponse {
  success: boolean;
  rates: ExchangeRates;
  lastUpdated: string;
  source: 'api' | 'cache' | 'fallback';
}

export interface CurrencyContextValue {
  selectedCurrency: CurrencyCode;
  rates: ExchangeRatesResponse | null;
  isLoading: boolean;
  setCurrency: (currency: CurrencyCode) => void;
  convertPrice: (priceInTRY: number) => number;
  formatConvertedPrice: (priceInTRY: number) => string;
}

// FAQ tipi
export interface DovizFAQ {
  question: string;
  answer: string;
}
