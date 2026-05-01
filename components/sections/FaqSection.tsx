"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { varsayilanSorular as localizedFaqData } from "@/data/sss-varsayilan-i18n";

interface FaqItem {
  soru: string;
  cevap: string;
}

interface FaqSectionProps {
  lang?: Locale;
  dict?: any;
  baslik?: string;
  altBaslik?: string;
  sorular?: FaqItem[];
  darkMode?: boolean;
}

export default function FaqSection({
  lang = 'tr',
  dict,
  baslik,
  altBaslik,
  sorular,
  darkMode = false,
}: FaqSectionProps) {
  // Use localized default FAQ data based on locale
  const defaultSorular = localizedFaqData[lang] || localizedFaqData.tr;
  const finalSorular = sorular || defaultSorular;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Fallback translations
  const t = dict?.home?.faq || {
    badge: "SSS",
    title: "Sıkça Sorulan Sorular",
    subtitle: "Ortaca, Dalyan ve Muğla'da emlak alım-satım, tadilat ve inşaat hakkında en çok merak edilen sorular ve uzman cevapları.",
    moreQuestions: "Başka sorularınız mı var?",
    contactUs: "Bize ulaşın",
  };

  const displayBaslik = baslik || t.title;
  const displayAltBaslik = altBaslik || t.subtitle;

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
            {t.badge}
          </span>
          <h2
            className={`text-3xl md:text-4xl font-bold mt-2 mb-4 ${
              darkMode ? "text-white" : "text-primary"
            }`}
          >
            {displayBaslik}
          </h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-text-light"}`}>
            {displayAltBaslik}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {finalSorular.map((soru, index) => (
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
            {t.moreQuestions}{" "}
            <a
              href={`/${lang}/iletisim`}
              className="text-accent font-semibold hover:underline"
            >
              {t.contactUs}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
