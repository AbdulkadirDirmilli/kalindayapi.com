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
    soru: "Ortaca'da ev almak için ne gerekir?",
    cevap:
      "Ortaca'da ev almak için kimlik belgesi, ikametgah ve gerekli ödeme planı yeterlidir. Yabancı uyruklu alıcılar için ek belgeler talep edilebilir. Kalinda Yapı olarak tüm alım sürecinizde size rehberlik ediyoruz. Bankalarla kredi süreçlerinde de yardımcı oluyoruz.",
  },
  {
    soru: "Ortaca'da m² fiyatları ne kadar?",
    cevap:
      "Ortaca'da konut m² fiyatları konuma göre 15.000 TL ile 35.000 TL arasında değişmektedir. Dalyan bölgesi villa fiyatları daha yüksek seyrederken, merkezdeki daireler daha ekonomik seçenekler sunmaktadır. Güncel fiyat bilgisi için bizimle iletişime geçebilirsiniz.",
  },
  {
    soru: "Tadilat için sözleşme şart mı?",
    cevap:
      "Evet, tüm tadilat projelerimiz yazılı sözleşme ile güvence altına alınmaktadır. Sözleşmede iş kapsamı, süre, ödeme planı ve garanti koşulları açıkça belirtilmektedir. Bu sayede hem sizin hem de bizim haklarımız korunmuş olur.",
  },
  {
    soru: "İnşaat ve tadilat işlerinde garanti veriyor musunuz?",
    cevap:
      "Evet, tüm işçilik için 2 yıl garanti sunuyoruz. Malzemeler için ise üretici garantisi geçerlidir. Garanti kapsamındaki herhangi bir sorun ücretsiz olarak giderilmektedir. Kaliteli malzeme ve işçilik prensibimizle çalışıyoruz.",
  },
  {
    soru: "Emlak danışmanlık ücreti nasıl hesaplanır?",
    cevap:
      "Satış işlemlerinde satış bedelinin %2'si, kiralama işlemlerinde ise 1 aylık kira bedeli komisyon olarak uygulanmaktadır. Tüm ücretler sözleşme öncesinde şeffaf bir şekilde belirtilmektedir. Gizli maliyet kesinlikle yoktur.",
  },
  {
    soru: "Hangi bölgelere hizmet veriyorsunuz?",
    cevap:
      "Muğla'nın tüm ilçelerinde hizmet vermekteyiz: Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça, Menteşe, Yatağan, Ula, Kavaklıdere ve Seydikemer. Tüm bu bölgelerdeki emlak ilanları, tadilat ve inşaat projeleri için bizimle iletişime geçebilirsiniz.",
  },
];

export default function FaqSection({
  baslik = "Sıkça Sorulan Sorular",
  altBaslik = "Ortaca ve çevresinde emlak, tadilat ve taahhüt hizmetlerimiz hakkında merak edilenler.",
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
