"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Home,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Building2,
  Key,
  Hammer,
  FileText,
  CreditCard,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { createWhatsAppLink } from "@/lib/utils";
import { locales, type Locale, getLocalizedRoute } from "@/lib/i18n/config";
import { getSorular, faqKategorileri, sssTexts, popularSorular, type FAQ } from "@/data/sss";

const ikonlar: { [key: string]: React.ComponentType<{ className?: string }> } = {
  HelpCircle,
  Building2,
  Key,
  Hammer,
  FileText,
  CreditCard,
  MapPin,
};

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left hover:bg-gray-50 px-4 -mx-4 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[#0B1F3A] pr-4">{faq.soru}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#C9A84C] flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-5 px-4 -mx-4">
          <p className="text-[#666666] leading-relaxed">{faq.cevap}</p>
        </div>
      )}
    </div>
  );
}

export default function SSSPage() {
  const params = useParams();
  const lang = params?.lang as string;
  const locale: Locale = locales.includes(lang as Locale) ? (lang as Locale) : 'tr';

  const [aktifKategori, setAktifKategori] = useState("genel");
  const [acikSorular, setAcikSorular] = useState<Set<number>>(new Set([0]));

  // Get localized data
  const sorular = getSorular(locale);
  const kategoriler = faqKategorileri[locale];
  const texts = sssTexts[locale];
  const popularItems = popularSorular[locale];

  const filtreliSorular = sorular.filter((s) => s.kategori === aktifKategori);

  const toggleSoru = (index: number) => {
    const yeniAcikSorular = new Set(acikSorular);
    if (yeniAcikSorular.has(index)) {
      yeniAcikSorular.delete(index);
    } else {
      yeniAcikSorular.add(index);
    }
    setAcikSorular(yeniAcikSorular);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href={`/${locale}`} className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">{texts.breadcrumb}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {texts.title} <span className="text-[#C9A84C]">{texts.titleHighlight}</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {texts.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Kategori Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="font-bold text-[#0B1F3A] mb-4">{texts.categories}</h2>
                <div className="space-y-2">
                  {kategoriler.map((kat) => {
                    const Icon = ikonlar[kat.ikon] || HelpCircle;
                    const isActive = aktifKategori === kat.id;
                    return (
                      <button
                        key={kat.id}
                        onClick={() => {
                          setAktifKategori(kat.id);
                          setAcikSorular(new Set([0]));
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? "bg-[#0B1F3A] text-white"
                            : "bg-gray-100 text-[#666666] hover:bg-gray-200"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? "text-[#C9A84C]" : ""}`} />
                        <span className="text-sm font-medium">{kat.baslik}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Quick Contact */}
                <Card className="mt-8" padding="md">
                  <h3 className="font-bold text-[#0B1F3A] mb-3">
                    {texts.contactTitle}
                  </h3>
                  <p className="text-sm text-[#666666] mb-4">
                    {texts.contactText}
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:+905321591556"
                      className="flex items-center gap-2 text-sm text-[#0B1F3A] hover:text-[#C9A84C]"
                    >
                      <Phone className="w-4 h-4" />
                      +90 532 159 15 56
                    </a>
                    <a
                      href={createWhatsAppLink(
                        "905321591556",
                        locale === 'en' ? "Hello, I'm coming from the FAQ page. I have a question:" :
                        locale === 'ar' ? "مرحبًا، أنا قادم من صفحة الأسئلة الشائعة. لدي سؤال:" :
                        "Merhaba, SSS sayfasından geliyorum. Bir sorum var:"
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {texts.whatsappText}
                    </a>
                  </div>
                </Card>
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                {(() => {
                  const aktifKat = kategoriler.find((k) => k.id === aktifKategori);
                  const Icon = ikonlar[aktifKat?.ikon || 'HelpCircle'] || HelpCircle;
                  return (
                    <>
                      <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#C9A84C]" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#0B1F3A]">
                          {aktifKat?.baslik}
                        </h2>
                        <p className="text-sm text-[#666666]">
                          {filtreliSorular.length} {texts.questionsCount}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>

              <Card padding="lg">
                {filtreliSorular.map((faq, index) => (
                  <FAQItem
                    key={index}
                    faq={faq}
                    isOpen={acikSorular.has(index)}
                    onToggle={() => toggleSoru(index)}
                  />
                ))}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Questions Summary */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-4">
              {texts.popularTitle}
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              {texts.popularSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularItems.map((item, index) => {
              const Icon = ikonlar[item.ikon] || HelpCircle;
              return (
                <Card key={index} padding="lg" className="hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0B1F3A] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B1F3A] mb-2">{item.soru}</h3>
                      <p className="text-sm text-[#666666]">{item.cevap}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {texts.ctaTitle}
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            {texts.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/${getLocalizedRoute('iletisim', locale)}`}>
              <Button variant="accent" size="lg">
                {texts.ctaButton}
              </Button>
            </Link>
            <a
              href={createWhatsAppLink(
                "905370530754",
                locale === 'en' ? "Hello, I'm coming from the FAQ page. I have a question." :
                locale === 'ar' ? "مرحبًا، أنا قادم من صفحة الأسئلة الشائعة. لدي سؤال." :
                "Merhaba, SSS sayfasından geliyorum. Bir sorum var."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="whatsapp"
                size="lg"
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                {texts.whatsappText}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
