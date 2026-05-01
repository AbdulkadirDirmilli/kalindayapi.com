import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, FileText } from "lucide-react";
import { buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n";

const texts = {
  tr: {
    breadcrumb: "Kullanım Koşulları",
    title: "Kullanım Koşulları",
    lastUpdate: "Son güncelleme: 28 Mart 2026",
    sections: [
      {
        title: "1. Kabul",
        content: "Bu web sitesini kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız, lütfen siteyi kullanmayınız.",
      },
      {
        title: "2. Hizmet Tanımı",
        content: "Kalinda Yapı, emlak danışmanlığı, inşaat ve tadilat hizmetleri sunan bir şirkettir. Web sitemiz, hizmetlerimiz hakkında bilgi vermek ve potansiyel müşterilerle iletişim kurmak amacıyla kullanılmaktadır.",
      },
      {
        title: "3. İlan Bilgileri",
        content: "Web sitemizde yayınlanan emlak ilanları bilgi amaçlıdır. İlan bilgilerinin doğruluğu ve güncelliğini sağlamak için çaba göstermekteyiz, ancak bilgilerin eksiksiz veya hatasız olacağını garanti etmemekteyiz. Kesin bilgi için lütfen bizimle iletişime geçin.",
      },
      {
        title: "4. Fikri Mülkiyet",
        content: "Bu web sitesindeki tüm içerik, tasarım, logolar ve görseller Kalinda Yapı'ya aittir veya lisanslıdır. İzinsiz kopyalama, dağıtma veya kullanım yasaktır.",
      },
      {
        title: "5. Sorumluluk Sınırlaması",
        content: "Kalinda Yapı, web sitesinin kullanımı sonucu ortaya çıkabilecek doğrudan veya dolaylı zararlardan sorumlu tutulamaz. Web sitesi \"olduğu gibi\" sunulmaktadır.",
      },
      {
        title: "6. Üçüncü Taraf Bağlantıları",
        content: "Web sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin içeriği veya gizlilik uygulamaları üzerinde kontrolümüz yoktur.",
      },
      {
        title: "7. Değişiklikler",
        content: "Bu kullanım koşullarını önceden haber vermeksizin değiştirme hakkını saklı tutarız. Değişiklikler web sitesinde yayınlandığı anda yürürlüğe girer.",
      },
      {
        title: "8. Uygulanacak Hukuk",
        content: "Bu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir. Herhangi bir uyuşmazlık durumunda Muğla Mahkemeleri yetkilidir.",
      },
      {
        title: "9. İletişim",
        content: "Kullanım koşulları hakkında sorularınız varsa, aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz:",
      },
    ],
  },
  en: {
    breadcrumb: "Terms of Use",
    title: "Terms of Use",
    lastUpdate: "Last updated: March 28, 2026",
    sections: [
      {
        title: "1. Acceptance",
        content: "By using this website, you are deemed to have accepted the following terms of use. If you do not accept these terms, please do not use the site.",
      },
      {
        title: "2. Service Description",
        content: "Kalinda Yapı is a company offering real estate consultancy, construction, and renovation services. Our website is used to provide information about our services and to communicate with potential customers.",
      },
      {
        title: "3. Listing Information",
        content: "Real estate listings published on our website are for informational purposes. We strive to ensure the accuracy and timeliness of listing information, but we do not guarantee that the information is complete or error-free. Please contact us for definitive information.",
      },
      {
        title: "4. Intellectual Property",
        content: "All content, designs, logos, and images on this website are owned by or licensed to Kalinda Yapı. Unauthorized copying, distribution, or use is prohibited.",
      },
      {
        title: "5. Limitation of Liability",
        content: "Kalinda Yapı cannot be held responsible for direct or indirect damages that may arise from the use of the website. The website is provided \"as is\".",
      },
      {
        title: "6. Third-Party Links",
        content: "Our website may contain links to third-party websites. We have no control over the content or privacy practices of these sites.",
      },
      {
        title: "7. Changes",
        content: "We reserve the right to change these terms of use without prior notice. Changes take effect as soon as they are published on the website.",
      },
      {
        title: "8. Applicable Law",
        content: "These terms of use are subject to the laws of the Republic of Turkey. In case of any dispute, Muğla Courts have jurisdiction.",
      },
      {
        title: "9. Contact",
        content: "If you have questions about the terms of use, you can reach us at the following contact information:",
      },
    ],
  },
  ar: {
    breadcrumb: "شروط الاستخدام",
    title: "شروط الاستخدام",
    lastUpdate: "آخر تحديث: 28 مارس 2026",
    sections: [
      {
        title: "1. القبول",
        content: "باستخدام هذا الموقع، يُعتبر أنك قد قبلت شروط الاستخدام التالية. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام الموقع.",
      },
      {
        title: "2. وصف الخدمة",
        content: "كاليندا يابي هي شركة تقدم خدمات الاستشارات العقارية والبناء والتجديد. يُستخدم موقعنا الإلكتروني لتقديم معلومات حول خدماتنا والتواصل مع العملاء المحتملين.",
      },
      {
        title: "3. معلومات القوائم",
        content: "القوائم العقارية المنشورة على موقعنا هي لأغراض إعلامية. نسعى لضمان دقة وحداثة معلومات القوائم، لكننا لا نضمن أن المعلومات كاملة أو خالية من الأخطاء. يرجى الاتصال بنا للحصول على معلومات نهائية.",
      },
      {
        title: "4. الملكية الفكرية",
        content: "جميع المحتويات والتصميمات والشعارات والصور الموجودة على هذا الموقع مملوكة أو مرخصة لشركة كاليندا يابي. يُحظر النسخ أو التوزيع أو الاستخدام غير المصرح به.",
      },
      {
        title: "5. تحديد المسؤولية",
        content: "لا يمكن تحميل كاليندا يابي المسؤولية عن الأضرار المباشرة أو غير المباشرة التي قد تنشأ عن استخدام الموقع. يتم تقديم الموقع \"كما هو\".",
      },
      {
        title: "6. روابط الطرف الثالث",
        content: "قد يحتوي موقعنا على روابط لمواقع ويب تابعة لجهات خارجية. ليس لدينا سيطرة على محتوى أو ممارسات الخصوصية لهذه المواقع.",
      },
      {
        title: "7. التغييرات",
        content: "نحتفظ بالحق في تغيير شروط الاستخدام هذه دون إشعار مسبق. تدخل التغييرات حيز التنفيذ بمجرد نشرها على الموقع.",
      },
      {
        title: "8. القانون المعمول به",
        content: "تخضع شروط الاستخدام هذه لقوانين جمهورية تركيا. في حالة أي نزاع، تكون محاكم موغلا هي المختصة.",
      },
      {
        title: "9. الاتصال",
        content: "إذا كانت لديك أسئلة حول شروط الاستخدام، يمكنك الاتصال بنا على معلومات الاتصال التالية:",
      },
    ],
  },
  de: {
    breadcrumb: "Nutzungsbedingungen",
    title: "Nutzungsbedingungen",
    lastUpdate: "Letzte Aktualisierung: 28. März 2026",
    sections: [
      {
        title: "1. Akzeptanz",
        content: "Durch die Nutzung dieser Website akzeptieren Sie die folgenden Nutzungsbedingungen. Wenn Sie diese Bedingungen nicht akzeptieren, nutzen Sie die Website bitte nicht.",
      },
      {
        title: "2. Servicebeschreibung",
        content: "Kalinda Yapı ist ein Unternehmen, das Immobilienberatung, Bau- und Renovierungsdienstleistungen anbietet. Unsere Website dient der Information über unsere Dienstleistungen und der Kommunikation mit potenziellen Kunden.",
      },
      {
        title: "3. Anzeigeninformationen",
        content: "Die auf unserer Website veröffentlichten Immobilienanzeigen dienen Informationszwecken. Wir bemühen uns, die Genauigkeit und Aktualität der Anzeigeninformationen sicherzustellen, garantieren jedoch nicht, dass die Informationen vollständig oder fehlerfrei sind. Bitte kontaktieren Sie uns für verbindliche Informationen.",
      },
      {
        title: "4. Geistiges Eigentum",
        content: "Alle Inhalte, Designs, Logos und Bilder auf dieser Website sind Eigentum von Kalinda Yapı oder lizenziert. Unbefugtes Kopieren, Verteilen oder Verwenden ist untersagt.",
      },
      {
        title: "5. Haftungsbeschränkung",
        content: "Kalinda Yapı kann nicht für direkte oder indirekte Schäden haftbar gemacht werden, die aus der Nutzung der Website entstehen können. Die Website wird \"wie besehen\" bereitgestellt.",
      },
      {
        title: "6. Links zu Drittanbietern",
        content: "Unsere Website kann Links zu Websites Dritter enthalten. Wir haben keine Kontrolle über den Inhalt oder die Datenschutzpraktiken dieser Websites.",
      },
      {
        title: "7. Änderungen",
        content: "Wir behalten uns das Recht vor, diese Nutzungsbedingungen ohne vorherige Ankündigung zu ändern. Änderungen treten in Kraft, sobald sie auf der Website veröffentlicht werden.",
      },
      {
        title: "8. Anwendbares Recht",
        content: "Diese Nutzungsbedingungen unterliegen den Gesetzen der Republik Türkei. Im Falle von Streitigkeiten sind die Gerichte von Muğla zuständig.",
      },
      {
        title: "9. Kontakt",
        content: "Wenn Sie Fragen zu den Nutzungsbedingungen haben, können Sie uns über die folgenden Kontaktdaten erreichen:",
      },
    ],
  },
  ru: {
    breadcrumb: "Условия использования",
    title: "Условия использования",
    lastUpdate: "Последнее обновление: 28 марта 2026",
    sections: [
      {
        title: "1. Принятие условий",
        content: "Используя этот веб-сайт, вы принимаете следующие условия использования. Если вы не принимаете эти условия, пожалуйста, не используйте сайт.",
      },
      {
        title: "2. Описание услуг",
        content: "Kalinda Yapı - это компания, предоставляющая услуги консультирования по недвижимости, строительства и ремонта. Наш веб-сайт используется для предоставления информации о наших услугах и для связи с потенциальными клиентами.",
      },
      {
        title: "3. Информация об объявлениях",
        content: "Объявления о недвижимости, размещенные на нашем сайте, носят информационный характер. Мы стремимся обеспечить точность и актуальность информации в объявлениях, но не гарантируем, что информация является полной или безошибочной. Для получения точной информации, пожалуйста, свяжитесь с нами.",
      },
      {
        title: "4. Интеллектуальная собственность",
        content: "Весь контент, дизайн, логотипы и изображения на этом веб-сайте принадлежат или лицензированы Kalinda Yapı. Несанкционированное копирование, распространение или использование запрещено.",
      },
      {
        title: "5. Ограничение ответственности",
        content: "Kalinda Yapı не несет ответственности за прямые или косвенные убытки, которые могут возникнуть в результате использования веб-сайта. Веб-сайт предоставляется \"как есть\".",
      },
      {
        title: "6. Ссылки на сторонние ресурсы",
        content: "Наш веб-сайт может содержать ссылки на сторонние веб-сайты. Мы не контролируем содержание или политику конфиденциальности этих сайтов.",
      },
      {
        title: "7. Изменения",
        content: "Мы оставляем за собой право изменять эти условия использования без предварительного уведомления. Изменения вступают в силу с момента их публикации на веб-сайте.",
      },
      {
        title: "8. Применимое право",
        content: "Настоящие условия использования регулируются законодательством Турецкой Республики. В случае возникновения споров компетентными являются суды Мугла.",
      },
      {
        title: "9. Контакты",
        content: "Если у вас есть вопросы об условиях использования, вы можете связаться с нами по следующим контактным данным:",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getCachedDictionary(locale);
  return {
    title: dict.footer.terms,
    description: dict.meta.description,
    alternates: buildSeoAlternates("/kullanim-kosullari", locale),
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function KullanimKosullariPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolveLocale(lang) as Locale;
  const t = texts[locale];

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href={`/${locale}`} className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">{t.breadcrumb}</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/20 flex items-center justify-center">
              <FileText className="w-8 h-8 text-[#C9A84C]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {t.title}
              </h1>
              <p className="text-gray-400 mt-2">
                {t.lastUpdate}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {t.sections.map((section, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">{section.title}</h2>
                  <p className="text-[#666666] mb-4">{section.content}</p>
                </div>
              ))}

              <div className="bg-[#F5F5F5] rounded-xl p-6">
                <p className="text-[#0B1F3A] font-semibold">Kalinda Yapı</p>
                <p className="text-[#666666]">Atatürk Mah. 58 Sk. No: 2/B</p>
                <p className="text-[#666666]">Ortaca / Muğla</p>
                <p className="text-[#666666]">Tel: +90 537 053 07 54</p>
                <p className="text-[#666666]">E-posta: info@kalindayapi.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
