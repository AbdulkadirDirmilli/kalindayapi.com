"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Award,
  MapPin,
  ShieldCheck,
  FileText,
  Users,
  Clock,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

// İlçe listesi ve slug'ları
const ilceler = [
  { ad: "Ortaca", slug: "ortaca" },
  { ad: "Dalyan", slug: "dalyan" },
  { ad: "Köyceğiz", slug: "koycegiz" },
  { ad: "Dalaman", slug: "dalaman" },
  { ad: "Fethiye", slug: "fethiye" },
  { ad: "Marmaris", slug: "marmaris" },
  { ad: "Bodrum", slug: "bodrum" },
  { ad: "Milas", slug: "milas" },
  { ad: "Menteşe", slug: "mentese" },
  { ad: "Datça", slug: "datca" },
  { ad: "Ula", slug: "ula" },
  { ad: "Yatağan", slug: "yatagan" },
  { ad: "Kavaklıdere", slug: "kavaklidere" },
  { ad: "Seydikemer", slug: "seydikemer" },
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

interface NedenBizProps {
  lang?: Locale;
  dict?: any;
}

export default function NedenBiz({ lang = 'tr', dict }: NedenBizProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Fallback translations
  const t = dict?.home?.whyUs || {
    badge: "Farkımız",
    title: "Neden Kalinda Yapı?",
    subtitle: "Ortaca ve Muğla bölgesinde güvenle tercih edilmemizin sebepleri. Kalite ve müşteri memnuniyeti odaklı çalışıyoruz.",
    licensedConsultant: "Lisanslı Danışman",
    licensedConsultantDesc: "Resmi olarak sertifikalı emlak danışmanımızla güvenilir hizmet alırsınız.",
    localKnowledge: "Yerel Bilgi",
    localKnowledgeDesc: "Ortaca ve çevresini avucumuzun içi gibi biliyoruz. Bölgenin dinamiklerine hakimiz.",
    guaranteedWork: "Garantili İşçilik",
    guaranteedWorkDesc: "Tüm tadilat ve inşaat işlerimizde işçilik garantisi sunuyoruz.",
    transparentContract: "Şeffaf Sözleşme",
    transparentContractDesc: "Tüm işlemlerimiz yazılı sözleşme ile güvence altındadır. Gizli maliyet yoktur.",
    personalAttention: "Kişisel İlgi",
    personalAttentionDesc: "Her müşterimize özel ilgi gösteriyoruz. İhtiyaçlarınızı anlamak önceliğimiz.",
    onTimeDelivery: "Zamanında Teslimat",
    onTimeDeliveryDesc: "Projelerimizi söz verdiğimiz sürede tamamlıyoruz. Zamana değer veriyoruz.",
    serviceArea: "Hizmet Bölgesi",
    allDistricts: "Muğla'nın Tüm İlçeleri",
    established: "Kuruluş",
    since2022: "2022'den Bu Yana",
    customerSatisfaction: "Müşteri Memnuniyeti",
    serviceNote: "Emlak, tadilat ve inşaat hizmetlerimiz ile tüm Muğla ilçelerinde yanınızdayız",
  };

  const ozellikler = [
    {
      ikon: Award,
      baslik: t.licensedConsultant,
      aciklama: t.licensedConsultantDesc,
    },
    {
      ikon: MapPin,
      baslik: t.localKnowledge,
      aciklama: t.localKnowledgeDesc,
    },
    {
      ikon: ShieldCheck,
      baslik: t.guaranteedWork,
      aciklama: t.guaranteedWorkDesc,
    },
    {
      ikon: FileText,
      baslik: t.transparentContract,
      aciklama: t.transparentContractDesc,
    },
    {
      ikon: Users,
      baslik: t.personalAttention,
      aciklama: t.personalAttentionDesc,
    },
    {
      ikon: Clock,
      baslik: t.onTimeDelivery,
      aciklama: t.onTimeDeliveryDesc,
    },
  ];

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
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            {t.title}
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {ozellikler.map((ozellik, index) => {
            const Icon = ozellik.ikon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-4 p-6 rounded-2xl hover:bg-surface transition-colors group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
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
              <p className="text-sm text-text-muted">{t.serviceArea}</p>
              <p className="font-bold text-primary">{t.allDistricts}</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-sm text-text-muted">{t.established}</p>
              <p className="font-bold text-primary">{t.since2022}</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-sm text-text-muted">{t.customerSatisfaction}</p>
              <p className="font-bold text-accent">%98</p>
            </div>
          </div>

          {/* Muğla İlçeleri - SEO */}
          <div className="mt-8 pt-8 border-t border-border/50">
            <p className="text-center text-sm text-text-muted mb-4">
              <MapPin className="inline-block w-4 h-4 mr-1 text-accent" />
              {t.serviceNote}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {ilceler.map((ilce) => (
                <Link
                  key={ilce.slug}
                  href={`/${lang}/rehber/${ilce.slug}`}
                  className="px-3 py-1.5 bg-surface text-text-light text-sm rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  {ilce.ad}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
