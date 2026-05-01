// Default FAQ Questions Internationalization Data
import type { Locale } from '@/lib/i18n/config';

interface FaqItem {
  soru: string;
  cevap: string;
}

export const varsayilanSorular: Record<Locale, FaqItem[]> = {
  tr: [
    {
      soru: "Ortaca'da ev almak için hangi belgeler gerekiyor?",
      cevap:
        "T.C. vatandaşları için nüfus cüzdanı fotokopisi, vergi numarası ve ikametgah belgesi yeterlidir. Yabancı uyruklu alıcılar için tapu müdürlüğü onayı, pasaport tercümesi ve potansiyel vergi numarası gerekir. 2022'den bu yana 200+ satış işlemi tamamlayan ekibimiz, tüm evrak sürecinizi ücretsiz yönetiyor.",
    },
    {
      soru: "2026'da Ortaca ve Dalyan'da m² fiyatları ne kadar?",
      cevap:
        "Ortaca merkezde konut m² fiyatları 25.000-40.000 ₺, Dalyan'da villa arsaları 35.000-60.000 ₺/m² aralığında seyrediyor. Köyceğiz gölü çevresi ve Dalyan kanal manzaralı bölgeler prim yapıyor. Ücretsiz gayrimenkul değerleme hizmetimizle mülkünüzün güncel piyasa değerini öğrenebilirsiniz.",
    },
    {
      soru: "Tadilat projelerinde yazılı sözleşme yapıyor musunuz?",
      cevap:
        "Evet, her projede iş kapsamı, başlangıç-bitiş tarihi, malzeme listesi, ödeme planı ve garanti koşullarını içeren yazılı sözleşme düzenliyoruz. 100+ tamamlanmış tadilat projemizde sürpriz fatura çıkmadı. Şeffaflık ilkemiz gereği tüm değişiklikler yazılı onayınızla yapılır.",
    },
    {
      soru: "İnşaat ve tadilat işlerinizde garanti veriyor musunuz?",
      cevap:
        "Tüm işçilik ve uygulama için 2 yıl garanti sunuyoruz. Kullandığımız A sınıfı malzemeler (Vitra, Kütahya, Eca, Jotun) için üretici garantisi ayrıca geçerlidir. Garanti kapsamındaki sorunlar 48 saat içinde yerinde değerlendirilir. Garanti şartları sözleşmede açıkça belirtilir.",
    },
    {
      soru: "Emlak danışmanlık hizmeti ücretli mi?",
      cevap:
        "Ev arayanlar için danışmanlık tamamen ücretsizdir. Satış tamamlandığında satış bedelinin %2'si, kiralama işlemlerinde 1 aylık kira bedeli komisyon alınır. Tüm ücretler işlem öncesi yazılı bildirilir, gizli maliyet yoktur. İşlem gerçekleşmezse ücret talep etmiyoruz.",
    },
    {
      soru: "Muğla'nın hangi bölgelerine hizmet veriyorsunuz?",
      cevap:
        "Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça ve tüm Muğla genelinde aktif portföyümüz bulunuyor. Yerinde keşif için mesafe fark etmez. Bölgenin 4 yıllık deneyimli ekibi olarak yerel piyasayı, imar durumlarını ve yatırım potansiyellerini yakından takip ediyoruz.",
    },
  ],
  en: [
    {
      soru: "What documents are required to buy a house in Ortaca?",
      cevap:
        "For Turkish citizens, a copy of ID card, tax number, and residence certificate is sufficient. Foreign buyers need title deed office approval, passport translation, and potential tax number. Our team, which has completed 200+ sales transactions since 2022, manages all your paperwork free of charge.",
    },
    {
      soru: "What are the m² prices in Ortaca and Dalyan in 2026?",
      cevap:
        "Residential m² prices in Ortaca center range from 25,000-40,000 ₺, villa plots in Dalyan range from 35,000-60,000 ₺/m². Areas around Köyceğiz lake and Dalyan canal views are appreciating. With our free property valuation service, you can learn the current market value of your property.",
    },
    {
      soru: "Do you provide written contracts for renovation projects?",
      cevap:
        "Yes, for every project we prepare a written contract including scope of work, start-end dates, material list, payment plan, and warranty terms. In our 100+ completed renovation projects, there have been no surprise bills. In accordance with our transparency principle, all changes are made with your written approval.",
    },
    {
      soru: "Do you provide warranty for construction and renovation work?",
      cevap:
        "We offer a 2-year warranty for all workmanship and application. Manufacturer warranty also applies for the A-class materials we use (Vitra, Kütahya, Eca, Jotun). Issues covered by warranty are evaluated on-site within 48 hours. Warranty terms are clearly stated in the contract.",
    },
    {
      soru: "Is real estate consulting service paid?",
      cevap:
        "Consulting for home seekers is completely free. Upon completion of sale, 2% of the sale price, and for rental transactions, 1 month's rent is charged as commission. All fees are notified in writing before the transaction, there are no hidden costs. If the transaction does not take place, we do not charge a fee.",
    },
    {
      soru: "Which areas of Muğla do you serve?",
      cevap:
        "We have an active portfolio in Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça, and all of Muğla. Distance doesn't matter for on-site inspection. As a team with 4 years of experience in the region, we closely follow the local market, zoning conditions, and investment potentials.",
    },
  ],
  ar: [
    {
      soru: "ما هي المستندات المطلوبة لشراء منزل في أورتاجا؟",
      cevap:
        "للمواطنين الأتراك، تكفي نسخة من بطاقة الهوية ورقم الضريبة وشهادة الإقامة. يحتاج المشترون الأجانب إلى موافقة مكتب سند الملكية وترجمة جواز السفر والرقم الضريبي المحتمل. فريقنا الذي أكمل أكثر من 200 معاملة بيع منذ عام 2022 يدير جميع أوراقك مجانًا.",
    },
    {
      soru: "ما هي أسعار المتر المربع في أورتاجا ودالان في عام 2026؟",
      cevap:
        "تتراوح أسعار المتر المربع السكني في وسط أورتاجا بين 25,000-40,000 ليرة تركية، وقطع أراضي الفلل في دالان تتراوح بين 35,000-60,000 ليرة تركية/م². المناطق حول بحيرة كويجيز وإطلالات قناة دالان ترتفع قيمتها. مع خدمة تقييم العقارات المجانية لدينا، يمكنك معرفة القيمة السوقية الحالية لعقارك.",
    },
    {
      soru: "هل تقدمون عقودًا مكتوبة لمشاريع التجديد؟",
      cevap:
        "نعم، لكل مشروع نعد عقدًا مكتوبًا يشمل نطاق العمل وتواريخ البدء والانتهاء وقائمة المواد وخطة الدفع وشروط الضمان. في أكثر من 100 مشروع تجديد مكتمل، لم تكن هناك فواتير مفاجئة. وفقًا لمبدأ الشفافية لدينا، تتم جميع التغييرات بموافقتك الخطية.",
    },
    {
      soru: "هل تقدمون ضمانًا لأعمال البناء والتجديد؟",
      cevap:
        "نقدم ضمانًا لمدة عامين لجميع الأعمال والتطبيقات. ينطبق ضمان الشركة المصنعة أيضًا على المواد من الدرجة الأولى التي نستخدمها (Vitra، Kütahya، Eca، Jotun). يتم تقييم المشكلات المشمولة بالضمان في الموقع خلال 48 ساعة. شروط الضمان مذكورة بوضوح في العقد.",
    },
    {
      soru: "هل خدمة الاستشارات العقارية مدفوعة؟",
      cevap:
        "الاستشارات للباحثين عن منزل مجانية تمامًا. عند اكتمال البيع، يتم تحصيل 2٪ من سعر البيع، ولمعاملات التأجير، يتم تحصيل إيجار شهر واحد كعمولة. يتم إخطار جميع الرسوم كتابيًا قبل المعاملة، لا توجد تكاليف خفية. إذا لم تتم المعاملة، فلا نتقاضى رسومًا.",
    },
    {
      soru: "أي مناطق في موغلا تخدمونها؟",
      cevap:
        "لدينا محفظة نشطة في أورتاجا ودالان وكويجيز ودالامان وفتحية ومرمريس وبودروم وميلاس وداتشا وجميع أنحاء موغلا. المسافة لا تهم للتفتيش في الموقع. كفريق يتمتع بخبرة 4 سنوات في المنطقة، نتابع عن كثب السوق المحلي وظروف التخطيط وإمكانيات الاستثمار.",
    },
  ],
  de: [
    {
      soru: "Welche Dokumente sind erforderlich, um ein Haus in Ortaca zu kaufen?",
      cevap:
        "Für türkische Staatsbürger genügen eine Kopie des Personalausweises, die Steuernummer und eine Wohnsitzbescheinigung. Ausländische Käufer benötigen eine Genehmigung des Grundbuchamts, eine Passübersetzung und eine potenzielle Steuernummer. Unser Team, das seit 2022 über 200 Verkaufstransaktionen abgeschlossen hat, verwaltet alle Ihre Unterlagen kostenlos.",
    },
    {
      soru: "Wie hoch sind die m²-Preise in Ortaca und Dalyan im Jahr 2026?",
      cevap:
        "Die Wohnungs-m²-Preise im Zentrum von Ortaca liegen zwischen 25.000-40.000 ₺, Villagrundstücke in Dalyan zwischen 35.000-60.000 ₺/m². Gebiete rund um den Köyceğiz-See und mit Blick auf den Dalyan-Kanal gewinnen an Wert. Mit unserem kostenlosen Immobilienbewertungsservice können Sie den aktuellen Marktwert Ihrer Immobilie erfahren.",
    },
    {
      soru: "Bieten Sie schriftliche Verträge für Renovierungsprojekte an?",
      cevap:
        "Ja, für jedes Projekt erstellen wir einen schriftlichen Vertrag mit Arbeitsumfang, Start- und Enddatum, Materialliste, Zahlungsplan und Garantiebedingungen. Bei unseren über 100 abgeschlossenen Renovierungsprojekten gab es keine Überraschungsrechnungen. Gemäß unserem Transparenzprinzip werden alle Änderungen mit Ihrer schriftlichen Genehmigung vorgenommen.",
    },
    {
      soru: "Bieten Sie Garantie für Bau- und Renovierungsarbeiten?",
      cevap:
        "Wir bieten eine 2-Jahres-Garantie für alle Arbeiten und Anwendungen. Die Herstellergarantie gilt auch für die von uns verwendeten A-Klasse-Materialien (Vitra, Kütahya, Eca, Jotun). Probleme, die unter die Garantie fallen, werden innerhalb von 48 Stunden vor Ort bewertet. Die Garantiebedingungen sind im Vertrag klar angegeben.",
    },
    {
      soru: "Ist die Immobilienberatung kostenpflichtig?",
      cevap:
        "Die Beratung für Wohnungssuchende ist völlig kostenlos. Bei Verkaufsabschluss werden 2% des Verkaufspreises und bei Mietgeschäften 1 Monatsmiete als Provision berechnet. Alle Gebühren werden vor der Transaktion schriftlich mitgeteilt, es gibt keine versteckten Kosten. Wenn die Transaktion nicht stattfindet, erheben wir keine Gebühr.",
    },
    {
      soru: "Welche Gebiete von Muğla bedienen Sie?",
      cevap:
        "Wir haben ein aktives Portfolio in Ortaca, Dalyan, Köyceğiz, Dalaman, Fethiye, Marmaris, Bodrum, Milas, Datça und ganz Muğla. Die Entfernung spielt für die Vor-Ort-Besichtigung keine Rolle. Als Team mit 4 Jahren Erfahrung in der Region verfolgen wir den lokalen Markt, die Zonierungsbedingungen und Investitionspotenziale genau.",
    },
  ],
  ru: [
    {
      soru: "Какие документы необходимы для покупки дома в Ортаке?",
      cevap:
        "Для граждан Турции достаточно копии удостоверения личности, налогового номера и справки о месте жительства. Иностранным покупателям необходимо одобрение кадастровой палаты, перевод паспорта и потенциальный налоговый номер. Наша команда, выполнившая более 200 сделок купли-продажи с 2022 года, бесплатно ведет все ваши документы.",
    },
    {
      soru: "Какие цены за м² в Ортаке и Даляне в 2026 году?",
      cevap:
        "Цены за м² жилья в центре Ортака составляют 25 000-40 000 ₺, участки под виллы в Даляне - 35 000-60 000 ₺/м². Районы вокруг озера Кёйджеиз и с видом на канал Далян растут в цене. С нашей бесплатной услугой оценки недвижимости вы можете узнать текущую рыночную стоимость вашей собственности.",
    },
    {
      soru: "Предоставляете ли вы письменные договоры для проектов ремонта?",
      cevap:
        "Да, для каждого проекта мы готовим письменный договор, включающий объем работ, даты начала и окончания, список материалов, план платежей и условия гарантии. В наших более чем 100 завершенных проектах ремонта не было неожиданных счетов. В соответствии с нашим принципом прозрачности все изменения вносятся с вашего письменного согласия.",
    },
    {
      soru: "Предоставляете ли вы гарантию на строительные и ремонтные работы?",
      cevap:
        "Мы предлагаем 2-летнюю гарантию на все работы и применение. Гарантия производителя также распространяется на используемые нами материалы класса А (Vitra, Kütahya, Eca, Jotun). Проблемы, покрываемые гарантией, оцениваются на месте в течение 48 часов. Условия гарантии четко указаны в договоре.",
    },
    {
      soru: "Платная ли услуга консультирования по недвижимости?",
      cevap:
        "Консультирование для ищущих жилье полностью бесплатно. При завершении продажи взимается комиссия в размере 2% от цены продажи, а при аренде - 1 месячная арендная плата. Все сборы сообщаются в письменной форме до сделки, скрытых расходов нет. Если сделка не состоится, мы не взимаем плату.",
    },
    {
      soru: "Какие районы Муглы вы обслуживаете?",
      cevap:
        "У нас есть активный портфель в Ортаке, Даляне, Кёйджеизе, Даламане, Фетхие, Мармарисе, Бодруме, Милас, Датче и по всей Мугле. Расстояние не имеет значения для осмотра на месте. Как команда с 4-летним опытом работы в регионе, мы внимательно следим за местным рынком, условиями зонирования и инвестиционным потенциалом.",
    },
  ],
};
