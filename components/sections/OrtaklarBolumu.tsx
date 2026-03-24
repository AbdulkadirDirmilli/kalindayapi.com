"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MessageCircle, Building2, HardHat } from "lucide-react";
import Button from "@/components/ui/Button";
import { createWhatsAppLink } from "@/lib/utils";

const ortaklar = [
  {
    id: "zafer-soylu",
    ad: "Zafer SOYLU",
    unvan: "Emlak Danışmanı & Kurucu Ortak",
    telefon: "+90 537 053 07 54",
    whatsapp: "905370530754",
    email: "zafer@kalindayapi.com",
    foto: "/zafersoylu.png",
    biyografi:
      "15 yılı aşkın emlak sektörü deneyimiyle bölgenin en tanınan emlak danışmanlarından biridir. Müşteri memnuniyetini her şeyin üstünde tutan anlayışıyla hizmet vermektedir.",
    uzmanlikAlanlari: ["Konut Satış", "Kiralama", "Yatırım Danışmanlığı"],
    ikon: Building2,
    renk: "#C9A84C",
  },
  {
    id: "arif-dagdelen",
    ad: "Arif DAĞDELEN",
    unvan: "Yapı & Taahhüt Uzmanı & Kurucu Ortak",
    telefon: "+90 532 159 15 56",
    whatsapp: "905321591556",
    email: "arif@kalindayapi.com",
    foto: "/arifdagdelen.png",
    biyografi:
      "20 yılı aşkın inşaat sektörü deneyimiyle sayısız konut, villa ve ticari proje tamamlamıştır. Kalite odaklı çalışma prensibi ve detaylara verdiği önemle tanınmaktadır.",
    uzmanlikAlanlari: ["İnşaat Taahhüt", "Tadilat", "Proje Yönetimi"],
    ikon: HardHat,
    renk: "#0B1F3A",
  },
];

export default function OrtaklarBolumu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-[#F5F5F5]" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
            Ekibimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-2 mb-4">
            Kurucu Ortaklarımız
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            Kalında Yapı'nın arkasındaki deneyimli isimler. Her iki ortağımız da
            kendi alanlarında uzman ve müşteri memnuniyetini en üst düzeyde
            tutmaktadır.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {ortaklar.map((ortak, index) => {
            const Icon = ortak.ikon;
            return (
              <motion.div
                key={ortak.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Header */}
                <div
                  className="p-6 text-white"
                  style={{ backgroundColor: ortak.renk }}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/30">
                      <Image
                        src={ortak.foto}
                        alt={ortak.ad}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{ortak.ad}</h3>
                      <p className="text-white/80 text-sm mt-1">{ortak.unvan}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Bio */}
                  <p className="text-[#666666] mb-4 leading-relaxed">
                    {ortak.biyografi}
                  </p>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#0B1F3A] mb-2">
                      Uzmanlık Alanları
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {ortak.uzmanlikAlanlari.map((alan) => (
                        <span
                          key={alan}
                          className="px-3 py-1 bg-[#F5F5F5] text-[#666666] text-sm rounded-full"
                        >
                          {alan}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-2 mb-6">
                    <a
                      href={`tel:${ortak.telefon.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 text-[#0B1F3A] hover:text-[#C9A84C] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{ortak.telefon}</span>
                    </a>
                    <a
                      href={`mailto:${ortak.email}`}
                      className="flex items-center gap-2 text-[#0B1F3A] hover:text-[#C9A84C] transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{ortak.email}</span>
                    </a>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3">
                    <a
                      href={createWhatsAppLink(
                        ortak.whatsapp,
                        `Merhaba ${ortak.ad}, bilgi almak istiyorum.`
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
                    <a href={`tel:${ortak.telefon.replace(/\s/g, "")}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Phone className="w-4 h-4" />}
                        className="w-full"
                      >
                        Ara
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
