import { LiveRates, DovizFAQ } from '@/types/exchange';

// WebPage schema for the exchange rates page
export function generateDovizWebPageSchema(rates: LiveRates | null) {
  const currentDate = new Date().toISOString();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.kalindayapi.com/doviz-kurlari#webpage',
    url: 'https://www.kalindayapi.com/doviz-kurlari',
    name: 'Canlı Döviz Kurları 2026 | Anlık USD, EUR, GBP Takibi',
    description: 'Güncel döviz kurları anlık takip. 1 dolar kaç TL? Euro kuru ne kadar? TCMB kurları, döviz çevirici ve emlak yatırım fırsatları. Kalinda Yapı güvencesiyle.',
    inLanguage: 'tr-TR',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://www.kalindayapi.com/#website',
      name: 'Kalinda Yapı',
      url: 'https://www.kalindayapi.com',
    },
    about: {
      '@type': 'Thing',
      name: 'Döviz Kurları',
      description: 'Türk Lirası karşısında yabancı para birimlerinin değeri',
    },
    mainEntity: {
      '@type': 'FinancialProduct',
      name: 'Döviz Kuru Bilgisi',
      description: 'Güncel USD, EUR, GBP döviz kurları',
      provider: {
        '@type': 'Organization',
        name: 'TCMB - Türkiye Cumhuriyet Merkez Bankası',
      },
    },
    dateModified: currentDate,
    datePublished: '2026-01-01T00:00:00+03:00',
  };
}

// FAQ Schema for featured snippets
export function generateDovizFAQSchema(faqs: DovizFAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Breadcrumb schema
export function generateDovizBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://www.kalindayapi.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Döviz Kurları',
        item: 'https://www.kalindayapi.com/doviz-kurlari',
      },
    ],
  };
}

// HowTo schema for currency converter
export function generateCurrencyConverterHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Döviz Nasıl Çevrilir?',
    description: 'Online döviz çevirici ile TL, USD, EUR arasında anlık dönüşüm yapın.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Kaynak para birimini seçin',
        text: 'Çevirmek istediğiniz para birimini (TRY, USD veya EUR) seçin.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Miktarı girin',
        text: 'Çevirmek istediğiniz miktarı rakam olarak yazın.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Hedef para birimini seçin',
        text: 'Sonucu görmek istediğiniz para birimini seçin.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Sonucu görün',
        text: 'Anlık döviz kuruna göre hesaplanan değer otomatik olarak gösterilir.',
      },
    ],
    tool: {
      '@type': 'HowToTool',
      name: 'Kalinda Yapı Döviz Çevirici',
    },
  };
}

// Speakable schema for voice search
export function generateSpeakableSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-rate', '.speakable-answer'],
    },
  };
}

// Organization schema with finance expertise
export function generateFinanceOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.kalindayapi.com/#organization',
    name: 'Kalinda Yapı',
    url: 'https://www.kalindayapi.com',
    logo: 'https://www.kalindayapi.com/logo.svg',
    description: 'Muğla Ortaca merkezli emlak, tadilat ve inşaat taahhüt firması. Yabancı yatırımcılara döviz bazlı emlak danışmanlığı hizmeti.',
    areaServed: {
      '@type': 'Country',
      name: 'Türkiye',
    },
    knowsAbout: [
      'Emlak Yatırımı',
      'Döviz Kurları',
      'Yabancı Yatırımcı Danışmanlığı',
      'Türkiye Gayrimenkul Piyasası',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-537-053-0754',
      contactType: 'Müşteri Hizmetleri',
      availableLanguage: ['Turkish', 'English'],
    },
  };
}

