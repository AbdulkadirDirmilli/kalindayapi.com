import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Maximize2,
  BedDouble,
  Bath,
  Calendar,
  Building,
  Thermometer,
  Car,
  Shield,
  Waves,
  TreeDeciduous,
  Phone,
  MessageCircle,
  ChevronRight,
  Home,
  Check,
} from "lucide-react";
import { IlanGaleri, IlanKart } from "@/components/ilan";
import Button from "@/components/ui/Button";
import ShareButton from "@/components/ui/ShareButton";
import Badge from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  formatPrice,
  formatDate,
  createWhatsAppLink,
  Ilan,
} from "@/lib/utils";
import {
  generateRealEstateListingSchema,
  generateBreadcrumbSchema,
} from "@/lib/jsonld";
import { generateIlanMetadata } from "@/lib/metadata";
import ilanlarData from "@/data/ilanlar.json";

interface IlanDetayPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: IlanDetayPageProps): Promise<Metadata> {
  const { id } = await params;
  const ilan = (ilanlarData.ilanlar as Ilan[]).find((i) => i.id === id);

  if (!ilan) {
    return {
      title: "İlan Bulunamadı",
    };
  }

  return generateIlanMetadata(ilan);
}

export async function generateStaticParams() {
  return (ilanlarData.ilanlar as Ilan[]).map((ilan) => ({
    id: ilan.id,
  }));
}

