import { LiveRates, RateChange, HistoricalRate } from '@/types/exchange';

// Simulated historical data (in production, this would come from a database)
// TCMB provides historical data but requires authentication
const SIMULATED_HISTORY: HistoricalRate[] = generateHistoricalData();

function generateHistoricalData(): HistoricalRate[] {
  const data: HistoricalRate[] = [];
  const today = new Date();

  // Base rates with small variations
  const baseUSD = 38.50;
  const baseEUR = 42.00;
  const baseGBP = 49.80;

  for (let i = 90; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Add realistic daily fluctuations (±1%)
    const variation = () => (Math.random() - 0.5) * 0.02;

    data.push({
      date: date.toISOString().split('T')[0],
      USD: +(baseUSD * (1 + variation() + (90 - i) * 0.0005)).toFixed(4),
      EUR: +(baseEUR * (1 + variation() + (90 - i) * 0.0004)).toFixed(4),
      GBP: +(baseGBP * (1 + variation() + (90 - i) * 0.0003)).toFixed(4),
    });
  }

  return data;
}

// Fallback live rates
const FALLBACK_LIVE_RATES: LiveRates = {
  USD: { rate: 38.52, change: 0.15, changePercent: 0.39, direction: 'up' },
  EUR: { rate: 42.18, change: -0.08, changePercent: -0.19, direction: 'down' },
  GBP: { rate: 49.80, change: 0.22, changePercent: 0.44, direction: 'up' },
  XAU: { rate: 6850, change: 45, changePercent: 0.66, direction: 'up' },
  lastUpdated: new Date().toISOString(),
  source: 'fallback',
};

// Calculate rate change from previous day
function calculateRateChange(current: number, previous: number): RateChange {
  const change = +(current - previous).toFixed(4);
  const changePercent = +((change / previous) * 100).toFixed(2);

  return {
    rate: current,
    change,
    changePercent,
    direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
  };
}

// Get live rates with changes
export async function getLiveRates(): Promise<LiveRates> {
  try {
    // Fetch current rates from our API
    const response = await fetch('/api/exchange', {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch rates');
    }

    const data = await response.json();
    const currentRates = data.rates;

    // Get yesterday's rates for comparison
    const history = SIMULATED_HISTORY;
    const yesterday = history[history.length - 2];

    // Get rates from API response (GBP simulated, XAU from GoldAPI)
    const gbpRate = currentRates.GBP || 49.80;
    const xauRate = currentRates.XAU || 6850; // Dynamic from GoldAPI.io

    // Calculate changes based on previous values (slight variation for demo)
    const prevXau = xauRate * (1 - (Math.random() * 0.01)); // ~1% variation for change display

    return {
      USD: calculateRateChange(currentRates.USD, yesterday?.USD || currentRates.USD * 0.995),
      EUR: calculateRateChange(currentRates.EUR, yesterday?.EUR || currentRates.EUR * 1.002),
      GBP: calculateRateChange(gbpRate, yesterday?.GBP || gbpRate * 0.998),
      XAU: calculateRateChange(xauRate, prevXau),
      lastUpdated: data.lastUpdated,
      source: data.source,
    };
  } catch (error) {
    console.error('Failed to get live rates:', error);
    return FALLBACK_LIVE_RATES;
  }
}

// Get historical data for charts
export function getHistoricalRates(days: 7 | 30 | 90 = 30): HistoricalRate[] {
  return SIMULATED_HISTORY.slice(-days);
}

// Get rate statistics
export function getRateStatistics(currency: 'USD' | 'EUR' | 'GBP') {
  const history = SIMULATED_HISTORY;
  const last7 = history.slice(-7);
  const last30 = history.slice(-30);

  const rates7 = last7.map(h => h[currency]);
  const rates30 = last30.map(h => h[currency]);

  return {
    currency,
    current: history[history.length - 1][currency],
    min7d: Math.min(...rates7),
    max7d: Math.max(...rates7),
    avg7d: +(rates7.reduce((a, b) => a + b, 0) / rates7.length).toFixed(4),
    min30d: Math.min(...rates30),
    max30d: Math.max(...rates30),
    avg30d: +(rates30.reduce((a, b) => a + b, 0) / rates30.length).toFixed(4),
  };
}

// Format rate for display
export function formatRate(rate: number, currency: string): string {
  if (currency === 'XAU') {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(rate);
  }

  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(rate);
}

// Format change percentage
export function formatChangePercent(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}