// Default FAQ data
export const DOVIZ_FAQ_DATA: DovizFAQ[] = [
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
    question: 'Dolar yükselir mi düşer mi?',
    answer: 'Döviz kurları ekonomik göstergeler, merkez bankası kararları, uluslararası gelişmeler ve piyasa beklentilerine göre değişir. Kesin tahmin yapmak mümkün olmasa da, sayfamızdaki grafiklerden son dönem trendlerini takip edebilirsiniz.',
  },
  {
    question: 'Emlak yatırımında döviz kurları neden önemli?',
    answer: 'Yabancı yatırımcılar için Türkiye\'deki emlak fiyatları döviz kuruna bağlı olarak değişir. Dolar veya Euro bazında düşünen yatırımcılar, kur avantajlı dönemlerde daha uygun fiyatlarla mülk edinebilir. Kalinda Yapı olarak yabancı müşterilerimize döviz bazlı fiyat bilgisi sunuyoruz.',
  },
  {
    question: 'Yabancılar Türkiye\'den ev alabilir mi?',
    answer: 'Evet, yabancı uyruklu kişiler belirli koşullar altında Türkiye\'den gayrimenkul satın alabilir. Askeri yasak bölgeler dışında, karşılıklılık ilkesine uygun ülke vatandaşları tapu alabilir. Detaylı bilgi için Kalinda Yapı emlak danışmanlarımızla iletişime geçebilirsiniz.',
  },
  {
    question: 'Sterlin kaç TL?',
    answer: 'İngiliz Sterlini (GBP) kuru sayfamızdaki canlı panelden takip edilebilir. GBP/TRY paritesi, özellikle İngiltere\'den Türkiye\'ye emlak yatırımı yapan müşterilerimiz için önemli bir göstergedir.',
  },
  {
    question: 'Altın fiyatı ne kadar?',
    answer: 'Gram altın fiyatı sayfamızda canlı olarak takip edilebilir. Altın, geleneksel güvenli liman yatırımı olarak kabul edilir ve döviz kurlarındaki dalgalanmalara karşı koruma sağlayabilir. Türkiye\'de altın fiyatları hem uluslararası altın fiyatına hem de dolar kuruna bağlı olarak değişir.',
  },
  {
    question: 'Döviz alış ve satış kuru arasındaki fark nedir?',
    answer: 'Alış kuru bankanın sizden döviz satın alırken uyguladığı fiyat, satış kuru ise bankanın size döviz satarken uyguladığı fiyattır. Aradaki fark (spread) bankanın kar marjını oluşturur. TCMB gösterge kurları ise piyasa ortalamasını yansıtır.',
  },
  {
    question: 'Efektif döviz kuru nedir?',
    answer: 'Efektif döviz, nakit (banknot) olarak alınıp satılan dövizdir. Efektif kurlar genellikle döviz (havale) kurlarından farklıdır çünkü nakit işlemlerde ek maliyetler söz konusudur. Seyahat için döviz bozdururken efektif kurlar uygulanır.',
  },
  {
    question: 'Döviz kuru neden sürekli değişiyor?',
    answer: 'Döviz kurları arz ve talep dengesine göre belirlenir. Ekonomik veriler, faiz kararları, enflasyon oranları, siyasi gelişmeler, uluslararası ticaret ve yatırımcı beklentileri kurları etkileyen başlıca faktörlerdir. Bu nedenle kurlar gün içinde bile değişkenlik gösterebilir.',
  },
  {
    question: 'Türkiye\'de emlak fiyatları dolar bazında mı belirlenir?',
    answer: 'Türkiye\'de emlak fiyatları resmi olarak Türk Lirası cinsinden belirlenir ve tapuda TL üzerinden işlem yapılır. Ancak özellikle yabancı yatırımcılar ve lüks segment için fiyatlar genellikle dolar veya euro karşılığı olarak da ifade edilir. Kalinda Yapı olarak her iki para biriminde fiyat bilgisi sunuyoruz.',
  },
  {
    question: 'Muğla\'da emlak yatırımı için en uygun dönem ne zaman?',
    answer: 'Emlak yatırımı için en uygun dönem, döviz kurlarının avantajlı olduğu ve emlak piyasasının durgun olduğu dönemlerdir. Kış ayları genellikle daha uygun fiyatlar sunar. Yabancı yatırımcılar için TL\'nin değer kaybettiği dönemler fırsat yaratabilir. Güncel fırsatlar için Kalinda Yapı ile iletişime geçin.',
  },
  {
    question: 'Döviz kurunu etkileyen faktörler nelerdir?',
    answer: 'Döviz kurlarını etkileyen başlıca faktörler: Merkez bankası faiz kararları, enflasyon oranları, cari açık/fazla, ekonomik büyüme verileri, siyasi istikrar, uluslararası yatırımcı güveni ve küresel ekonomik gelişmelerdir. TCMB\'nin para politikası kararları TL\'nin değeri üzerinde doğrudan etkili olur.',
  },
  {
    question: 'Döviz hesabı açmak mantıklı mı?',
    answer: 'Döviz hesabı, tasarruflarınızı kur riskine karşı korumak istiyorsanız mantıklı olabilir. Ancak döviz mevduat faizleri genellikle TL faizlerinden düşüktür. Yatırım kararı vermeden önce kendi mali durumunuzu ve risk toleransınızı değerlendirmeniz önemlidir. Bu bilgi yatırım tavsiyesi değildir.',
  },
];