export default async function IlanDetayPage({ params }: IlanDetayPageProps) {
  const { id } = await params;
  const allIlanlar = ilanlarData.ilanlar as Ilan[];
  const ilan = allIlanlar.find((i) => i.id === id);

  if (!ilan) {
    notFound();
  }

  // Get similar listings
  const benzerIlanlar = allIlanlar
    .filter(
      (i) =>
        i.id !== ilan.id &&
        (i.kategori === ilan.kategori || i.tip === ilan.tip)
    )
    .slice(0, 3);

  const listingSchema = generateRealEstateListingSchema(ilan);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "İlanlar", url: "/ilanlar" },
    { name: ilan.baslik, url: `/ilanlar/${ilan.id}` },
  ]);

  const ozellikler = [
    {
      label: "Metrekare",
      value: `${ilan.ozellikler.metrekare} m²`,
      icon: Maximize2,
    },
    ilan.ozellikler.odaSayisi && {
      label: "Oda Sayısı",
      value: ilan.ozellikler.odaSayisi,
      icon: BedDouble,
    },
    ilan.ozellikler.banyoSayisi && {
      label: "Banyo",
      value: `${ilan.ozellikler.banyoSayisi} Banyo`,
      icon: Bath,
    },
    ilan.ozellikler.kat !== undefined && {
      label: "Kat",
      value: `${ilan.ozellikler.kat}/${ilan.ozellikler.toplamKat}`,
      icon: Building,
    },
    ilan.ozellikler.binaYasi !== undefined && {
      label: "Bina Yaşı",
      value: ilan.ozellikler.binaYasi === 0 ? "Sıfır" : `${ilan.ozellikler.binaYasi} Yıl`,
      icon: Calendar,
    },
    ilan.ozellikler.isitma && {
      label: "Isıtma",
      value: ilan.ozellikler.isitma,
      icon: Thermometer,
    },
  ].filter(Boolean);

  const ekOzellikler = [
    ilan.ozellikler.balkon && { label: "Balkon", icon: Check },
    ilan.ozellikler.asansor && { label: "Asansör", icon: Check },
    ilan.ozellikler.otopark && { label: "Otopark", icon: Car },
    ilan.ozellikler.guvenlik && { label: "Güvenlik", icon: Shield },
    ilan.ozellikler.havuz && { label: "Havuz", icon: Waves },
    ilan.ozellikler.bahce && { label: "Bahçe", icon: TreeDeciduous },
    ilan.ozellikler.esyali && { label: "Eşyalı", icon: Check },
  ].filter(Boolean);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listingSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/ilanlar" className="hover:text-[#C9A84C] transition-colors">
              İlanlar
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C] line-clamp-1">{ilan.baslik}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  variant={ilan.kategori === "satilik" ? "satilik" : "kiralik"}
                  size="lg"
                >
                  {ilan.kategori === "satilik" ? "Satılık" : "Kiralık"}
                </Badge>
                <span className="text-gray-400 text-sm">İlan No: {ilan.ilanNo}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {ilan.baslik}
              </h1>
              <div className="flex items-center gap-1 text-gray-300">
                <MapPin className="w-5 h-5 text-[#C9A84C]" />
                <span>
                  {ilan.konum.mahalle}, {ilan.konum.ilce}, {ilan.konum.il}
                </span>
              </div>
            </div>

            <div className="text-left md:text-right">
              <p className="text-3xl md:text-4xl font-bold text-[#C9A84C]">
                {formatPrice(ilan.fiyat)}
                {ilan.kategori === "kiralik" && (
                  <span className="text-lg font-normal text-gray-400">/ay</span>
                )}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Yayın Tarihi: {formatDate(ilan.yayinTarihi)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <Card padding="lg">
                <IlanGaleri fotograflar={ilan.fotograflar} baslik={ilan.baslik} />
              </Card>

              {/* Description */}
              <Card padding="lg">
                <h2 className="text-xl font-bold text-[#0B1F3A] mb-4">
                  İlan Açıklaması
                </h2>
                <p className="text-[#666666] leading-relaxed whitespace-pre-line">
                  {ilan.aciklama}
                </p>
              </Card>

              {/* Features */}
              <Card padding="lg">
                <h2 className="text-xl font-bold text-[#0B1F3A] mb-6">
                  Özellikler
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {ozellikler.map((ozellik) => {
                    if (!ozellik) return null;
                    const Icon = ozellik.icon;
                    return (
                      <div
                        key={ozellik.label}
                        className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-xl"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#0B1F3A]/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#0B1F3A]" />
                        </div>
                        <div>
                          <p className="text-xs text-[#999999]">{ozellik.label}</p>
                          <p className="font-semibold text-[#0B1F3A]">
                            {ozellik.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Extra Features */}
                {ekOzellikler.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-[#e0e0e0]">
                    <h3 className="text-sm font-semibold text-[#0B1F3A] mb-4">
                      Ek Özellikler
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {ekOzellikler.map((ozellik) => {
                        if (!ozellik) return null;
                        return (
                          <span
                            key={ozellik.label}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#22c55e]/10 text-[#22c55e] rounded-full text-sm font-medium"
                          >
                            <Check className="w-4 h-4" />
                            {ozellik.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Card>

              {/* Map */}
              <Card padding="lg">
                <h2 className="text-xl font-bold text-[#0B1F3A] mb-4">Konum</h2>
                <div className="aspect-video rounded-xl overflow-hidden bg-[#e0e0e0]">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25555.36436036367!2d${ilan.konum.koordinatlar.lng}!3d${ilan.konum.koordinatlar.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1str!2str!4v1`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${ilan.baslik} Konum`}
                  />
                </div>
                <p className="mt-4 text-sm text-[#666666]">
                  <MapPin className="w-4 h-4 inline mr-1 text-[#C9A84C]" />
                  {ilan.konum.mahalle}, {ilan.konum.ilce}, {ilan.konum.il}
                </p>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card padding="lg" className="sticky top-24">
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-4">
                  İletişime Geç
                </h3>

                {/* Agent Info */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-[#F5F5F5] rounded-xl">
                  <div className="w-14 h-14 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                    <Building className="w-7 h-7 text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0B1F3A]">Zafer SOYLU</p>
                    <p className="text-sm text-[#666666]">Emlak Danışmanı</p>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <a
                    href={createWhatsAppLink(
                      "905370530754",
                      `Merhaba, ${ilan.ilanNo} numaralı "${ilan.baslik}" ilanı hakkında bilgi almak istiyorum.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="whatsapp"
                      size="lg"
                      className="w-full"
                      leftIcon={<MessageCircle className="w-5 h-5" />}
                    >
                      WhatsApp ile Yaz
                    </Button>
                  </a>

                  <a href="tel:+905370530754" className="block">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      leftIcon={<Phone className="w-5 h-5" />}
                    >
                      Hemen Ara
                    </Button>
                  </a>

                  <ShareButton
                    title={ilan.baslik}
                    text={ilan.aciklama.slice(0, 100)}
                  />
                </div>

                {/* Price Info */}
                <div className="mt-6 pt-6 border-t border-[#e0e0e0]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#666666]">Fiyat</span>
                    <span className="font-bold text-[#0B1F3A]">
                      {formatPrice(ilan.fiyat)}
                      {ilan.kategori === "kiralik" && "/ay"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#666666]">m² Fiyatı</span>
                    <span className="font-bold text-[#0B1F3A]">
                      {formatPrice(Math.round(ilan.fiyat / ilan.ozellikler.metrekare))}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Similar Listings */}
          {benzerIlanlar.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-8">
                Benzer İlanlar
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {benzerIlanlar.map((benzerIlan, index) => (
                  <IlanKart key={benzerIlan.id} ilan={benzerIlan} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
