// Hakkimizda (About Us) Page Internationalization Data
import type { Locale } from '@/lib/i18n/config';

interface Value {
  baslik: string;
  aciklama: string;
  ikon: string;
}

interface TimelineItem {
  yil: string;
  baslik: string;
  aciklama: string;
}

interface Certificate {
  baslik: string;
  aciklama: string;
}

export interface HakkimizdaTexts {
  // Hero section
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription1: string;
  heroDescription2: string;

  // Story section
  storyBadge: string;
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyParagraph3: string;
  storyParagraph4: string;

  // Mission & Vision
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;

  // Values
  valuesBadge: string;
  valuesTitle: string;
  valuesSubtitle: string;

  // Certificates
  certsBadge: string;
  certsTitle: string;
  certsSubtitle: string;

  // Web design credit
  webDesignText: string;
  webDesignBy: string;

  // CTA
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  whatsappButton: string;
  whatsappMessage: string;
}

export const hakkimizdaTexts: Record<Locale, HakkimizdaTexts> = {
  tr: {
    heroTitle: "Hakkında",
    heroTitleHighlight: "Kalinda Yapı",
    heroDescription1: "2022 yılından bu yana Muğla'nın Ortaca ilçesinde emlak danışmanlığı, tadilat ve inşaat taahhüt hizmetleri sunuyoruz. Zafer Soylu ve Arif Dağdelen ortaklığıyla kurulan firmamız, bölgenin en güvenilir yapı ve emlak markalarından biri olmayı hedeflemektedir.",
    heroDescription2: "Ortaca merkez, Dalyan, Köyceğiz, Dalaman ve Fethiye'de 200'den fazla başarılı emlak işlemi ve 100'ü aşkın tadilat projesiyle bölgenin güvenilir yapı ortağıyız.",

    storyBadge: "Hikayemiz",
    storyTitle: "Ortaca'da Doğduk, Ortaca İçin Çalışıyoruz",
    storyParagraph1: "Kalinda Yapı, 2022 yılında Zafer Soylu ve Arif Dağdelen'in ortaklığıyla Ortaca'da kurulmuştur. Her iki ortağımız da bu topraklarda doğup büyümüş, bölgenin ihtiyaçlarını yakından tanıyan isimlerdir.",
    storyParagraph2: "Zafer Soylu, emlak danışmanlığı sektöründeki deneyimiyle Ortaca, Dalyan ve Köyceğiz bölgelerinin gayrimenkul dinamiklerine hakim bir profesyoneldir. Arif Dağdelen ise inşaat ve taahhüt sektöründeki tecrübesiyle sayısız konut, villa ve ticari proje tamamlamıştır.",
    storyParagraph3: "Tadilat ve proje hizmetlerimizle 100'den fazla proje tamamladık. Emlak portföyümüzde Ortaca merkez, Dalyan kanal boyu, Köyceğiz göl manzaralı ve Dalaman havalimanı yakını seçenekler bulunuyor.",
    storyParagraph4: "Bugün, 200'den fazla mutlu aile ile Muğla bölgesinin güvenilir yapı ve emlak ortağı olmaya devam ediyoruz. Ortaca emlak rehberimizi inceleyerek bölge hakkında detaylı bilgi alabilirsiniz.",

    missionTitle: "Misyonumuz",
    missionText: "Ortaca ve Muğla bölgesinde güvenilir, şeffaf ve kaliteli emlak danışmanlığı ile yapı çözümleri sunmak. Müşterilerimizin hayallerini gerçeğe dönüştürmelerine yardımcı olmak ve her projede en yüksek memnuniyeti sağlamak.",
    visionTitle: "Vizyonumuz",
    visionText: "Muğla bölgesinin en saygın ve tercih edilen yapı ve emlak markası olmak. Yenilikçi yaklaşımlar ve teknoloji ile sektörde öncü olmak. Sürdürülebilir ve çevre dostu yapı uygulamalarını benimsemek.",

    valuesBadge: "Değerlerimiz",
    valuesTitle: "Bizi Biz Yapan Değerler",
    valuesSubtitle: "Her kararımızda ve her projemizde bu değerleri rehber alıyoruz.",

    certsBadge: "Belgelerimiz",
    certsTitle: "Sertifikalar & Belgeler",
    certsSubtitle: "Resmi olarak yetkilendirilmiş ve sertifikalı hizmet sunuyoruz.",

    webDesignText: "Web sitemiz",
    webDesignBy: "tarafından tasarlanmış ve geliştirilmiştir.",

    ctaTitle: "Bizimle Çalışmak İster misiniz?",
    ctaSubtitle: "Emlak, tadilat veya inşaat projeleriniz için bizimle iletişime geçin. Ücretsiz danışmanlık hizmetimizden yararlanın.",
    ctaButton: "İletişime Geç",
    whatsappButton: "WhatsApp ile Yazın",
    whatsappMessage: "Merhaba, Kalinda Yapı hakkında bilgi almak istiyorum.",
  },
  en: {
    heroTitle: "About",
    heroTitleHighlight: "Kalinda Yapı",
    heroDescription1: "Since 2022, we have been providing real estate consulting, renovation, and construction contracting services in Ortaca, Muğla. Our company, founded by the partnership of Zafer Soylu and Arif Dağdelen, aims to be one of the most trusted construction and real estate brands in the region.",
    heroDescription2: "With over 200 successful real estate transactions and more than 100 renovation projects in Ortaca center, Dalyan, Köyceğiz, Dalaman, and Fethiye, we are the region's trusted construction partner.",

    storyBadge: "Our Story",
    storyTitle: "Born in Ortaca, Working for Ortaca",
    storyParagraph1: "Kalinda Yapı was established in 2022 in Ortaca through the partnership of Zafer Soylu and Arif Dağdelen. Both partners were born and raised in this region and are well-acquainted with the local needs.",
    storyParagraph2: "Zafer Soylu is a professional who understands the real estate dynamics of Ortaca, Dalyan, and Köyceğiz regions with his experience in real estate consulting. Arif Dağdelen has completed numerous residential, villa, and commercial projects with his experience in the construction and contracting sector.",
    storyParagraph3: "We have completed more than 100 projects with our renovation and project services. Our real estate portfolio includes options in Ortaca center, Dalyan canal side, Köyceğiz lake view, and near Dalaman airport.",
    storyParagraph4: "Today, we continue to be the trusted construction and real estate partner of the Muğla region with more than 200 happy families. You can review our Ortaca real estate guide for detailed information about the region.",

    missionTitle: "Our Mission",
    missionText: "To provide reliable, transparent, and quality real estate consulting and construction solutions in Ortaca and Muğla region. To help our customers turn their dreams into reality and ensure the highest satisfaction in every project.",
    visionTitle: "Our Vision",
    visionText: "To be the most respected and preferred construction and real estate brand in the Muğla region. To be a pioneer in the sector with innovative approaches and technology. To adopt sustainable and environmentally friendly construction practices.",

    valuesBadge: "Our Values",
    valuesTitle: "Values That Define Us",
    valuesSubtitle: "We follow these values in every decision and every project.",

    certsBadge: "Our Documents",
    certsTitle: "Certificates & Documents",
    certsSubtitle: "We provide officially authorized and certified services.",

    webDesignText: "Our website was designed and developed by",
    webDesignBy: "",

    ctaTitle: "Want to Work With Us?",
    ctaSubtitle: "Contact us for your real estate, renovation, or construction projects. Take advantage of our free consultation service.",
    ctaButton: "Contact Us",
    whatsappButton: "Write on WhatsApp",
    whatsappMessage: "Hello, I would like to get information about Kalinda Yapı.",
  },
  ar: {
    heroTitle: "حول",
    heroTitleHighlight: "كاليندا يابي",
    heroDescription1: "منذ عام 2022، نقدم خدمات الاستشارات العقارية والتجديد ومقاولات البناء في أورتاجا، موغلا. تهدف شركتنا، التي أسسها شراكة زافر سويلو وعارف داغدلين، إلى أن تكون واحدة من أكثر العلامات التجارية الموثوقة في البناء والعقارات في المنطقة.",
    heroDescription2: "مع أكثر من 200 صفقة عقارية ناجحة وأكثر من 100 مشروع تجديد في مركز أورتاجا ودالان وكويجغيز ودالامان وفتحية، نحن شريك البناء الموثوق في المنطقة.",

    storyBadge: "قصتنا",
    storyTitle: "ولدنا في أورتاجا، نعمل من أجل أورتاجا",
    storyParagraph1: "تأسست كاليندا يابي في عام 2022 في أورتاجا من خلال شراكة زافر سويلو وعارف داغدلين. كلا الشريكين ولدا ونشأا في هذه المنطقة ويعرفان احتياجات المنطقة جيدًا.",
    storyParagraph2: "زافر سويلو محترف يفهم ديناميكيات العقارات في مناطق أورتاجا ودالان وكويجغيز من خلال خبرته في الاستشارات العقارية. أكمل عارف داغدلين العديد من المشاريع السكنية والفلل والتجارية من خلال خبرته في قطاع البناء والمقاولات.",
    storyParagraph3: "أكملنا أكثر من 100 مشروع من خلال خدمات التجديد والمشاريع لدينا. تتضمن محفظتنا العقارية خيارات في مركز أورتاجا وجانب قناة دالان ومنظر بحيرة كويجغيز وقرب مطار دالامان.",
    storyParagraph4: "اليوم، نواصل أن نكون شريك البناء والعقارات الموثوق في منطقة موغلا مع أكثر من 200 عائلة سعيدة. يمكنك مراجعة دليلنا العقاري لأورتاجا للحصول على معلومات مفصلة عن المنطقة.",

    missionTitle: "مهمتنا",
    missionText: "تقديم استشارات عقارية موثوقة وشفافة وعالية الجودة وحلول بناء في منطقة أورتاجا وموغلا. مساعدة عملائنا على تحويل أحلامهم إلى واقع وضمان أعلى رضا في كل مشروع.",
    visionTitle: "رؤيتنا",
    visionText: "أن نكون العلامة التجارية الأكثر احترامًا وتفضيلاً في البناء والعقارات في منطقة موغلا. أن نكون رائدين في القطاع بمقاربات مبتكرة وتقنية. تبني ممارسات بناء مستدامة وصديقة للبيئة.",

    valuesBadge: "قيمنا",
    valuesTitle: "القيم التي تحددنا",
    valuesSubtitle: "نتبع هذه القيم في كل قرار وكل مشروع.",

    certsBadge: "وثائقنا",
    certsTitle: "الشهادات والوثائق",
    certsSubtitle: "نقدم خدمات مرخصة ومعتمدة رسميًا.",

    webDesignText: "تم تصميم وتطوير موقعنا الإلكتروني بواسطة",
    webDesignBy: "",

    ctaTitle: "هل تريد العمل معنا؟",
    ctaSubtitle: "تواصل معنا لمشاريعك العقارية أو التجديد أو البناء. استفد من خدمة الاستشارة المجانية.",
    ctaButton: "تواصل معنا",
    whatsappButton: "اكتب على واتساب",
    whatsappMessage: "مرحباً، أود الحصول على معلومات حول كاليندا يابي.",
  },
  de: {
    heroTitle: "Über",
    heroTitleHighlight: "Kalinda Yapı",
    heroDescription1: "Seit 2022 bieten wir Immobilienberatung, Renovierung und Bauunternehmensdienste in Ortaca, Muğla an. Unser Unternehmen, gegründet durch die Partnerschaft von Zafer Soylu und Arif Dağdelen, strebt an, eine der vertrauenswürdigsten Bau- und Immobilienmarken der Region zu werden.",
    heroDescription2: "Mit über 200 erfolgreichen Immobilientransaktionen und mehr als 100 Renovierungsprojekten in Ortaca Zentrum, Dalyan, Köyceğiz, Dalaman und Fethiye sind wir der vertrauenswürdige Baupartner der Region.",

    storyBadge: "Unsere Geschichte",
    storyTitle: "In Ortaca geboren, für Ortaca arbeiten",
    storyParagraph1: "Kalinda Yapı wurde 2022 in Ortaca durch die Partnerschaft von Zafer Soylu und Arif Dağdelen gegründet. Beide Partner sind in dieser Region geboren und aufgewachsen und kennen die lokalen Bedürfnisse genau.",
    storyParagraph2: "Zafer Soylu ist ein Profi, der die Immobiliendynamik der Regionen Ortaca, Dalyan und Köyceğiz mit seiner Erfahrung in der Immobilienberatung versteht. Arif Dağdelen hat mit seiner Erfahrung im Bau- und Vertragsbereich zahlreiche Wohn-, Villen- und Gewerbeprojekte abgeschlossen.",
    storyParagraph3: "Wir haben mehr als 100 Projekte mit unseren Renovierungs- und Projektdienstleistungen abgeschlossen. Unser Immobilienportfolio umfasst Optionen im Zentrum von Ortaca, am Dalyan-Kanal, mit Köyceğiz-Seeblick und in der Nähe des Flughafens Dalaman.",
    storyParagraph4: "Heute sind wir weiterhin der vertrauenswürdige Bau- und Immobilienpartner der Region Muğla mit mehr als 200 zufriedenen Familien.",

    missionTitle: "Unsere Mission",
    missionText: "Zuverlässige, transparente und qualitativ hochwertige Immobilienberatung und Baulösungen in der Region Ortaca und Muğla anzubieten. Unseren Kunden zu helfen, ihre Träume zu verwirklichen und in jedem Projekt höchste Zufriedenheit zu gewährleisten.",
    visionTitle: "Unsere Vision",
    visionText: "Die angesehenste und bevorzugte Bau- und Immobilienmarke in der Region Muğla zu werden. Mit innovativen Ansätzen und Technologie Vorreiter in der Branche zu sein. Nachhaltige und umweltfreundliche Baupraktiken zu übernehmen.",

    valuesBadge: "Unsere Werte",
    valuesTitle: "Werte, die uns definieren",
    valuesSubtitle: "Wir folgen diesen Werten in jeder Entscheidung und jedem Projekt.",

    certsBadge: "Unsere Dokumente",
    certsTitle: "Zertifikate & Dokumente",
    certsSubtitle: "Wir bieten offiziell autorisierte und zertifizierte Dienstleistungen an.",

    webDesignText: "Unsere Website wurde entworfen und entwickelt von",
    webDesignBy: "",

    ctaTitle: "Möchten Sie mit uns arbeiten?",
    ctaSubtitle: "Kontaktieren Sie uns für Ihre Immobilien-, Renovierungs- oder Bauprojekte. Nutzen Sie unseren kostenlosen Beratungsservice.",
    ctaButton: "Kontaktieren Sie uns",
    whatsappButton: "Auf WhatsApp schreiben",
    whatsappMessage: "Hallo, ich möchte Informationen über Kalinda Yapı erhalten.",
  },
  ru: {
    heroTitle: "О нас",
    heroTitleHighlight: "Kalinda Yapı",
    heroDescription1: "С 2022 года мы предоставляем услуги по консультированию в сфере недвижимости, ремонту и строительному подряду в Ортадже, Мугла. Наша компания, основанная партнерством Зафера Сойлу и Арифа Дагделена, стремится стать одним из самых надежных строительных и риэлторских брендов региона.",
    heroDescription2: "С более чем 200 успешными сделками с недвижимостью и более чем 100 ремонтными проектами в центре Ортаджи, Дальяне, Кёйджегизе, Даламане и Фетхие мы являемся надежным строительным партнером региона.",

    storyBadge: "Наша история",
    storyTitle: "Родились в Ортадже, работаем для Ортаджи",
    storyParagraph1: "Kalinda Yapı была основана в 2022 году в Ортадже благодаря партнерству Зафера Сойлу и Арифа Дагделена. Оба партнера родились и выросли в этом регионе и хорошо знают местные потребности.",
    storyParagraph2: "Зафер Сойлу — профессионал, который понимает динамику рынка недвижимости регионов Ортаджа, Дальян и Кёйджегиз благодаря своему опыту в консультировании по недвижимости. Ариф Дагделен завершил множество жилых, вилловых и коммерческих проектов благодаря своему опыту в строительстве и подряде.",
    storyParagraph3: "Мы завершили более 100 проектов с нашими услугами по ремонту и проектированию. Наш портфель недвижимости включает варианты в центре Ортаджи, на канале Дальян, с видом на озеро Кёйджегиз и вблизи аэропорта Даламан.",
    storyParagraph4: "Сегодня мы продолжаем быть надежным строительным и риэлторским партнером региона Мугла с более чем 200 довольными семьями.",

    missionTitle: "Наша миссия",
    missionText: "Предоставлять надежные, прозрачные и качественные консультации по недвижимости и строительные решения в регионе Ортаджа и Мугла. Помогать нашим клиентам воплощать мечты в реальность и обеспечивать высочайшее удовлетворение в каждом проекте.",
    visionTitle: "Наше видение",
    visionText: "Стать самым уважаемым и предпочтительным строительным и риэлторским брендом в регионе Мугла. Быть лидером отрасли с инновационными подходами и технологиями. Внедрять устойчивые и экологически чистые строительные практики.",

    valuesBadge: "Наши ценности",
    valuesTitle: "Ценности, которые нас определяют",
    valuesSubtitle: "Мы следуем этим ценностям в каждом решении и каждом проекте.",

    certsBadge: "Наши документы",
    certsTitle: "Сертификаты и документы",
    certsSubtitle: "Мы предоставляем официально авторизованные и сертифицированные услуги.",

    webDesignText: "Наш сайт был разработан и создан",
    webDesignBy: "",

    ctaTitle: "Хотите работать с нами?",
    ctaSubtitle: "Свяжитесь с нами для ваших проектов недвижимости, ремонта или строительства. Воспользуйтесь нашей бесплатной консультационной службой.",
    ctaButton: "Связаться с нами",
    whatsappButton: "Написать в WhatsApp",
    whatsappMessage: "Здравствуйте, я хотел бы получить информацию о Kalinda Yapı.",
  },
};

