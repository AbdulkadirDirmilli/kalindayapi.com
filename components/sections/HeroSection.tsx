"use client";

import { useRef, useMemo } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Search, Phone, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

// Dinamik sayaç hesaplama - 5 günde 1 artış
function hesaplaDinamikDeger(baslangicDegeri: number): number {
  const baslangicTarihi = new Date("2025-01-01");
  const bugun = new Date();
  const gunFarki = Math.floor((bugun.getTime() - baslangicTarihi.getTime()) / (1000 * 60 * 60 * 24));
  const artis = Math.floor(gunFarki / 5);
  return baslangicDegeri + artis;
}

// Yıl deneyimi hesaplama - 2022'den bu yana
function hesaplaYilDeneyimi(): number {
  const kurulusYili = 2022;
  const bugunYil = new Date().getFullYear();
  return bugunYil - kurulusYili;
}

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero/dalyan-hero.jpg')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/80 to-primary/90" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium">2022'den Bu Yana Hizmetinizdeyiz</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Ortaca'nın Güvenilir
            <br />
            <span className="text-accent">Yapı & Emlak</span> Ortağı
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Muğla Ortaca'da emlak danışmanlığı, tadilat ve taahhüt hizmetleri.
            Hayalinizdeki eve veya projeye bir adım daha yakınsınız.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/ilanlar">
              <Button
                variant="accent"
                size="lg"
                leftIcon={<Search className="w-5 h-5" />}
              >
                İlanları Keşfet
              </Button>
            </Link>
            <Link href="/iletisim">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Phone className="w-5 h-5" />}
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Ücretsiz Danışmanlık Al
              </Button>
            </Link>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-16"
          >
            {[
              { value: `${hesaplaDinamikDeger(102)}+`, label: "Tamamlanan Proje" },
              { value: `${hesaplaYilDeneyimi()}+`, label: "Yıl Deneyim" },
              { value: `${hesaplaDinamikDeger(209)}+`, label: "Mutlu Aile" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Aşağı kaydır"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
}
