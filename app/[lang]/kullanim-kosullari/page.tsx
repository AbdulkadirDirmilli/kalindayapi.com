import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description: "Kalinda Yapı web sitesi kullanım koşulları ve şartları.",
  alternates: {
    canonical: "https://www.kalindayapi.com/kullanim-kosullari",
  },
};

export default function KullanimKosullariPage() {
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
            <span className="text-[#C9A84C]">Kullanim Kosullari</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/20 flex items-center justify-center">
              <FileText className="w-8 h-8 text-[#C9A84C]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Kullanim Kosullari
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
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">1. Kabul</h2>
              <p className="text-[#666666] mb-6">
                Bu web sitesini kullanarak, asagidaki kullanim kosullarini kabul etmis
                sayilirsiniz. Bu kosullari kabul etmiyorsaniz, lutfen siteyi kullanmayiniz.
              </p>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">2. Hizmet Tanimi</h2>
              <p className="text-[#666666] mb-6">
                Kalinda Yapi, emlak danismanligi, insaat ve tadilat hizmetleri sunan bir
                sirketir. Web sitemiz, hizmetlerimiz hakkinda bilgi vermek ve potansiyel
                musterilerle iletisim kurmak amaciyla kullanilmaktadir.
              </p>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">3. İlan Bilgileri</h2>
              <p className="text-[#666666] mb-6">
                Web sitemizde yayınlanan emlak ilanları bilgi amaçlıdır. İlan bilgilerinin
                dogruluğu ve guncelligini saglamak icin caba gostermekteyiz, ancak bilgilerin
                eksiksiz veya hatasiz olacagini garanti etmemekteyiz. Kesin bilgi icin
                lutfen bizimle iletisime gecin.
              </p>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">4. Fikri Mulkiyet</h2>
              <p className="text-[#666666] mb-6">
                Bu web sitesindeki tum icerik, tasarim, logolar ve gorseller Kalinda Yapi'ya
                aittir veya lisanslidir. Izinsiz kopyalama, dagitma veya kullanim yasaktir.
              </p>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">5. Sorumluluk Sinirlamasi</h2>
              <p className="text-[#666666] mb-6">
                Kalinda Yapi, web sitesinin kullanimi sonucu ortaya cikabilecek dogrudan
                veya dolayli zararlardan sorumlu tutulamaz. Web sitesi "oldugu gibi"
                sunulmaktadir.
              </p>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">6. Ucuncu Taraf Baglantilari</h2>
              <p className="text-[#666666] mb-6">
                Web sitemiz ucuncu taraf web sitelerine baglantilar icerebilir. Bu sitelerin
                icerigi veya gizlilik uygulamalari uzerinde kontrolumuz yoktur.
              </p>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">7. Degisiklikler</h2>
              <p className="text-[#666666] mb-6">
                Bu kullanim kosullarini onceden haber vermeksizin degistirme hakkini sakli
                tutariz. Degisiklikler web sitesinde yayinlandigi anda yururluge girer.
              </p>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">8. Uygulanacak Hukuk</h2>
              <p className="text-[#666666] mb-6">
                Bu kullanim kosullari Turkiye Cumhuriyeti yasalarina tabidir. Herhangi bir
                uyusmazlik durumunda Mugla Mahkemeleri yetkilidir.
              </p>

              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">9. Iletisim</h2>
              <p className="text-[#666666] mb-6">
                Kullanim kosullari hakkinda sorulariniz varsa, asagidaki iletisim
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