// Values data
export const degerler: Record<Locale, Value[]> = {
  tr: [
    {
      ikon: "Shield",
      baslik: "Güven",
      aciklama: "Müşterilerimizle güvene dayalı ilişkiler kuruyoruz. Şeffaf iletişim ve dürüst hizmet anlayışımızla fark yaratıyoruz.",
    },
    {
      ikon: "Lightbulb",
      baslik: "Şeffaflık",
      aciklama: "Tüm süreçlerde açık ve net bilgi sunuyoruz. Gizli maliyet veya sürpriz olmadan çalışıyoruz.",
    },
    {
      ikon: "Award",
      baslik: "Kalite",
      aciklama: "Her projede en yüksek kalite standartlarını hedefliyoruz. Kaliteli malzeme ve işçilik garantisi veriyoruz.",
    },
    {
      ikon: "MapPin",
      baslik: "Bölgesel Bağlılık",
      aciklama: "Ortaca ve Muğla bölgesinin gelişimine katkıda bulunuyoruz. Yerel topluluğun bir parçası olmaktan gurur duyuyoruz.",
    },
  ],
  en: [
    {
      ikon: "Shield",
      baslik: "Trust",
      aciklama: "We build trust-based relationships with our customers. We make a difference with our transparent communication and honest service approach.",
    },
    {
      ikon: "Lightbulb",
      baslik: "Transparency",
      aciklama: "We provide clear and open information in all processes. We work without hidden costs or surprises.",
    },
    {
      ikon: "Award",
      baslik: "Quality",
      aciklama: "We aim for the highest quality standards in every project. We guarantee quality materials and workmanship.",
    },
    {
      ikon: "MapPin",
      baslik: "Regional Commitment",
      aciklama: "We contribute to the development of Ortaca and Muğla region. We are proud to be part of the local community.",
    },
  ],
  ar: [
    {
      ikon: "Shield",
      baslik: "الثقة",
      aciklama: "نبني علاقات قائمة على الثقة مع عملائنا. نصنع الفرق من خلال التواصل الشفاف ونهج الخدمة الصادق.",
    },
    {
      ikon: "Lightbulb",
      baslik: "الشفافية",
      aciklama: "نقدم معلومات واضحة ومفتوحة في جميع العمليات. نعمل بدون تكاليف خفية أو مفاجآت.",
    },
    {
      ikon: "Award",
      baslik: "الجودة",
      aciklama: "نهدف إلى أعلى معايير الجودة في كل مشروع. نضمن مواد وعمالة عالية الجودة.",
    },
    {
      ikon: "MapPin",
      baslik: "الالتزام الإقليمي",
      aciklama: "نساهم في تنمية منطقة أورتاجا وموغلا. نفخر بأن نكون جزءًا من المجتمع المحلي.",
    },
  ],
  de: [
    {
      ikon: "Shield",
      baslik: "Vertrauen",
      aciklama: "Wir bauen vertrauensbasierte Beziehungen zu unseren Kunden auf. Wir machen den Unterschied durch transparente Kommunikation und ehrlichen Serviceansatz.",
    },
    {
      ikon: "Lightbulb",
      baslik: "Transparenz",
      aciklama: "Wir bieten klare und offene Informationen in allen Prozessen. Wir arbeiten ohne versteckte Kosten oder Überraschungen.",
    },
    {
      ikon: "Award",
      baslik: "Qualität",
      aciklama: "Wir streben in jedem Projekt nach höchsten Qualitätsstandards. Wir garantieren hochwertige Materialien und Handwerkskunst.",
    },
    {
      ikon: "MapPin",
      baslik: "Regionale Verbundenheit",
      aciklama: "Wir tragen zur Entwicklung der Region Ortaca und Muğla bei. Wir sind stolz, Teil der lokalen Gemeinschaft zu sein.",
    },
  ],
  ru: [
    {
      ikon: "Shield",
      baslik: "Доверие",
      aciklama: "Мы строим доверительные отношения с нашими клиентами. Мы делаем разницу благодаря прозрачному общению и честному подходу к обслуживанию.",
    },
    {
      ikon: "Lightbulb",
      baslik: "Прозрачность",
      aciklama: "Мы предоставляем четкую и открытую информацию во всех процессах. Мы работаем без скрытых расходов или сюрпризов.",
    },
    {
      ikon: "Award",
      baslik: "Качество",
      aciklama: "Мы стремимся к высочайшим стандартам качества в каждом проекте. Мы гарантируем качественные материалы и мастерство.",
    },
    {
      ikon: "MapPin",
      baslik: "Региональная приверженность",
      aciklama: "Мы вносим вклад в развитие региона Ортаджа и Мугла. Мы гордимся тем, что являемся частью местного сообщества.",
    },
  ],
};

