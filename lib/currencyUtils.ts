import { CurrencyCode, ExchangeRates } from '@/types/exchange';

// Currency configuration
export const CURRENCY_CONFIG: Record<CurrencyCode, {
  symbol: string;
  name: string;
  locale: string;
  code: string;
}> = {
  TRY: { symbol: '₺', name: 'Türk Lirası', locale: 'tr-TR', code: 'TRY' },
  USD: { symbol: '$', name: 'Amerikan Doları', locale: 'en-US', code: 'USD' },
  EUR: { symbol: '€', name: 'Euro', locale: 'de-DE', code: 'EUR' },
};

// localStorage key
export const CURRENCY_STORAGE_KEY = 'kalinda_currency';

// Get saved currency from localStorage
export function getSavedCurrency(): CurrencyCode {
  if (typeof window === 'undefined') return 'TRY';

  try {
    const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (saved && (saved === 'TRY' || saved === 'USD' || saved === 'EUR')) {
      return saved as CurrencyCode;
    }
  } catch {
    // localStorage not available
  }
  return 'TRY';
}

// Save currency to localStorage
export function saveCurrency(currency: CurrencyCode): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  } catch {
    // localStorage not available
  }
}

// Convert price from TRY to target currency
export function convertFromTRY(
  priceInTRY: number,
  targetCurrency: CurrencyCode,
  rates: ExchangeRates | null
): number {
  if (targetCurrency === 'TRY' || !rates) {
    return priceInTRY;
  }

  const rate = rates[targetCurrency];
  if (!rate || rate === 0) {
    return priceInTRY;
  }

  return priceInTRY / rate;
}

// Format price with currency symbol
export function formatCurrencyPrice(
  price: number,
  currency: CurrencyCode,
  options?: {
    showDecimals?: boolean;
    compact?: boolean;
  }
): string {
  const config = CURRENCY_CONFIG[currency];
  const { showDecimals = false, compact = false } = options || {};

  let formattedPrice: string;

  if (compact && price >= 1000000) {
    // Format as millions (e.g., 1.5M)
    const millions = price / 1000000;
    formattedPrice = millions.toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (compact && price >= 1000) {
    // Format as thousands (e.g., 150K)
    const thousands = price / 1000;
    formattedPrice = thousands.toFixed(0) + 'K';
  } else {
    formattedPrice = new Intl.NumberFormat(config.locale, {
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
    }).format(Math.round(price));
  }

  // Return with symbol
  if (currency === 'TRY') {
    return `${formattedPrice} ₺`;
  }
  return `${config.symbol}${formattedPrice}`;
}

// Format rate for display (e.g., "$ 38.50")
export function formatRate(currency: 'USD' | 'EUR', rate: number): string {
  const symbol = CURRENCY_CONFIG[currency].symbol;
  return `${symbol} ${rate.toFixed(2)}`;
}

// Get equivalent prices in all currencies
export function getEquivalentPrices(
  priceInTRY: number,
  rates: ExchangeRates | null,
  excludeCurrency?: CurrencyCode
): { currency: CurrencyCode; price: number; formatted: string }[] {
  const currencies: CurrencyCode[] = ['TRY', 'USD', 'EUR'];

  return currencies
    .filter(c => c !== excludeCurrency)
    .map(currency => {
      const price = convertFromTRY(priceInTRY, currency, rates);
      return {
        currency,
        price,
        formatted: formatCurrencyPrice(price, currency),
      };
    });
}
