import { Locale } from "@/lib/i18n";

interface LocaleMeta {
  title: string;
  description: string;
  h1: string;
  intro: string;
}

interface LocaleContent {
  sections: Array<{
    title: string;
    content: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export interface LandingPageConfig {
  slug: string;
  filter: {
    kategori?: "satilik" | "kiralik";
    tip?: string;
    konum?: string;
  };
  meta: Record<Locale, LocaleMeta>;
  content: Record<Locale, LocaleContent>;
}

export const landingPages: Record<string, LandingPageConfig> = {
  "ortaca-satilik-daire": {
    slug: "ortaca-satilik-daire",
    filter: {
      kategori: "satilik",
      tip: "daire",
      konum: "Ortaca",
    },
    meta: {
      tr: {
        title: "Ortaca Satılık Daire 2026 | Güncel Fiyatlar & İlanlar",
        description: "Ortaca'da satılık daire ilanları ✓ 50+ güncel ilan ✓ Merkez, sahil, üniversite yakını lokasyonlar ✓ Ücretsiz emlak danışmanlığı. Hemen inceleyin! ☎ 0537 053 07 54",
        h1: "Ortaca Satılık Daire İlanları 2026",
        intro: "Muğla'nın gözde ilçesi Ortaca'da satılık daire mi arıyorsunuz? Kalinda Yapı olarak Ortaca merkezden sahile, üniversite çevresinden yeni yapı projelerine kadar geniş portföyümüzle hizmetinizdeyiz. Lisanslı emlak danışmanlarımızla güvenli ve hızlı bir şekilde hayalinizdeki daireye kavuşun.",
      },
      en: {
        title: "Apartments for Sale in Ortaca 2026 | Current Prices & Listings",
        description: "Apartments for sale in Ortaca ✓ 50+ listings ✓ City center, beachside, university area locations ✓ Free real estate consultation. Browse now! ☎ +90 537 053 07 54",
        h1: "Apartments for Sale in Ortaca 2026",
        intro: "Looking for an apartment for sale in Ortaca, one of Muğla's most popular districts? At Kalinda Yapı, we serve you with our wide portfolio from Ortaca city center to the seaside, from university surroundings to new construction projects. Find your dream apartment safely and quickly with our licensed real estate consultants.",
      },
      ar: {
        title: "شقق للبيع في أورتاجا 2026 | الأسعار والإعلانات الحالية",
        description: "شقق للبيع في أورتاجا ✓ 50+ إعلان ✓ مركز المدينة، الشاطئ، منطقة الجامعة ✓ استشارة عقارية مجانية. تصفح الآن! ☎ 00905370530754",
        h1: "شقق للبيع في أورتاجا 2026",
        intro: "هل تبحث عن شقة للبيع في أورتاجا، إحدى أكثر مناطق موغلا شعبية؟ في كالينداي يابي، نخدمك بمحفظتنا الواسعة من مركز مدينة أورتاجا إلى الشاطئ، ومن محيط الجامعة إلى مشاريع البناء الجديدة.",
      },
      de: {
        title: "Wohnungen zum Verkauf in Ortaca 2026 | Aktuelle Preise & Angebote",
        description: "Wohnungen zum Verkauf in Ortaca ✓ 50+ Angebote ✓ Stadtzentrum, Strandnähe, Universitätsviertel ✓ Kostenlose Immobilienberatung. Jetzt ansehen! ☎ +90 537 053 07 54",
        h1: "Wohnungen zum Verkauf in Ortaca 2026",
        intro: "Suchen Sie eine Wohnung zum Verkauf in Ortaca, einem der beliebtesten Bezirke von Muğla? Bei Kalinda Yapı bedienen wir Sie mit unserem breiten Portfolio vom Stadtzentrum Ortaca bis zur Küste, von der Universitätsumgebung bis zu Neubauprojekten.",
      },
      ru: {
        title: "Квартиры на продажу в Ортадже 2026 | Актуальные цены и объявления",
        description: "Квартиры на продажу в Ортадже ✓ 50+ объявлений ✓ Центр города, пляж, район университета ✓ Бесплатная консультация. Смотрите сейчас! ☎ +90 537 053 07 54",
        h1: "Квартиры на продажу в Ортадже 2026",
        intro: "Ищете квартиру на продажу в Ортадже, одном из самых популярных районов Мугла? В Kalinda Yapı мы обслуживаем вас с нашим широким портфолио от центра Ортаджи до побережья, от окрестностей университета до новых строительных проектов.",
      },
    },
    content: {
      tr: {
        sections: [
          {
            title: "Ortaca'da Satılık Daire Fiyatları 2026",
            content: "Ortaca'da daire fiyatları konuma ve özelliklere göre değişiklik göstermektedir. Ortaca merkezdeki daireler ortalama 1.200.000 TL - 2.500.000 TL arasında, Cumhuriyet Mahallesi'nde 950.000 TL - 1.800.000 TL arasında, Dalyan yolu üzerinde ise 1.500.000 TL - 3.000.000 TL arasında fiyatlandırılmaktadır. Metrekare fiyatları 12.000 TL ile 25.000 TL arasında değişmektedir.",
          },
          {
            title: "Neden Ortaca'da Ev Almalısınız?",
            content: "Ortaca, Dalaman Havaalanı'na sadece 25 dakika mesafede stratejik bir konuma sahiptir. Fethiye ve Marmaris'e kıyasla %30-40 daha uygun fiyatlarla kaliteli gayrimenkul sahibi olabilirsiniz. Bölgede yeni hastane, üniversite kampüsü ve AVM projeleri ile altyapı hızla gelişmektedir. Ayrıca Dalyan, Köyceğiz Gölü ve Iztuzu Plajı gibi doğal güzelliklere yakınlık, yaşam kalitesini artırmaktadır.",
          },
          {
            title: "Ortaca'da Popüler Mahalleler",
            content: "Cumhuriyet Mahallesi, Ortaca'nın en merkezi bölgesidir. Pazara, okullara ve hastaneye yürüme mesafesindedir. Atatürk Mahallesi sakin aile ortamı, geniş parklar ve modern siteler sunar. Karaburun bölgesi denize yakınlığı ile öne çıkarken, Dalyan yolu üzeri hem yatırım hem de yaşam için ideal bir tercih olmaktadır.",
          },
        ],
        faq: [
          {
            question: "Ortaca'da satılık daire fiyatları ne kadar?",
            answer: "Ortaca'da satılık daire fiyatları 2+1 daireler için ortalama 950.000 TL'den başlamakta, merkezi konumlarda 2.500.000 TL'ye kadar çıkabilmektedir. Metrekare fiyatları 12.000-25.000 TL arasında değişmektedir.",
          },
          {
            question: "Ortaca'da en iyi mahalleler hangileri?",
            answer: "Ortaca'da en çok tercih edilen mahalleler Cumhuriyet Mahallesi (merkezi konum), Atatürk Mahallesi (sakin aile ortamı) ve Karaburun (denize yakın) bölgeleridir.",
          },
          {
            question: "Ortaca'da emlak yatırımı mantıklı mı?",
            answer: "Evet, Ortaca gelişen altyapısı, üniversite ve turizm potansiyeli ile yatırım için cazip bir bölgedir. Son 5 yılda gayrimenkul değerleri ortalama %200 artış göstermiştir.",
          },
        ],
      },
      en: {
        sections: [
          {
            title: "Apartment Prices in Ortaca 2026",
            content: "Apartment prices in Ortaca vary according to location and features. Apartments in Ortaca center are priced between 1,200,000 TL - 2,500,000 TL on average, in Cumhuriyet Mahallesi between 950,000 TL - 1,800,000 TL, and on Dalyan road between 1,500,000 TL - 3,000,000 TL. Price per square meter ranges from 12,000 TL to 25,000 TL.",
          },
          {
            title: "Why Buy Property in Ortaca?",
            content: "Ortaca has a strategic location just 25 minutes from Dalaman Airport. You can own quality real estate at 30-40% lower prices compared to Fethiye and Marmaris. Infrastructure is rapidly developing with new hospital, university campus, and shopping mall projects. Proximity to natural beauties like Dalyan, Köyceğiz Lake, and Iztuzu Beach enhances quality of life.",
          },
          {
            title: "Popular Neighborhoods in Ortaca",
            content: "Cumhuriyet Mahallesi is the most central area of Ortaca, within walking distance to the market, schools, and hospital. Atatürk Mahallesi offers a quiet family environment, large parks, and modern residences. Karaburun area stands out with its proximity to the sea, while Dalyan road is an ideal choice for both investment and living.",
          },
        ],
        faq: [
          {
            question: "What are apartment prices in Ortaca?",
            answer: "Apartment prices in Ortaca start from an average of 950,000 TL for 2+1 apartments and can go up to 2,500,000 TL in central locations. Price per square meter ranges from 12,000-25,000 TL.",
          },
          {
            question: "What are the best neighborhoods in Ortaca?",
            answer: "The most preferred neighborhoods in Ortaca are Cumhuriyet Mahallesi (central location), Atatürk Mahallesi (quiet family environment), and Karaburun area (close to the sea).",
          },
          {
            question: "Is real estate investment in Ortaca worthwhile?",
            answer: "Yes, Ortaca is an attractive area for investment with its developing infrastructure, university, and tourism potential. Property values have increased by an average of 200% over the last 5 years.",
          },
        ],
      },
      ar: {
        sections: [
          {
            title: "أسعار الشقق في أورتاجا 2026",
            content: "تختلف أسعار الشقق في أورتاجا حسب الموقع والمميزات. تتراوح أسعار الشقق في مركز أورتاجا بين 1,200,000 - 2,500,000 ليرة تركية، وفي حي الجمهورية بين 950,000 - 1,800,000 ليرة تركية، وعلى طريق دالان بين 1,500,000 - 3,000,000 ليرة تركية.",
          },
          {
            title: "لماذا تشتري عقار في أورتاجا؟",
            content: "تتمتع أورتاجا بموقع استراتيجي على بعد 25 دقيقة فقط من مطار دالامان. يمكنك امتلاك عقارات عالية الجودة بأسعار أقل بنسبة 30-40% مقارنة بفتحية ومارماريس. البنية التحتية تتطور بسرعة مع مشاريع المستشفى الجديد وحرم الجامعة ومركز التسوق.",
          },
          {
            title: "الأحياء الشعبية في أورتاجا",
            content: "حي الجمهورية هو المنطقة الأكثر مركزية في أورتاجا، على مسافة قريبة من السوق والمدارس والمستشفى. يوفر حي أتاتورك بيئة عائلية هادئة وحدائق واسعة ومجمعات سكنية حديثة.",
          },
        ],
        faq: [
          {
            question: "ما هي أسعار الشقق في أورتاجا؟",
            answer: "تبدأ أسعار الشقق في أورتاجا من متوسط 950,000 ليرة تركية للشقق 2+1 ويمكن أن تصل إلى 2,500,000 ليرة تركية في المواقع المركزية.",
          },
          {
            question: "ما هي أفضل الأحياء في أورتاجا؟",
            answer: "الأحياء الأكثر تفضيلاً في أورتاجا هي حي الجمهورية (موقع مركزي)، حي أتاتورك (بيئة عائلية هادئة)، ومنطقة كارابورون (قريبة من البحر).",
          },
          {
            question: "هل الاستثمار العقاري في أورتاجا مجدٍ؟",
            answer: "نعم، أورتاجا منطقة جذابة للاستثمار مع بنيتها التحتية المتطورة وإمكاناتها الجامعية والسياحية. زادت قيم العقارات بمتوسط 200% خلال السنوات الخمس الماضية.",
          },
        ],
      },
      de: {
        sections: [
          {
            title: "Wohnungspreise in Ortaca 2026",
            content: "Wohnungspreise in Ortaca variieren je nach Lage und Ausstattung. Wohnungen im Zentrum von Ortaca kosten durchschnittlich 1.200.000 - 2.500.000 TL, im Cumhuriyet Viertel 950.000 - 1.800.000 TL und an der Dalyan-Straße 1.500.000 - 3.000.000 TL.",
          },
          {
            title: "Warum sollten Sie in Ortaca kaufen?",
            content: "Ortaca hat eine strategische Lage, nur 25 Minuten vom Flughafen Dalaman entfernt. Sie können hochwertige Immobilien zu 30-40% günstigeren Preisen als in Fethiye und Marmaris erwerben. Die Infrastruktur entwickelt sich schnell mit neuen Krankenhaus-, Universitäts- und Einkaufszentrumsprojekten.",
          },
          {
            title: "Beliebte Viertel in Ortaca",
            content: "Das Cumhuriyet Viertel ist das zentralste Gebiet von Ortaca, zu Fuß erreichbar von Markt, Schulen und Krankenhaus. Das Atatürk Viertel bietet eine ruhige Familienumgebung, große Parks und moderne Wohnanlagen.",
          },
        ],
        faq: [
          {
            question: "Was kosten Wohnungen in Ortaca?",
            answer: "Wohnungspreise in Ortaca beginnen bei durchschnittlich 950.000 TL für 2+1 Wohnungen und können in zentralen Lagen bis zu 2.500.000 TL erreichen.",
          },
          {
            question: "Welche sind die besten Viertel in Ortaca?",
            answer: "Die beliebtesten Viertel in Ortaca sind Cumhuriyet (zentrale Lage), Atatürk (ruhige Familienumgebung) und Karaburun (nahe am Meer).",
          },
          {
            question: "Lohnt sich eine Immobilieninvestition in Ortaca?",
            answer: "Ja, Ortaca ist mit seiner sich entwickelnden Infrastruktur, Universität und Tourismuspotenzial ein attraktives Investitionsgebiet. Die Immobilienwerte sind in den letzten 5 Jahren um durchschnittlich 200% gestiegen.",
          },
        ],
      },
      ru: {
        sections: [
          {
            title: "Цены на квартиры в Ортадже 2026",
            content: "Цены на квартиры в Ортадже варьируются в зависимости от расположения и характеристик. Квартиры в центре Ортаджи стоят в среднем 1.200.000 - 2.500.000 TL, в районе Джумхуриет 950.000 - 1.800.000 TL, а на дороге Далян 1.500.000 - 3.000.000 TL.",
          },
          {
            title: "Почему стоит покупать в Ортадже?",
            content: "Ортаджа имеет стратегическое расположение всего в 25 минутах от аэропорта Даламан. Вы можете приобрести качественную недвижимость на 30-40% дешевле, чем в Фетхие и Мармарисе. Инфраструктура быстро развивается с новыми проектами больниц, университетов и торговых центров.",
          },
          {
            title: "Популярные районы в Ортадже",
            content: "Район Джумхуриет - самый центральный район Ортаджи, в пешей доступности от рынка, школ и больницы. Район Ататюрк предлагает спокойную семейную обстановку, большие парки и современные жилые комплексы.",
          },
        ],
        faq: [
          {
            question: "Сколько стоят квартиры в Ортадже?",
            answer: "Цены на квартиры в Ортадже начинаются в среднем от 950.000 TL за квартиры 2+1 и могут достигать 2.500.000 TL в центральных районах.",
          },
          {
            question: "Какие лучшие районы в Ортадже?",
            answer: "Самые популярные районы в Ортадже - Джумхуриет (центральное расположение), Ататюрк (спокойная семейная обстановка) и Карабурун (близко к морю).",
          },
          {
            question: "Выгодно ли инвестировать в недвижимость в Ортадже?",
            answer: "Да, Ортаджа - привлекательный район для инвестиций благодаря развивающейся инфраструктуре, университету и туристическому потенциалу. Стоимость недвижимости выросла в среднем на 200% за последние 5 лет.",
          },
        ],
      },
    },
  },

  "ortaca-kiralik-daire": {
    slug: "ortaca-kiralik-daire",
    filter: {
      kategori: "kiralik",
      tip: "daire",
      konum: "Ortaca",
    },
    meta: {
      tr: {
        title: "Ortaca Kiralık Daire 2026 | Güncel Kira Fiyatları & İlanlar",
        description: "Ortaca'da kiralık daire ilanları ✓ Öğrenci & aile daireleri ✓ Üniversite yakını ✓ Uygun fiyatlar. Hemen inceleyin! ☎ 0537 053 07 54",
        h1: "Ortaca Kiralık Daire İlanları 2026",
        intro: "Ortaca'da kiralık daire mi arıyorsunuz? Muğla Sıtkı Koçman Üniversitesi öğrencileri ve aileler için uygun fiyatlı kiralık daire seçenekleri sunuyoruz. Merkezi konumlardan üniversite yakınına kadar geniş portföyümüzle hizmetinizdeyiz.",
      },
      en: {
        title: "Apartments for Rent in Ortaca 2026 | Current Rental Prices & Listings",
        description: "Apartments for rent in Ortaca ✓ Student & family apartments ✓ Near university ✓ Affordable prices. Browse now! ☎ +90 537 053 07 54",
        h1: "Apartments for Rent in Ortaca 2026",
        intro: "Looking for an apartment for rent in Ortaca? We offer affordable rental apartment options for Muğla Sıtkı Koçman University students and families. We serve you with our wide portfolio from central locations to near the university.",
      },
      ar: {
        title: "شقق للإيجار في أورتاجا 2026 | أسعار الإيجار الحالية والإعلانات",
        description: "شقق للإيجار في أورتاجا ✓ شقق للطلاب والعائلات ✓ بالقرب من الجامعة ✓ أسعار معقولة. تصفح الآن! ☎ 00905370530754",
        h1: "شقق للإيجار في أورتاجا 2026",
        intro: "هل تبحث عن شقة للإيجار في أورتاجا؟ نقدم خيارات شقق بأسعار معقولة لطلاب جامعة موغلا صتقي كوجمان والعائلات.",
      },
      de: {
        title: "Wohnungen zur Miete in Ortaca 2026 | Aktuelle Mietpreise & Angebote",
        description: "Wohnungen zur Miete in Ortaca ✓ Studenten- & Familienwohnungen ✓ Nahe Universität ✓ Günstige Preise. Jetzt ansehen! ☎ +90 537 053 07 54",
        h1: "Wohnungen zur Miete in Ortaca 2026",
        intro: "Suchen Sie eine Mietwohnung in Ortaca? Wir bieten erschwingliche Mietwohnungen für Studenten der Muğla Sıtkı Koçman Universität und Familien an.",
      },
      ru: {
        title: "Квартиры в аренду в Ортадже 2026 | Актуальные цены аренды и объявления",
        description: "Квартиры в аренду в Ортадже ✓ Для студентов и семей ✓ Рядом с университетом ✓ Доступные цены. Смотрите сейчас! ☎ +90 537 053 07 54",
        h1: "Квартиры в аренду в Ортадже 2026",
        intro: "Ищете квартиру в аренду в Ортадже? Мы предлагаем доступные варианты аренды для студентов университета Мугла Сытки Кочман и семей.",
      },
    },
    content: {
      tr: {
        sections: [
          {
            title: "Ortaca'da Kiralık Daire Fiyatları 2026",
            content: "Ortaca'da kiralık daire fiyatları 1+1 daireler için aylık 8.000 TL'den, 2+1 daireler için 12.000 TL'den başlamaktadır. Üniversite yakınındaki öğrenci daireleri 6.000-10.000 TL arasında, merkezi konumlardaki lüks daireler ise 15.000-25.000 TL arasında kiralanmaktadır.",
          },
          {
            title: "Öğrenciler İçin Kiralık Daire",
            content: "Muğla Sıtkı Koçman Üniversitesi Ortaca Yerleşkesi'ne yakın bölgelerde öğrenci dostu kiralık daireler mevcuttur. Ekonomik fiyatlı, eşyalı veya eşyasız seçenekler sunuyoruz. Kampüse servis güzergahı üzerinde, market ve kafelere yakın lokasyonlarda dairelerimiz bulunmaktadır.",
          },
        ],
        faq: [
          {
            question: "Ortaca'da kiralık daire fiyatları ne kadar?",
            answer: "Ortaca'da kiralık daire fiyatları 1+1 için 8.000 TL'den, 2+1 için 12.000 TL'den başlamaktadır. Öğrenci daireleri 6.000-10.000 TL arasındadır.",
          },
          {
            question: "Ortaca'da öğrenciler için uygun kiralık daire var mı?",
            answer: "Evet, üniversite kampüsüne yakın bölgelerde 6.000-10.000 TL arasında öğrenci dostu kiralık daireler mevcuttur.",
          },
        ],
      },
      en: {
        sections: [
          {
            title: "Rental Prices in Ortaca 2026",
            content: "Rental apartment prices in Ortaca start from 8,000 TL per month for 1+1 apartments and 12,000 TL for 2+1 apartments. Student apartments near the university range from 6,000-10,000 TL, while luxury apartments in central locations rent for 15,000-25,000 TL.",
          },
          {
            title: "Apartments for Students",
            content: "Student-friendly rental apartments are available near Muğla Sıtkı Koçman University Ortaca Campus. We offer economically priced, furnished or unfurnished options. Our apartments are located on campus shuttle routes, close to markets and cafes.",
          },
        ],
        faq: [
          {
            question: "What are rental prices in Ortaca?",
            answer: "Rental apartment prices in Ortaca start from 8,000 TL for 1+1 and 12,000 TL for 2+1 apartments. Student apartments range from 6,000-10,000 TL.",
          },
          {
            question: "Are there affordable apartments for students in Ortaca?",
            answer: "Yes, student-friendly rental apartments are available near the university campus for 6,000-10,000 TL.",
          },
        ],
      },
      ar: {
        sections: [
          {
            title: "أسعار الإيجار في أورتاجا 2026",
            content: "تبدأ أسعار الشقق المستأجرة في أورتاجا من 8,000 ليرة تركية شهرياً للشقق 1+1 و 12,000 ليرة تركية للشقق 2+1. تتراوح شقق الطلاب بالقرب من الجامعة بين 6,000-10,000 ليرة تركية.",
          },
          {
            title: "شقق للطلاب",
            content: "تتوفر شقق مستأجرة صديقة للطلاب بالقرب من حرم جامعة موغلا صتقي كوجمان في أورتاجا. نقدم خيارات اقتصادية مفروشة أو غير مفروشة.",
          },
        ],
        faq: [
          {
            question: "ما هي أسعار الإيجار في أورتاجا؟",
            answer: "تبدأ أسعار الشقق المستأجرة من 8,000 ليرة تركية للشقق 1+1 و 12,000 ليرة تركية للشقق 2+1.",
          },
          {
            question: "هل توجد شقق بأسعار معقولة للطلاب في أورتاجا؟",
            answer: "نعم، تتوفر شقق صديقة للطلاب بالقرب من الحرم الجامعي بأسعار تتراوح بين 6,000-10,000 ليرة تركية.",
          },
        ],
      },
      de: {
        sections: [
          {
            title: "Mietpreise in Ortaca 2026",
            content: "Mietwohnungspreise in Ortaca beginnen bei 8.000 TL pro Monat für 1+1 Wohnungen und 12.000 TL für 2+1 Wohnungen. Studentenwohnungen in der Nähe der Universität kosten 6.000-10.000 TL.",
          },
          {
            title: "Wohnungen für Studenten",
            content: "Studentenfreundliche Mietwohnungen sind in der Nähe des Campus der Muğla Sıtkı Koçman Universität verfügbar. Wir bieten günstige, möblierte oder unmöblierte Optionen an.",
          },
        ],
        faq: [
          {
            question: "Was kosten Mietwohnungen in Ortaca?",
            answer: "Mietwohnungspreise in Ortaca beginnen bei 8.000 TL für 1+1 und 12.000 TL für 2+1 Wohnungen. Studentenwohnungen kosten 6.000-10.000 TL.",
          },
          {
            question: "Gibt es günstige Wohnungen für Studenten in Ortaca?",
            answer: "Ja, studentenfreundliche Mietwohnungen sind in der Nähe des Universitätscampus für 6.000-10.000 TL verfügbar.",
          },
        ],
      },
      ru: {
        sections: [
          {
            title: "Цены на аренду в Ортадже 2026",
            content: "Цены на аренду квартир в Ортадже начинаются от 8.000 TL в месяц за квартиры 1+1 и 12.000 TL за квартиры 2+1. Студенческие квартиры рядом с университетом стоят 6.000-10.000 TL.",
          },
          {
            title: "Квартиры для студентов",
            content: "Студенческие квартиры доступны рядом с кампусом университета Мугла Сытки Кочман. Мы предлагаем экономичные варианты с мебелью или без.",
          },
        ],
        faq: [
          {
            question: "Сколько стоит аренда в Ортадже?",
            answer: "Цены на аренду квартир начинаются от 8.000 TL за 1+1 и 12.000 TL за 2+1 квартиры. Студенческие квартиры стоят 6.000-10.000 TL.",
          },
          {
            question: "Есть ли доступные квартиры для студентов в Ортадже?",
            answer: "Да, студенческие квартиры доступны рядом с кампусом университета за 6.000-10.000 TL.",
          },
        ],
      },
    },
  },

  "dalaman-satilik-ev": {
    slug: "dalaman-satilik-ev",
    filter: {
      kategori: "satilik",
      konum: "Dalaman",
    },
    meta: {
      tr: {
        title: "Dalaman Satılık Ev & Daire 2026 | Havaalanı Yakını Emlak",
        description: "Dalaman'da satılık ev ve daire ilanları ✓ Havaalanına yakın ✓ Yatırımlık fırsatlar ✓ Villa & arsa seçenekleri. ☎ 0537 053 07 54",
        h1: "Dalaman Satılık Ev ve Daire İlanları 2026",
        intro: "Dalaman Havaalanı'na yakın konumda satılık ev, daire, villa ve arsa ilanları. Turizm potansiyeli yüksek Dalaman bölgesinde yatırım fırsatlarını kaçırmayın. Kalinda Yapı olarak Dalaman ve çevresinde geniş portföyümüzle hizmetinizdeyiz.",
      },
      en: {
        title: "Houses & Apartments for Sale in Dalaman 2026 | Near Airport Property",
        description: "Houses and apartments for sale in Dalaman ✓ Near airport ✓ Investment opportunities ✓ Villa & land options. ☎ +90 537 053 07 54",
        h1: "Houses and Apartments for Sale in Dalaman 2026",
        intro: "Houses, apartments, villas, and land for sale near Dalaman Airport. Don't miss investment opportunities in the high tourism potential Dalaman region. At Kalinda Yapı, we serve you with our wide portfolio in Dalaman and surrounding areas.",
      },
      ar: {
        title: "منازل وشقق للبيع في دالامان 2026 | عقارات قرب المطار",
        description: "منازل وشقق للبيع في دالامان ✓ قرب المطار ✓ فرص استثمارية ✓ خيارات فلل وأراضي. ☎ 00905370530754",
        h1: "منازل وشقق للبيع في دالامان 2026",
        intro: "منازل وشقق وفلل وأراضي للبيع بالقرب من مطار دالامان. لا تفوت فرص الاستثمار في منطقة دالامان ذات الإمكانيات السياحية العالية.",
      },
      de: {
        title: "Häuser & Wohnungen zum Verkauf in Dalaman 2026 | Immobilien nahe Flughafen",
        description: "Häuser und Wohnungen zum Verkauf in Dalaman ✓ Nahe Flughafen ✓ Investitionsmöglichkeiten ✓ Villen & Grundstücke. ☎ +90 537 053 07 54",
        h1: "Häuser und Wohnungen zum Verkauf in Dalaman 2026",
        intro: "Häuser, Wohnungen, Villen und Grundstücke zum Verkauf in der Nähe des Flughafens Dalaman. Verpassen Sie nicht die Investitionsmöglichkeiten in der touristisch attraktiven Region Dalaman.",
      },
      ru: {
        title: "Дома и квартиры на продажу в Даламане 2026 | Недвижимость рядом с аэропортом",
        description: "Дома и квартиры на продажу в Даламане ✓ Рядом с аэропортом ✓ Инвестиционные возможности ✓ Виллы и земельные участки. ☎ +90 537 053 07 54",
        h1: "Дома и квартиры на продажу в Даламане 2026",
        intro: "Дома, квартиры, виллы и земельные участки на продажу рядом с аэропортом Даламан. Не упустите инвестиционные возможности в регионе с высоким туристическим потенциалом.",
      },
    },
    content: {
      tr: {
        sections: [
          {
            title: "Dalaman'da Emlak Fiyatları 2026",
            content: "Dalaman'da gayrimenkul fiyatları havaalanına ve sahile yakınlığa göre değişmektedir. Dalaman merkezdeki daireler 800.000 TL - 1.500.000 TL arasında, sahil bölgelerinde villalar 3.000.000 TL - 10.000.000 TL arasında, yatırımlık arsalar ise metrekare başına 2.000 TL'den başlamaktadır.",
          },
          {
            title: "Dalaman'da Yatırım Fırsatları",
            content: "Dalaman Havaalanı bölgenin en büyük havaalanı olup, yılda milyonlarca turist ağırlamaktadır. Bu durum gayrimenkul yatırımları için büyük potansiyel oluşturmaktadır. Özellikle yazlık ev, apart otel ve günübirlik kiralık mülkler yüksek getiri sağlamaktadır.",
          },
        ],
        faq: [
          {
            question: "Dalaman'da satılık ev fiyatları ne kadar?",
            answer: "Dalaman'da daire fiyatları 3.000.000 TL'den, müstakil evler 4.500.000 TL'den, villalar ise 5.000.000 TL'den başlamaktadır.",
          },
          {
            question: "Dalaman yatırım için uygun mu?",
            answer: "Evet, Dalaman havaalanının varlığı ve yüksek turizm potansiyeli nedeniyle emlak yatırımı için oldukça caziptir.",
          },
        ],
      },
      en: {
        sections: [
          {
            title: "Property Prices in Dalaman 2026",
            content: "Real estate prices in Dalaman vary based on proximity to the airport and coastline. Apartments in Dalaman center range from 800,000 TL - 1,500,000 TL, villas in coastal areas from 3,000,000 TL - 10,000,000 TL, and investment land starts from 2,000 TL per square meter.",
          },
          {
            title: "Investment Opportunities in Dalaman",
            content: "Dalaman Airport is the largest airport in the region, hosting millions of tourists annually. This creates great potential for real estate investments. Especially summer houses, apart hotels, and daily rental properties provide high returns.",
          },
        ],
        faq: [
          {
            question: "What are house prices in Dalaman?",
            answer: "Apartment prices in Dalaman start from 800,000 TL, detached houses from 1,500,000 TL, and villas from 3,000,000 TL.",
          },
          {
            question: "Is Dalaman suitable for investment?",
            answer: "Yes, Dalaman is highly attractive for real estate investment due to its airport presence and high tourism potential.",
          },
        ],
      },
      ar: {
        sections: [
          {
            title: "أسعار العقارات في دالامان 2026",
            content: "تختلف أسعار العقارات في دالامان بناءً على القرب من المطار والساحل. تتراوح الشقق في مركز دالامان بين 800,000 - 1,500,000 ليرة تركية، والفلل في المناطق الساحلية بين 3,000,000 - 10,000,000 ليرة تركية.",
          },
          {
            title: "فرص الاستثمار في دالامان",
            content: "مطار دالامان هو أكبر مطار في المنطقة، ويستقبل ملايين السياح سنوياً. هذا يخلق إمكانات كبيرة للاستثمارات العقارية.",
          },
        ],
        faq: [
          {
            question: "ما هي أسعار المنازل في دالامان؟",
            answer: "تبدأ أسعار الشقق في دالامان من 800,000 ليرة تركية، والمنازل المستقلة من 1,500,000 ليرة تركية، والفلل من 3,000,000 ليرة تركية.",
          },
          {
            question: "هل دالامان مناسبة للاستثمار؟",
            answer: "نعم، دالامان جذابة للغاية للاستثمار العقاري بسبب وجود المطار والإمكانيات السياحية العالية.",
          },
        ],
      },
      de: {
        sections: [
          {
            title: "Immobilienpreise in Dalaman 2026",
            content: "Die Immobilienpreise in Dalaman variieren je nach Nähe zum Flughafen und zur Küste. Wohnungen im Zentrum von Dalaman kosten 800.000 - 1.500.000 TL, Villen in Küstengebieten 3.000.000 - 10.000.000 TL.",
          },
          {
            title: "Investitionsmöglichkeiten in Dalaman",
            content: "Der Flughafen Dalaman ist der größte Flughafen der Region und empfängt jährlich Millionen von Touristen. Dies schafft großes Potenzial für Immobilieninvestitionen.",
          },
        ],
        faq: [
          {
            question: "Was kosten Häuser in Dalaman?",
            answer: "Wohnungspreise in Dalaman beginnen bei 800.000 TL, Einfamilienhäuser bei 1.500.000 TL und Villen bei 3.000.000 TL.",
          },
          {
            question: "Ist Dalaman für Investitionen geeignet?",
            answer: "Ja, Dalaman ist aufgrund des Flughafens und des hohen Tourismuspotenzials sehr attraktiv für Immobilieninvestitionen.",
          },
        ],
      },
      ru: {
        sections: [
          {
            title: "Цены на недвижимость в Даламане 2026",
            content: "Цены на недвижимость в Даламане варьируются в зависимости от близости к аэропорту и побережью. Квартиры в центре Даламана стоят 800.000 - 1.500.000 TL, виллы в прибрежных районах 3.000.000 - 10.000.000 TL.",
          },
          {
            title: "Инвестиционные возможности в Даламане",
            content: "Аэропорт Даламан - крупнейший аэропорт региона, принимающий миллионы туристов ежегодно. Это создает большой потенциал для инвестиций в недвижимость.",
          },
        ],
        faq: [
          {
            question: "Сколько стоят дома в Даламане?",
            answer: "Цены на квартиры в Даламане начинаются от 800.000 TL, частные дома от 1.500.000 TL, виллы от 3.000.000 TL.",
          },
          {
            question: "Подходит ли Даламан для инвестиций?",
            answer: "Да, Даламан очень привлекателен для инвестиций в недвижимость благодаря аэропорту и высокому туристическому потенциалу.",
          },
        ],
      },
    },
  },

  "ortaca-ogrenci-kiralik": {
    slug: "ortaca-ogrenci-kiralik",
    filter: {
      kategori: "kiralik",
      konum: "Ortaca",
    },
    meta: {
      tr: {
        title: "Ortaca Öğrenci Kiralık Daire 2026 | Üniversite Yakını Ucuz Evler",
        description: "Muğla Sıtkı Koçman Üniversitesi Ortaca Kampüsü yakını kiralık öğrenci evleri ✓ Uygun fiyat ✓ Eşyalı seçenekler. ☎ 0537 053 07 54",
        h1: "Ortaca Öğrenci Kiralık Daire İlanları 2026",
        intro: "Muğla Sıtkı Koçman Üniversitesi Ortaca Yerleşkesi'nde okuyan öğrenciler için uygun fiyatlı kiralık daire seçenekleri. Kampüse yakın, ekonomik ve konforlu öğrenci evleri.",
      },
      en: {
        title: "Student Apartments for Rent in Ortaca 2026 | Affordable Housing Near University",
        description: "Student apartments for rent near Muğla Sıtkı Koçman University Ortaca Campus ✓ Affordable prices ✓ Furnished options. ☎ +90 537 053 07 54",
        h1: "Student Apartments for Rent in Ortaca 2026",
        intro: "Affordable rental apartment options for students studying at Muğla Sıtkı Koçman University Ortaca Campus. Student housing close to campus, economical and comfortable.",
      },
      ar: {
        title: "شقق طلابية للإيجار في أورتاجا 2026 | سكن بأسعار معقولة بالقرب من الجامعة",
        description: "شقق طلابية للإيجار بالقرب من حرم جامعة موغلا صتقي كوجمان أورتاجا ✓ أسعار معقولة ✓ خيارات مفروشة. ☎ 00905370530754",
        h1: "شقق طلابية للإيجار في أورتاجا 2026",
        intro: "خيارات شقق بأسعار معقولة للطلاب الذين يدرسون في حرم جامعة موغلا صتقي كوجمان أورتاجا.",
      },
      de: {
        title: "Studentenwohnungen zur Miete in Ortaca 2026 | Günstige Unterkunft nahe Universität",
        description: "Studentenwohnungen zur Miete nahe Muğla Sıtkı Koçman Universität Campus Ortaca ✓ Günstige Preise ✓ Möblierte Optionen. ☎ +90 537 053 07 54",
        h1: "Studentenwohnungen zur Miete in Ortaca 2026",
        intro: "Erschwingliche Mietwohnungen für Studenten der Muğla Sıtkı Koçman Universität Campus Ortaca. Campusnahe, wirtschaftliche und komfortable Studentenunterkünfte.",
      },
      ru: {
        title: "Студенческие квартиры в аренду в Ортадже 2026 | Доступное жилье рядом с университетом",
        description: "Студенческие квартиры в аренду рядом с кампусом университета Мугла Сытки Кочман Ортаджа ✓ Доступные цены ✓ Меблированные варианты. ☎ +90 537 053 07 54",
        h1: "Студенческие квартиры в аренду в Ортадже 2026",
        intro: "Доступные варианты аренды для студентов кампуса университета Мугла Сытки Кочман Ортаджа. Студенческое жилье близко к кампусу, экономичное и комфортное.",
      },
    },
    content: {
      tr: {
        sections: [
          {
            title: "Öğrenci Kiralık Daire Fiyatları",
            content: "Ortaca'da öğrenci kiralık daire fiyatları 1+1 daireler için aylık 6.000-8.000 TL, 2+1 daireler için 10.000-14.000 TL arasındadır. Ev arkadaşıyla paylaşımlı kiralamada kişi başı 3.000-5.000 TL bütçeyle kaliteli bir evde kalabilirsiniz.",
          },
          {
            title: "Kampüse Yakın Lokasyonlar",
            content: "Üniversite servis güzergahları üzerinde ve kampüse 5-15 dakika mesafede çok sayıda kiralık daire bulunmaktadır. Cumhuriyet Mahallesi ve Atatürk Mahallesi öğrenciler tarafından en çok tercih edilen bölgelerdir.",
          },
        ],
        faq: [
          {
            question: "Ortaca'da öğrenci evi kiraları ne kadar?",
            answer: "Öğrenci daireleri 1+1 için aylık 6.000-8.000 TL, paylaşımlı 2+1 daireler için kişi başı 3.000-5.000 TL civarındadır.",
          },
          {
            question: "Eşyalı öğrenci evi var mı?",
            answer: "Evet, eşyalı ve eşyasız seçenekler mevcuttur. Eşyalı daireler genellikle 1.000-2.000 TL daha yüksek kiralanmaktadır.",
          },
        ],
      },
      en: {
        sections: [
          {
            title: "Student Rental Prices",
            content: "Student rental prices in Ortaca range from 6,000-8,000 TL per month for 1+1 apartments and 10,000-14,000 TL for 2+1 apartments. With shared rental, you can stay in a quality apartment with a budget of 3,000-5,000 TL per person.",
          },
          {
            title: "Locations Near Campus",
            content: "Many rental apartments are available on university shuttle routes and 5-15 minutes from campus. Cumhuriyet Mahallesi and Atatürk Mahallesi are the most preferred areas by students.",
          },
        ],
        faq: [
          {
            question: "What are student housing rents in Ortaca?",
            answer: "Student apartments range from 6,000-8,000 TL monthly for 1+1, and around 3,000-5,000 TL per person for shared 2+1 apartments.",
          },
          {
            question: "Are furnished student apartments available?",
            answer: "Yes, both furnished and unfurnished options are available. Furnished apartments are typically rented for 1,000-2,000 TL more.",
          },
        ],
      },
      ar: {
        sections: [
          {
            title: "أسعار إيجار الطلاب",
            content: "تتراوح أسعار إيجار الطلاب في أورتاجا بين 6,000-8,000 ليرة تركية شهرياً للشقق 1+1 و 10,000-14,000 ليرة تركية للشقق 2+1. مع الإيجار المشترك، يمكنك البقاء في شقة جيدة بميزانية 3,000-5,000 ليرة تركية للشخص.",
          },
          {
            title: "المواقع القريبة من الحرم الجامعي",
            content: "تتوفر العديد من الشقق للإيجار على طرق حافلات الجامعة وعلى بعد 5-15 دقيقة من الحرم الجامعي.",
          },
        ],
        faq: [
          {
            question: "ما هي إيجارات سكن الطلاب في أورتاجا؟",
            answer: "تتراوح شقق الطلاب بين 6,000-8,000 ليرة تركية شهرياً للشقق 1+1، وحوالي 3,000-5,000 ليرة تركية للشخص للشقق المشتركة 2+1.",
          },
          {
            question: "هل تتوفر شقق طلابية مفروشة؟",
            answer: "نعم، تتوفر خيارات مفروشة وغير مفروشة. عادة ما يتم تأجير الشقق المفروشة بأكثر من 1,000-2,000 ليرة تركية.",
          },
        ],
      },
      de: {
        sections: [
          {
            title: "Studentenmietpreise",
            content: "Die Mietpreise für Studenten in Ortaca liegen bei 6.000-8.000 TL monatlich für 1+1 Wohnungen und 10.000-14.000 TL für 2+1 Wohnungen. Bei geteilter Miete können Sie mit einem Budget von 3.000-5.000 TL pro Person in einer guten Wohnung wohnen.",
          },
          {
            title: "Standorte nahe dem Campus",
            content: "Viele Mietwohnungen sind auf Universitäts-Shuttle-Routen und 5-15 Minuten vom Campus entfernt verfügbar. Cumhuriyet und Atatürk Viertel sind bei Studenten am beliebtesten.",
          },
        ],
        faq: [
          {
            question: "Was kosten Studentenwohnungen in Ortaca?",
            answer: "Studentenwohnungen kosten 6.000-8.000 TL monatlich für 1+1, und ca. 3.000-5.000 TL pro Person für geteilte 2+1 Wohnungen.",
          },
          {
            question: "Gibt es möblierte Studentenwohnungen?",
            answer: "Ja, sowohl möblierte als auch unmöblierte Optionen sind verfügbar. Möblierte Wohnungen werden in der Regel für 1.000-2.000 TL mehr vermietet.",
          },
        ],
      },
      ru: {
        sections: [
          {
            title: "Цены на аренду для студентов",
            content: "Цены на аренду для студентов в Ортадже составляют 6.000-8.000 TL в месяц за квартиры 1+1 и 10.000-14.000 TL за квартиры 2+1. При совместной аренде вы можете жить в хорошей квартире с бюджетом 3.000-5.000 TL на человека.",
          },
          {
            title: "Расположение рядом с кампусом",
            content: "Многие квартиры доступны на маршрутах университетских автобусов и в 5-15 минутах от кампуса. Районы Джумхуриет и Ататюрк наиболее популярны среди студентов.",
          },
        ],
        faq: [
          {
            question: "Сколько стоит студенческое жилье в Ортадже?",
            answer: "Студенческие квартиры стоят 6.000-8.000 TL в месяц за 1+1 и около 3.000-5.000 TL на человека за совместные квартиры 2+1.",
          },
          {
            question: "Есть ли меблированные студенческие квартиры?",
            answer: "Да, доступны как меблированные, так и немеблированные варианты. Меблированные квартиры обычно сдаются на 1.000-2.000 TL дороже.",
          },
        ],
      },
    },
  },

  "dalyan-satilik-villa": {
    slug: "dalyan-satilik-villa",
    filter: {
      kategori: "satilik",
      tip: "villa",
      konum: "Dalyan",
    },
    meta: {
      tr: {
        title: "Dalyan Satılık Villa 2026 | Lüks Villalar & Müstakil Evler",
        description: "Dalyan'da satılık villa ilanları ✓ Havuzlu villalar ✓ Deniz manzaralı ✓ Iztuzu yakını. Lüks yaşam için Dalyan villaları. ☎ 0537 053 07 54",
        h1: "Dalyan Satılık Villa İlanları 2026",
        intro: "UNESCO koruma altındaki Dalyan'da satılık lüks villalar. Caretta caretta'ların yuva yaptığı Iztuzu Plajı'na yakın, doğayla iç içe yaşam. Havuzlu, bahçeli, deniz veya nehir manzaralı villa seçenekleri.",
      },
      en: {
        title: "Villas for Sale in Dalyan 2026 | Luxury Villas & Detached Houses",
        description: "Villas for sale in Dalyan ✓ Pool villas ✓ Sea view ✓ Near Iztuzu. Dalyan villas for luxury living. ☎ +90 537 053 07 54",
        h1: "Villas for Sale in Dalyan 2026",
        intro: "Luxury villas for sale in UNESCO-protected Dalyan. Living in harmony with nature, close to Iztuzu Beach where Caretta caretta turtles nest. Villa options with pool, garden, sea or river view.",
      },
      ar: {
        title: "فلل للبيع في دالان 2026 | فلل فاخرة ومنازل مستقلة",
        description: "فلل للبيع في دالان ✓ فلل بمسبح ✓ إطلالة على البحر ✓ قرب إزتوزو. فلل دالان للحياة الفاخرة. ☎ 00905370530754",
        h1: "فلل للبيع في دالان 2026",
        intro: "فلل فاخرة للبيع في دالان المحمية من قبل اليونسكو. العيش في انسجام مع الطبيعة، بالقرب من شاطئ إزتوزو حيث تعشش سلاحف كاريتا كاريتا.",
      },
      de: {
        title: "Villen zum Verkauf in Dalyan 2026 | Luxusvillen & Einfamilienhäuser",
        description: "Villen zum Verkauf in Dalyan ✓ Poolvillen ✓ Meerblick ✓ Nahe Iztuzu. Dalyan Villen für luxuriöses Wohnen. ☎ +90 537 053 07 54",
        h1: "Villen zum Verkauf in Dalyan 2026",
        intro: "Luxusvillen zum Verkauf im UNESCO-geschützten Dalyan. Leben im Einklang mit der Natur, nahe dem Iztuzu-Strand, wo Caretta-Caretta-Schildkröten nisten. Villenoptionen mit Pool, Garten, Meer- oder Flussblick.",
      },
      ru: {
        title: "Виллы на продажу в Дальяне 2026 | Роскошные виллы и частные дома",
        description: "Виллы на продажу в Дальяне ✓ Виллы с бассейном ✓ Вид на море ✓ Рядом с Изтузу. Виллы Дальяна для роскошной жизни. ☎ +90 537 053 07 54",
        h1: "Виллы на продажу в Дальяне 2026",
        intro: "Роскошные виллы на продажу в охраняемом ЮНЕСКО Дальяне. Жизнь в гармонии с природой, рядом с пляжем Изтузу, где гнездятся черепахи Каретта-Каретта. Варианты вилл с бассейном, садом, видом на море или реку.",
      },
    },
    content: {
      tr: {
        sections: [
          {
            title: "Dalyan Villa Fiyatları 2026",
            content: "Dalyan'da villa fiyatları konuma ve özelliklere göre 3.000.000 TL ile 15.000.000 TL arasında değişmektedir. Nehir manzaralı villalar, Iztuzu'ya yakın villalar ve havuzlu müstakil evler en çok talep gören seçeneklerdir.",
          },
          {
            title: "Dalyan'da Villa Sahibi Olmanın Avantajları",
            content: "Dalyan, dünyaca ünlü Iztuzu Plajı, antik Kaunos kenti ve kaplıcalarıyla eşsiz bir lokasyondur. SİT alanı olması nedeniyle yeni yapılaşma sınırlıdır, bu da mevcut villaların değerini artırmaktadır. Sakin ve huzurlu yaşam arayanlar için ideal bir tercih.",
          },
        ],
        faq: [
          {
            question: "Dalyan'da satılık villa fiyatları ne kadar?",
            answer: "Dalyan'da villa fiyatları 3.000.000 TL'den başlamakta, lüks villalar 10-15 milyon TL'ye kadar çıkabilmektedir.",
          },
          {
            question: "Dalyan'da villa almak için SİT izni gerekli mi?",
            answer: "Mevcut villaların alım-satımı için SİT izni gerekmez, ancak tadilat ve eklentiler için Koruma Kurulu onayı gerekebilir.",
          },
        ],
      },
      en: {
        sections: [
          {
            title: "Dalyan Villa Prices 2026",
            content: "Villa prices in Dalyan range from 3,000,000 TL to 15,000,000 TL depending on location and features. River view villas, villas near Iztuzu, and detached houses with pools are the most sought-after options.",
          },
          {
            title: "Advantages of Owning a Villa in Dalyan",
            content: "Dalyan is a unique location with the world-famous Iztuzu Beach, ancient city of Kaunos, and thermal springs. Being a protected area limits new construction, which increases the value of existing villas. An ideal choice for those seeking peaceful living.",
          },
        ],
        faq: [
          {
            question: "What are villa prices in Dalyan?",
            answer: "Villa prices in Dalyan start from 3,000,000 TL, with luxury villas reaching 10-15 million TL.",
          },
          {
            question: "Is a conservation permit required to buy a villa in Dalyan?",
            answer: "No conservation permit is required for buying existing villas, but Conservation Board approval may be needed for renovations and additions.",
          },
        ],
      },
      ar: {
        sections: [
          {
            title: "أسعار الفلل في دالان 2026",
            content: "تتراوح أسعار الفلل في دالان بين 3,000,000 و 15,000,000 ليرة تركية حسب الموقع والميزات. الفلل المطلة على النهر والفلل القريبة من إزتوزو والمنازل المستقلة مع المسابح هي الخيارات الأكثر طلباً.",
          },
          {
            title: "مزايا امتلاك فيلا في دالان",
            content: "دالان موقع فريد مع شاطئ إزتوزو الشهير عالمياً ومدينة كاونوس القديمة والينابيع الحرارية. كونها منطقة محمية يحد من البناء الجديد، مما يزيد من قيمة الفلل الموجودة.",
          },
        ],
        faq: [
          {
            question: "ما هي أسعار الفلل في دالان؟",
            answer: "تبدأ أسعار الفلل في دالان من 3,000,000 ليرة تركية، والفلل الفاخرة تصل إلى 10-15 مليون ليرة تركية.",
          },
          {
            question: "هل يلزم تصريح حماية لشراء فيلا في دالان؟",
            answer: "لا يلزم تصريح حماية لشراء الفلل الموجودة، ولكن قد يلزم موافقة مجلس الحماية للتجديدات والإضافات.",
          },
        ],
      },
      de: {
        sections: [
          {
            title: "Villenpreise in Dalyan 2026",
            content: "Villenpreise in Dalyan variieren je nach Lage und Ausstattung zwischen 3.000.000 TL und 15.000.000 TL. Villen mit Flussblick, Villen nahe Iztuzu und Einfamilienhäuser mit Pools sind die gefragtesten Optionen.",
          },
          {
            title: "Vorteile einer Villa in Dalyan",
            content: "Dalyan ist ein einzigartiger Standort mit dem weltberühmten Iztuzu-Strand, der antiken Stadt Kaunos und Thermalquellen. Als Schutzgebiet ist Neubau begrenzt, was den Wert bestehender Villen steigert. Ideal für alle, die ein friedliches Leben suchen.",
          },
        ],
        faq: [
          {
            question: "Was kosten Villen in Dalyan?",
            answer: "Villenpreise in Dalyan beginnen bei 3.000.000 TL, Luxusvillen erreichen 10-15 Millionen TL.",
          },
          {
            question: "Ist für den Kauf einer Villa in Dalyan eine Denkmalschutzgenehmigung erforderlich?",
            answer: "Für den Kauf bestehender Villen ist keine Genehmigung erforderlich, aber für Renovierungen und Anbauten kann eine Genehmigung der Denkmalbehörde erforderlich sein.",
          },
        ],
      },
      ru: {
        sections: [
          {
            title: "Цены на виллы в Дальяне 2026",
            content: "Цены на виллы в Дальяне варьируются от 3.000.000 до 15.000.000 TL в зависимости от расположения и характеристик. Виллы с видом на реку, виллы рядом с Изтузу и частные дома с бассейнами - самые востребованные варианты.",
          },
          {
            title: "Преимущества владения виллой в Дальяне",
            content: "Дальян - уникальное место с всемирно известным пляжем Изтузу, древним городом Каунос и термальными источниками. Будучи охраняемой территорией, новое строительство ограничено, что повышает ценность существующих вилл. Идеальный выбор для тех, кто ищет спокойную жизнь.",
          },
        ],
        faq: [
          {
            question: "Сколько стоят виллы в Дальяне?",
            answer: "Цены на виллы в Дальяне начинаются от 3.000.000 TL, роскошные виллы достигают 10-15 миллионов TL.",
          },
          {
            question: "Нужно ли разрешение на охрану для покупки виллы в Дальяне?",
            answer: "Разрешение не требуется для покупки существующих вилл, но для ремонта и пристроек может потребоваться одобрение Комиссии по охране.",
          },
        ],
      },
    },
  },

  "ortaca-emlak-ofisi": {
    slug: "ortaca-emlak-ofisi",
    filter: {},
    meta: {
      tr: {
        title: "Ortaca Emlak Ofisi | Kalinda Yapı ✓ Lisanslı Emlak Danışmanı",
        description: "Ortaca'nın güvenilir emlak ofisi ✓ Lisanslı danışman ✓ Satılık & kiralık emlak ✓ Ücretsiz değerleme. Kalinda Yapı - 2022'den beri hizmetinizde. ☎ 0537 053 07 54",
        h1: "Ortaca Emlak Ofisi - Kalinda Yapı",
        intro: "Ortaca ve çevresinde güvenilir emlak hizmetleri arıyorsanız doğru adrestesiniz. Kalinda Yapı olarak 2022'den bu yana lisanslı emlak danışmanlarımızla satılık ve kiralık gayrimenkul işlemlerinizde yanınızdayız. Ortaca, Dalaman, Dalyan, Köyceğiz bölgelerinde uzman kadromuzla hizmet veriyoruz.",
      },
      en: {
        title: "Ortaca Real Estate Office | Kalinda Yapı ✓ Licensed Real Estate Agent",
        description: "Ortaca's trusted real estate office ✓ Licensed agent ✓ Property for sale & rent ✓ Free valuation. Kalinda Yapı - Serving since 2022. ☎ +90 537 053 07 54",
        h1: "Ortaca Real Estate Office - Kalinda Yapı",
        intro: "You're at the right address if you're looking for reliable real estate services in Ortaca and surrounding areas. At Kalinda Yapı, we've been by your side with our licensed real estate consultants for buying, selling, and renting properties since 2022. We serve with our expert team in Ortaca, Dalaman, Dalyan, and Köyceğiz regions.",
      },
      ar: {
        title: "مكتب عقارات أورتاجا | كالينداي يابي ✓ وكيل عقاري مرخص",
        description: "مكتب العقارات الموثوق في أورتاجا ✓ وكيل مرخص ✓ عقارات للبيع والإيجار ✓ تقييم مجاني. كالينداي يابي - نخدمكم منذ 2022. ☎ 00905370530754",
        h1: "مكتب عقارات أورتاجا - كالينداي يابي",
        intro: "أنت في العنوان الصحيح إذا كنت تبحث عن خدمات عقارية موثوقة في أورتاجا والمناطق المحيطة. في كالينداي يابي، نقف بجانبكم مع مستشارينا العقاريين المرخصين منذ عام 2022.",
      },
      de: {
        title: "Ortaca Immobilienbüro | Kalinda Yapı ✓ Lizenzierter Immobilienmakler",
        description: "Ortacas vertrauenswürdiges Immobilienbüro ✓ Lizenzierter Makler ✓ Immobilien zum Kauf & Miete ✓ Kostenlose Bewertung. Kalinda Yapı - Seit 2022 für Sie da. ☎ +90 537 053 07 54",
        h1: "Ortaca Immobilienbüro - Kalinda Yapı",
        intro: "Sie sind an der richtigen Adresse, wenn Sie zuverlässige Immobiliendienstleistungen in Ortaca und Umgebung suchen. Bei Kalinda Yapı stehen wir Ihnen seit 2022 mit unseren lizenzierten Immobilienberatern zur Seite.",
      },
      ru: {
        title: "Агентство недвижимости в Ортадже | Kalinda Yapı ✓ Лицензированный агент",
        description: "Надежное агентство недвижимости в Ортадже ✓ Лицензированный агент ✓ Недвижимость на продажу и в аренду ✓ Бесплатная оценка. Kalinda Yapı - С 2022 года к вашим услугам. ☎ +90 537 053 07 54",
        h1: "Агентство недвижимости в Ортадже - Kalinda Yapı",
        intro: "Вы по правильному адресу, если ищете надежные услуги недвижимости в Ортадже и окрестностях. В Kalinda Yapı мы рядом с вами с нашими лицензированными консультантами по недвижимости с 2022 года.",
      },
    },
    content: {
      tr: {
        sections: [
          {
            title: "Neden Kalinda Yapı?",
            content: "Lisanslı emlak danışmanlarımız, şeffaf sözleşmeler ve müşteri odaklı hizmet anlayışımızla Ortaca'nın güvenilir emlak ofisiyiz. 2022'den bu yana 200'den fazla mutlu aile ve %98 müşteri memnuniyeti oranıyla hizmet veriyoruz.",
          },
          {
            title: "Hizmet Bölgelerimiz",
            content: "Ortaca merkez ve tüm mahalleler, Dalaman, Dalyan, Köyceğiz, Fethiye ve Marmaris bölgelerinde emlak hizmetleri sunuyoruz. Satılık daire, villa, arsa ve kiralık ev işlemlerinizde profesyonel destek sağlıyoruz.",
          },
          {
            title: "Ücretsiz Emlak Değerleme",
            content: "Gayrimenkulünüzün güncel piyasa değerini öğrenmek mi istiyorsunuz? Uzman ekibimiz ücretsiz değerleme hizmeti sunmaktadır. Satış veya kiralama öncesi doğru fiyat belirlemenize yardımcı oluyoruz.",
          },
        ],
        faq: [
          {
            question: "Ortaca'da güvenilir emlak ofisi arıyorum, önerir misiniz?",
            answer: "Kalinda Yapı, lisanslı danışmanları ve 2022'den bu yana süren deneyimiyle Ortaca'nın güvenilir emlak ofisidir. 200+ başarılı işlem ve %98 müşteri memnuniyeti ile hizmet vermekteyiz.",
          },
          {
            question: "Emlak değerleme ücreti ne kadar?",
            answer: "Kalinda Yapı olarak gayrimenkul değerleme hizmetimiz tamamen ücretsizdir. Satış veya kiralama planınız olsun ya da olmasın, mülkünüzün değerini öğrenebilirsiniz.",
          },
        ],
      },
      en: {
        sections: [
          {
            title: "Why Kalinda Yapı?",
            content: "We are Ortaca's trusted real estate office with our licensed real estate consultants, transparent contracts, and customer-focused service approach. We have been serving since 2022 with over 200 happy families and a 98% customer satisfaction rate.",
          },
          {
            title: "Our Service Areas",
            content: "We provide real estate services in Ortaca center and all neighborhoods, Dalaman, Dalyan, Köyceğiz, Fethiye, and Marmaris regions. We offer professional support for apartments, villas, land for sale, and rental properties.",
          },
          {
            title: "Free Property Valuation",
            content: "Want to know the current market value of your property? Our expert team offers free valuation services. We help you determine the right price before selling or renting.",
          },
        ],
        faq: [
          {
            question: "I'm looking for a reliable real estate office in Ortaca, any recommendations?",
            answer: "Kalinda Yapı is Ortaca's trusted real estate office with licensed consultants and experience since 2022. We serve with 200+ successful transactions and 98% customer satisfaction.",
          },
          {
            question: "How much does property valuation cost?",
            answer: "At Kalinda Yapı, our property valuation service is completely free. Whether you plan to sell or rent or not, you can learn the value of your property.",
          },
        ],
      },
      ar: {
        sections: [
          {
            title: "لماذا كالينداي يابي؟",
            content: "نحن مكتب العقارات الموثوق في أورتاجا مع مستشارينا العقاريين المرخصين والعقود الشفافة ونهج الخدمة الموجه للعملاء. نخدم منذ عام 2022 مع أكثر من 200 عائلة سعيدة ومعدل رضا العملاء 98%.",
          },
          {
            title: "مناطق خدمتنا",
            content: "نقدم خدمات عقارية في مركز أورتاجا وجميع الأحياء، دالامان، دالان، كويجيز، فتحية، ومارماريس.",
          },
          {
            title: "تقييم عقاري مجاني",
            content: "هل تريد معرفة القيمة السوقية الحالية لعقارك؟ يقدم فريق الخبراء لدينا خدمات تقييم مجانية.",
          },
        ],
        faq: [
          {
            question: "أبحث عن مكتب عقارات موثوق في أورتاجا، أي توصيات؟",
            answer: "كالينداي يابي هو مكتب العقارات الموثوق في أورتاجا مع مستشارين مرخصين وخبرة منذ 2022. نخدم بأكثر من 200 معاملة ناجحة و 98% رضا العملاء.",
          },
          {
            question: "كم تكلفة تقييم العقار؟",
            answer: "في كالينداي يابي، خدمة تقييم العقارات لدينا مجانية تماماً.",
          },
        ],
      },
      de: {
        sections: [
          {
            title: "Warum Kalinda Yapı?",
            content: "Wir sind Ortacas vertrauenswürdiges Immobilienbüro mit unseren lizenzierten Immobilienberatern, transparenten Verträgen und kundenorientiertem Serviceansatz. Wir bedienen seit 2022 über 200 zufriedene Familien mit einer Kundenzufriedenheit von 98%.",
          },
          {
            title: "Unsere Servicegebiete",
            content: "Wir bieten Immobiliendienstleistungen im Zentrum von Ortaca und allen Stadtteilen, Dalaman, Dalyan, Köyceğiz, Fethiye und Marmaris an. Wir bieten professionelle Unterstützung für Wohnungen, Villen, Grundstücke zum Verkauf und Mietobjekte.",
          },
          {
            title: "Kostenlose Immobilienbewertung",
            content: "Möchten Sie den aktuellen Marktwert Ihrer Immobilie erfahren? Unser Expertenteam bietet kostenlose Bewertungsdienste an. Wir helfen Ihnen, den richtigen Preis vor dem Verkauf oder der Vermietung zu ermitteln.",
          },
        ],
        faq: [
          {
            question: "Ich suche ein zuverlässiges Immobilienbüro in Ortaca, haben Sie Empfehlungen?",
            answer: "Kalinda Yapı ist Ortacas vertrauenswürdiges Immobilienbüro mit lizenzierten Beratern und Erfahrung seit 2022. Wir bedienen mit 200+ erfolgreichen Transaktionen und 98% Kundenzufriedenheit.",
          },
          {
            question: "Wie viel kostet die Immobilienbewertung?",
            answer: "Bei Kalinda Yapı ist unsere Immobilienbewertung völlig kostenlos. Ob Sie einen Verkaufs- oder Mietplan haben oder nicht, Sie können den Wert Ihrer Immobilie erfahren.",
          },
        ],
      },
      ru: {
        sections: [
          {
            title: "Почему Kalinda Yapı?",
            content: "Мы надежное агентство недвижимости в Ортадже с нашими лицензированными консультантами, прозрачными контрактами и клиентоориентированным подходом. Мы обслуживаем с 2022 года более 200 довольных семей с уровнем удовлетворенности клиентов 98%.",
          },
          {
            title: "Наши зоны обслуживания",
            content: "Мы предоставляем услуги недвижимости в центре Ортаджи и всех районах, Даламане, Дальяне, Кёйджегизе, Фетхие и Мармарисе. Мы предлагаем профессиональную поддержку для квартир, вилл, земельных участков на продажу и аренды.",
          },
          {
            title: "Бесплатная оценка недвижимости",
            content: "Хотите узнать текущую рыночную стоимость вашей недвижимости? Наша команда экспертов предлагает бесплатные услуги оценки. Мы помогаем определить правильную цену перед продажей или арендой.",
          },
        ],
        faq: [
          {
            question: "Ищу надежное агентство недвижимости в Ортадже, есть рекомендации?",
            answer: "Kalinda Yapı - надежное агентство недвижимости в Ортадже с лицензированными консультантами и опытом с 2022 года. Мы обслуживаем с 200+ успешных сделок и 98% удовлетворенности клиентов.",
          },
          {
            question: "Сколько стоит оценка недвижимости?",
            answer: "В Kalinda Yapı наша услуга оценки недвижимости полностью бесплатна. Независимо от того, планируете ли вы продажу или аренду, вы можете узнать стоимость вашей недвижимости.",
          },
        ],
      },
    },
  },
};

export function getLandingPageConfig(slug: string): LandingPageConfig | undefined {
  return landingPages[slug];
}

export function getLandingPageMeta(slug: string, locale: Locale) {
  const config = landingPages[slug];
  if (!config) return null;
  return config.meta[locale];
}

export function getLandingPageContent(slug: string, locale: Locale) {
  const config = landingPages[slug];
  if (!config) return null;
  return config.content[locale];
}

export function getAllLandingPageSlugs(): string[] {
  return Object.keys(landingPages);
}
