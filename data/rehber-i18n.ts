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

  // Metadata
  metaTitle: string;          // "{district} Emlak Rehberi | Satılık Ev, Arsa, Villa"
  metaKeywords: string;       // "{district}, {district} emlak, ..."
  ogTitle: string;            // "{district} İlçe Rehberi ve Emlak Fırsatları"

  // Neighborhoods section
  neighborhoodsTitle: string;      // "{district} Mahalleleri"
  neighborhoodsDescription: string; // "{district} ilçesinde toplam {count} mahalle..."
  moreNeighborhoods: string;       // "+{count} mahalle daha"
  showLess: string;                // "Daha az göster"
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

    // Metadata
    metaTitle: "{district} Emlak Rehberi | Satılık Ev, Arsa, Villa",
    metaKeywords: "{district}, {district} emlak, {district} satılık ev, {district} arsa, {district} villa, Muğla emlak",
    ogTitle: "{district} İlçe Rehberi ve Emlak Fırsatları",

    // Neighborhoods section
    neighborhoodsTitle: "{district} Mahalleleri",
    neighborhoodsDescription: "{district} ilçesinde toplam {count} mahalle bulunmaktadır. Emlak, tadilat ve inşaat hizmetlerimiz tüm mahallelerde geçerlidir.",
    moreNeighborhoods: "+{count} mahalle daha",
    showLess: "Daha az göster",
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

    // Metadata
    metaTitle: "{district} Real Estate Guide | Houses, Land, Villas for Sale",
    metaKeywords: "{district}, {district} real estate, {district} houses for sale, {district} land, {district} villas, Muğla property",
    ogTitle: "{district} District Guide and Real Estate Opportunities",

    // Neighborhoods section
    neighborhoodsTitle: "{district} Neighborhoods",
    neighborhoodsDescription: "There are {count} neighborhoods in {district} district. Our real estate, renovation and construction services are available in all neighborhoods.",
    moreNeighborhoods: "+{count} more neighborhoods",
    showLess: "Show less",
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

    // Metadata
    metaTitle: "دليل عقارات {district} | منازل وأراضي وفلل للبيع",
    metaKeywords: "{district}, عقارات {district}, منازل للبيع {district}, أراضي {district}, فلل {district}, عقارات موغلا",
    ogTitle: "دليل منطقة {district} وفرص العقارات",

    // Neighborhoods section
    neighborhoodsTitle: "أحياء {district}",
    neighborhoodsDescription: "يوجد {count} حي في منطقة {district}. خدماتنا العقارية والتجديد والبناء متاحة في جميع الأحياء.",
    moreNeighborhoods: "+{count} أحياء أخرى",
    showLess: "عرض أقل",
  },
  de: {
    // Main page
    breadcrumb: "Reiseführer",
    heroTitle: "Muğla",
    heroTitleHighlight: "Bezirksführer",
    heroDescription: "Detaillierte Informationen über die 13 Bezirke von Muğla. Entdecken Sie unsere Bezirksführer für Immobilienpreise, Nachbarschaften, Lebensbedingungen und Investitionsmöglichkeiten.",
    viewGuide: "Führer ansehen",
    neighborhoods: "Nachbarschaften",

    // CTA section
    ctaTitle: "Denken Sie an eine Immobilieninvestition in Muğla?",
    ctaDescription: "Wir bieten Immobilien-, Renovierungs- und Baudienstleistungen in 13 Bezirken an. Erhalten Sie eine kostenlose Beratung von unserem Expertenteam, das die Region kennt.",
    ctaButton: "Kontaktieren Sie uns",

    // Detail page
    guideTitle: "Führer",
    photos: "Fotos",
    faqTitle: "Häufig gestellte Fragen",
    population: "Bevölkerung",

    // Sidebar CTA
    sidebarTitle: " - Immobilie gesucht?",
    sidebarDescription: "Kontaktieren Sie unser Expertenteam für Häuser, Grundstücke und Villen zum Verkauf in {district} und Umgebung.",
    contactButton: "Kontakt aufnehmen",
    viewListings: "Angebote ansehen",
    relatedSearches: "Verwandte Suchen",

    // Bottom CTA
    bottomCtaTitle: " - Immobilienberatung",
    bottomCtaDescription: "Kalinda Yapı bietet Immobilien-, Renovierungs- und Baudienstleistungen in {district} und der gesamten Region Muğla. Lernen Sie unser professionelles Team kennen.",
    bottomCtaButton: "Kostenlose Beratung erhalten",

    // Metadata
    metaTitle: "{district} Immobilienführer | Häuser, Grundstücke, Villen zu verkaufen",
    metaKeywords: "{district}, {district} Immobilien, {district} Häuser kaufen, {district} Grundstücke, {district} Villen, Muğla Immobilien",
    ogTitle: "{district} Bezirksführer und Immobilienmöglichkeiten",

    // Neighborhoods section
    neighborhoodsTitle: "Stadtteile von {district}",
    neighborhoodsDescription: "In {district} gibt es {count} Stadtteile. Unsere Immobilien-, Renovierungs- und Baudienstleistungen sind in allen Stadtteilen verfügbar.",
    moreNeighborhoods: "+{count} weitere Stadtteile",
    showLess: "Weniger anzeigen",
  },
  ru: {
    // Main page
    breadcrumb: "Путеводитель",
    heroTitle: "Мугла",
    heroTitleHighlight: "Путеводитель по районам",
    heroDescription: "Подробная информация о 13 районах Муглы. Изучите наши путеводители по районам для получения информации о ценах на недвижимость, районах, условиях жизни и инвестиционных возможностях.",
    viewGuide: "Смотреть путеводитель",
    neighborhoods: "Районы",

    // CTA section
    ctaTitle: "Думаете об инвестициях в недвижимость в Мугле?",
    ctaDescription: "Мы предлагаем услуги в сфере недвижимости, ремонта и строительства в 13 районах. Получите бесплатную консультацию от нашей команды экспертов, знающих регион.",
    ctaButton: "Свяжитесь с нами",

    // Detail page
    guideTitle: "Путеводитель",
    photos: "Фотографии",
    faqTitle: "Часто задаваемые вопросы",
    population: "Население",

    // Sidebar CTA
    sidebarTitle: " - Ищете недвижимость?",
    sidebarDescription: "Свяжитесь с нашей командой экспертов для домов, участков и вилл на продажу в {district} и окрестностях.",
    contactButton: "Связаться с нами",
    viewListings: "Смотреть объявления",
    relatedSearches: "Похожие запросы",

    // Bottom CTA
    bottomCtaTitle: " - Консультации по недвижимости",
    bottomCtaDescription: "Kalinda Yapı предлагает услуги в сфере недвижимости, ремонта и строительства в {district} и по всему региону Мугла. Познакомьтесь с нашей профессиональной командой.",
    bottomCtaButton: "Получить бесплатную консультацию",

    // Metadata
    metaTitle: "Гид по недвижимости {district} | Дома, участки, виллы на продажу",
    metaKeywords: "{district}, недвижимость {district}, дома на продажу {district}, участки {district}, виллы {district}, недвижимость Мугла",
    ogTitle: "Путеводитель по району {district} и возможности недвижимости",

    // Neighborhoods section
    neighborhoodsTitle: "Районы {district}",
    neighborhoodsDescription: "В {district} {count} районов. Наши услуги по недвижимости, ремонту и строительству доступны во всех районах.",
    moreNeighborhoods: "+{count} районов ещё",
    showLess: "Показать меньше",
  },
};

// Helper to format strings with district name
export function formatDistrictText(template: string, district: string): string {
  return template.replace("{district}", district);
}
