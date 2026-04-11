import { ExchangeRates, ExchangeRatesResponse } from '@/types/exchange';

// Fallback rates (updated manually as backup)
const FALLBACK_RATES: ExchangeRates = {
  USD: 38.50,
  EUR: 42.00,
};

// In-memory cache
let cachedRates: ExchangeRatesResponse | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Parse TCMB XML response
function parseTcmbXml(xmlText: string): ExchangeRates | null {
  try {
    // Extract USD rate
    const usdMatch = xmlText.match(/<Currency[^>]*CurrencyCode="USD"[^>]*>[\s\S]*?<ForexSelling>([\d.]+)<\/ForexSelling>/);
    const eurMatch = xmlText.match(/<Currency[^>]*CurrencyCode="EUR"[^>]*>[\s\S]*?<ForexSelling>([\d.]+)<\/ForexSelling>/);

    if (usdMatch && eurMatch) {
      return {
        USD: parseFloat(usdMatch[1]),
        EUR: parseFloat(eurMatch[1]),
      };
    }
    return null;
  } catch {
    return null;
  }
}

// Fetch from TCMB (Central Bank of Turkey)
async function fetchFromTcmb(): Promise<ExchangeRates | null> {
  try {
    const response = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml', {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        'Accept': 'application/xml',
      },
    });

    if (!response.ok) {
      throw new Error(`TCMB responded with ${response.status}`);
    }

    const xmlText = await response.text();
    return parseTcmbXml(xmlText);
  } catch (error) {
    console.error('TCMB fetch error:', error);
    return null;
  }
}

// Fetch from ExchangeRate-API (backup)
async function fetchFromExchangeRateApi(): Promise<ExchangeRates | null> {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/TRY', {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`ExchangeRate-API responded with ${response.status}`);
    }

    const data = await response.json();

    if (data.rates && data.rates.USD && data.rates.EUR) {
      // API returns TRY -> USD, we need USD -> TRY
      return {
        USD: 1 / data.rates.USD,
        EUR: 1 / data.rates.EUR,
      };
    }
    return null;
  } catch (error) {
    console.error('ExchangeRate-API fetch error:', error);
    return null;
  }
}

// Main function to get exchange rates
export async function getExchangeRates(): Promise<ExchangeRatesResponse> {
  const now = Date.now();

  // Return cached rates if still valid
  if (cachedRates && now - cacheTimestamp < CACHE_DURATION) {
    return {
      ...cachedRates,
      source: 'cache',
    };
  }

  // Try TCMB first
  let rates = await fetchFromTcmb();
  let source: 'api' | 'fallback' = 'api';

  // Try backup API if TCMB fails
  if (!rates) {
    rates = await fetchFromExchangeRateApi();
  }

  // Use fallback rates if both APIs fail
  if (!rates) {
    rates = FALLBACK_RATES;
    source = 'fallback';
  }

  const response: ExchangeRatesResponse = {
    success: source === 'api',
    rates,
    lastUpdated: new Date().toISOString(),
    source,
  };

  // Update cache
  cachedRates = response;
  cacheTimestamp = now;

  return response;
}

// Get fallback rates (for error states)
export function getFallbackRates(): ExchangeRatesResponse {
  return {
    success: false,
    rates: FALLBACK_RATES,
    lastUpdated: new Date().toISOString(),
    source: 'fallback',
  };
}
