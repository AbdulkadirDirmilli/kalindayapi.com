// Rehber (District Guide) pages i18n translations
import { Locale } from "@/lib/i18n/config";

export interface RehberTexts {
  // Main page
  breadcrumb: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  viewGuide: string;
  neighborhoods: string;

  // CTA section
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;

  // Detail page
  guideTitle: string;  // "{district} Rehberi" pattern
  photos: string;      // "{district} Fotoğrafları" pattern
  faqTitle: string;
  population: string;

  // Sidebar CTA
  sidebarTitle: string;       // "{district}'da Emlak mı Arıyorsunuz?" pattern
  sidebarDescription: string; // "{district} ve çevresinde..." pattern
  contactButton: string;
  viewListings: string;
  relatedSearches: string;

  // Bottom CTA
  bottomCtaTitle: string;     // "{district}'da Gayrimenkul Danışmanlığı" pattern
  bottomCtaDescription: string;
  bottomCtaButton: string;
}

export const rehberTexts: Record<Locale, RehberTexts> = {
  tr: {
    // Main page
    breadcrumb: "Rehber",
    heroTitle: "Muğla",
    heroTitleHighlight: "İlçe Rehberi",
    heroDescription: "Muğla'nın 13 ilçesi hakkında detaylı bilgi. Emlak fiyatları, mahalleler, yaşam koşulları ve yatırım fırsatları için ilçe rehberlerimizi inceleyin.",
    viewGuide: "Rehberi İncele",
    neighborhoods: "Mahalle",

    // CTA section
    ctaTitle: "Muğla'da Emlak Yatırımı mı Düşünüyorsunuz?",
    ctaDescription: "13 ilçede emlak, tadilat ve inşaat hizmetleri sunuyoruz. Bölgeyi tanıyan uzman ekibimizle ücretsiz danışmanlık alın.",
    ctaButton: "İletişime Geçin",

    // Detail page
    guideTitle: "Rehberi",
    photos: "Fotoğrafları",
    faqTitle: "Sıkça Sorulan Sorular",
    population: "Nüfus",

    // Sidebar CTA
    sidebarTitle: "'da Emlak mı Arıyorsunuz?",
    sidebarDescription: " ve çevresinde satılık ev, arsa, villa için uzman ekibimizle iletişime geçin.",
    contactButton: "İletişime Geç",
    viewListings: "İlanları İncele",
    relatedSearches: "İlgili Aramalar",

    // Bottom CTA
    bottomCtaTitle: "'da Gayrimenkul Danışmanlığı",
    bottomCtaDescription: "Kalinda Yapı olarak {district} ve tüm Muğla bölgesinde emlak, tadilat ve inşaat hizmetleri sunuyoruz. Profesyonel ekibimizle tanışın.",
    bottomCtaButton: "Ücretsiz Danışmanlık Al",
  },
  en: {
    // Main page
    breadcrumb: "Guide",
    heroTitle: "Muğla",
    heroTitleHighlight: "District Guide",
    heroDescription: "Detailed information about Muğla's 13 districts. Explore our district guides for property prices, neighborhoods, living conditions and investment opportunities.",
    viewGuide: "View Guide",
    neighborhoods: "Neighborhoods",

    // CTA section
    ctaTitle: "Considering Property Investment in Muğla?",
    ctaDescription: "We offer real estate, renovation and construction services in 13 districts. Get free consultation with our expert team who knows the region.",
    ctaButton: "Contact Us",

    // Detail page
    guideTitle: "Guide",
    photos: "Photos",
    faqTitle: "Frequently Asked Questions",
    population: "Population",

    // Sidebar CTA
    sidebarTitle: " - Looking for Property?",
    sidebarDescription: "Contact our expert team for houses, land, and villas for sale in {district} and surrounding areas.",
    contactButton: "Contact Us",
    viewListings: "View Listings",
    relatedSearches: "Related Searches",

    // Bottom CTA
    bottomCtaTitle: " - Real Estate Consulting",
    bottomCtaDescription: "Kalinda Yapı offers real estate, renovation and construction services in {district} and the entire Muğla region. Meet our professional team.",
    bottomCtaButton: "Get Free Consultation",
  },
  ar: {
    // Main page
    breadcrumb: "الدليل",
    heroTitle: "موغلا",
    heroTitleHighlight: "دليل المناطق",
    heroDescription: "معلومات مفصلة عن 13 منطقة في موغلا. استكشف أدلة المناطق لمعرفة أسعار العقارات والأحياء وظروف المعيشة وفرص الاستثمار.",
    viewGuide: "عرض الدليل",
    neighborhoods: "حي",

    // CTA section
    ctaTitle: "هل تفكر في الاستثمار العقاري في موغلا؟",
    ctaDescription: "نقدم خدمات العقارات والتجديد والبناء في 13 منطقة. احصل على استشارة مجانية مع فريقنا الخبير الذي يعرف المنطقة.",
    ctaButton: "اتصل بنا",

    // Detail page
    guideTitle: "دليل",
    photos: "صور",
    faqTitle: "الأسئلة الشائعة",
    population: "السكان",

    // Sidebar CTA
    sidebarTitle: " - تبحث عن عقار؟",
    sidebarDescription: "تواصل مع فريقنا الخبير للمنازل والأراضي والفلل المعروضة للبيع في {district} والمناطق المحيطة.",
    contactButton: "تواصل معنا",
    viewListings: "عرض العقارات",
    relatedSearches: "عمليات بحث ذات صلة",

    // Bottom CTA
    bottomCtaTitle: " - استشارات عقارية",
    bottomCtaDescription: "تقدم كاليندا يابي خدمات العقارات والتجديد والبناء في {district} ومنطقة موغلا بأكملها. تعرف على فريقنا المحترف.",
    bottomCtaButton: "احصل على استشارة مجانية",
  },
};

// Helper to format strings with district name
export function formatDistrictText(template: string, district: string): string {
  return template.replace("{district}", district);
}
