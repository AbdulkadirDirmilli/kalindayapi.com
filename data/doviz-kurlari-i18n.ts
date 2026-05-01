// Döviz Kurları (Exchange Rates) Internationalization Data
import type { Locale } from '@/lib/i18n/config';
import { DovizFAQ } from '@/types/exchange';

// UI Text translations for doviz-kurlari page
export const dovizKurlariTexts: Record<Locale, {
  breadcrumb: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  lastUpdate: string;
  currencies: {
    USD: string;
    EUR: string;
    GBP: string;
    XAU: string;
  };
  dailyChange: string;
  educationalContent: {
    whatIsExchange: {
      title: string;
      paragraph1: string;
      paragraph2: string;
    };
    tcmb: {
      title: string;
      paragraph: string;
      points: string[];
    };
    realEstate: {
      title: string;
      paragraph1: string;
      paragraph2: string;
    };
    digitalResources: {
      title: string;
      paragraph: string;
      linkText: string;
    };
  };
  cta: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    viewListings: string;
    contactConsultant: string;
  };
}> = {
  tr: {
    breadcrumb: "Döviz Kurları",
    heroTitle: "Canlı",
    heroTitleHighlight: "Döviz Kurları",
    heroSubtitle: "Anlık USD, EUR, GBP ve altın kurlarını takip edin. TCMB kaynaklı güncel veriler.",
    lastUpdate: "Son güncelleme:",
    currencies: {
      USD: "Amerikan Doları",
      EUR: "Euro",
      GBP: "İngiliz Sterlini",
      XAU: "Altın (gram)",
    },
    dailyChange: "günlük değişim",
    educationalContent: {
      whatIsExchange: {
        title: "Döviz Kuru Nedir?",
        paragraph1: "Döviz kuru, bir ülkenin para biriminin başka bir ülkenin para birimi cinsinden değeridir. Örneğin, USD/TRY kuru 1 Amerikan Dolarının kaç Türk Lirası ettiğini gösterir.",
        paragraph2: "Türkiye'de referans döviz kurları, Türkiye Cumhuriyet Merkez Bankası (TCMB) tarafından her iş günü saat 15:30'da açıklanır. Piyasa kurları ise arz ve talebe göre gün içinde değişiklik gösterir.",
      },
      tcmb: {
        title: "TCMB ve Döviz Kurları",
        paragraph: "Türkiye Cumhuriyet Merkez Bankası (TCMB), Türkiye'nin para politikasını belirleyen ve uygulayan kurumdur. TCMB, döviz kurlarını doğrudan belirlemez ancak para politikası kararlarıyla kurları etkiler.",
        points: [
          "Günlük gösterge kurları her iş günü yayınlanır",
          "Efektif ve döviz alış/satış kurları ayrı gösterilir",
          "Kurlar piyasa işlemlerine göre gün içi değişir",
        ],
      },
      realEstate: {
        title: "Emlak ve Döviz İlişkisi",
        paragraph1: "Türkiye'deki gayrimenkul fiyatları TL cinsinden belirlense de, yabancı yatırımcılar için döviz kuru büyük önem taşır. Kur avantajlı dönemlerde yabancı yatırımcılar daha uygun fiyatlarla mülk edinebilir.",
        paragraph2: "Kalinda Yapı olarak, yabancı müşterilerimize hem TL hem de döviz bazlı fiyat bilgisi sunuyoruz. Muğla Ortaca, Dalyan ve çevresindeki emlak portföyümüzü incelemek için ilanlar sayfamızı ziyaret edin.",
      },
      digitalResources: {
        title: "Dijital Kaynaklar",
        paragraph: "Finans, teknoloji ve dijital dünya hakkında güncel içerikler için güvenilir kaynaklardan bilgi edinmek önemlidir. Yatırım kararlarınızı destekleyecek doğru bilgiye ulaşmak için çeşitli platformları takip edebilirsiniz.",
        linkText: "AKD Universe - Teknoloji ve Dijital Dünya",
      },
    },
    cta: {
      title: "Döviz Kurlarını Takip Ederken",
      titleHighlight: "Emlak Fırsatlarını Keşfedin",
      subtitle: "Muğla Ortaca, Dalyan ve çevresinde satılık ve kiralık emlak seçeneklerini döviz bazlı fiyatlarla inceleyin. Kalinda Yapı güvencesiyle yatırım yapın.",
      viewListings: "Tüm İlanları Görüntüle",
      contactConsultant: "Danışman ile Görüşün",
    },
  },
  en: {
    breadcrumb: "Exchange Rates",
    heroTitle: "Live",
    heroTitleHighlight: "Exchange Rates",
    heroSubtitle: "Track real-time USD, EUR, GBP and gold rates. Current data from TCMB.",
    lastUpdate: "Last update:",
    currencies: {
      USD: "US Dollar",
      EUR: "Euro",
      GBP: "British Pound",
      XAU: "Gold (gram)",
    },
    dailyChange: "daily change",
    educationalContent: {
      whatIsExchange: {
        title: "What is Exchange Rate?",
        paragraph1: "Exchange rate is the value of one country's currency in terms of another country's currency. For example, the USD/TRY rate shows how many Turkish Liras one US Dollar equals.",
        paragraph2: "In Turkey, reference exchange rates are announced by the Central Bank of the Republic of Turkey (TCMB) at 3:30 PM every business day. Market rates fluctuate throughout the day based on supply and demand.",
      },
      tcmb: {
        title: "TCMB and Exchange Rates",
        paragraph: "The Central Bank of the Republic of Turkey (TCMB) is the institution that determines and implements Turkey's monetary policy. TCMB does not directly set exchange rates but influences them through monetary policy decisions.",
        points: [
          "Daily indicative rates are published every business day",
          "Effective and forex buying/selling rates are shown separately",
          "Rates change throughout the day based on market transactions",
        ],
      },
      realEstate: {
        title: "Real Estate and Currency Relationship",
        paragraph1: "Although property prices in Turkey are set in TL, exchange rates are very important for foreign investors. During favorable exchange rate periods, foreign investors can acquire properties at more affordable prices.",
        paragraph2: "At Kalinda Yapı, we provide both TL and foreign currency pricing for our international clients. Visit our listings page to explore our property portfolio in Muğla Ortaca, Dalyan and surrounding areas.",
      },
      digitalResources: {
        title: "Digital Resources",
        paragraph: "It's important to get information from reliable sources about finance, technology and the digital world. You can follow various platforms to access the right information to support your investment decisions.",
        linkText: "AKD Universe - Technology and Digital World",
      },
    },
    cta: {
      title: "While Tracking Exchange Rates",
      titleHighlight: "Discover Real Estate Opportunities",
      subtitle: "Explore properties for sale and rent in Muğla Ortaca, Dalyan and surrounding areas with foreign currency prices. Invest with Kalinda Yapı guarantee.",
      viewListings: "View All Listings",
      contactConsultant: "Talk to a Consultant",
    },
  },
  ar: {
    breadcrumb: "أسعار الصرف",
    heroTitle: "أسعار",
    heroTitleHighlight: "الصرف المباشرة",
    heroSubtitle: "تتبع أسعار الدولار واليورو والجنيه والذهب في الوقت الفعلي. بيانات حالية من البنك المركزي التركي.",
    lastUpdate: "آخر تحديث:",
    currencies: {
      USD: "الدولار الأمريكي",
      EUR: "اليورو",
      GBP: "الجنيه الإسترليني",
      XAU: "الذهب (غرام)",
    },
    dailyChange: "التغير اليومي",
    educationalContent: {
      whatIsExchange: {
        title: "ما هو سعر الصرف؟",
        paragraph1: "سعر الصرف هو قيمة عملة دولة ما مقابل عملة دولة أخرى. على سبيل المثال، سعر USD/TRY يوضح كم ليرة تركية تساوي دولار أمريكي واحد.",
        paragraph2: "في تركيا، يعلن البنك المركزي التركي (TCMB) أسعار الصرف المرجعية في الساعة 3:30 مساءً كل يوم عمل. تتقلب أسعار السوق على مدار اليوم بناءً على العرض والطلب.",
      },
      tcmb: {
        title: "البنك المركزي وأسعار الصرف",
        paragraph: "البنك المركزي التركي (TCMB) هو المؤسسة التي تحدد وتنفذ السياسة النقدية في تركيا. لا يحدد البنك المركزي أسعار الصرف مباشرة ولكنه يؤثر عليها من خلال قرارات السياسة النقدية.",
        points: [
          "تنشر الأسعار الإرشادية اليومية كل يوم عمل",
          "تظهر أسعار الشراء/البيع النقدية والتحويلات بشكل منفصل",
          "تتغير الأسعار على مدار اليوم بناءً على معاملات السوق",
        ],
      },
      realEstate: {
        title: "العقارات والعملات",
        paragraph1: "على الرغم من أن أسعار العقارات في تركيا محددة بالليرة التركية، إلا أن أسعار الصرف مهمة جداً للمستثمرين الأجانب. خلال فترات أسعار الصرف المواتية، يمكن للمستثمرين الأجانب الحصول على عقارات بأسعار أكثر ملاءمة.",
        paragraph2: "في كالينداي يابي، نقدم أسعاراً بالليرة التركية والعملات الأجنبية لعملائنا الدوليين. قم بزيارة صفحة الإعلانات لاستكشاف محفظتنا العقارية في موغلا أورتاجا ودالان والمناطق المحيطة.",
      },
      digitalResources: {
        title: "الموارد الرقمية",
        paragraph: "من المهم الحصول على معلومات من مصادر موثوقة حول التمويل والتكنولوجيا والعالم الرقمي. يمكنك متابعة منصات مختلفة للوصول إلى المعلومات الصحيحة لدعم قرارات الاستثمار الخاصة بك.",
        linkText: "AKD Universe - التكنولوجيا والعالم الرقمي",
      },
    },
    cta: {
      title: "أثناء متابعة أسعار الصرف",
      titleHighlight: "اكتشف فرص العقارات",
      subtitle: "استكشف العقارات للبيع والإيجار في موغلا أورتاجا ودالان والمناطق المحيطة بأسعار العملات الأجنبية. استثمر مع ضمان كالينداي يابي.",
      viewListings: "عرض جميع الإعلانات",
      contactConsultant: "تحدث مع مستشار",
    },
  },
  de: {
    breadcrumb: "Wechselkurse",
    heroTitle: "Live",
    heroTitleHighlight: "Wechselkurse",
    heroSubtitle: "Verfolgen Sie USD, EUR, GBP und Goldkurse in Echtzeit. Aktuelle Daten von der TCMB.",
    lastUpdate: "Letztes Update:",
    currencies: {
      USD: "US-Dollar",
      EUR: "Euro",
      GBP: "Britisches Pfund",
      XAU: "Gold (Gramm)",
    },
    dailyChange: "Tagesänderung",
    educationalContent: {
      whatIsExchange: {
        title: "Was ist ein Wechselkurs?",
        paragraph1: "Der Wechselkurs ist der Wert einer Landeswährung im Verhältnis zur Währung eines anderen Landes. Zum Beispiel zeigt der USD/TRY-Kurs, wie viele türkische Lira ein US-Dollar wert ist.",
        paragraph2: "In der Türkei werden Referenzkurse von der Zentralbank der Republik Türkei (TCMB) an jedem Geschäftstag um 15:30 Uhr bekannt gegeben. Marktkurse schwanken im Tagesverlauf basierend auf Angebot und Nachfrage.",
      },
      tcmb: {
        title: "TCMB und Wechselkurse",
        paragraph: "Die Zentralbank der Republik Türkei (TCMB) bestimmt und setzt die Geldpolitik der Türkei um. Die TCMB legt Wechselkurse nicht direkt fest, beeinflusst sie aber durch geldpolitische Entscheidungen.",
        points: [
          "Tägliche Richtkurse werden an jedem Geschäftstag veröffentlicht",
          "Effektive und Devisen-Kauf-/Verkaufskurse werden separat angezeigt",
          "Kurse ändern sich im Tagesverlauf basierend auf Markttransaktionen",
        ],
      },
      realEstate: {
        title: "Immobilien und Währungsbeziehung",
        paragraph1: "Obwohl Immobilienpreise in der Türkei in TL festgelegt werden, sind Wechselkurse für ausländische Investoren sehr wichtig. In günstigen Wechselkursperioden können ausländische Investoren Immobilien zu erschwinglicheren Preisen erwerben.",
        paragraph2: "Bei Kalinda Yapı bieten wir sowohl TL- als auch Fremdwährungspreise für unsere internationalen Kunden. Besuchen Sie unsere Angebotsseite, um unser Immobilienportfolio in Muğla Ortaca, Dalyan und Umgebung zu erkunden.",
      },
      digitalResources: {
        title: "Digitale Ressourcen",
        paragraph: "Es ist wichtig, Informationen aus zuverlässigen Quellen über Finanzen, Technologie und die digitale Welt zu erhalten. Sie können verschiedene Plattformen verfolgen, um die richtigen Informationen zur Unterstützung Ihrer Investitionsentscheidungen zu erhalten.",
        linkText: "AKD Universe - Technologie und digitale Welt",
      },
    },
    cta: {
      title: "Während Sie Wechselkurse verfolgen",
      titleHighlight: "Entdecken Sie Immobilienchancen",
      subtitle: "Erkunden Sie Immobilien zum Kauf und zur Miete in Muğla Ortaca, Dalyan und Umgebung mit Fremdwährungspreisen. Investieren Sie mit Kalinda Yapı Garantie.",
      viewListings: "Alle Angebote anzeigen",
      contactConsultant: "Mit einem Berater sprechen",
    },
  },
  ru: {
    breadcrumb: "Курсы валют",
    heroTitle: "Курсы валют",
    heroTitleHighlight: "в реальном времени",
    heroSubtitle: "Отслеживайте курсы USD, EUR, GBP и золота в реальном времени. Актуальные данные от TCMB.",
    lastUpdate: "Последнее обновление:",
    currencies: {
      USD: "Доллар США",
      EUR: "Евро",
      GBP: "Британский фунт",
      XAU: "Золото (грамм)",
    },
    dailyChange: "дневное изменение",
    educationalContent: {
      whatIsExchange: {
        title: "Что такое обменный курс?",
        paragraph1: "Обменный курс — это стоимость валюты одной страны, выраженная в валюте другой страны. Например, курс USD/TRY показывает, сколько турецких лир стоит один доллар США.",
        paragraph2: "В Турции справочные курсы объявляются Центральным банком Турецкой Республики (TCMB) в 15:30 каждый рабочий день. Рыночные курсы колеблются в течение дня в зависимости от спроса и предложения.",
      },
      tcmb: {
        title: "TCMB и обменные курсы",
        paragraph: "Центральный банк Турецкой Республики (TCMB) определяет и реализует денежно-кредитную политику Турции. TCMB не устанавливает обменные курсы напрямую, но влияет на них через решения денежно-кредитной политики.",
        points: [
          "Ежедневные индикативные курсы публикуются каждый рабочий день",
          "Курсы покупки/продажи наличных и безналичных валют показаны отдельно",
          "Курсы меняются в течение дня в зависимости от рыночных операций",
        ],
      },
      realEstate: {
        title: "Недвижимость и валюта",
        paragraph1: "Хотя цены на недвижимость в Турции установлены в лирах, обменные курсы очень важны для иностранных инвесторов. В периоды выгодных курсов иностранные инвесторы могут приобретать недвижимость по более доступным ценам.",
        paragraph2: "В Kalinda Yapı мы предоставляем цены как в лирах, так и в иностранной валюте для наших международных клиентов. Посетите нашу страницу объявлений, чтобы изучить наш портфель недвижимости в Мугле Ортадже, Дальяне и окрестностях.",
      },
      digitalResources: {
        title: "Цифровые ресурсы",
        paragraph: "Важно получать информацию из надежных источников о финансах, технологиях и цифровом мире. Вы можете следить за различными платформами, чтобы получить правильную информацию для поддержки ваших инвестиционных решений.",
        linkText: "AKD Universe - Технологии и цифровой мир",
      },
    },
    cta: {
      title: "Отслеживая курсы валют",
      titleHighlight: "откройте для себя возможности недвижимости",
      subtitle: "Изучите недвижимость для продажи и аренды в Мугле Ортадже, Дальяне и окрестностях с ценами в иностранной валюте. Инвестируйте с гарантией Kalinda Yapı.",
      viewListings: "Смотреть все объявления",
      contactConsultant: "Поговорить с консультантом",
    },
  },
};

