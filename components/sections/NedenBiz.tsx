"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  MapPin,
  ShieldCheck,
  FileText,
  Users,
  Clock,
} from "lucide-react";

const ozellikler = [
  {
    ikon: Award,
    baslik: "Lisanslı Danışman",
    aciklama:
      "Resmi olarak sertifikalı emlak danışmanımızla güvenilir hizmet alırsınız.",
  },
  {
    ikon: MapPin,
    baslik: "Yerel Bilgi",
    aciklama:
      "Ortaca ve çevresini avucumuzun içi gibi biliyoruz. Bölgenin dinamiklerine hakimiz.",
  },
  {
    ikon: ShieldCheck,
    baslik: "Garantili İşçilik",
    aciklama:
      "Tüm tadilat ve inşaat işlerimizde işçilik garantisi sunuyoruz.",
  },
  {
    ikon: FileText,
    baslik: "Şeffaf Sözleşme",
    aciklama:
      "Tüm işlemlerimiz yazılı sözleşme ile güvence altındadır. Gizli maliyet yoktur.",
  },
  {
    ikon: Users,
    baslik: "Kişisel İlgi",
    aciklama:
      "Her müşterimize özel ilgi gösteriyoruz. İhtiyaçlarınızı anlamak önceliğimiz.",
  },
  {
    ikon: Clock,
    baslik: "Zamanında Teslimat",
    aciklama:
      "Projelerimizi söz verdiğimiz sürede tamamlıyoruz. Zamana değer veriyoruz.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function NedenBiz() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Farkımız
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            Neden Kalinda Yapı?
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            Ortaca ve Muğla bölgesinde güvenle tercih edilmemizin sebepleri.
            Kalite ve müşteri memnuniyeti odaklı çalışıyoruz.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {ozellikler.map((ozellik) => {
            const Icon = ozellik.ikon;
            return (
              <motion.div
                key={ozellik.baslik}
                variants={itemVariants}
                className="flex gap-4 p-6 rounded-2xl hover:bg-surface transition-colors group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {ozellik.baslik}
                  </h3>
                  <p className="text-text-light text-sm leading-relaxed">
                    {ozellik.aciklama}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-12 border-t border-border"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-sm text-text-muted">Hizmet Bölgesi</p>
              <p className="font-bold text-primary">Muğla'nın Tüm İlçeleri</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-sm text-text-muted">Kuruluş</p>
              <p className="font-bold text-primary">2012'den Bu Yana</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-sm text-text-muted">Müşteri Memnuniyeti</p>
              <p className="font-bold text-accent">%98</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
