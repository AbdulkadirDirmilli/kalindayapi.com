"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Calendar, Users, ThumbsUp } from "lucide-react";

const istatistikler = [
  {
    deger: 500,
    suffix: "+",
    etiket: "Tamamlanan Proje",
    ikon: Building2,
    aciklama: "Konut, villa ve ticari projeler",
  },
  {
    deger: 12,
    suffix: "+",
    etiket: "Yıl Deneyim",
    ikon: Calendar,
    aciklama: "2012'den bu yana hizmet",
  },
  {
    deger: 300,
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
];

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

function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: (typeof istatistikler)[0];
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
        <Icon className="w-8 h-8 text-[#C9A84C]" />
      </div>

      {/* Number */}
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}
        <span className="text-[#C9A84C]">{stat.suffix}</span>
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

  return (
    <section
      ref={ref}
      className="relative py-20 bg-[#0B1F3A] overflow-hidden"
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
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#C9A84C]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
            Rakamlarla Kalında Yapı
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
      </div>
    </section>
  );
}
