"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Home, Paintbrush, HardHat, ArrowRight, MessageCircle, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { createWhatsAppLink } from "@/lib/utils";

const hizmetler = [
  {
    id: "emlak-danismanligi",
    baslik: "Emlak Danışmanlığı",
    aciklama:
      "Ortaca ve çevresinde satılık, kiralık gayrimenkul hizmetleri. Profesyonel değerleme ve yatırım danışmanlığı.",
    ikon: Home,
    renk: "#C9A84C",
    href: "/hizmetler/emlak-danismanligi",
  },
  {
    id: "tadilat-dekorasyon",
    baslik: "Tadilat & Dekorasyon",
    aciklama:
      "İç mimari, mutfak-banyo yenileme, boya ve kaplama işleri. Evinizi hayalinizdeki gibi dönüştürüyoruz.",
    ikon: Paintbrush,
    renk: "#0B1F3A",
    href: "/hizmetler/tadilat-dekorasyon",
  },
  {
    id: "taahhut-insaat",
    baslik: "Taahhüt & İnşaat",
    aciklama:
      "Sıfırdan bina inşaatı, restorasyon projeleri ve anahtar teslim yapı çözümleri.",
    ikon: HardHat,
    renk: "#1a3a5c",
    href: "/hizmetler/taahhut-insaat",
  },
  {
    id: "plan-proje",
    baslik: "Plan & Proje",
    aciklama:
      "Mimari, statik, elektrik-mekanik proje çizimleri ve ruhsat danışmanlığı hizmetleri.",
    ikon: FileText,
    renk: "#2E7D32",
    href: "/hizmetler/plan-proje",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function HizmetKartlari() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-surface" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Hizmetlerimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            Size Nasıl Yardımcı Olabiliriz?
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            Emlak danışmanlığından inşaat taahhüdüne kadar tüm ihtiyaçlarınız için
            yanınızdayız. Profesyonel ekibimizle kaliteli hizmet sunuyoruz.
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
                    className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${hizmet.renk}15` }}
                  >
                    <Icon
                      className="w-6 h-6 md:w-8 md:h-8 transition-colors duration-300"
                      style={{ color: hizmet.renk }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                    {hizmet.baslik}
                  </h3>
                  <p className="text-text-light mb-6 flex-1">{hizmet.aciklama}</p>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={createWhatsAppLink(
                          "905370530754",
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
                          Detaylar
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/hizmetler">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Tüm Hizmetlerimizi Görün
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
