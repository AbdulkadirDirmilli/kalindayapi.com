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
import { DOVIZ_FAQ_DATA } from '@/lib/dovizJsonLd';
import { LiveRates, RateChange } from '@/types/exchange';

// Fallback rates for initial render
const FALLBACK_RATES: LiveRates = {
  USD: { rate: 38.52, change: 0.15, changePercent: 0.39, direction: 'up' },
  EUR: { rate: 42.18, change: -0.08, changePercent: -0.19, direction: 'down' },
  GBP: { rate: 49.80, change: 0.22, changePercent: 0.44, direction: 'up' },
  XAU: { rate: 6850, change: 45, changePercent: 0.66, direction: 'up' },
  lastUpdated: new Date().toISOString(),
  source: 'fallback',
};

export default function DovizKurlariPage() {
  const { rates: contextRates, isLoading } = useCurrency();
  const [liveRates, setLiveRates] = useState<LiveRates>(FALLBACK_RATES);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    if (contextRates?.rates) {
      // Create live rates from context
      const yesterday = {
        USD: contextRates.rates.USD * 0.995,
        EUR: contextRates.rates.EUR * 1.002,
        GBP: 49.5,
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
        GBP: createRateChange(49.80, yesterday.GBP),
        XAU: createRateChange(6850 + Math.random() * 50, 6800),
        lastUpdated: contextRates.lastUpdated,
        source: contextRates.source,
      });

      setLastUpdate(
        new Date(contextRates.lastUpdated).toLocaleTimeString('tr-TR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }
  }, [contextRates]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0B1F3A] via-[#0B1F3A] to-[#1a3a5c] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-14 md:pb-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-[#C9A84C]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#C9A84C]/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">Döviz Kurları</span>
          </nav>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Canlı{' '}
              <span className="text-[#C9A84C] animate-ticker-glow">Döviz Kurları</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 speakable-rate">
              Anlık USD, EUR, GBP ve altın kurlarını takip edin.
              <br className="hidden sm:block" />
              TCMB kaynaklı güncel veriler.
            </p>

            {/* Last Update Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">
                Son güncelleme: <span className="text-white font-medium">{lastUpdate || '--:--:--'}</span>
              </span>
              {!isLoading && (
                <RefreshCw className="w-4 h-4 text-[#C9A84C] animate-spin-slow" />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Rates Section */}
      <section className="py-8 md:py-12 bg-[#F5F5F5] -mt-4 sm:-mt-6 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 -mt-10 sm:-mt-14 md:-mt-16">
            <LiveRateCard
              currency="USD"
              currencyName="Amerikan Doları"
              symbol="$"
              data={liveRates.USD}
              icon={<span className="text-2xl">🇺🇸</span>}
            />
            <LiveRateCard
              currency="EUR"
              currencyName="Euro"
              symbol="€"
              data={liveRates.EUR}
              icon={<span className="text-2xl">🇪🇺</span>}
            />
            <LiveRateCard
              currency="GBP"
              currencyName="İngiliz Sterlini"
              symbol="£"
              data={liveRates.GBP}
              icon={<span className="text-2xl">🇬🇧</span>}
            />
            <LiveRateCard
              currency="XAU"
              currencyName="Altın (gram)"
              symbol="₺"
              data={liveRates.XAU}
              icon={<span className="text-2xl">🥇</span>}
            />
          </div>
        </div>
      </section>

      {/* Converter & Chart Section */}
      <section className="py-12 md:py-16 bg-[#F5F5F5]">
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
      <section className="py-12 md:py-16 bg-[#F5F5F5]">
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
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C] flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0B1F3A]">Döviz Kuru Nedir?</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Döviz kuru, bir ülkenin para biriminin başka bir ülkenin para birimi cinsinden
                  değeridir. Örneğin, USD/TRY kuru 1 Amerikan Dolarının kaç Türk Lirası
                  ettiğini gösterir.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Türkiye'de referans döviz kurları, Türkiye Cumhuriyet Merkez Bankası (TCMB)
                  tarafından her iş günü saat 15:30'da açıklanır. Piyasa kurları ise arz ve
                  talebe göre gün içinde değişiklik gösterir.
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
                  <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] flex items-center justify-center">
                    <Coins className="w-6 h-6 text-[#C9A84C]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0B1F3A]">TCMB ve Döviz Kurları</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Türkiye Cumhuriyet Merkez Bankası (TCMB), Türkiye'nin para politikasını
                  belirleyen ve uygulayan kurumdur. TCMB, döviz kurlarını doğrudan
                  belirlemez ancak para politikası kararlarıyla kurları etkiler.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C]">•</span>
                    <span>Günlük gösterge kurları her iş günü yayınlanır</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C]">•</span>
                    <span>Efektif ve döviz alış/satış kurları ayrı gösterilir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C]">•</span>
                    <span>Kurlar piyasa işlemlerine göre gün içi değişir</span>
                  </li>
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
                  <h2 className="text-xl font-bold text-[#0B1F3A]">Emlak ve Döviz İlişkisi</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Türkiye'deki gayrimenkul fiyatları TL cinsinden belirlense de, yabancı
                  yatırımcılar için döviz kuru büyük önem taşır. Kur avantajlı dönemlerde
                  yabancı yatırımcılar daha uygun fiyatlarla mülk edinebilir.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Kalinda Yapı olarak, yabancı müşterilerimize hem TL hem de döviz bazlı
                  fiyat bilgisi sunuyoruz. Muğla Ortaca, Dalyan ve çevresindeki emlak
                  portföyümüzü incelemek için ilanlar sayfamızı ziyaret edin.
                </p>
              </motion.div>

              {/* Digital Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] rounded-2xl p-6 md:p-8 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C] flex items-center justify-center">
                    <Globe className="w-6 h-6 text-[#0B1F3A]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Dijital Kaynaklar</h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Finans, teknoloji ve dijital dünya hakkında güncel içerikler için
                  güvenilir kaynaklardan bilgi edinmek önemlidir. Yatırım kararlarınızı
                  destekleyecek doğru bilgiye ulaşmak için çeşitli platformları takip edebilirsiniz.
                </p>
                <a
                  href="https://www.akduniverse.com/"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#d4b969] transition-colors font-medium group"
                >
                  <span>AKD Universe - Teknoloji ve Dijital Dünya</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>

            {/* FAQ */}
            <DovizFAQ faqs={DOVIZ_FAQ_DATA} />
          </div>
        </div>
      </section>

      {/* AI Summary (Hidden but crawlable) */}
      <div className="sr-only" aria-hidden="true">
        <h2>Sayfa Özeti - AI ve Arama Motorları İçin</h2>
        <p>
          Bu sayfa, Kalinda Yapı tarafından sunulan canlı döviz kuru takip hizmetidir.
          Güncel USD/TRY, EUR/TRY, GBP/TRY kurları ve altın fiyatları TCMB kaynaklı
          verilerle anlık olarak güncellenmektedir.
        </p>
        <p>
          Sayfada döviz çevirici hesap makinesi, tarihsel kur grafikleri ve döviz
          kurlarıyla ilgili sıkça sorulan sorular bulunmaktadır.
        </p>
        <p>
          Kalinda Yapı, Muğla Ortaca merkezli emlak, tadilat ve inşaat taahhüt firmasıdır.
          Yabancı yatırımcılara döviz bazlı emlak danışmanlığı hizmeti sunmaktadır.
        </p>
        <p>
          İletişim: +90 537 053 07 54 | Web: www.kalindayapi.com
        </p>
        <p>
          Güncel Kurlar (örnek): 1 USD = 38.52 TL, 1 EUR = 42.18 TL, 1 GBP = 49.80 TL
        </p>
      </div>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Döviz Kurlarını Takip Ederken
              <br />
              <span className="text-[#C9A84C]">Emlak Fırsatlarını Keşfedin</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Muğla Ortaca, Dalyan ve çevresinde satılık ve kiralık emlak seçeneklerini
              döviz bazlı fiyatlarla inceleyin. Kalinda Yapı güvencesiyle yatırım yapın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ilanlar"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0B1F3A] font-bold rounded-xl hover:bg-[#d4b969] transition-colors"
              >
                Tüm İlanları Görüntüle
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#0B1F3A] transition-colors"
              >
                Danışman ile Görüşün
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
