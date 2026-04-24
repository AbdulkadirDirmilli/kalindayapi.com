// Hizmetler (Services) Internationalization Data
import type { Locale } from '@/lib/i18n/config';

// UI Text translations for hizmetler pages
export const hizmetlerTexts: Record<Locale, {
  // Main page
  breadcrumb: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  detailsButton: string;
  whatsappButton: string;
  serviceAreasTitle: string;
  serviceAreasSubtitle: string;
  faqTitle: string;
  faqSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  whatsappCta: string;
  // Detail page
  contactTeam: string;
  servicesScope: string;
  servicesScopeSubtitle: string;
  whyUs: string;
  whyUsItems: string[];
  statsLabels: {
    completedProjects: string;
    yearsExperience: string;
    happyClients: string;
    satisfactionRate: string;
  };
  aboutFaq: string;
  aboutFaqSubtitle: string;
  otherServices: string;
  otherServicesSubtitle: string;
  getQuote: string;
  getQuoteSubtitle: string;
  whatsappQuote: string;
  contactButton: string;
  contactForm: string;
}> = {
  tr: {
    breadcrumb: "Hizmetler",
    title: "Profesyonel",
    titleHighlight: "Emlak & Yapı",
    subtitle: "Ortaca ve Muğla bölgesinde emlak danışmanlığı, tadilat ve inşaat taahhüt hizmetleri sunuyoruz. Her ihtiyacınız için yanınızdayız.",
    detailsButton: "Detaylar",
    whatsappButton: "WhatsApp",
    serviceAreasTitle: "Hizmet Bölgelerimiz",
    serviceAreasSubtitle: "Ortaca merkez ve çevre bölgelerde profesyonel hizmet sunuyoruz.",
    faqTitle: "Hizmetlerimiz Hakkında Sıkça Sorulan Sorular",
    faqSubtitle: "Emlak, tadilat ve taahhüt hizmetlerimiz hakkında merak edilenler.",
    ctaTitle: "Projeniz İçin Teklif Alın",
    ctaSubtitle: "Emlak, tadilat veya inşaat projeleriniz için ücretsiz danışmanlık ve teklif almak için hemen iletişime geçin.",
    ctaButton: "İletişime Geç",
    whatsappCta: "WhatsApp ile Yazın",
    contactTeam: "Ekibimizle İletişime Geçin",
    servicesScope: "Kapsamında",
    servicesScopeSubtitle: "Aşağıdaki alanlarda profesyonel hizmet sunuyoruz.",
    whyUs: "Neden Kalinda Yapı?",
    whyUsItems: [
      "Lisanslı ve deneyimli uzman kadro",
      "Şeffaf fiyatlandırma ve sözleşme",
      "Zamanında teslimat garantisi",
      "7/24 müşteri desteği",
      "Bölgesel pazar bilgisi",
      "Kaliteli malzeme ve işçilik",
    ],
    statsLabels: {
      completedProjects: "Tamamlanan Proje",
      yearsExperience: "Yıl Deneyim",
      happyClients: "Mutlu Müşteri",
      satisfactionRate: "Memnuniyet Oranı",
    },
    aboutFaq: "Hakkında SSS",
    aboutFaqSubtitle: "hizmetimiz hakkında sıkça sorulan sorular ve cevapları.",
    otherServices: "Diğer Hizmetlerimiz",
    otherServicesSubtitle: "Tüm emlak ve yapı ihtiyaçlarınız için yanınızdayız.",
    getQuote: "İçin Teklif Alın",
    getQuoteSubtitle: "Projeniz için ücretsiz danışmanlık ve teklif almak için hemen iletişime geçin. Size en kısa sürede dönüş yapacağız.",
    whatsappQuote: "WhatsApp ile Teklif Al",
    contactButton: "İletişime Geç",
    contactForm: "İletişim Formu",
  },
  en: {
    breadcrumb: "Services",
    title: "Professional",
    titleHighlight: "Real Estate & Construction",
    subtitle: "We provide real estate consulting, renovation, and construction contracting services in Ortaca and Muğla region. We are here for all your needs.",
    detailsButton: "Details",
    whatsappButton: "WhatsApp",
    serviceAreasTitle: "Our Service Areas",
    serviceAreasSubtitle: "We provide professional services in Ortaca center and surrounding areas.",
    faqTitle: "Frequently Asked Questions About Our Services",
    faqSubtitle: "Common questions about our real estate, renovation, and contracting services.",
    ctaTitle: "Get a Quote for Your Project",
    ctaSubtitle: "Contact us now for free consultation and quotes for your real estate, renovation, or construction projects.",
    ctaButton: "Contact Us",
    whatsappCta: "Write on WhatsApp",
    contactTeam: "Contact Our Team",
    servicesScope: "Services Include",
    servicesScopeSubtitle: "We provide professional services in the following areas.",
    whyUs: "Why Kalinda Yapı?",
    whyUsItems: [
      "Licensed and experienced expert team",
      "Transparent pricing and contracts",
      "On-time delivery guarantee",
      "24/7 customer support",
      "Regional market knowledge",
      "Quality materials and workmanship",
    ],
    statsLabels: {
      completedProjects: "Completed Projects",
      yearsExperience: "Years Experience",
      happyClients: "Happy Clients",
      satisfactionRate: "Satisfaction Rate",
    },
    aboutFaq: "FAQ About",
    aboutFaqSubtitle: "Frequently asked questions and answers about our service.",
    otherServices: "Our Other Services",
    otherServicesSubtitle: "We are here for all your real estate and construction needs.",
    getQuote: "Get a Quote for",
    getQuoteSubtitle: "Contact us now for free consultation and quotes for your project. We will get back to you as soon as possible.",
    whatsappQuote: "Get Quote via WhatsApp",
    contactButton: "Contact Us",
    contactForm: "Contact Form",
  },
  ar: {
    breadcrumb: "الخدمات",
    title: "خدمات",
    titleHighlight: "العقارات والبناء",
    subtitle: "نقدم خدمات الاستشارات العقارية والتجديد ومقاولات البناء في منطقة أورتاجا وموغلا. نحن هنا لجميع احتياجاتكم.",
    detailsButton: "التفاصيل",
    whatsappButton: "واتساب",
    serviceAreasTitle: "مناطق خدمتنا",
    serviceAreasSubtitle: "نقدم خدمات احترافية في مركز أورتاجا والمناطق المحيطة.",
    faqTitle: "الأسئلة الشائعة حول خدماتنا",
    faqSubtitle: "أسئلة شائعة حول خدماتنا العقارية والتجديد والمقاولات.",
    ctaTitle: "احصل على عرض سعر لمشروعك",
    ctaSubtitle: "تواصل معنا الآن للحصول على استشارة مجانية وعروض أسعار لمشاريعك العقارية أو التجديد أو البناء.",
    ctaButton: "تواصل معنا",
    whatsappCta: "اكتب على واتساب",
    contactTeam: "تواصل مع فريقنا",
    servicesScope: "تشمل الخدمات",
    servicesScopeSubtitle: "نقدم خدمات احترافية في المجالات التالية.",
    whyUs: "لماذا كاليندا يابي؟",
    whyUsItems: [
      "فريق خبراء مرخص وذو خبرة",
      "تسعير وعقود شفافة",
      "ضمان التسليم في الوقت المحدد",
      "دعم العملاء على مدار الساعة",
      "معرفة بالسوق الإقليمي",
      "مواد وعمالة عالية الجودة",
    ],
    statsLabels: {
      completedProjects: "مشاريع مكتملة",
      yearsExperience: "سنوات الخبرة",
      happyClients: "عملاء سعداء",
      satisfactionRate: "نسبة الرضا",
    },
    aboutFaq: "أسئلة شائعة حول",
    aboutFaqSubtitle: "أسئلة وأجوبة متكررة حول خدمتنا.",
    otherServices: "خدماتنا الأخرى",
    otherServicesSubtitle: "نحن هنا لجميع احتياجاتك العقارية والبناء.",
    getQuote: "احصل على عرض سعر لـ",
    getQuoteSubtitle: "تواصل معنا الآن للحصول على استشارة مجانية وعروض أسعار لمشروعك. سنعود إليك في أقرب وقت ممكن.",
    whatsappQuote: "احصل على عرض عبر واتساب",
    contactButton: "تواصل معنا",
    contactForm: "نموذج الاتصال",
  },
};

// WhatsApp message templates
export const whatsappMessages: Record<Locale, {
  serviceInquiry: string;
  quoteRequest: string;
  generalInquiry: string;
}> = {
  tr: {
    serviceInquiry: "Merhaba, {serviceName} hakkında bilgi almak istiyorum.",
    quoteRequest: "Merhaba, {serviceName} için teklif almak istiyorum.",
    generalInquiry: "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.",
  },
  en: {
    serviceInquiry: "Hello, I would like to get information about {serviceName}.",
    quoteRequest: "Hello, I would like to get a quote for {serviceName}.",
    generalInquiry: "Hello, I would like to get information about your services.",
  },
  ar: {
    serviceInquiry: "مرحباً، أود الحصول على معلومات حول {serviceName}.",
    quoteRequest: "مرحباً، أود الحصول على عرض سعر لـ {serviceName}.",
    generalInquiry: "مرحباً، أود الحصول على معلومات حول خدماتكم.",
  },
};

// Helper function to format WhatsApp message
export function formatWhatsAppMessage(
  template: string,
  serviceName: string
): string {
  return template.replace('{serviceName}', serviceName);
}
