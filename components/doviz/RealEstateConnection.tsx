'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, TrendingUp, Users, ArrowRight, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { getTamamlananProjeSayisi, hesaplaYilDeneyimi } from '@/lib/utils';

export default function RealEstateConnection() {
  const { setCurrency } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] p-8 md:p-10"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C9A84C] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
            <Home className="w-7 h-7 text-[#0B1F3A]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Döviz Kurları ve Emlak Yatırımı
            </h2>
            <p className="text-gray-300">
              Yabancı yatırımcılar için ideal fırsat dönemi
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <TrendingUp className="w-6 h-6 text-[#C9A84C] mb-2" />
            <h3 className="font-semibold text-white mb-1">Kur Avantajı</h3>
            <p className="text-sm text-gray-300">
              Dolar ve Euro bazında uygun emlak fiyatları
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <Users className="w-6 h-6 text-[#C9A84C] mb-2" />
            <h3 className="font-semibold text-white mb-1">Uzman Danışmanlık</h3>
            <p className="text-sm text-gray-300">
              Yabancı yatırımcılara özel hizmet
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <Home className="w-6 h-6 text-[#C9A84C] mb-2" />
            <h3 className="font-semibold text-white mb-1">Geniş Portföy</h3>
            <p className="text-sm text-gray-300">
              Villa, daire, arsa seçenekleri
            </p>
          </div>
        </div>

        {/* Info Text */}
        <p className="text-gray-300 mb-8 leading-relaxed">
          Muğla Ortaca, Dalyan ve çevresinde yatırım yapmak isteyen yabancı müşterilerimize
          döviz bazlı fiyat hesaplama ve danışmanlık hizmeti sunuyoruz. Güncel döviz kurlarını
          takip ederek, en uygun zamanda yatırım yapmanıza yardımcı oluyoruz.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/ilanlar" className="flex-1">
            <Button
              variant="accent"
              size="lg"
              className="w-full"
              onClick={() => setCurrency('USD')}
            >
              <span>İlanları Dolar ile Görüntüle</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <a href="tel:+905370530754" className="flex-1">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-white text-white hover:bg-white hover:text-[#0B1F3A]"
            >
              <Phone className="w-5 h-5" />
              <span>Danışman Ara</span>
            </Button>
          </a>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-400">
          <span>✓ {getTamamlananProjeSayisi()}+ Tamamlanan Proje</span>
          <span>✓ {hesaplaYilDeneyimi()}+ Yıl Deneyim</span>
          <span>✓ %98 Müşteri Memnuniyeti</span>
        </div>
      </div>
    </motion.div>
  );
}