// Timeline data
export const timeline: Record<Locale, TimelineItem[]> = {
  tr: [
    { yil: "2022", baslik: "Kuruluş", aciklama: "Kalinda Yapı Ortaca'da faaliyete başladı" },
    { yil: "2023", baslik: "Büyüme", aciklama: "İlk projelerimizi başarıyla tamamladık" },
    { yil: "2024", baslik: "Genişleme", aciklama: "Dalyan ve Köyceğiz'e hizmet alanımızı genişlettik" },
    { yil: "2025", baslik: "Dijitalleşme", aciklama: "AKD Universe ile web sitesi ve dijital dönüşüm" },
  ],
  en: [
    { yil: "2022", baslik: "Foundation", aciklama: "Kalinda Yapı started operations in Ortaca" },
    { yil: "2023", baslik: "Growth", aciklama: "Successfully completed our first projects" },
    { yil: "2024", baslik: "Expansion", aciklama: "Expanded service area to Dalyan and Köyceğiz" },
    { yil: "2025", baslik: "Digitalization", aciklama: "Website and digital transformation with AKD Universe" },
  ],
  ar: [
    { yil: "2022", baslik: "التأسيس", aciklama: "بدأت كاليندا يابي عملياتها في أورتاجا" },
    { yil: "2023", baslik: "النمو", aciklama: "أكملنا مشاريعنا الأولى بنجاح" },
    { yil: "2024", baslik: "التوسع", aciklama: "وسعنا منطقة الخدمة إلى دالان وكويجغيز" },
    { yil: "2025", baslik: "التحول الرقمي", aciklama: "الموقع الإلكتروني والتحول الرقمي مع AKD Universe" },
  ],
  de: [
    { yil: "2022", baslik: "Gründung", aciklama: "Kalinda Yapı nahm den Betrieb in Ortaca auf" },
    { yil: "2023", baslik: "Wachstum", aciklama: "Unsere ersten Projekte erfolgreich abgeschlossen" },
    { yil: "2024", baslik: "Erweiterung", aciklama: "Servicebereich auf Dalyan und Köyceğiz erweitert" },
    { yil: "2025", baslik: "Digitalisierung", aciklama: "Website und digitale Transformation mit AKD Universe" },
  ],
  ru: [
    { yil: "2022", baslik: "Основание", aciklama: "Kalinda Yapı начала работу в Ортадже" },
    { yil: "2023", baslik: "Рост", aciklama: "Успешно завершили наши первые проекты" },
    { yil: "2024", baslik: "Расширение", aciklama: "Расширили зону обслуживания на Дальян и Кёйджегиз" },
    { yil: "2025", baslik: "Цифровизация", aciklama: "Веб-сайт и цифровая трансформация с AKD Universe" },
  ],
};

