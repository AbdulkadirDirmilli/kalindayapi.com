import { ExchangeRates, ExchangeRatesResponse } from '@/types/exchange';

// Fallback rates (updated manually as backup - April 2026)
const FALLBACK_RATES: ExchangeRates = {
  USD: 44.60,
  EUR: 52.20,
  GBP: 60.00,
  XAU: 6850, // Gram altın fallback fiyatı
};

// GoldAPI.io cache
let cachedGoldPrice: number | null = null;
let goldCacheTimestamp: number = 0;
const GOLD_CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours (free plan: 100 req/month)

// In-memory cache
let cachedRates: ExchangeRatesResponse | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Parse TCMB XML response
function parseTcmbXml(xmlText: string): ExchangeRates | null {
  try {
    // Extract USD, EUR, GBP rates
    const usdMatch = xmlText.match(/<Currency[^>]*CurrencyCode="USD"[^>]*>[\s\S]*?<ForexSelling>([\d.]+)<\/ForexSelling>/);
    const eurMatch = xmlText.match(/<Currency[^>]*CurrencyCode="EUR"[^>]*>[\s\S]*?<ForexSelling>([\d.]+)<\/ForexSelling>/);
    const gbpMatch = xmlText.match(/<Currency[^>]*CurrencyCode="GBP"[^>]*>[\s\S]*?<ForexSelling>([\d.]+)<\/ForexSelling>/);

    if (usdMatch && eurMatch) {
      return {
        USD: parseFloat(usdMatch[1]),
        EUR: parseFloat(eurMatch[1]),
        GBP: gbpMatch ? parseFloat(gbpMatch[1]) : FALLBACK_RATES.GBP,
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
        GBP: data.rates.GBP ? 1 / data.rates.GBP : FALLBACK_RATES.GBP,
      };
    }
    return null;
  } catch (error) {
    console.error('ExchangeRate-API fetch error:', error);
    return null;
  }
}

// Fetch gold price from GoldAPI.io
async function fetchGoldPrice(): Promise<number | null> {
  const now = Date.now();

  // Return cached gold price if still valid
  if (cachedGoldPrice && now - goldCacheTimestamp < GOLD_CACHE_DURATION) {
    return cachedGoldPrice;
  }

  const apiKey = process.env.GOLDAPI_KEY;

  if (!apiKey) {
    console.warn('GOLDAPI_KEY not configured, using fallback gold price');
    return null;
  }

  try {
    const response = await fetch('https://www.goldapi.io/api/XAU/TRY', {
      headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 43200 }, // Cache for 12 hours
    });

    if (!response.ok) {
      throw new Error(`GoldAPI responded with ${response.status}`);
    }

    const data = await response.json();

    // GoldAPI returns price per ounce, convert to gram
    // 1 troy ounce = 31.1035 grams
    if (data.price) {
      const pricePerGram = data.price / 31.1035;
      cachedGoldPrice = Math.round(pricePerGram);
      goldCacheTimestamp = now;
      return cachedGoldPrice;
    }

    return null;
  } catch (error) {
    console.error('GoldAPI fetch error:', error);
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

  // Fetch gold price (runs in parallel-friendly way with its own cache)
  const goldPrice = await fetchGoldPrice();
  rates.XAU = goldPrice || FALLBACK_RATES.XAU;

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
