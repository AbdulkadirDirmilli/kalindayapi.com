import { NextResponse } from 'next/server';
import { getExchangeRates, getFallbackRates } from '@/lib/exchangeService';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const rates = await getExchangeRates();

    return NextResponse.json(rates, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Exchange rate API error:', error);

    // Return fallback rates on error
    const fallbackRates = getFallbackRates();

    return NextResponse.json(fallbackRates, {
      status: 200, // Still return 200 with fallback data
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  }
}
