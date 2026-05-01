import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Shield } from "lucide-react";
import { buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n";

const texts = {
  tr: {
    breadcrumb: "Gizlilik Politikası",
    title: "Gizlilik Politikası",
    lastUpdate: "Son güncelleme: 28 Mart 2026",
    sections: [
      {
        title: "1. Giriş",
        content: "Kalinda Yapı olarak, web sitemizi ziyaret eden kullanıcıların gizliliğine önem veriyoruz. Bu gizlilik politikası, kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi vermektedir.",
      },
      {
        title: "2. Toplanan Bilgiler",
        content: "Web sitemizi kullandığınızda aşağıdaki bilgiler toplanabilir:",
        list: [
          "İletişim formu aracılığıyla gönderilen ad, e-posta ve telefon bilgileri",
          "IP adresi ve tarayıcı bilgileri",
          "Çerezler aracılığıyla toplanan kullanım verileri",
        ],
      },
      {
        title: "3. Bilgilerin Kullanımı",
        content: "Toplanan bilgiler aşağıdaki amaçlarla kullanılmaktadır:",
        list: [
          "Müşteri taleplerine yanıt vermek",
          "Hizmet kalitesini iyileştirmek",
          "Yasal yükümlülükleri yerine getirmek",
        ],
      },
      {
        title: "4. Bilgi Güvenliği",
        content: "Kişisel verilerinizin güvenliğini sağlamak için uygun teknik ve organizasyonel önlemler alınmaktadır. Verileriniz yetkisiz erişme, değiştirme veya ifşa edilmeye karşı korunmaktadır.",
      },
      {
        title: "5. Çerezler",
        content: "Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda bazı özellikler düzgün çalışmayabilir.",
      },
      {
        title: "6. Üçüncü Taraf Bağlantıları",
        content: "Web sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin gizlilik uygulamaları üzerinde kontrolümüz bulunmamaktadır ve bu nedenle sorumluluk kabul etmemekteyiz.",
      },
      {
        title: "7. İletişim",
        content: "Gizlilik politikamız hakkında sorularınız varsa, aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz:",
      },
    ],
  },
  en: {
    breadcrumb: "Privacy Policy",
    title: "Privacy Policy",
    lastUpdate: "Last updated: March 28, 2026",
    sections: [
      {
        title: "1. Introduction",
        content: "At Kalinda Yapı, we value the privacy of visitors to our website. This privacy policy provides information about how your personal data is collected, used, and protected.",
      },
      {
        title: "2. Information Collected",
        content: "The following information may be collected when you use our website:",
        list: [
          "Name, email, and phone information submitted through the contact form",
          "IP address and browser information",
          "Usage data collected through cookies",
        ],
      },
      {
        title: "3. Use of Information",
        content: "The collected information is used for the following purposes:",
        list: [
          "Responding to customer inquiries",
          "Improving service quality",
          "Fulfilling legal obligations",
        ],
      },
      {
        title: "4. Information Security",
        content: "Appropriate technical and organizational measures are taken to ensure the security of your personal data. Your data is protected against unauthorized access, modification, or disclosure.",
      },
      {
        title: "5. Cookies",
        content: "Our website uses cookies to improve user experience. You can disable cookies from your browser settings, but some features may not work properly in this case.",
      },
      {
        title: "6. Third-Party Links",
        content: "Our website may contain links to third-party websites. We have no control over the privacy practices of these sites and therefore accept no responsibility.",
      },
      {
        title: "7. Contact",
        content: "If you have questions about our privacy policy, you can reach us at the following contact information:",
      },
    ],
  },
  ar: {
    breadcrumb: "سياسة الخصوصية",
    title: "سياسة الخصوصية",
    lastUpdate: "آخر تحديث: 28 مارس 2026",
    sections: [
      {
        title: "1. مقدمة",
        content: "في كاليندا يابي، نقدر خصوصية زوار موقعنا الإلكتروني. توفر سياسة الخصوصية هذه معلومات حول كيفية جمع بياناتك الشخصية واستخدامها وحمايتها.",
      },
      {
        title: "2. المعلومات المجمعة",
        content: "قد يتم جمع المعلومات التالية عند استخدامك لموقعنا:",
        list: [
          "الاسم والبريد الإلكتروني ومعلومات الهاتف المرسلة عبر نموذج الاتصال",
          "عنوان IP ومعلومات المتصفح",
          "بيانات الاستخدام المجمعة من خلال ملفات تعريف الارتباط",
        ],
      },
      {
        title: "3. استخدام المعلومات",
        content: "تُستخدم المعلومات المجمعة للأغراض التالية:",
        list: [
          "الرد على استفسارات العملاء",
          "تحسين جودة الخدمة",
          "الوفاء بالالتزامات القانونية",
        ],
      },
      {
        title: "4. أمن المعلومات",
        content: "يتم اتخاذ التدابير التقنية والتنظيمية المناسبة لضمان أمان بياناتك الشخصية. بياناتك محمية ضد الوصول غير المصرح به أو التعديل أو الكشف.",
      },
      {
        title: "5. ملفات تعريف الارتباط",
        content: "يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة المستخدم. يمكنك تعطيل ملفات تعريف الارتباط من إعدادات المتصفح، ولكن قد لا تعمل بعض الميزات بشكل صحيح في هذه الحالة.",
      },
      {
        title: "6. روابط الطرف الثالث",
        content: "قد يحتوي موقعنا على روابط لمواقع ويب تابعة لجهات خارجية. ليس لدينا سيطرة على ممارسات الخصوصية لهذه المواقع وبالتالي لا نتحمل أي مسؤولية.",
      },
      {
        title: "7. الاتصال",
        content: "إذا كانت لديك أسئلة حول سياسة الخصوصية الخاصة بنا، يمكنك الاتصال بنا على معلومات الاتصال التالية:",
      },
    ],
  },
  de: {
    breadcrumb: "Datenschutzrichtlinie",
    title: "Datenschutzrichtlinie",
    lastUpdate: "Letzte Aktualisierung: 28. März 2026",
    sections: [
      {
        title: "1. Einleitung",
        content: "Bei Kalinda Yapı legen wir großen Wert auf die Privatsphäre der Besucher unserer Website. Diese Datenschutzrichtlinie informiert darüber, wie Ihre personenbezogenen Daten erfasst, verwendet und geschützt werden.",
      },
      {
        title: "2. Erfasste Informationen",
        content: "Folgende Informationen können bei der Nutzung unserer Website erfasst werden:",
        list: [
          "Name, E-Mail und Telefonnummer, die über das Kontaktformular übermittelt werden",
          "IP-Adresse und Browser-Informationen",
          "Nutzungsdaten, die durch Cookies erfasst werden",
        ],
      },
      {
        title: "3. Verwendung der Informationen",
        content: "Die erfassten Informationen werden für folgende Zwecke verwendet:",
        list: [
          "Beantwortung von Kundenanfragen",
          "Verbesserung der Servicequalität",
          "Erfüllung gesetzlicher Verpflichtungen",
        ],
      },
      {
        title: "4. Informationssicherheit",
        content: "Geeignete technische und organisatorische Maßnahmen werden ergriffen, um die Sicherheit Ihrer personenbezogenen Daten zu gewährleisten. Ihre Daten sind vor unbefugtem Zugriff, Änderung oder Offenlegung geschützt.",
      },
      {
        title: "5. Cookies",
        content: "Unsere Website verwendet Cookies, um die Benutzererfahrung zu verbessern. Sie können Cookies in Ihren Browsereinstellungen deaktivieren, jedoch funktionieren einige Funktionen möglicherweise nicht ordnungsgemäß.",
      },
      {
        title: "6. Links zu Drittanbietern",
        content: "Unsere Website kann Links zu Websites Dritter enthalten. Wir haben keine Kontrolle über die Datenschutzpraktiken dieser Websites und übernehmen daher keine Verantwortung.",
      },
      {
        title: "7. Kontakt",
        content: "Wenn Sie Fragen zu unserer Datenschutzrichtlinie haben, können Sie uns über die folgenden Kontaktdaten erreichen:",
      },
    ],
  },
  ru: {
    breadcrumb: "Политика конфиденциальности",
    title: "Политика конфиденциальности",
    lastUpdate: "Последнее обновление: 28 марта 2026",
    sections: [
      {
        title: "1. Введение",
        content: "В Kalinda Yapı мы ценим конфиденциальность посетителей нашего сайта. Настоящая политика конфиденциальности предоставляет информацию о том, как собираются, используются и защищаются ваши персональные данные.",
      },
      {
        title: "2. Собираемая информация",
        content: "При использовании нашего сайта может собираться следующая информация:",
        list: [
          "Имя, электронная почта и номер телефона, отправленные через контактную форму",
          "IP-адрес и информация о браузере",
          "Данные об использовании, собранные с помощью файлов cookie",
        ],
      },
      {
        title: "3. Использование информации",
        content: "Собранная информация используется для следующих целей:",
        list: [
          "Ответы на запросы клиентов",
          "Улучшение качества обслуживания",
          "Выполнение юридических обязательств",
        ],
      },
      {
        title: "4. Безопасность информации",
        content: "Принимаются соответствующие технические и организационные меры для обеспечения безопасности ваших персональных данных. Ваши данные защищены от несанкционированного доступа, изменения или раскрытия.",
      },
      {
        title: "5. Файлы cookie",
        content: "Наш сайт использует файлы cookie для улучшения пользовательского опыта. Вы можете отключить файлы cookie в настройках браузера, но некоторые функции могут работать некорректно.",
      },
      {
        title: "6. Ссылки на сторонние ресурсы",
        content: "Наш сайт может содержать ссылки на сторонние веб-сайты. Мы не контролируем практики конфиденциальности этих сайтов и поэтому не несем ответственности.",
      },
      {
        title: "7. Контакты",
        content: "Если у вас есть вопросы о нашей политике конфиденциальности, вы можете связаться с нами по следующим контактным данным:",
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
    title: dict.footer.privacy,
    description: dict.meta.description,
    alternates: buildSeoAlternates("/gizlilik", locale),
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function GizlilikPage({
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
              <Shield className="w-8 h-8 text-[#C9A84C]" />
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
                  {section.list && (
                    <ul className="list-disc list-inside text-[#666666] mb-6 space-y-2">
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
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
