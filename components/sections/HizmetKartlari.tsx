"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Home, Calculator, TrendingUp, ArrowRight, MessageCircle, FileCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { createWhatsAppLink } from "@/lib/utils";
import { getLocalizedRoute, type Locale } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

interface HizmetKartlariProps {
  lang?: Locale;
  dict?: any;
}

export default function HizmetKartlari({ lang = 'tr', dict }: HizmetKartlariProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Fallback translations
  const t = dict?.home?.services || {
    badge: "Hizmetlerimiz",
    title: "Size Nasıl Yardımcı Olabiliriz?",
    subtitle: "Alım, satım, kiralama ve yatırım süreçlerinizin tamamında lisanslı gayrimenkul danışmanlığı sunuyoruz.",
    details: "Detaylar",
    viewAll: "Tüm Hizmetlerimizi Görün",
    realEstate: { title: "Emlak Danışmanlığı", description: "Ortaca ve çevresinde satılık ve kiralık gayrimenkul portföyü. Alıcı ve satıcı arasında güvenli aracılık." },
    valuation: { title: "Gayrimenkul Değerleme", description: "Mülkünüzün güncel piyasa değerini bölgesel karşılaştırmalı analizle raporluyoruz." },
    investment: { title: "Yatırım Danışmanlığı", description: "Kira getirisi ve değer artış potansiyeline göre bölgedeki yatırım fırsatlarını birlikte değerlendiriyoruz." },
    titleDeed: { title: "Tapu & Resmi İşlemler", description: "Tapu, imar durumu ve sözleşme süreçlerinde baştan sona evrak ve işlem takibi." },
  };

  const hizmetler = [
    {
      id: "emlak-danismanligi",
      baslik: t.realEstate.title,
      aciklama: t.realEstate.description,
      ikon: Home,
      renk: "#00767C",
      href: `/${lang}/${getLocalizedRoute("hizmetler", lang)}/${getLocalizedRoute("emlak-danismanligi", lang)}`,
    },
    {
      id: "gayrimenkul-degerleme",
      baslik: t.valuation.title,
      aciklama: t.valuation.description,
      ikon: Calculator,
      renk: "#00B4BD",
      href: `/${lang}/${getLocalizedRoute("hizmetler", lang)}/${getLocalizedRoute("gayrimenkul-degerleme", lang)}`,
    },
    {
      id: "yatirim-danismanligi",
      baslik: t.investment.title,
      aciklama: t.investment.description,
      ikon: TrendingUp,
      renk: "#005358",
      href: `/${lang}/${getLocalizedRoute("hizmetler", lang)}/${getLocalizedRoute("yatirim-danismanligi", lang)}`,
    },
    {
      id: "tapu-islemleri",
      baslik: t.titleDeed.title,
      aciklama: t.titleDeed.description,
      ikon: FileCheck,
      renk: "#4A9BA3",
      href: `/${lang}/${getLocalizedRoute("hizmetler", lang)}/${getLocalizedRoute("tapu-islemleri", lang)}`,
    },
  ];

  return (
    <section className="py-20 bg-surface" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ink mt-2 mb-4">
            {t.title}
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {hizmetler.map((hizmet) => {
            const Icon = hizmet.ikon;
            return (
              <motion.div key={hizmet.id} variants={itemVariants}>
                <Card
                  variant="interactive"
                  padding="lg"
                  className="h-full flex flex-col group"
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center mb-4 md:mb-6"
                    style={{ backgroundColor: `${hizmet.renk}15` }}
                  >
                    <Icon
                      className="w-6 h-6 md:w-8 md:h-8 transition-colors duration-300"
                      style={{ color: hizmet.renk }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-primary transition-colors">
                    {hizmet.baslik}
                  </h3>
                  <p className="text-text-light mb-6 flex-1">{hizmet.aciklama}</p>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={createWhatsAppLink(
                          "905321591556",
                          `Merhaba, ${hizmet.baslik} hakkında bilgi almak istiyorum.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant="whatsapp"
                          size="sm"
                          leftIcon={<MessageCircle className="w-4 h-4" />}
                          className="w-full"
                        >
                          WhatsApp
                        </Button>
                      </a>
                      <Link href={hizmet.href} className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                          className="w-full"
                        >
                          {t.details}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Services */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href={`/${lang}/${getLocalizedRoute("hizmetler", lang)}`}>
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {t.viewAll}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
