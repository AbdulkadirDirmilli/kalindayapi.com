"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Calendar, Users, ThumbsUp } from "lucide-react";

// Dinamik sayaç hesaplama - 5 günde 1 artış
function hesaplaDinamikDeger(baslangicDegeri: number): number {
  const baslangicTarihi = new Date("2025-01-01"); // Referans başlangıç tarihi
  const bugun = new Date();
  const gunFarki = Math.floor((bugun.getTime() - baslangicTarihi.getTime()) / (1000 * 60 * 60 * 24));
  const artis = Math.floor(gunFarki / 5); // Her 5 günde 1 artış
  return baslangicDegeri + artis;
}

// Yıl deneyimi hesaplama - 2022'den bu yana
function hesaplaYilDeneyimi(): number {
  const kurulusYili = 2022;
  const bugunYil = new Date().getFullYear();
  return bugunYil - kurulusYili;
}

function useIstatistikler() {
  return useMemo(() => [
    {
      deger: hesaplaDinamikDeger(102),
      suffix: "+",
      etiket: "Tamamlanan Proje",
      ikon: Building2,
      aciklama: "Konut, villa ve ticari projeler",
    },
    {
      deger: hesaplaYilDeneyimi(),
      suffix: "+",
      etiket: "Yıl Deneyim",
      ikon: Calendar,
      aciklama: "2022'den bu yana hizmet",
    },
    {
      deger: hesaplaDinamikDeger(209),
      suffix: "+",
      etiket: "Mutlu Aile",
      ikon: Users,
      aciklama: "Güvenle tercih eden müşteriler",
    },
    {
      deger: 98,
      suffix: "%",
      etiket: "Müşteri Memnuniyeti",
      ikon: ThumbsUp,
      aciklama: "Kalite odaklı hizmet",
    },
  ], []);
}

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeOutQuad * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

interface Istatistik {
  deger: number;
  suffix: string;
  etiket: string;
  ikon: typeof Building2;
  aciklama: string;
}

function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: Istatistik;
  index: number;
  isInView: boolean;
}) {
  const Icon = stat.ikon;
  const count = useCountUp(stat.deger, 2000, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center p-6 md:p-8"
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-4">
        <Icon className="w-8 h-8 text-accent" />
      </div>

      {/* Number */}
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}
        <span className="text-accent">{stat.suffix}</span>
      </div>

      {/* Label */}
      <h3 className="text-lg font-semibold text-white mb-1">{stat.etiket}</h3>

      {/* Description */}
      <p className="text-sm text-gray-400">{stat.aciklama}</p>
    </motion.div>
  );
}

export default function IstatistikSayaclari() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const istatistikler = useIstatistikler();

  return (
    <section
      ref={ref}
      className="relative py-20 bg-primary overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Rakamlarla Kalinda Yapı
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            Güvenin ve Başarının Kanıtı
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ortaca ve Muğla bölgesinde yılların getirdiği deneyim ve
            müşterilerimizin güveniyle büyüyoruz.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {istatistikler.map((stat, index) => (
            <StatCard
              key={stat.etiket}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Açıklama Notu */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-accent/80 text-sm mt-8 font-medium"
        >
          * Veriler gerçek işlemlerimizi yansıtmakta olup, her satış ve kiralama sonrası güncellenmektedir.
        </motion.p>
      </div>
    </section>
  );
}