// Certificates data
export const sertifikalar: Record<Locale, Certificate[]> = {
  tr: [
    { baslik: "Emlak Danışmanlığı Lisansı", aciklama: "Resmi emlak danışmanlığı yetki belgesi" },
    { baslik: "Ticaret Odası Kaydı", aciklama: "Muğla Ticaret Odası üyeliği" },
    { baslik: "İş Güvenliği Belgesi", aciklama: "İş sağlığı ve güvenliği sertifikası" },
    { baslik: "ISO 9001 (Hedef)", aciklama: "Kalite yönetim sistemi hedefi" },
  ],
  en: [
    { baslik: "Real Estate Consulting License", aciklama: "Official real estate consulting authorization" },
    { baslik: "Chamber of Commerce Registration", aciklama: "Muğla Chamber of Commerce membership" },
    { baslik: "Occupational Safety Certificate", aciklama: "Occupational health and safety certificate" },
    { baslik: "ISO 9001 (Target)", aciklama: "Quality management system target" },
  ],
  ar: [
    { baslik: "رخصة الاستشارات العقارية", aciklama: "ترخيص رسمي للاستشارات العقارية" },
    { baslik: "تسجيل غرفة التجارة", aciklama: "عضوية غرفة التجارة موغلا" },
    { baslik: "شهادة السلامة المهنية", aciklama: "شهادة الصحة والسلامة المهنية" },
    { baslik: "ISO 9001 (الهدف)", aciklama: "هدف نظام إدارة الجودة" },
  ],
  de: [
    { baslik: "Immobilienberatungslizenz", aciklama: "Offizielle Immobilienberatungsgenehmigung" },
    { baslik: "Handelskammereintragung", aciklama: "Mitgliedschaft in der Handelskammer Muğla" },
    { baslik: "Arbeitssicherheitszertifikat", aciklama: "Arbeitsschutz- und Sicherheitszertifikat" },
    { baslik: "ISO 9001 (Ziel)", aciklama: "Qualitätsmanagementsystem-Ziel" },
  ],
  ru: [
    { baslik: "Лицензия на консультирование по недвижимости", aciklama: "Официальное разрешение на консультирование по недвижимости" },
    { baslik: "Регистрация в Торговой палате", aciklama: "Членство в Торговой палате Мугла" },
    { baslik: "Сертификат охраны труда", aciklama: "Сертификат охраны труда и безопасности" },
    { baslik: "ISO 9001 (Цель)", aciklama: "Цель системы менеджмента качества" },
  ],
};
