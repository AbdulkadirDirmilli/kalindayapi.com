'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  CurrencyCode,
  CurrencyContextValue,
  ExchangeRatesResponse,
} from '@/types/exchange';
import {
  getSavedCurrency,
  saveCurrency,
  convertFromTRY,
  formatCurrencyPrice,
} from '@/lib/currencyUtils';

const REFRESH_INTERVAL = 30 * 1000; // 30 seconds

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('TRY');
  const [rates, setRates] = useState<ExchangeRatesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch exchange rates
  const fetchRates = useCallback(async () => {
    try {
      const response = await fetch('/api/exchange');
      if (!response.ok) throw new Error('Failed to fetch rates');
      const data: ExchangeRatesResponse = await response.json();
      setRates(data);
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      // Keep existing rates if fetch fails
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize currency from localStorage
  useEffect(() => {
    const saved = getSavedCurrency();
    setSelectedCurrency(saved);
  }, []);

  // Fetch rates on mount and set up auto-refresh
  useEffect(() => {
    fetchRates();

    const interval = setInterval(fetchRates, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchRates]);

  // Set currency and persist to localStorage
  const setCurrency = useCallback((currency: CurrencyCode) => {
    setSelectedCurrency(currency);
    saveCurrency(currency);
  }, []);

  // Convert price from TRY to selected currency
  const convertPrice = useCallback(
    (priceInTRY: number): number => {
      return convertFromTRY(priceInTRY, selectedCurrency, rates?.rates || null);
    },
    [selectedCurrency, rates]
  );

  // Format converted price with currency symbol
  const formatConvertedPrice = useCallback(
    (priceInTRY: number): string => {
      const converted = convertFromTRY(
        priceInTRY,
        selectedCurrency,
        rates?.rates || null
      );
      return formatCurrencyPrice(converted, selectedCurrency);
    },
    [selectedCurrency, rates]
  );

  const value: CurrencyContextValue = {
    selectedCurrency,
    rates,
    isLoading,
    setCurrency,
    convertPrice,
    formatConvertedPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
