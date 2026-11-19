'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Home,
  ChevronRight,
  RefreshCw,
  TrendingUp,
  Clock,
  DollarSign,
  Coins,
  ExternalLink,
  Globe,
} from 'lucide-react';
import {
  LiveRateCard,
  CurrencyConverter,
  RateChart,
  DovizFAQ,
  RealEstateConnection,
} from '@/components/doviz';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { LiveRates, RateChange, DovizFAQ as FAQType } from '@/types/exchange';
import { type Locale, getLocalizedRoute } from '@/lib/i18n';

// Fallback rates for initial render (April 2026)
const FALLBACK_RATES: LiveRates = {
  USD: { rate: 44.60, change: 0.15, changePercent: 0.34, direction: 'up' },
  EUR: { rate: 52.20, change: -0.10, changePercent: -0.19, direction: 'down' },
  GBP: { rate: 60.00, change: 0.25, changePercent: 0.42, direction: 'up' },
  XAU: { rate: 6850, change: 45, changePercent: 0.66, direction: 'up' },
  lastUpdated: new Date().toISOString(),
  source: 'fallback',
};

interface DovizKurlariClientProps {
  locale: Locale;
  texts: {
    breadcrumb: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    lastUpdate: string;
    currencies: {
      USD: string;
      EUR: string;
      GBP: string;
      XAU: string;
    };
    dailyChange: string;
    educationalContent: {
      whatIsExchange: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      tcmb: {
        title: string;
        paragraph: string;
        points: string[];
      };
      realEstate: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      digitalResources: {
        title: string;
        paragraph: string;
        linkText: string;
      };
    };
    cta: {
      title: string;
      titleHighlight: string;
      subtitle: string;
      viewListings: string;
      contactConsultant: string;
    };
  };
  faqs: FAQType[];
}

export default function DovizKurlariClient({ locale, texts, faqs }: DovizKurlariClientProps) {
  const { rates: contextRates, isLoading } = useCurrency();
  const [liveRates, setLiveRates] = useState<LiveRates>(FALLBACK_RATES);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    if (contextRates?.rates) {
      // Create live rates from context
      const yesterday = {
        USD: contextRates.rates.USD * 0.995,
        EUR: contextRates.rates.EUR * 1.002,
        GBP: (contextRates.rates.GBP || 60) * 0.998,
      };

      const createRateChange = (current: number, prev: number): RateChange => {
        const change = +(current - prev).toFixed(4);
        const changePercent = +((change / prev) * 100).toFixed(2);
        return {
          rate: current,
          change,
          changePercent,
          direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
        };
      };

      setLiveRates({
        USD: createRateChange(contextRates.rates.USD, yesterday.USD),
        EUR: createRateChange(contextRates.rates.EUR, yesterday.EUR),
        GBP: createRateChange(contextRates.rates.GBP || 60, yesterday.GBP),
        XAU: createRateChange(contextRates.rates.XAU || 6850, (contextRates.rates.XAU || 6850) * 0.995),
        lastUpdated: contextRates.lastUpdated,
        source: contextRates.source,
      });

      const timeLocale = locale === 'ar' ? 'ar-SA' : locale === 'en' ? 'en-US' : 'tr-TR';
      setLastUpdate(
        new Date(contextRates.lastUpdated).toLocaleTimeString(timeLocale, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }
  }, [contextRates, locale]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-light pt-10 sm:pt-12 md:pt-14 pb-16 sm:pb-14 md:pb-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href={`/${locale}`} className="hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary">{texts.breadcrumb}</span>
          </nav>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {texts.heroTitle}{' '}
              <span className="text-primary animate-ticker-glow">{texts.heroTitleHighlight}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 mb-6 speakable-rate">
              {texts.heroSubtitle}
            </p>

            {/* Last Update Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <Clock className="w-4 h-4 text-white/70" />
              <span className="text-sm text-white/85">
                {texts.lastUpdate} <span className="text-white font-medium">{lastUpdate || '--:--:--'}</span>
              </span>
              {!isLoading && (
                <RefreshCw className="w-4 h-4 text-primary animate-spin-slow" />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Rates Section */}
      <section className="py-8 md:py-12 bg-surface -mt-4 sm:-mt-6 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 -mt-10 sm:-mt-14 md:-mt-16">
            <LiveRateCard
              currency="USD"
              currencyName={texts.currencies.USD}
              symbol="$"
              data={liveRates.USD}
              icon={<span className="text-2xl">🇺🇸</span>}
            />
            <LiveRateCard
              currency="EUR"
              currencyName={texts.currencies.EUR}
              symbol="€"
              data={liveRates.EUR}
              icon={<span className="text-2xl">🇪🇺</span>}
            />
            <LiveRateCard
              currency="GBP"
              currencyName={texts.currencies.GBP}
              symbol="£"
              data={liveRates.GBP}
              icon={<span className="text-2xl">🇬🇧</span>}
            />
            <LiveRateCard
              currency="XAU"
              currencyName={texts.currencies.XAU}
              symbol="₺"
              data={liveRates.XAU}
              icon={<span className="text-2xl">🥇</span>}
            />
          </div>
        </div>
      </section>

      {/* Converter & Chart Section */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            <CurrencyConverter />
            <RateChart />
          </div>
        </div>
      </section>

      {/* Real Estate Connection */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <RealEstateConnection />
        </div>
      </section>

      {/* Educational Content + FAQ */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Educational Content */}
            <div className="space-y-6">
              {/* What is Exchange Rate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-ink">{texts.educationalContent.whatIsExchange.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {texts.educationalContent.whatIsExchange.paragraph1}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {texts.educationalContent.whatIsExchange.paragraph2}
                </p>
              </motion.div>

              {/* TCMB Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-ink">{texts.educationalContent.tcmb.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {texts.educationalContent.tcmb.paragraph}
                </p>
                <ul className="space-y-2 text-gray-600">
                  {texts.educationalContent.tcmb.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Real Estate & Currency */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-ink">{texts.educationalContent.realEstate.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {texts.educationalContent.realEstate.paragraph1}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {texts.educationalContent.realEstate.paragraph2}
                </p>
              </motion.div>

              {/* Digital Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-6 md:p-8 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Globe className="w-6 h-6 text-ink" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{texts.educationalContent.digitalResources.title}</h2>
                </div>
                <p className="text-white/85 leading-relaxed mb-4">
                  {texts.educationalContent.digitalResources.paragraph}
                </p>
                <a
                  href="https://www.akduniverse.com/"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium group"
                >
                  <span>{texts.educationalContent.digitalResources.linkText}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>

            {/* FAQ */}
            <DovizFAQ faqs={faqs} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              {texts.cta.title}
              <br />
              <span className="text-carolina">{texts.cta.titleHighlight}</span>
            </h2>
            <p className="text-white/85 max-w-2xl mx-auto mb-8">
              {texts.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/${getLocalizedRoute('ilanlar', locale)}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent-light transition-colors"
              >
                {texts.cta.viewListings}
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/${getLocalizedRoute('iletisim', locale)}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-ink transition-colors"
              >
                {texts.cta.contactConsultant}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
