import { prisma } from "@/lib/prisma";
import { LandingPageConfig } from "./landing-pages";
import { Ilan } from "@/lib/utils";

export async function fetchLandingPageIlanlar(
  config: LandingPageConfig,
  locale: string = "tr",
  limit: number = 12
): Promise<Ilan[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      durum: "aktif",
    };

    // Apply filters from config
    if (config.filter.kategori) {
      where.kategori = config.filter.kategori;
    }
    if (config.filter.tip) {
      where.tip = config.filter.tip;
    }
    if (config.filter.konum) {
      where.OR = [
        { ilce: { contains: config.filter.konum } },
        { mahalle: { contains: config.filter.konum } },
      ];
    }

    const ilanlar = await prisma.ilan.findMany({
      where,
      include: {
        fotograflar: {
          orderBy: { sira: "asc" },
        },
        translations:
          locale !== "tr"
            ? {
                where: { language: locale, status: "published" },
                take: 1,
              }
            : false,
      },
      orderBy: [{ oneCikan: "desc" }, { createdAt: "desc" }],
      take: limit,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ilanlar.map((ilan: any) => {
      const translation = ilan.translations?.[0];

      return {
        id: ilan.id,
        baslik: translation?.baslik || ilan.baslik,
        slug: translation?.slug || ilan.slug,
        kategori: translation?.kategori || ilan.kategori,
        tip: translation?.tip || ilan.tip,
        fiyat: ilan.fiyat,
        paraBirimi: ilan.paraBirimi,
        konum: {
          il: ilan.il,
          ilce: ilan.ilce,
          mahalle: ilan.mahalle || "",
          koordinatlar: {
            lat: ilan.koordinatLat || 36.8384,
            lng: ilan.koordinatLng || 28.7667,
          },
        },
        ozellikler: {
          metrekare: ilan.metrekare || 0,
          odaSayisi: ilan.odaSayisi,
          banyoSayisi: ilan.banyoSayisi,
          kat: ilan.kat,
          toplamKat: ilan.toplamKat,
          binaYasi: ilan.binaYasi,
          isitma: ilan.isitma,
          esyali: ilan.esyali,
          balkon: ilan.balkon,
          asansor: ilan.asansor,
          otopark: ilan.otopark,
          guvenlik: ilan.guvenlik,
          havuz: ilan.havuz,
          bahce: ilan.bahce,
        },
        aciklama: translation?.aciklama || ilan.aciklama,
        fotograflar: ilan.fotograflar.map((f: { url: string }) => f.url),
        oneCikan: ilan.oneCikan,
        yayinTarihi: ilan.yayinTarihi.toISOString(),
        guncellenmeTarihi: ilan.guncellenmeTarihi.toISOString(),
        durum: ilan.durum,
        ilanNo: ilan.ilanNo || "",
        eidsStatus: ilan.eidsStatus,
      };
    });
  } catch (error) {
    console.error("Landing page ilanlar fetch error:", error);
    return [];
  }
}
