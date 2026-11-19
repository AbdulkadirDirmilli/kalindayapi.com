import { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, MapPin, Phone, MessageCircle, Building2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DanismanAvatar, type Cinsiyet } from "@/components/ui";
import { danismanlarTexts } from "@/data/danismanlar-i18n";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale } from "@/lib/seo";
import { createWhatsAppLink } from "@/lib/utils";
import { getLocalizedRoute } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const t = danismanlarTexts[locale];
  const url = buildLocalizedUrl("/danismanlar", locale);

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    openGraph: { title: t.metaTitle, description: t.metaDescription, url },
    alternates: buildSeoAlternates("/danismanlar", locale),
  };
}

/** '["Ortaca","Dalyan"]' -> ["Ortaca","Dalyan"] */
function jsonDizi(deger: string | null | undefined): string[] {
  if (!deger) return [];
  try {
    const p = JSON.parse(deger);
    return Array.isArray(p) ? p.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** ["Ortaca","Dalyan","Dalaman"] -> "Ortaca, Dalyan ve Dalaman" */
function bolgeMetni(bolgeler: string[], baglac: string): string {
  if (bolgeler.length <= 1) return bolgeler[0] ?? "";
  return `${bolgeler.slice(0, -1).join(", ")} ${baglac} ${bolgeler[bolgeler.length - 1]}`;
}

export default async function DanismanlarPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const t = danismanlarTexts[locale];
  const baglac = locale === "tr" ? "ve" : locale === "de" ? "und" : locale === "ru" ? "и" : locale === "ar" ? "و" : "and";

  const danismanlar = await prisma.ortak.findMany({
    where: { aktif: true },
    orderBy: { sira: "asc" },
    select: {
      id: true, slug: true, ad: true, unvan: true, telefon: true, whatsapp: true,
      email: true, foto: true, cinsiyet: true, deneyimYili: true, bolgeler: true,
      _count: { select: { ilanlar: { where: { durum: "aktif" } } } },
    },
  });

  const iletisimYolu = `/${locale}/${getLocalizedRoute("iletisim", locale)}`;

  return (
    <>
      {/* Sayfa basligi */}
      <section className="bg-primary pt-14 pb-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href={`/${locale}`} className="hover:text-carolina transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-carolina">{t.breadcrumb}</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t.heroTitle} <span className="text-carolina">{t.heroTitleHighlight}</span>
          </h1>
          <p className="text-white/85 text-lg max-w-3xl">{t.heroDescription}</p>
        </div>
      </section>

      {/* Danisman kartlari */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          {danismanlar.length === 0 ? (
            <p className="text-center text-text-light py-12">{t.empty}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {danismanlar.map((d) => {
                const bolgeler = jsonDizi(d.bolgeler);
                return (
                  <div
                    key={d.id}
                    className="bg-white rounded-xl border border-border p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <DanismanAvatar
                      foto={d.foto}
                      cinsiyet={d.cinsiyet as Cinsiyet}
                      ad={d.ad}
                      size={112}
                      className="border-2 border-border"
                    />

                    <h2 className="mt-4 text-lg font-bold text-ink">{d.ad}</h2>
                    <p className="text-sm text-primary font-medium mt-0.5">{d.unvan}</p>

                    {bolgeler.length > 0 && (
                      <p className="mt-3 text-sm text-text-light inline-flex items-start gap-1.5">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{bolgeMetni(bolgeler, baglac)}</span>
                      </p>
                    )}

                    <p className="mt-3 text-xs text-text-muted inline-flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      <span className="tabular-nums">
                        {d._count.ilanlar} {t.activeListings}
                      </span>
                      {typeof d.deneyimYili === "number" && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">
                            {d.deneyimYili} {t.experience}
                          </span>
                        </>
                      )}
                    </p>

                    <div className="mt-5 flex items-center gap-2 w-full">
                      <a
                        href={`tel:${d.telefon.replace(/\s/g, "")}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {t.call}
                      </a>
                      {d.whatsapp && (
                        <a
                          href={createWhatsAppLink(d.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-whatsapp text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          <MessageCircle className="w-4 h-4" />
                          {t.whatsapp}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Ekibe katilma CTA */}
      <section className="py-14 bg-white border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-ink">{t.ctaTitle}</h2>
          <p className="text-text-light mt-3">{t.ctaDescription}</p>
          <Link
            href={iletisimYolu}
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent-dark transition-colors"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
