import { Locale } from "@/lib/i18n";

export interface LandingPageConfig {
  slug: string;
  filter: {
    kategori?: "satilik" | "kiralik";
    tip?: string;
    konum?: string;
  };
  meta: {
    tr: {
      title: string;
      description: string;
      h1: string;
      intro: string;
    };
    en: {
      title: string;
      description: string;
      h1: string;
      intro: string;
    };
    ar: {
      title: string;
      description: string;
      h1: string;
      intro: string;
    };
  };
  content: {
    tr: {
      sections: Array<{
        title: string;
        content: string;
      }>;
      faq: Array<{
        question: string;
        answer: string;
      }>;
    };
    en: {
      sections: Array<{
        title: string;
        content: string;
      }>;
      faq: Array<{
        question: string;
        answer: string;
      }>;
    };
    ar: {
      sections: Array<{
        title: string;
        content: string;
      }>;
      faq: Array<{
        question: string;
        answer: string;
      }>;
    };
  };
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
            answer: "Dalaman'da daire fiyatları 800.000 TL'den, müstakil evler 1.500.000 TL'den, villalar ise 3.000.000 TL'den başlamaktadır.",
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
