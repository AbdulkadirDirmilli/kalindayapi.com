"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import WatermarkImage from "@/components/ui/WatermarkImage";
import { MapPin, Maximize2, BedDouble, Bath, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import LeadForm from "@/components/ilan/LeadForm";
import { getRelativeTime, getInsaatDurumuLabel, getInsaatDurumuBadgeClass, Ilan } from "@/lib/utils";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { type Locale, getLocalizedRoute, defaultLocale } from "@/lib/i18n";

// Video dosyası olup olmadığını kontrol et
function isVideo(url: string): boolean {
  return url.includes('/videos/') || /\.(mp4|webm|mov|avi)$/i.test(url);
}

interface IlanKartProps {
  ilan: Ilan;
  variant?: "grid" | "list";
  index?: number;
  locale?: Locale;
}

// Localized texts
const texts = {
  tr: { forSale: 'Satılık', forRent: 'Kiralık', bath: 'Banyo', listingNo: 'İlan No', month: '/ay' },
  en: { forSale: 'For Sale', forRent: 'For Rent', bath: 'Bath', listingNo: 'Listing', month: '/mo' },
  ar: { forSale: 'للبيع', forRent: 'للإيجار', bath: 'حمام', listingNo: 'رقم', month: '/شهر' },
};

export default function IlanKart({ ilan, variant = "grid", index = 0, locale = defaultLocale }: IlanKartProps) {
  const { formatConvertedPrice } = useCurrency();
  const t = texts[locale];
  const listingsRoute = getLocalizedRoute('ilanlar', locale);
  const ilanHref = `/${locale}/${listingsRoute}/${ilan.slug}`;

  // Kapak fotoğrafı - sadece fotoğrafları al (videoları hariç tut)
  const kapakFoto = ilan.fotograflar?.find(f => !isVideo(f)) || ilan.fotograflar?.[0];

  if (variant === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <Link href={ilanHref}>
          <Card
            variant="interactive"
            padding="none"
            className="flex flex-col sm:flex-row overflow-hidden group"
          >
            {/* Image */}
            <div className="relative w-full sm:w-72 h-48 sm:h-auto flex-shrink-0 bg-gray-100">
              {kapakFoto ? (
                <WatermarkImage
                  src={kapakFoto}
                  alt={ilan.baslik}
                  fill
                  sizes="(max-width: 640px) 100vw, 288px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  watermarkSize="md"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Maximize2 className="w-12 h-12" />
                </div>
              )}
              {/* Badge */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <Badge
                  variant={ilan.kategori === "satilik" ? "satilik" : "kiralik"}
                  size="sm"
                >
                  {ilan.kategori === "satilik" ? t.forSale : t.forRent}
                </Badge>
                {ilan.insaatDurumu && (
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getInsaatDurumuBadgeClass(ilan.insaatDurumu)}`}>
                    {getInsaatDurumuLabel(ilan.insaatDurumu)}
                  </span>
                )}
              </div>

              {/* EIDS Logo - Sağ üst köşe (List variant) */}
              {ilan.eidsStatus === 'verified' && (
                <div className="absolute top-2 right-2 z-10">
                  <Image
                    src="/images/eids-logo.png"
                    alt="EIDS Doğrulanmış"
                    width={72}
                    height={72}
                    className="drop-shadow-lg"
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                {/* Location */}
                <div className="flex items-center gap-1 text-[#666666] text-sm mb-2">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  <span>
                    {ilan.konum.mahalle}, {ilan.konum.ilce}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-2 group-hover:text-[#C9A84C] transition-colors">
                  {ilan.baslik}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#666666] line-clamp-2 mb-4">
                  {ilan.aciklama}
                </p>

                {/* Features */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#666666]">
                  <div className="flex items-center gap-1">
                    <Maximize2 className="w-4 h-4" />
                    <span>{ilan.ozellikler.metrekare} m²</span>
                  </div>
                  {ilan.ozellikler.odaSayisi && (
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4" />
                      <span>{ilan.ozellikler.odaSayisi}</span>
                    </div>
                  )}
                  {ilan.ozellikler.banyoSayisi && (
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{ilan.ozellikler.banyoSayisi} {t.bath}</span>
                    </div>
                  )}
                  {ilan.insaatDurumu && (
                    <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${getInsaatDurumuBadgeClass(ilan.insaatDurumu)}`}>
                      {getInsaatDurumuLabel(ilan.insaatDurumu)}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e0e0e0]">
                <span className="text-xl font-bold text-[#0B1F3A]">
                  {formatConvertedPrice(ilan.fiyat)}
                  {ilan.kategori === "kiralik" && (
                    <span className="text-sm font-normal text-[#666666]">{t.month}</span>
                  )}
                </span>
                <div className="flex items-center gap-3">
                  <LeadForm
                    listingId={ilan.id}
                    listingTitle={ilan.baslik}
                    variant="icon"
                  />
                  <span className="text-xs text-[#999999] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {getRelativeTime(ilan.yayinTarihi)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    );
  }

  // Grid variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={ilanHref}>
        <Card
          variant="interactive"
          padding="none"
          className="h-full overflow-hidden group"
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            {kapakFoto ? (
              <WatermarkImage
                src={kapakFoto}
                alt={ilan.baslik}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized={kapakFoto.includes('/uploads/')}
                watermarkSize="md"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Maximize2 className="w-12 h-12" />
              </div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badge */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge
                variant={ilan.kategori === "satilik" ? "satilik" : "kiralik"}
                size="md"
              >
                {ilan.kategori === "satilik" ? t.forSale : t.forRent}
              </Badge>
              {ilan.insaatDurumu && (
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getInsaatDurumuBadgeClass(ilan.insaatDurumu)}`}>
                  {getInsaatDurumuLabel(ilan.insaatDurumu)}
                </span>
              )}
            </div>

            {/* EIDS Logo - Sağ üst köşe */}
            {ilan.eidsStatus === 'verified' && (
              <div className="absolute top-2 right-2 z-10">
                <Image
                  src="/images/eids-logo.png"
                  alt="EIDS Doğrulanmış"
                  width={80}
                  height={80}
                  className="drop-shadow-lg"
                />
              </div>
            )}

            {/* Price */}
            <div className="absolute bottom-4 right-4">
              <span className="bg-[#0B1F3A] text-white px-3 py-1.5 rounded-lg font-bold">
                {formatConvertedPrice(ilan.fiyat)}
                {ilan.kategori === "kiralik" && (
                  <span className="text-xs font-normal">{t.month}</span>
                )}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Location */}
            <div className="flex items-center gap-1 text-[#666666] text-sm mb-2">
              <MapPin className="w-4 h-4 text-[#C9A84C]" />
              <span>
                {ilan.konum.mahalle}, {ilan.konum.ilce}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-[#0B1F3A] mb-3 line-clamp-2 group-hover:text-[#C9A84C] transition-colors min-h-[3.5rem]">
              {ilan.baslik}
            </h3>

            {/* Features */}
            <div className="flex items-center gap-4 text-sm text-[#666666]">
              <div className="flex items-center gap-1">
                <Maximize2 className="w-4 h-4" />
                <span>{ilan.ozellikler.metrekare} m²</span>
              </div>
              {ilan.ozellikler.odaSayisi && (
                <div className="flex items-center gap-1">
                  <BedDouble className="w-4 h-4" />
                  <span>{ilan.ozellikler.odaSayisi}</span>
                </div>
              )}
              {ilan.ozellikler.banyoSayisi && (
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  <span>{ilan.ozellikler.banyoSayisi}</span>
                </div>
              )}
            </div>

            {/* Insaat Durumu Badge */}
            {ilan.insaatDurumu && (
              <div className="mt-3">
                <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${getInsaatDurumuBadgeClass(ilan.insaatDurumu)}`}>
                  {getInsaatDurumuLabel(ilan.insaatDurumu)}
                </span>
              </div>
            )}

            {/* Date & Lead */}
            <div className="mt-4 pt-4 border-t border-[#e0e0e0] flex items-center justify-between">
              <span className="text-xs text-[#999999]">
                {t.listingNo}: {ilan.ilanNo}
              </span>
              <div className="flex items-center gap-3">
                <LeadForm
                  listingId={ilan.id}
                  listingTitle={ilan.baslik}
                  variant="icon"
                />
                <span className="text-xs text-[#999999] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {getRelativeTime(ilan.yayinTarihi)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
