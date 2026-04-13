'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { DovizFAQ as FAQType } from '@/types/exchange';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';

interface DovizFAQProps {
  faqs: FAQType[];
}

export default function DovizFAQ({ faqs }: DovizFAQProps) {
  const { dict } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const t = dict?.exchangePage?.faq || {
    title: "Sıkça Sorulan Sorular",
    subtitle: "Döviz kurları hakkında merak edilenler"
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-[#C9A84C]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0B1F3A]">{t.title}</h2>
          <p className="text-sm text-gray-500">{t.subtitle}</p>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={cn(
              'border rounded-xl overflow-hidden transition-colors',
              openIndex === index ? 'border-[#C9A84C]' : 'border-gray-200'
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-[#0B1F3A] pr-4">{faq.question}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-[#C9A84C] transition-transform flex-shrink-0',
                  openIndex === index && 'rotate-180'
                )}
              />
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 leading-relaxed speakable-answer">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
