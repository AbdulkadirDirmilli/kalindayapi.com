"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  soru: string;
  cevap: string;
}

interface FaqSectionProps {
  baslik?: string;
  altBaslik?: string;
  sorular?: FaqItem[];
  darkMode?: boolean;
}

const varsayilanSorular: FaqItem[] = [
  {
    soru: "Ortaca'da ev almak için hangi belgeler gerekiyor?",
    cevap:
      "T.C. vatandaşları için nüfus cüzdanı fotokopisi, vergi numarası ve ikametgah belgesi yeterlidir. Yabancı uyruklu alıcılar için tapu müdürlüğü onayı, pasaport tercümesi ve potansiyel vergi numarası gerekir. 2022'den bu yana 200+ satış işlemi tamamlayan ekibimiz, tüm evrak sürecinizi ücretsiz yönetiyor.",
  },
  {
    soru: "2026'da Ortaca ve Dalyan'da m² fiyatları ne kadar?",
    cevap:
      "Ortaca merkezde konut m² fiyatları 25.000-40.000 ₺, Dalyan'da villa arsaları 35.000-60.000 ₺/m² aralığında seyrediyor. Köyceğiz gölü çevresi ve Dalyan kanal manzaralı bölgeler prim yapıyor. Ücretsiz gayrimenkul değerleme hizmetimizle mülkünüzün güncel piyasa değerini öğrenebilirsiniz.",
  },
  {
    soru: "Tadilat projelerinde yazılı sözleşme yapıyor musunuz?",
    cevap:
      "Evet, her projede iş kapsamı, başlangıç-bitiş tarihi, malzeme listesi, ödeme planı ve garanti koşullarını içeren yazılı sözleşme düzenliyoruz. 100+ tamamlanmış tadilat projemizde sürpriz fatura çıkmadı. Şeffaflık ilkemiz gereği tüm değişiklikler yazılı onayınızla yapılır.",
  },
  {
    soru: "İnşaat ve tadilat işlerinizde garanti veriyor musunuz?",
    cevap:
      "Tüm işçilik ve uygulama için 2 yıl garanti sunuyoruz. Kullandığımız A sınıfı malzemeler (Vitra, Kütahya, Eca, Jotun) için üretici garantisi ayrıca geçerlidir. Garanti kapsamındaki sorunlar 48 saat içinde yerinde değerlendirilir. Garanti şartları sözleşmede açıkça belirtilir.",
  },
  {
    soru: "Emlak danışmanlık hizmeti ücretli mi?",
    cevap:
      "Ev arayanlar için danışmanlık tamamen ücretsizdir. Satış tamamlandığında satış bedelinin %2'si, kiralama işlemlerinde 1 aylık kira bedeli komisyon alınır. Tüm ücretler işlem öncesi yazılı bildirilir, gizli maliyet yoktur. İşlem gerçekleşmezse ücret talep etmiyoruz.",
  },
  {
    soru: "Muğla'nın hangi bölgelerine hizmet veriyorsunuz?",
    cevap:
      "Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça ve tüm Muğla genelinde aktif portföyümüz bulunuyor. Yerinde keşif için mesafe fark etmez. Bölgenin 4 yıllık deneyimli ekibi olarak yerel piyasayı, imar durumlarını ve yatırım potansiyellerini yakından takip ediyoruz.",
  },
];

export default function FaqSection({
  baslik = "Sıkça Sorulan Sorular",
  altBaslik = "Ortaca, Dalyan ve Muğla'da emlak alım-satım, tadilat ve inşaat hakkında en çok merak edilen sorular ve uzman cevapları.",
  sorular = varsayilanSorular,
  darkMode = false,
}: FaqSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`py-20 ${darkMode ? "bg-primary" : "bg-surface"}`}
      ref={ref}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            SSS
          </span>
          <h2
            className={`text-3xl md:text-4xl font-bold mt-2 mb-4 ${
              darkMode ? "text-white" : "text-primary"
            }`}
          >
            {baslik}
          </h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-text-light"}`}>
            {altBaslik}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {sorular.map((soru, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden ${
                darkMode ? "bg-white/5" : "bg-white"
              } ${darkMode ? "" : "shadow-md"}`}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className={`w-full flex items-center justify-between p-5 text-left transition-colors ${
                  darkMode
                    ? "hover:bg-white/5"
                    : "hover:bg-surface"
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <HelpCircle
                    className={`w-5 h-5 flex-shrink-0 ${
                      openIndex === index ? "text-accent" : darkMode ? "text-gray-400" : "text-text-muted"
                    }`}
                  />
                  <span
                    className={`font-semibold ${
                      darkMode ? "text-white" : "text-primary"
                    } ${openIndex === index ? "text-accent" : ""}`}
                  >
                    {soru.soru}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${
                    darkMode ? "text-gray-400" : "text-text-light"
                  } ${openIndex === index ? "rotate-180 text-accent" : ""}`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`px-5 pb-5 pl-13 ${
                        darkMode ? "text-gray-300" : "text-text-light"
                      }`}
                      style={{ paddingLeft: "3.25rem" }}
                    >
                      {soru.cevap}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className={darkMode ? "text-gray-400" : "text-text-light"}>
            Başka sorularınız mı var?{" "}
            <a
              href="/iletisim"
              className="text-accent font-semibold hover:underline"
            >
              Bize ulaşın
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
