// Danismanlar sayfasi cevirileri
import { Locale } from "@/lib/i18n/config";

export interface DanismanlarTexts {
  breadcrumb: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  /** "{n} aktif ilan" kalibi */
  activeListings: string;
  /** "{n} yil deneyim" kalibi */
  experience: string;
  regions: string;
  call: string;
  whatsapp: string;
  email: string;
  empty: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
}

export const danismanlarTexts: Record<Locale, DanismanlarTexts> = {
  tr: {
    breadcrumb: "Danışmanlar",
    metaTitle: "Danışmanlarımız",
    metaDescription:
      "Ortaca, Dalyan, Köyceğiz ve Dalaman bölgelerinde çalışan lisanslı gayrimenkul danışmanlarımız. Aradığınız bölgeye göre doğru kişiyle görüşün.",
    heroTitle: "Sizi Arayacak",
    heroTitleHighlight: "Ekip",
    heroDescription:
      "Her danışmanımız belirli bölgelerde uzmanlaşır. Aradığınız gayrimenkulün bulunduğu bölgeye göre sizi doğru kişiyle buluşturuyoruz.",
    activeListings: "aktif ilan",
    experience: "yıl deneyim",
    regions: "Uzmanlık bölgeleri",
    call: "Ara",
    whatsapp: "WhatsApp",
    email: "E-posta",
    empty: "Henüz danışman eklenmemiş.",
    ctaTitle: "Ekibimize katılmak ister misiniz?",
    ctaDescription:
      "Deneyimli ya da yeni başlayan gayrimenkul danışmanları için birlikte çalışma imkânı sunuyoruz.",
    ctaButton: "Bize ulaşın",
  },
  en: {
    breadcrumb: "Consultants",
    metaTitle: "Our Consultants",
    metaDescription:
      "Our licensed real estate consultants working in Ortaca, Dalyan, Köyceğiz and Dalaman. Talk to the right person for your area.",
    heroTitle: "The Team That Will",
    heroTitleHighlight: "Call You",
    heroDescription:
      "Each of our consultants specialises in specific areas. We connect you with the right person for the location you are interested in.",
    activeListings: "active listings",
    experience: "years of experience",
    regions: "Areas of expertise",
    call: "Call",
    whatsapp: "WhatsApp",
    email: "Email",
    empty: "No consultants have been added yet.",
    ctaTitle: "Would you like to join our team?",
    ctaDescription:
      "We offer opportunities for both experienced and newly starting real estate consultants.",
    ctaButton: "Get in touch",
  },
  de: {
    breadcrumb: "Berater",
    metaTitle: "Unsere Berater",
    metaDescription:
      "Unsere lizenzierten Immobilienberater in Ortaca, Dalyan, Köyceğiz und Dalaman. Sprechen Sie mit der richtigen Person für Ihre Region.",
    heroTitle: "Das Team, das Sie",
    heroTitleHighlight: "Anruft",
    heroDescription:
      "Jeder unserer Berater ist auf bestimmte Regionen spezialisiert. Wir bringen Sie mit der richtigen Person für Ihre Wunschlage zusammen.",
    activeListings: "aktive Angebote",
    experience: "Jahre Erfahrung",
    regions: "Fachgebiete",
    call: "Anrufen",
    whatsapp: "WhatsApp",
    email: "E-Mail",
    empty: "Es wurden noch keine Berater hinzugefügt.",
    ctaTitle: "Möchten Sie unserem Team beitreten?",
    ctaDescription:
      "Wir bieten Möglichkeiten für erfahrene und neu startende Immobilienberater.",
    ctaButton: "Kontakt aufnehmen",
  },
  ru: {
    breadcrumb: "Консультанты",
    metaTitle: "Наши консультанты",
    metaDescription:
      "Наши лицензированные консультанты по недвижимости в Ортаджа, Дальян, Кёйджегиз и Даламан. Обратитесь к нужному специалисту по вашему району.",
    heroTitle: "Команда, которая вам",
    heroTitleHighlight: "Позвонит",
    heroDescription:
      "Каждый наш консультант специализируется на определённых районах. Мы соединим вас с нужным специалистом по интересующей локации.",
    activeListings: "активных объявлений",
    experience: "лет опыта",
    regions: "Районы специализации",
    call: "Позвонить",
    whatsapp: "WhatsApp",
    email: "Эл. почта",
    empty: "Консультанты ещё не добавлены.",
    ctaTitle: "Хотите присоединиться к нашей команде?",
    ctaDescription:
      "Мы предлагаем возможности как опытным, так и начинающим консультантам по недвижимости.",
    ctaButton: "Связаться с нами",
  },
  ar: {
    breadcrumb: "المستشارون",
    metaTitle: "مستشارونا",
    metaDescription:
      "مستشارونا العقاريون المرخصون في أورتاجا ودالyan وكويجيز ودالامان. تحدث مع الشخص المناسب لمنطقتك.",
    heroTitle: "الفريق الذي",
    heroTitleHighlight: "سيتصل بك",
    heroDescription:
      "يتخصص كل مستشار لدينا في مناطق محددة. نوصلك بالشخص المناسب للموقع الذي تبحث عنه.",
    activeListings: "إعلان نشط",
    experience: "سنوات خبرة",
    regions: "مجالات الخبرة",
    call: "اتصل",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
    empty: "لم تتم إضافة مستشارين بعد.",
    ctaTitle: "هل ترغب في الانضمام إلى فريقنا؟",
    ctaDescription: "نوفر فرصًا للمستشارين العقاريين ذوي الخبرة والمبتدئين.",
    ctaButton: "تواصل معنا",
  },
};
