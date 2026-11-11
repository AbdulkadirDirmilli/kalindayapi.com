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
    heroDescription1: "2022 yılından bu yana Muğla'nın Ortaca ilçesinde lisanslı gayrimenkul danışmanlığı sunuyoruz. Arif Dağdelen tarafından kurulan firmamız, bölgenin en güvenilir emlak markalarından biri olmayı hedeflemektedir.",
    heroDescription2: "Ortaca merkez, Dalyan, Köyceğiz, Dalaman ve Fethiye'de 200'den fazla başarılı emlak işlemiyle bölgenin güvenilir gayrimenkul ortağıyız.",

    storyBadge: "Hikayemiz",
    storyTitle: "Ortaca'da Doğduk, Ortaca İçin Çalışıyoruz",
    storyParagraph1: "Kalinda Yapı Emlak, 2022 yılında Arif Dağdelen tarafından Ortaca'da kurulmuştur. Bu topraklarda doğup büyüyen kurucumuz, bölgenin ihtiyaçlarını yakından tanıyan bir isimdir.",
    storyParagraph2: "Arif Dağdelen, gayrimenkul sektöründeki saha deneyimiyle Ortaca, Dalyan, Köyceğiz ve Dalaman bölgelerinin emlak dinamiklerine hakim, lisanslı bir danışmandır. Alım, satım ve kiralama süreçlerinin tamamını tek elden yürütür.",
    storyParagraph3: "Emlak portföyümüzde Ortaca merkez, Dalyan kanal boyu, Köyceğiz göl manzaralı ve Dalaman havalimanı yakını daire, villa, arsa ve ticari gayrimenkul seçenekleri bulunuyor.",
    storyParagraph4: "Bugün, 300'den fazla mutlu aile ile Muğla bölgesinin güvenilir gayrimenkul ortağı olmaya devam ediyoruz. Ortaca emlak rehberimizi inceleyerek bölge hakkında detaylı bilgi alabilirsiniz.",

    missionTitle: "Misyonumuz",
    missionText: "Ortaca ve Muğla bölgesinde güvenilir, şeffaf ve lisanslı gayrimenkul danışmanlığı sunmak. Müşterilerimizin doğru mülkü doğru fiyata bulmasına yardımcı olmak ve her işlemde en yüksek memnuniyeti sağlamak.",
    visionTitle: "Vizyonumuz",
    visionText: "Muğla bölgesinin en saygın ve tercih edilen emlak markası olmak. Şeffaf fiyatlama, doğrulanmış portföy ve teknolojiyle desteklenen hizmet anlayışında sektöre örnek olmak.",

    valuesBadge: "Değerlerimiz",
    valuesTitle: "Bizi Biz Yapan Değerler",
    valuesSubtitle: "Her kararımızda ve her projemizde bu değerleri rehber alıyoruz.",

    certsBadge: "Belgelerimiz",
    certsTitle: "Sertifikalar & Belgeler",
    certsSubtitle: "Resmi olarak yetkilendirilmiş ve sertifikalı hizmet sunuyoruz.",

    webDesignText: "Web sitemiz",
    webDesignBy: "tarafından tasarlanmış ve geliştirilmiştir.",

    ctaTitle: "Bizimle Çalışmak İster misiniz?",
    ctaSubtitle: "Alım, satım veya kiralama planınız için bizimle iletişime geçin. Ücretsiz ön görüşme ve değerleme hizmetimizden yararlanın.",
    ctaButton: "İletişime Geç",
    whatsappButton: "WhatsApp ile Yazın",
    whatsappMessage: "Merhaba, Kalinda Yapı hakkında bilgi almak istiyorum.",
  },
  en: {
    heroTitle: "About",
    heroTitleHighlight: "Kalinda Yapı",
    heroDescription1: "Since 2022, we have been providing licensed real estate consulting in Ortaca, Muğla. Founded by Arif Dağdelen, our company aims to be one of the most trusted real estate brands in the region.",
    heroDescription2: "With over 200 successful real estate transactions in Ortaca center, Dalyan, Köyceğiz, Dalaman and Fethiye, we are the region's trusted property partner.",

    storyBadge: "Our Story",
    storyTitle: "Born in Ortaca, Working for Ortaca",
    storyParagraph1: "Kalinda Yapı Emlak was established in Ortaca in 2022 by Arif Dağdelen. Born and raised in this region, our founder knows the local market and its needs first hand.",
    storyParagraph2: "Arif Dağdelen is a licensed consultant who understands the property dynamics of the Ortaca, Dalyan, Köyceğiz and Dalaman regions through years of field experience, handling the entire buying, selling and rental process personally.",
    storyParagraph3: "Our portfolio includes apartments, villas, land and commercial properties in Ortaca center, along the Dalyan canal, with Köyceğiz lake views and near Dalaman airport.",
    storyParagraph4: "Today, we continue to be the trusted property partner of the Muğla region with more than 300 happy families. You can review our Ortaca real estate guide for detailed information about the region.",

    missionTitle: "Our Mission",
    missionText: "To provide reliable, transparent and licensed real estate consulting in Ortaca and the Muğla region. To help our clients find the right property at the right price and ensure the highest satisfaction in every transaction.",
    visionTitle: "Our Vision",
    visionText: "To be the most respected and preferred real estate brand in the Muğla region, setting the standard with transparent pricing, a verified portfolio and technology-supported service.",

    valuesBadge: "Our Values",
    valuesTitle: "Values That Define Us",
    valuesSubtitle: "We follow these values in every decision and every project.",

    certsBadge: "Our Documents",
    certsTitle: "Certificates & Documents",
    certsSubtitle: "We provide officially authorized and certified services.",

    webDesignText: "Our website was designed and developed by",
    webDesignBy: "",

    ctaTitle: "Want to Work With Us?",
    ctaSubtitle: "Contact us about your buying, selling or rental plans. Take advantage of our free initial consultation and valuation.",
    ctaButton: "Contact Us",
    whatsappButton: "Write on WhatsApp",
    whatsappMessage: "Hello, I would like to get information about Kalinda Yapı.",
  },
  ar: {
    heroTitle: "حول",
    heroTitleHighlight: "كاليندا يابي",
    heroDescription1: "منذ عام 2022، نقدم استشارات عقارية مرخّصة في أورتاجا، موغلا. تهدف شركتنا، التي أسسها عارف داغدلين، إلى أن تكون واحدة من أكثر العلامات العقارية الموثوقة في المنطقة.",
    heroDescription2: "مع أكثر من 200 صفقة عقارية ناجحة في مركز أورتاجا وداليان وكويجيز ودالامان وفتحية، نحن الشريك العقاري الموثوق في المنطقة.",

    storyBadge: "قصتنا",
    storyTitle: "ولدنا في أورتاجا، نعمل من أجل أورتاجا",
    storyParagraph1: "تأسست كاليندا يابي العقارية عام 2022 في أورتاجا على يد عارف داغدلين. وقد وُلد مؤسسنا ونشأ في هذه المنطقة ويعرف احتياجات السوق المحلي عن قرب.",
    storyParagraph2: "عارف داغدلين مستشار مرخّص يفهم ديناميكيات العقارات في مناطق أورتاجا وداليان وكويجيز ودالامان بفضل سنوات من الخبرة الميدانية، ويتولى بنفسه إدارة عمليات البيع والشراء والتأجير من البداية حتى النهاية.",
    storyParagraph3: "تتضمن محفظتنا شققاً وفللاً وأراضي وعقارات تجارية في مركز أورتاجا وعلى قناة داليان وبإطلالة على بحيرة كويجيز وقرب مطار دالامان.",
    storyParagraph4: "اليوم، نواصل أن نكون الشريك العقاري الموثوق في منطقة موغلا مع أكثر من 300 عائلة سعيدة. يمكنك مراجعة دليلنا العقاري لأورتاجا للحصول على معلومات مفصلة عن المنطقة.",

    missionTitle: "مهمتنا",
    missionText: "تقديم استشارات عقارية موثوقة وشفافة ومرخّصة في منطقة أورتاجا وموغلا. مساعدة عملائنا على إيجاد العقار المناسب بالسعر المناسب وضمان أعلى رضا في كل معاملة.",
    visionTitle: "رؤيتنا",
    visionText: "أن نكون العلامة العقارية الأكثر احترامًا وتفضيلاً في منطقة موغلا، وأن نضع المعيار من خلال التسعير الشفاف والمحفظة الموثّقة والخدمة المدعومة بالتقنية.",

    valuesBadge: "قيمنا",
    valuesTitle: "القيم التي تحددنا",
    valuesSubtitle: "نتبع هذه القيم في كل قرار وكل مشروع.",

    certsBadge: "وثائقنا",
    certsTitle: "الشهادات والوثائق",
    certsSubtitle: "نقدم خدمات مرخصة ومعتمدة رسميًا.",

    webDesignText: "تم تصميم وتطوير موقعنا الإلكتروني بواسطة",
    webDesignBy: "",

    ctaTitle: "هل تريد العمل معنا؟",
    ctaSubtitle: "تواصل معنا بشأن خطط الشراء أو البيع أو التأجير. استفد من الاستشارة الأولية والتقييم المجاني.",
    ctaButton: "تواصل معنا",
    whatsappButton: "اكتب على واتساب",
    whatsappMessage: "مرحباً، أود الحصول على معلومات حول كاليندا يابي.",
  },
  de: {
    heroTitle: "Über",
    heroTitleHighlight: "Kalinda Yapı",
    heroDescription1: "Seit 2022 bieten wir lizenzierte Immobilienberatung in Ortaca, Muğla an. Unser von Arif Dağdelen gegründetes Unternehmen strebt an, eine der vertrauenswürdigsten Immobilienmarken der Region zu werden.",
    heroDescription2: "Mit über 200 erfolgreichen Immobilientransaktionen in Ortaca Zentrum, Dalyan, Köyceğiz, Dalaman und Fethiye sind wir der vertrauenswürdige Immobilienpartner der Region.",

    storyBadge: "Unsere Geschichte",
    storyTitle: "In Ortaca geboren, für Ortaca arbeiten",
    storyParagraph1: "Kalinda Yapı Emlak wurde 2022 in Ortaca von Arif Dağdelen gegründet. Unser Gründer ist in dieser Region geboren und aufgewachsen und kennt den lokalen Markt und seine Bedürfnisse genau.",
    storyParagraph2: "Arif Dağdelen ist ein lizenzierter Berater, der die Immobiliendynamik der Regionen Ortaca, Dalyan, Köyceğiz und Dalaman durch langjährige Praxiserfahrung kennt und den gesamten Kauf-, Verkaufs- und Mietprozess persönlich begleitet.",
    storyParagraph3: "Unser Portfolio umfasst Wohnungen, Villen, Grundstücke und Gewerbeimmobilien im Zentrum von Ortaca, am Dalyan-Kanal, mit Köyceğiz-Seeblick und in der Nähe des Flughafens Dalaman.",
    storyParagraph4: "Heute sind wir mit mehr als 300 zufriedenen Familien weiterhin der vertrauenswürdige Immobilienpartner der Region Muğla.",

    missionTitle: "Unsere Mission",
    missionText: "Zuverlässige, transparente und lizenzierte Immobilienberatung in der Region Ortaca und Muğla anzubieten. Unseren Kunden zu helfen, die richtige Immobilie zum richtigen Preis zu finden, und bei jeder Transaktion höchste Zufriedenheit zu gewährleisten.",
    visionTitle: "Unsere Vision",
    visionText: "Die angesehenste und bevorzugte Immobilienmarke in der Region Muğla zu werden und mit transparenter Preisgestaltung, geprüftem Portfolio und technologiegestütztem Service Maßstäbe zu setzen.",

    valuesBadge: "Unsere Werte",
    valuesTitle: "Werte, die uns definieren",
    valuesSubtitle: "Wir folgen diesen Werten in jeder Entscheidung und jedem Projekt.",

    certsBadge: "Unsere Dokumente",
    certsTitle: "Zertifikate & Dokumente",
    certsSubtitle: "Wir bieten offiziell autorisierte und zertifizierte Dienstleistungen an.",

    webDesignText: "Unsere Website wurde entworfen und entwickelt von",
    webDesignBy: "",

    ctaTitle: "Möchten Sie mit uns arbeiten?",
    ctaSubtitle: "Kontaktieren Sie uns zu Ihren Kauf-, Verkaufs- oder Mietplänen. Nutzen Sie unser kostenloses Erstgespräch und die Bewertung.",
    ctaButton: "Kontaktieren Sie uns",
    whatsappButton: "Auf WhatsApp schreiben",
    whatsappMessage: "Hallo, ich möchte Informationen über Kalinda Yapı erhalten.",
  },
  ru: {
    heroTitle: "О нас",
    heroTitleHighlight: "Kalinda Yapı",
    heroDescription1: "С 2022 года мы предоставляем лицензированные консультации по недвижимости в Ортадже, Мугла. Наша компания, основанная Арифом Дагделеном, стремится стать одним из самых надежных риэлторских брендов региона.",
    heroDescription2: "С более чем 200 успешными сделками с недвижимостью в центре Ортаджи, Дальяне, Кёйджегизе, Даламане и Фетхие мы являемся надежным партнером региона по недвижимости.",

    storyBadge: "Наша история",
    storyTitle: "Родились в Ортадже, работаем для Ортаджи",
    storyParagraph1: "Kalinda Yapı Emlak была основана в 2022 году в Ортадже Арифом Дагделеном. Наш основатель родился и вырос в этом регионе и хорошо знает местный рынок и его потребности.",
    storyParagraph2: "Ариф Дагделен — лицензированный консультант, который понимает динамику рынка недвижимости регионов Ортаджа, Дальян, Кёйджегиз и Даламан благодаря многолетнему практическому опыту и лично ведет весь процесс покупки, продажи и аренды.",
    storyParagraph3: "Наш портфель включает квартиры, виллы, земельные участки и коммерческую недвижимость в центре Ортаджи, на канале Дальян, с видом на озеро Кёйджегиз и вблизи аэропорта Даламан.",
    storyParagraph4: "Сегодня мы продолжаем быть надежным партнером региона Мугла по недвижимости с более чем 300 довольными семьями.",

    missionTitle: "Наша миссия",
    missionText: "Предоставлять надежные, прозрачные и лицензированные консультации по недвижимости в регионе Ортаджа и Мугла. Помогать клиентам найти подходящий объект по справедливой цене и обеспечивать высочайшее удовлетворение в каждой сделке.",
    visionTitle: "Наше видение",
    visionText: "Стать самым уважаемым и предпочтительным риэлторским брендом в регионе Мугла, задавая стандарт прозрачного ценообразования, проверенного портфеля и технологичного сервиса.",

    valuesBadge: "Наши ценности",
    valuesTitle: "Ценности, которые нас определяют",
    valuesSubtitle: "Мы следуем этим ценностям в каждом решении и каждом проекте.",

    certsBadge: "Наши документы",
    certsTitle: "Сертификаты и документы",
    certsSubtitle: "Мы предоставляем официально авторизованные и сертифицированные услуги.",

    webDesignText: "Наш сайт был разработан и создан",
    webDesignBy: "",

    ctaTitle: "Хотите работать с нами?",
    ctaSubtitle: "Свяжитесь с нами по вопросам покупки, продажи или аренды. Воспользуйтесь бесплатной первичной консультацией и оценкой.",
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
