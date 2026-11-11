"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MessageCircle, BadgeCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { createWhatsAppLink } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

interface OrtaklarBolumuProps {
  lang?: Locale;
  dict?: any;
}

const danisman = {
  id: "arif-dagdelen",
  ad: "Arif DAĞDELEN",
  unvan: "Kurucu | Lisanslı Gayrimenkul Danışmanı",
  telefon: "+90 532 159 15 56",
  whatsapp: "905321591556",
  email: "arif@kalindayapi.com",
  foto: "/arifdagdelen.png",
  biyografi:
    "Ortaca, Dalyan ve Köyceğiz bölgesinde uzun yılların saha deneyimiyle satılık ve kiralık gayrimenkul danışmanlığı sunmaktadır. Her portföyü yerinde inceleyerek, tapu ve değer analizini şeffaf biçimde paylaşarak süreci baştan sona yönetir.",
  uzmanlikAlanlari: [
    "Satılık & Kiralık Portföy",
    "Gayrimenkul Değerleme",
    "Yatırım Danışmanlığı",
    "Tapu & Resmi İşlemler",
  ],
};

export default function OrtaklarBolumu({ lang = "tr", dict }: OrtaklarBolumuProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Fallback translations
  const t = dict?.home?.team || {
    badge: "Danışmanınız",
    title: "Kalinda Yapı Emlak",
    subtitle:
      "Gayrimenkul alım, satım ve kiralama süreçlerinizde tek muhatap, net bilgi ve lisanslı danışmanlık.",
    expertise: "Uzmanlık Alanları",
    call: "Ara",
  };

  return (
    <section className="py-20 bg-surface" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            {t.title}
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Consultant Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden"
        >
          <div className="grid md:grid-cols-[260px_1fr]">
            {/* Photo panel */}
            <div className="bg-primary p-8 flex flex-col items-center justify-center text-center text-white">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/25">
                <Image
                  src={danisman.foto}
                  alt={danisman.ad}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mt-5">{danisman.ad}</h3>
              <p className="text-white/70 text-sm mt-1.5 leading-snug">
                {danisman.unvan}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col">
              <p className="text-text-light leading-relaxed">
                {danisman.biyografi}
              </p>

              {/* Expertise */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-primary mb-3">
                  {t.expertise}
                </h4>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {danisman.uzmanlikAlanlari.map((alan) => (
                    <li
                      key={alan}
                      className="flex items-center gap-2 text-sm text-text-light"
                    >
                      <BadgeCheck className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>{alan}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="mt-6 pt-6 border-t border-black/5 space-y-2">
                <a
                  href={`tel:${danisman.telefon.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{danisman.telefon}</span>
                </a>
                <a
                  href={`mailto:${danisman.email}`}
                  className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{danisman.email}</span>
                </a>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href={createWhatsAppLink(
                    danisman.whatsapp,
                    `Merhaba ${danisman.ad}, bilgi almak istiyorum.`
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
                <a
                  href={`tel:${danisman.telefon.replace(/\s/g, "")}`}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Phone className="w-4 h-4" />}
                    className="w-full"
                  >
                    {t.call}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
