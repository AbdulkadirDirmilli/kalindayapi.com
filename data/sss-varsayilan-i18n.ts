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
      soru: "Satış ve kiralama işlemlerinde yazılı sözleşme yapıyor musunuz?",
      cevap:
        "Evet, her işlemde tarafların yükümlülükleri, ödeme planı, teslim tarihi ve komisyon oranını içeren yazılı sözleşme düzenliyoruz. Kaparo karşılığında makbuz verilir. Şeffaflık ilkemiz gereği tüm değişiklikler yazılı onayınızla yapılır.",
    },
    {
      soru: "İlanlardaki bilgilerin doğruluğunu nasıl güvence altına alıyorsunuz?",
      cevap:
        "Listelediğimiz her gayrimenkulü satışa sunmadan önce yerinde görüyor, tapu kaydını ve imar durumunu kontrol ediyoruz. Metrekare, kat, ısıtma, aidat ve iskan bilgileri mülk sahibinden alınan belgeyle doğrulanır. Doğrulayamadığımız bilgiyi ilanda yayınlamıyoruz.",
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
      soru: "Do you provide written contracts for sales and rentals?",
      cevap:
        "Yes. Every transaction is covered by a written contract setting out each party's obligations, the payment plan, the handover date and the commission rate. Deposits are always receipted, and any change is made only with your written approval.",
    },
    {
      soru: "How do you guarantee the accuracy of listing information?",
      cevap:
        "We inspect every property on site before listing it and check its title deed and zoning status. Floor area, storey, heating, service charge and occupancy permit details are verified against the owner's documents. We do not publish information we cannot verify.",
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
      soru: "هل تقدمون عقوداً مكتوبة لعمليات البيع والتأجير؟",
      cevap:
        "نعم. كل معاملة يغطيها عقد مكتوب يحدد التزامات الطرفين وخطة الدفع وتاريخ التسليم ونسبة العمولة. يتم إصدار إيصال مقابل العربون، ولا يُجرى أي تعديل إلا بموافقتكم الخطية.",
    },
    {
      soru: "كيف تضمنون دقة المعلومات الواردة في الإعلانات؟",
      cevap:
        "نعاين كل عقار على الطبيعة قبل إدراجه ونتحقق من سند الملكية وحالة التنظيم العمراني. يتم التحقق من المساحة والطابق والتدفئة ورسوم الخدمات ورخصة الإشغال من وثائق المالك. ولا ننشر أي معلومة لا يمكننا التحقق منها.",
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
      soru: "Bieten Sie schriftliche Verträge für Verkauf und Vermietung an?",
      cevap:
        "Ja. Jede Transaktion wird durch einen schriftlichen Vertrag abgesichert, der die Pflichten beider Seiten, den Zahlungsplan, den Übergabetermin und die Provision festhält. Für Anzahlungen wird stets eine Quittung ausgestellt; Änderungen erfolgen nur mit Ihrer schriftlichen Zustimmung.",
    },
    {
      soru: "Wie stellen Sie die Richtigkeit der Angaben in den Inseraten sicher?",
      cevap:
        "Wir besichtigen jede Immobilie vor der Aufnahme vor Ort und prüfen Grundbuch und Bebauungsstatus. Wohnfläche, Etage, Heizung, Hausgeld und Nutzungsgenehmigung werden anhand der Unterlagen des Eigentümers verifiziert. Nicht überprüfbare Angaben veröffentlichen wir nicht.",
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
      soru: "Заключаете ли вы письменные договоры при продаже и аренде?",
      cevap:
        "Да. Каждая сделка оформляется письменным договором, в котором указаны обязательства сторон, план платежей, дата передачи и размер комиссии. На задаток всегда выдается расписка, а любые изменения вносятся только с вашего письменного согласия.",
    },
    {
      soru: "Как вы гарантируете достоверность информации в объявлениях?",
      cevap:
        "Мы лично осматриваем каждый объект до публикации и проверяем ТАПУ и градостроительный статус. Площадь, этаж, отопление, коммунальные взносы и разрешение на эксплуатацию сверяются с документами собственника. Информацию, которую невозможно проверить, мы не публикуем.",
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
