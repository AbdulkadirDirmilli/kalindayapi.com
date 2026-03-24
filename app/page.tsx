import {
  HeroSection,
  HizmetKartlari,
  OneCikanIlanlar,
  IstatistikSayaclari,
  ReferansGaleri,
  OrtaklarBolumu,
  NedenBiz,
  IletisimFormKisa,
  FaqSection,
} from "@/components/sections";
import { generateOrganizationSchema, generateWebSiteSchema, generateAISummary } from "@/lib/jsonld";

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      {/* AI Summary for GEO (hidden but crawlable) */}
      <section
        data-ai-summary="true"
        className="sr-only"
        aria-hidden="true"
      >
        {generateAISummary()}
      </section>

      {/* Hero Section */}
      <HeroSection />

      {/* Hizmet Kartları */}
      <HizmetKartlari />

      {/* Öne Çıkan İlanlar */}
      <OneCikanIlanlar />

      {/* İstatistik Sayaçları */}
      <IstatistikSayaclari />

      {/* Neden Biz */}
      <NedenBiz />

      {/* Referans Galeri */}
      <ReferansGaleri />

      {/* Ortaklar Bölümü */}
      <OrtaklarBolumu />

      {/* İletişim Formu */}
      <IletisimFormKisa />

      {/* SSS */}
      <FaqSection />
    </>
  );
}
