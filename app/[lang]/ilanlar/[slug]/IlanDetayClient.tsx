"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Maximize2,
  BedDouble,
  Bath,
  Calendar,
  Building,
  HardHat,
  Thermometer,
  Car,
  Shield,
  ShieldCheck,
  Clock,
  Info,
  Waves,
  TreeDeciduous,
  Phone,
  MessageCircle,
  ChevronRight,
  Home,
  Check,
  Play,
  Share2,
} from "lucide-react";
import { IlanGaleri, IlanKart } from "@/components/ilan";
import Button from "@/components/ui/Button";
import ShareButton from "@/components/ui/ShareButton";
import Badge from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  formatDate,
  createWhatsAppLink,
  getInsaatDurumuLabel,
  getInsaatDurumuBadgeClass,
  getEidsStatusLabel,
  getEidsStatusBadgeClass,
  Ilan,
} from "@/lib/utils";
import { PriceConverter } from "@/components/exchange";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { type Locale, getLocalizedRoute } from "@/lib/i18n";
import { type Dictionary } from "@/lib/i18n/getDictionary";

interface IlanDetayClientProps {
  ilan: Ilan;
  benzerIlanlar: Ilan[];
  locale: Locale;
  dict: Dictionary;
}

export default function IlanDetayClient({ ilan, benzerIlanlar, locale, dict }: IlanDetayClientProps) {
  const { formatConvertedPrice } = useCurrency();

  // Localized texts
  const t = {
    home: locale === 'tr' ? 'Ana Sayfa' : locale === 'en' ? 'Home' : 'الرئيسية',
    listings: locale === 'tr' ? 'İlanlar' : locale === 'en' ? 'Listings' : 'العقارات',
    forSale: locale === 'tr' ? 'Satılık' : locale === 'en' ? 'For Sale' : 'للبيع',
    forRent: locale === 'tr' ? 'Kiralık' : locale === 'en' ? 'For Rent' : 'للإيجار',
    listingNo: locale === 'tr' ? 'İlan No' : locale === 'en' ? 'Listing No' : 'رقم الإعلان',
    sqm: locale === 'tr' ? 'Metrekare' : locale === 'en' ? 'Area' : 'المساحة',
    rooms: locale === 'tr' ? 'Oda Sayısı' : locale === 'en' ? 'Bedrooms' : 'غرف النوم',
    bathrooms: locale === 'tr' ? 'Banyo' : locale === 'en' ? 'Bathrooms' : 'الحمامات',
    floor: locale === 'tr' ? 'Kat' : locale === 'en' ? 'Floor' : 'الطابق',
    buildingAge: locale === 'tr' ? 'Bina Yaşı' : locale === 'en' ? 'Building Age' : 'عمر المبنى',
    heating: locale === 'tr' ? 'Isıtma' : locale === 'en' ? 'Heating' : 'التدفئة',
    constructionStatus: locale === 'tr' ? 'İnşaat Durumu' : locale === 'en' ? 'Construction Status' : 'حالة البناء',
    description: locale === 'tr' ? 'İlan Açıklaması' : locale === 'en' ? 'Description' : 'الوصف',
    features: locale === 'tr' ? 'Özellikler' : locale === 'en' ? 'Features' : 'المميزات',
    extraFeatures: locale === 'tr' ? 'Ek Özellikler' : locale === 'en' ? 'Extra Features' : 'مميزات إضافية',
    location: locale === 'tr' ? 'Konum' : locale === 'en' ? 'Location' : 'الموقع',
    contact: locale === 'tr' ? 'İletişime Geç' : locale === 'en' ? 'Contact' : 'اتصل',
    whatsapp: locale === 'tr' ? 'WhatsApp ile Yaz' : locale === 'en' ? 'WhatsApp' : 'واتساب',
    call: locale === 'tr' ? 'Hemen Ara' : locale === 'en' ? 'Call Now' : 'اتصل الآن',
    price: locale === 'tr' ? 'Fiyat' : locale === 'en' ? 'Price' : 'السعر',
    pricePerSqm: locale === 'tr' ? 'm² Fiyatı' : locale === 'en' ? 'Price/sqm' : 'السعر/م²',
    similar: locale === 'tr' ? 'Benzer İlanlar' : locale === 'en' ? 'Similar Properties' : 'عقارات مماثلة',
    video: locale === 'tr' ? 'İlan Videosu' : locale === 'en' ? 'Property Video' : 'فيديو العقار',
    watchVideo: locale === 'tr' ? 'İlanın Videosunu İzle' : locale === 'en' ? 'Watch Video' : 'شاهد الفيديو',
    consultant: locale === 'tr' ? 'Emlak Danışmanı' : locale === 'en' ? 'Real Estate Agent' : 'وكيل عقاري',
    balcony: locale === 'tr' ? 'Balkon' : locale === 'en' ? 'Balcony' : 'شرفة',
    elevator: locale === 'tr' ? 'Asansör' : locale === 'en' ? 'Elevator' : 'مصعد',
    parking: locale === 'tr' ? 'Otopark' : locale === 'en' ? 'Parking' : 'موقف سيارات',
    security: locale === 'tr' ? 'Güvenlik' : locale === 'en' ? 'Security' : 'أمن',
    pool: locale === 'tr' ? 'Havuz' : locale === 'en' ? 'Pool' : 'مسبح',
    garden: locale === 'tr' ? 'Bahçe' : locale === 'en' ? 'Garden' : 'حديقة',
    furnished: locale === 'tr' ? 'Eşyalı' : locale === 'en' ? 'Furnished' : 'مفروش',
    new: locale === 'tr' ? 'Sıfır' : locale === 'en' ? 'New' : 'جديد',
    years: locale === 'tr' ? 'Yıl' : locale === 'en' ? 'Years' : 'سنوات',
    month: locale === 'tr' ? '/ay' : locale === 'en' ? '/mo' : '/شهر',
  };

  const ozellikler = [
    {
      label: t.sqm,
      value: `${ilan.ozellikler?.metrekare || 0} m²`,
      icon: Maximize2,
    },
    ilan.ozellikler?.odaSayisi && {
      label: t.rooms,
      value: ilan.ozellikler.odaSayisi,
      icon: BedDouble,
    },
    ilan.ozellikler?.banyoSayisi && {
      label: t.bathrooms,
      value: `${ilan.ozellikler.banyoSayisi}`,
      icon: Bath,
    },
    ilan.ozellikler?.kat != null && {
      label: t.floor,
      value: `${ilan.ozellikler.kat}/${ilan.ozellikler.toplamKat ?? '?'}`,
      icon: Building,
    },
    ilan.ozellikler?.binaYasi != null && {
      label: t.buildingAge,
      value: ilan.ozellikler.binaYasi === 0 ? t.new : `${ilan.ozellikler.binaYasi} ${t.years}`,
      icon: Calendar,
    },
    ilan.ozellikler?.isitma && {
      label: t.heating,
      value: ilan.ozellikler.isitma,
      icon: Thermometer,
    },
    ilan.insaatDurumu && {
      label: t.constructionStatus,
      value: getInsaatDurumuLabel(ilan.insaatDurumu),
      icon: HardHat,
    },
  ].filter(Boolean);

  const ekOzellikler = [
    ilan.ozellikler?.balkon && { label: t.balcony, icon: Check },
    ilan.ozellikler?.asansor && { label: t.elevator, icon: Check },
    ilan.ozellikler?.otopark && { label: t.parking, icon: Car },
    ilan.ozellikler?.guvenlik && { label: t.security, icon: Shield },
    ilan.ozellikler?.havuz && { label: t.pool, icon: Waves },
    ilan.ozellikler?.bahce && { label: t.garden, icon: TreeDeciduous },
    ilan.ozellikler?.esyali && { label: t.furnished, icon: Check },
  ].filter(Boolean);

  const listingsRoute = getLocalizedRoute('ilanlar', locale);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 flex-wrap">
            <Link href={`/${locale}`} className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <Link href={`/${locale}/${listingsRoute}`} className="hover:text-[#C9A84C] transition-colors">
              {t.listings}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-[#C9A84C] line-clamp-1 max-w-[150px] sm:max-w-none">{ilan.baslik}</span>
          </nav>

          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Title and Badge Row */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                <Badge
                  variant={ilan.kategori === "satilik" ? "satilik" : "kiralik"}
                  size="lg"
                >
                  {ilan.kategori === "satilik" ? t.forSale : t.forRent}
                </Badge>
                {ilan.insaatDurumu && (
                  <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${getInsaatDurumuBadgeClass(ilan.insaatDurumu)}`}>
                    {getInsaatDurumuLabel(ilan.insaatDurumu)}
                  </span>
                )}
                {ilan.eidsStatus && (
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${getEidsStatusBadgeClass(ilan.eidsStatus)}`}>
                    {ilan.eidsStatus === 'verified' && <ShieldCheck className="w-3.5 h-3.5" />}
                    {ilan.eidsStatus === 'pending' && <Clock className="w-3.5 h-3.5" />}
                    {ilan.eidsStatus === 'not_available' && <Info className="w-3.5 h-3.5" />}
                    {getEidsStatusLabel(ilan.eidsStatus)}
                  </span>
                )}
                {ilan.ilanNo && (
                  <span className="text-gray-400 text-xs sm:text-sm">{t.listingNo}: {ilan.ilanNo}</span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                {ilan.baslik}
              </h1>
              <div className="flex items-center gap-1 text-gray-300 text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A84C] flex-shrink-0" />
                <span className="line-clamp-1">
                  {ilan.konum?.mahalle && `${ilan.konum.mahalle}, `}
                  {ilan.konum?.ilce}, {ilan.konum?.il}
                </span>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 md:border-0 md:pt-0">
              <PriceConverter
                priceInTRY={ilan.fiyat}
                size="lg"
                suffix={ilan.kategori === "kiralik" ? t.month : undefined}
                showEquivalents={true}
              />
              {ilan.yayinTarihi && (
                <p className="text-gray-400 text-xs sm:text-sm">
                  {formatDate(ilan.yayinTarihi)}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-6 sm:py-8 md:py-12 bg-[#F5F5F5] pb-24 lg:pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
              {/* Gallery */}
              <Card padding="md" className="sm:p-6 lg:p-8">
                <IlanGaleri fotograflar={ilan.fotograflar || []} baslik={ilan.baslik} />

                {ilan.videoUrl && (
                  <button
                    onClick={() => {
                      document.getElementById('ilan-video')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white font-semibold rounded-xl transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    {t.watchVideo}
                  </button>
                )}
              </Card>

              {/* Quick Info - Mobile Only */}
              <div className="grid grid-cols-3 gap-2 lg:hidden">
                {ozellikler.slice(0, 3).map((ozellik) => {
                  if (!ozellik) return null;
                  const Icon = ozellik.icon;
                  return (
                    <div
                      key={ozellik.label}
                      className="flex flex-col items-center justify-center p-3 bg-white rounded-xl text-center"
                    >
                      <Icon className="w-5 h-5 text-[#C9A84C] mb-1" />
                      <p className="text-xs text-[#999999]">{ozellik.label}</p>
                      <p className="font-semibold text-[#0B1F3A] text-sm">
                        {ozellik.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Video */}
              {ilan.videoUrl && (
                <Card id="ilan-video" padding="md" className="sm:p-6 lg:p-8 scroll-mt-24">
                  <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A] mb-3 sm:mb-4 flex items-center gap-2">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t.video}
                  </h2>
                  <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-black">
                    <video
                      src={ilan.videoUrl}
                      controls
                      className="w-full h-full object-contain"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </Card>
              )}

              {/* Description */}
              <Card padding="md" className="sm:p-6 lg:p-8 overflow-hidden">
                <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A] mb-3 sm:mb-4">
                  {t.description}
                </h2>
                <div
                  className="text-sm sm:text-base text-[#666666] leading-relaxed prose prose-sm max-w-none
                    prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0
                    prose-strong:text-[#0B1F3A] prose-headings:text-[#0B1F3A]
                    break-words overflow-hidden [word-break:break-word]"
                  dangerouslySetInnerHTML={{ __html: ilan.aciklama }}
                />
              </Card>

              {/* Features */}
              <Card padding="md" className="sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A] mb-4 sm:mb-6">
                  {t.features}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                  {ozellikler.map((ozellik) => {
                    if (!ozellik) return null;
                    const Icon = ozellik.icon;
                    return (
                      <div
                        key={ozellik.label}
                        className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-[#F5F5F5] rounded-lg sm:rounded-xl"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0B1F3A]/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B1F3A]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] sm:text-xs text-[#999999]">{ozellik.label}</p>
                          <p className="font-semibold text-[#0B1F3A] text-xs sm:text-sm truncate">
                            {ozellik.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Extra Features */}
                {ekOzellikler.length > 0 && (
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#e0e0e0]">
                    <h3 className="text-xs sm:text-sm font-semibold text-[#0B1F3A] mb-3 sm:mb-4">
                      {t.extraFeatures}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {ekOzellikler.map((ozellik) => {
                        if (!ozellik) return null;
                        return (
                          <span
                            key={ozellik.label}
                            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#22c55e]/10 text-[#22c55e] rounded-full text-xs sm:text-sm font-medium"
                          >
                            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                            {ozellik.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Card>

              {/* Map */}
              {ilan.konum?.koordinatlar && (
                <Card padding="md" className="sm:p-6 lg:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A] mb-3 sm:mb-4">{t.location}</h2>
                  <div className="aspect-[4/3] sm:aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-[#e0e0e0]">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25555.36436036367!2d${ilan.konum.koordinatlar.lng}!3d${ilan.konum.koordinatlar.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1str!2str!4v1`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${ilan.baslik} ${t.location}`}
                    />
                  </div>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#666666]">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 text-[#C9A84C]" />
                    {ilan.konum.mahalle && `${ilan.konum.mahalle}, `}
                    {ilan.konum.ilce}, {ilan.konum.il}
                  </p>
                </Card>
              )}
            </div>

            {/* Sidebar - Desktop */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              {/* Contact Card */}
              <Card padding="md" className="hidden lg:block sm:p-6 lg:p-8 lg:sticky lg:top-24">
                <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] mb-3 sm:mb-4">
                  {t.contact}
                </h3>

                {/* Agent Info */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-[#F5F5F5] rounded-lg sm:rounded-xl">
                  {ilan.danisman?.foto ? (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={ilan.danisman.foto}
                        alt={ilan.danisman.ad}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 sm:w-7 sm:h-7 text-[#C9A84C]" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-[#0B1F3A] text-sm sm:text-base">
                      {ilan.danisman?.ad || "Kalinda Yapi"}
                    </p>
                    <p className="text-xs sm:text-sm text-[#666666]">
                      {ilan.danisman?.unvan || t.consultant}
                    </p>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-2 sm:space-y-3">
                  <a
                    href={createWhatsAppLink(
                      ilan.danisman?.whatsapp || ilan.danisman?.telefon || "905370530754",
                      locale === 'en'
                        ? `Hello, I would like to inquire about listing ${ilan.ilanNo || ''} "${ilan.baslik}".`
                        : locale === 'ar'
                          ? `مرحباً، أود الاستفسار عن الإعلان ${ilan.ilanNo || ''} "${ilan.baslik}".`
                          : `Merhaba, ${ilan.ilanNo || ''} numarali "${ilan.baslik}" ilani hakkinda bilgi almak istiyorum.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="whatsapp"
                      size="lg"
                      className="w-full text-sm sm:text-base"
                      leftIcon={<MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
                    >
                      {t.whatsapp}
                    </Button>
                  </a>

                  <a href={`tel:+${ilan.danisman?.telefon?.replace(/\D/g, '') || "905370530754"}`} className="block">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full text-sm sm:text-base"
                      leftIcon={<Phone className="w-4 h-4 sm:w-5 sm:h-5" />}
                    >
                      {t.call}
                    </Button>
                  </a>

                  <ShareButton
                    title={ilan.baslik}
                    text={ilan.aciklama?.slice(0, 100) || ''}
                  />
                </div>

                {/* Price Info */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#e0e0e0]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#666666] text-sm">{t.price}</span>
                    <span className="font-bold text-[#0B1F3A] text-sm sm:text-base">
                      {formatConvertedPrice(ilan.fiyat)}
                      {ilan.kategori === "kiralik" && t.month}
                    </span>
                  </div>
                  {ilan.ozellikler?.metrekare && ilan.ozellikler.metrekare > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#666666] text-sm">{t.pricePerSqm}</span>
                      <span className="font-bold text-[#0B1F3A] text-sm sm:text-base">
                        {formatConvertedPrice(Math.round(ilan.fiyat / ilan.ozellikler.metrekare))}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Similar Listings */}
          {benzerIlanlar.length > 0 && (
            <div className="mt-8 sm:mt-12 lg:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] mb-4 sm:mb-6 lg:mb-8">
                {t.similar}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {benzerIlanlar.map((benzerIlan, index) => (
                  <IlanKart key={benzerIlan.id} ilan={benzerIlan} index={index} locale={locale} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Fixed Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e0e0e0] p-3 sm:p-4 lg:hidden z-50 safe-area-inset-bottom">
        <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-3">
          <div className="hidden sm:block min-w-0 flex-shrink">
            <p className="text-xs text-[#666666]">{t.price}</p>
            <p className="font-bold text-[#0B1F3A] truncate">
              {formatConvertedPrice(ilan.fiyat)}
              {ilan.kategori === "kiralik" && <span className="text-xs font-normal">{t.month}</span>}
            </p>
          </div>

          <div className="flex gap-2 flex-1 sm:flex-initial justify-end">
            <a
              href={createWhatsAppLink(
                ilan.danisman?.whatsapp || ilan.danisman?.telefon || "905370530754",
                locale === 'en'
                  ? `Hello, I would like to inquire about listing ${ilan.ilanNo || ''} "${ilan.baslik}".`
                  : locale === 'ar'
                    ? `مرحباً، أود الاستفسار عن الإعلان ${ilan.ilanNo || ''} "${ilan.baslik}".`
                    : `Merhaba, ${ilan.ilanNo || ''} numarali "${ilan.baslik}" ilani hakkinda bilgi almak istiyorum.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial"
            >
              <Button
                variant="whatsapp"
                size="md"
                className="w-full sm:w-auto"
                leftIcon={<MessageCircle className="w-4 h-4" />}
              >
                <span className="hidden xs:inline">WhatsApp</span>
                <span className="xs:hidden">WA</span>
              </Button>
            </a>
            <a href={`tel:+${ilan.danisman?.telefon?.replace(/\D/g, '') || "905370530754"}`} className="flex-1 sm:flex-initial">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                leftIcon={<Phone className="w-4 h-4" />}
              >
                {locale === 'en' ? 'Call' : locale === 'ar' ? 'اتصل' : 'Ara'}
              </Button>
            </a>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: ilan.baslik,
                    text: ilan.aciklama?.slice(0, 100) || '',
                    url: window.location.href,
                  }).catch(() => {});
                } else if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert(locale === 'en' ? "Link copied!" : locale === 'ar' ? "تم نسخ الرابط!" : "Link kopyalandı!");
                }
              }}
              className="p-2.5 bg-[#F5F5F5] rounded-lg hover:bg-[#e0e0e0] transition-colors sm:hidden"
              aria-label={locale === 'en' ? 'Share' : locale === 'ar' ? 'مشاركة' : 'Paylaş'}
            >
              <Share2 className="w-5 h-5 text-[#0B1F3A]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