// Localized FAQ data
export const dovizFaqData: Record<Locale, DovizFAQ[]> = {
  tr: [
    {
      question: '1 Dolar kaç TL?',
      answer: 'Güncel dolar kuru TCMB verilerine göre anlık olarak güncellenmektedir. Sayfamızın üst kısmındaki canlı kur panosundan güncel USD/TRY kurunu takip edebilirsiniz. Dolar kuru, piyasa koşullarına göre gün içinde değişiklik gösterebilir.',
    },
    {
      question: 'Euro kaç TL?',
      answer: 'Euro kuru, Türkiye Cumhuriyet Merkez Bankası (TCMB) tarafından belirlenen günlük kurlar baz alınarak anlık olarak gösterilmektedir. EUR/TRY paritesini sayfamızdaki canlı kur panelinden takip edebilirsiniz.',
    },
    {
      question: 'Döviz kuru nasıl hesaplanır?',
      answer: 'Döviz kuru, bir ülkenin para biriminin başka bir ülkenin para birimi cinsinden değeridir. Türkiye\'de referans kurlar TCMB tarafından her iş günü saat 15:30\'da açıklanır. Piyasa kurları ise arz ve talebe göre anlık değişir.',
    },
    {
      question: 'TCMB döviz kuru nereden bakılır?',
      answer: 'TCMB döviz kurlarını resmi TCMB web sitesinden veya Kalinda Yapı döviz kuru sayfamızdan takip edebilirsiniz. Sayfamızda TCMB kaynaklı güncel kurlar anlık olarak güncellenmektedir.',
    },
    {
      question: 'Emlak yatırımında döviz kurları neden önemli?',
      answer: 'Yabancı yatırımcılar için Türkiye\'deki emlak fiyatları döviz kuruna bağlı olarak değişir. Dolar veya Euro bazında düşünen yatırımcılar, kur avantajlı dönemlerde daha uygun fiyatlarla mülk edinebilir. Kalinda Yapı olarak yabancı müşterilerimize döviz bazlı fiyat bilgisi sunuyoruz.',
    },
    {
      question: 'Yabancılar Türkiye\'den ev alabilir mi?',
      answer: 'Evet, yabancı uyruklu kişiler belirli koşullar altında Türkiye\'den gayrimenkul satın alabilir. Askeri yasak bölgeler dışında, karşılıklılık ilkesine uygun ülke vatandaşları tapu alabilir. Detaylı bilgi için Kalinda Yapı emlak danışmanlarımızla iletişime geçebilirsiniz.',
    },
  ],
  en: [
    {
      question: 'How much is 1 Dollar in TL?',
      answer: 'The current dollar rate is updated in real-time based on TCMB data. You can track the current USD/TRY rate from the live rate panel at the top of our page. The dollar rate may change throughout the day depending on market conditions.',
    },
    {
      question: 'How much is 1 Euro in TL?',
      answer: 'The Euro rate is displayed in real-time based on daily rates set by the Central Bank of the Republic of Turkey (TCMB). You can track the EUR/TRY parity from the live rate panel on our page.',
    },
    {
      question: 'How is the exchange rate calculated?',
      answer: 'Exchange rate is the value of one country\'s currency in terms of another country\'s currency. In Turkey, reference rates are announced by TCMB at 3:30 PM every business day. Market rates change instantly based on supply and demand.',
    },
    {
      question: 'Where can I check TCMB exchange rates?',
      answer: 'You can track TCMB exchange rates from the official TCMB website or from our Kalinda Yapı exchange rate page. Our page displays current TCMB-sourced rates updated in real-time.',
    },
    {
      question: 'Why are exchange rates important for real estate investment?',
      answer: 'For foreign investors, property prices in Turkey vary depending on exchange rates. Investors thinking in Dollar or Euro can acquire properties at more affordable prices during favorable exchange rate periods. At Kalinda Yapı, we provide foreign currency pricing for our international clients.',
    },
    {
      question: 'Can foreigners buy property in Turkey?',
      answer: 'Yes, foreign nationals can purchase real estate in Turkey under certain conditions. Except for military restricted areas, citizens of countries with reciprocity agreements can obtain title deeds. For detailed information, please contact our Kalinda Yapı real estate consultants.',
    },
  ],
  ar: [
    {
      question: 'كم يساوي الدولار بالليرة التركية؟',
      answer: 'يتم تحديث سعر الدولار الحالي في الوقت الفعلي بناءً على بيانات البنك المركزي التركي. يمكنك تتبع سعر USD/TRY الحالي من لوحة الأسعار المباشرة في أعلى صفحتنا. قد يتغير سعر الدولار على مدار اليوم حسب ظروف السوق.',
    },
    {
      question: 'كم يساوي اليورو بالليرة التركية؟',
      answer: 'يتم عرض سعر اليورو في الوقت الفعلي بناءً على الأسعار اليومية التي يحددها البنك المركزي التركي. يمكنك تتبع سعر EUR/TRY من لوحة الأسعار المباشرة على صفحتنا.',
    },
    {
      question: 'كيف يتم حساب سعر الصرف؟',
      answer: 'سعر الصرف هو قيمة عملة دولة ما مقابل عملة دولة أخرى. في تركيا، يعلن البنك المركزي الأسعار المرجعية في الساعة 3:30 مساءً كل يوم عمل. تتغير أسعار السوق فورياً بناءً على العرض والطلب.',
    },
    {
      question: 'أين يمكنني التحقق من أسعار صرف البنك المركزي؟',
      answer: 'يمكنك تتبع أسعار صرف البنك المركزي التركي من الموقع الرسمي للبنك المركزي أو من صفحة أسعار الصرف الخاصة بنا في كالينداي يابي. تعرض صفحتنا الأسعار الحالية من مصدر البنك المركزي محدثة في الوقت الفعلي.',
    },
    {
      question: 'لماذا أسعار الصرف مهمة للاستثمار العقاري؟',
      answer: 'بالنسبة للمستثمرين الأجانب، تختلف أسعار العقارات في تركيا حسب أسعار الصرف. يمكن للمستثمرين الذين يفكرون بالدولار أو اليورو الحصول على عقارات بأسعار أكثر ملاءمة خلال فترات أسعار الصرف المواتية. في كالينداي يابي، نقدم أسعاراً بالعملات الأجنبية لعملائنا الدوليين.',
    },
    {
      question: 'هل يمكن للأجانب شراء عقار في تركيا؟',
      answer: 'نعم، يمكن للأجانب شراء عقارات في تركيا بموجب شروط معينة. باستثناء المناطق العسكرية المحظورة، يمكن لمواطني الدول التي لديها اتفاقيات متبادلة الحصول على سندات ملكية. لمزيد من المعلومات، يرجى الاتصال بمستشاري العقارات لدينا في كالينداي يابي.',
    },
  ],
  de: [
    {
      question: 'Wie viel ist 1 Dollar in TL?',
      answer: 'Der aktuelle Dollarkurs wird basierend auf TCMB-Daten in Echtzeit aktualisiert. Sie können den aktuellen USD/TRY-Kurs über das Live-Kurspanel oben auf unserer Seite verfolgen. Der Dollarkurs kann sich im Laufe des Tages je nach Marktbedingungen ändern.',
    },
    {
      question: 'Wie viel ist 1 Euro in TL?',
      answer: 'Der Euro-Kurs wird basierend auf den täglichen Kursen der Zentralbank der Republik Türkei (TCMB) in Echtzeit angezeigt. Sie können die EUR/TRY-Parität über das Live-Kurspanel auf unserer Seite verfolgen.',
    },
    {
      question: 'Wie wird der Wechselkurs berechnet?',
      answer: 'Der Wechselkurs ist der Wert einer Landeswährung im Verhältnis zur Währung eines anderen Landes. In der Türkei werden Referenzkurse von der TCMB an jedem Geschäftstag um 15:30 Uhr bekannt gegeben. Marktkurse ändern sich sofort basierend auf Angebot und Nachfrage.',
    },
    {
      question: 'Wo kann ich TCMB-Wechselkurse überprüfen?',
      answer: 'Sie können TCMB-Wechselkurse auf der offiziellen TCMB-Website oder auf unserer Kalinda Yapı Wechselkursseite verfolgen. Unsere Seite zeigt aktuelle TCMB-Kurse in Echtzeit an.',
    },
    {
      question: 'Warum sind Wechselkurse für Immobilieninvestitionen wichtig?',
      answer: 'Für ausländische Investoren variieren die Immobilienpreise in der Türkei je nach Wechselkursen. Investoren, die in Dollar oder Euro denken, können in günstigen Wechselkursperioden Immobilien zu erschwinglicheren Preisen erwerben. Bei Kalinda Yapı bieten wir Fremdwährungspreise für unsere internationalen Kunden.',
    },
    {
      question: 'Können Ausländer in der Türkei Immobilien kaufen?',
      answer: 'Ja, ausländische Staatsbürger können unter bestimmten Bedingungen Immobilien in der Türkei erwerben. Außer in militärischen Sperrgebieten können Bürger von Ländern mit Gegenseitigkeitsabkommen Grundbucheinträge erhalten. Für detaillierte Informationen kontaktieren Sie bitte unsere Kalinda Yapı Immobilienberater.',
    },
  ],
  ru: [
    {
      question: 'Сколько стоит 1 доллар в TL?',
      answer: 'Текущий курс доллара обновляется в режиме реального времени на основе данных TCMB. Вы можете отслеживать текущий курс USD/TRY на панели курсов в верхней части нашей страницы. Курс доллара может меняться в течение дня в зависимости от рыночных условий.',
    },
    {
      question: 'Сколько стоит 1 евро в TL?',
      answer: 'Курс евро отображается в режиме реального времени на основе ежедневных курсов Центрального банка Турецкой Республики (TCMB). Вы можете отслеживать паритет EUR/TRY на панели курсов на нашей странице.',
    },
    {
      question: 'Как рассчитывается обменный курс?',
      answer: 'Обменный курс — это стоимость валюты одной страны, выраженная в валюте другой страны. В Турции справочные курсы объявляются TCMB в 15:30 каждый рабочий день. Рыночные курсы мгновенно меняются в зависимости от спроса и предложения.',
    },
    {
      question: 'Где можно проверить курсы TCMB?',
      answer: 'Вы можете отслеживать курсы TCMB на официальном сайте TCMB или на нашей странице курсов валют Kalinda Yapı. Наша страница отображает актуальные курсы от TCMB, обновляемые в режиме реального времени.',
    },
    {
      question: 'Почему курсы валют важны для инвестиций в недвижимость?',
      answer: 'Для иностранных инвесторов цены на недвижимость в Турции варьируются в зависимости от курсов валют. Инвесторы, думающие в долларах или евро, могут приобретать недвижимость по более доступным ценам в периоды выгодных курсов. В Kalinda Yapı мы предоставляем цены в иностранной валюте для наших международных клиентов.',
    },
    {
      question: 'Могут ли иностранцы покупать недвижимость в Турции?',
      answer: 'Да, иностранные граждане могут приобретать недвижимость в Турции при определенных условиях. За исключением военных запретных зон, граждане стран с соглашениями о взаимности могут получить свидетельства о праве собственности. Для получения подробной информации свяжитесь с нашими консультантами по недвижимости Kalinda Yapı.',
    },
  ],
};
