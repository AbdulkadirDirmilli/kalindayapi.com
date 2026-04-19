import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Shield } from "lucide-react";
import { buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { getCachedDictionary } from "@/lib/i18n/getDictionary";

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

export default function GizlilikPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">Gizlilik Politikasi</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#C9A84C]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Gizlilik Politikasi
              </h1>
              <p className="text-gray-400 mt-2">
                Son guncelleme: 28 Mart 2026
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
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">1. Giriş</h2>
              <p className="text-[#666666] mb-6">
                Kalinda Yapi olarak, web sitemizi ziyaret eden kullanicilarin gizliligine onem veriyoruz.
                Bu gizlilik politikasi, kisisel verilerinizin nasil toplandigi, kullanildigi ve
                korunduğu hakkinda bilgi vermektedir.
              </p>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">2. Toplanan Bilgiler</h2>
              <p className="text-[#666666] mb-4">
                Web sitemizi kullandiginizda asagidaki bilgiler toplanabilir:
              </p>
              <ul className="list-disc list-inside text-[#666666] mb-6 space-y-2">
                <li>İletişim formu aracılığıyla gönderilen ad, e-posta ve telefon bilgileri</li>
                <li>IP adresi ve tarayici bilgileri</li>
                <li>Cerezler araciligiyla toplanan kullanim verileri</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">3. Bilgilerin Kullanimi</h2>
              <p className="text-[#666666] mb-4">
                Toplanan bilgiler asagidaki amaclarla kullanilmaktadir:
              </p>
              <ul className="list-disc list-inside text-[#666666] mb-6 space-y-2">
                <li>Musteri taleplerine yanit vermek</li>
                <li>Hizmet kalitesini iyilestirmek</li>
                <li>Yasal yukumlulukleri yerine getirmek</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">4. Bilgi Guvenligi</h2>
              <p className="text-[#666666] mb-6">
                Kisisel verilerinizin guvenligini saglamak icin uygun teknik ve organizasyonel
                onlemler alinmaktadir. Verileriniz yetkisiz erisme, degistirme veya ifsa
                edilmeye karsi korunmaktadir.
              </p>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">5. Cerezler</h2>
              <p className="text-[#666666] mb-6">
                Web sitemiz, kullanici deneyimini iyilestirmek icin cerezler kullanmaktadir.
                Tarayici ayarlarinizdan cerezleri devre disi birakabilirsiniz, ancak bu
                durumda bazi ozellikler duzgun calismayabilir.
              </p>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">6. Ucuncu Taraf Baglantilari</h2>
              <p className="text-[#666666] mb-6">
                Web sitemiz ucuncu taraf web sitelerine baglantilar icerebilir. Bu sitelerin
                gizlilik uygulamalari uzerinde kontrolumuz bulunmamaktadir ve bu nedenle
                sorumluluk kabul etmemekteyiz.
              </p>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">7. İletişim</h2>
              <p className="text-[#666666] mb-6">
                Gizlilik politikamiz hakkinda sorulariniz varsa, asagidaki iletisim
                bilgilerinden bize ulasabilirsiniz:
              </p>
              <div className="bg-[#F5F5F5] rounded-xl p-6">
                <p className="text-[#0B1F3A] font-semibold">Kalinda Yapi</p>
                <p className="text-[#666666]">Ataturk Mah. 58 Sk. No: 2/B</p>
                <p className="text-[#666666]">Ortaca / Mugla</p>
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
