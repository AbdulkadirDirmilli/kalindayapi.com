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
  Play,
  Share2,
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

interface IlanDetayClientProps {
  ilan: Ilan;
  benzerIlanlar: Ilan[];
}

export default function IlanDetayClient({ ilan, benzerIlanlar }: IlanDetayClientProps) {
  const ozellikler = [
    {
      label: "Metrekare",
      value: `${ilan.ozellikler?.metrekare || 0} m2`,
      icon: Maximize2,
    },
    ilan.ozellikler?.odaSayisi && {
      label: "Oda Sayisi",
      value: ilan.ozellikler.odaSayisi,
      icon: BedDouble,
    },
    ilan.ozellikler?.banyoSayisi && {
      label: "Banyo",
      value: `${ilan.ozellikler.banyoSayisi} Banyo`,
      icon: Bath,
    },
    ilan.ozellikler?.kat != null && {
      label: "Kat",
      value: `${ilan.ozellikler.kat}/${ilan.ozellikler.toplamKat ?? '?'}`,
      icon: Building,
    },
    ilan.ozellikler?.binaYasi != null && {
      label: "Bina Yasi",
      value: ilan.ozellikler.binaYasi === 0 ? "Sifir" : `${ilan.ozellikler.binaYasi} Yil`,
      icon: Calendar,
    },
    ilan.ozellikler?.isitma && {
      label: "Isitma",
      value: ilan.ozellikler.isitma,
      icon: Thermometer,
    },
  ].filter(Boolean);

  const ekOzellikler = [
    ilan.ozellikler?.balkon && { label: "Balkon", icon: Check },
    ilan.ozellikler?.asansor && { label: "Asansor", icon: Check },
    ilan.ozellikler?.otopark && { label: "Otopark", icon: Car },
    ilan.ozellikler?.guvenlik && { label: "Guvenlik", icon: Shield },
    ilan.ozellikler?.havuz && { label: "Havuz", icon: Waves },
    ilan.ozellikler?.bahce && { label: "Bahce", icon: TreeDeciduous },
    ilan.ozellikler?.esyali && { label: "Esyali", icon: Check },
  ].filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <Link href="/ilanlar" className="hover:text-[#C9A84C] transition-colors">
              Ilanlar
            </Link>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-[#C9A84C] line-clamp-1 max-w-[150px] sm:max-w-none">{ilan.baslik}</span>
          </nav>

          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Title and Badge Row */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <Badge
                  variant={ilan.kategori === "satilik" ? "satilik" : "kiralik"}
                  size="lg"
                >
                  {ilan.kategori === "satilik" ? "Satilik" : "Kiralik"}
                </Badge>
                {ilan.ilanNo && (
                  <span className="text-gray-400 text-xs sm:text-sm">Ilan No: {ilan.ilanNo}</span>
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
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C9A84C]">
                {formatPrice(ilan.fiyat)}
                {ilan.kategori === "kiralik" && (
                  <span className="text-sm sm:text-lg font-normal text-gray-400">/ay</span>
                )}
              </p>
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

                {/* Video Button - only shows if video exists */}
                {ilan.videoUrl && (
                  <button
                    onClick={() => {
                      document.getElementById('ilan-video')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white font-semibold rounded-xl transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    İlanın Videosunu İzle
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
                    İlan Videosu
                  </h2>
                  <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-black">
                    <video
                      src={ilan.videoUrl}
                      controls
                      className="w-full h-full object-contain"
                      preload="metadata"
                    >
                      Tarayiciniz video etiketini desteklemiyor.
                    </video>
                  </div>
                </Card>
              )}

              {/* Description */}
              <Card padding="md" className="sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A] mb-3 sm:mb-4">
                  Ilan Aciklamasi
                </h2>
                <p className="text-sm sm:text-base text-[#666666] leading-relaxed whitespace-pre-line">
                  {ilan.aciklama}
                </p>
              </Card>

              {/* Features */}
              <Card padding="md" className="sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A] mb-4 sm:mb-6">
                  Ozellikler
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
                      Ek Ozellikler
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

                {/* Detayli Ozellikler */}
                {(ilan.ozellikler?.icOzellikler?.length ||
                  ilan.ozellikler?.disOzellikler?.length ||
                  ilan.ozellikler?.muhitOzellikleri?.length ||
                  ilan.ozellikler?.guvenlikOzellikleri?.length ||
                  ilan.ozellikler?.cephe?.length ||
                  ilan.ozellikler?.manzara?.length ||
                  ilan.ozellikler?.altyapiDetay?.length ||
                  ilan.ozellikler?.tarimOzellikleri?.length ||
                  ilan.ozellikler?.depoOzellikleri?.length) && (
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#e0e0e0] space-y-4">
                    {/* Ic Ozellikler */}
                    {ilan.ozellikler?.icOzellikler && ilan.ozellikler.icOzellikler.length > 0 && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#0B1F3A] mb-2 sm:mb-3">
                          Ic Ozellikler
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {ilan.ozellikler.icOzellikler.map((ozellik: string) => (
                            <span
                              key={ozellik}
                              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#0B1F3A]/10 text-[#0B1F3A] rounded-full text-xs sm:text-sm font-medium"
                            >
                              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                              {ozellik}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dis Ozellikler */}
                    {ilan.ozellikler?.disOzellikler && ilan.ozellikler.disOzellikler.length > 0 && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#0B1F3A] mb-2 sm:mb-3">
                          Dis Ozellikler
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {ilan.ozellikler.disOzellikler.map((ozellik: string) => (
                            <span
                              key={ozellik}
                              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#0B1F3A]/10 text-[#0B1F3A] rounded-full text-xs sm:text-sm font-medium"
                            >
                              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                              {ozellik}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Muhit Ozellikleri */}
                    {ilan.ozellikler?.muhitOzellikleri && ilan.ozellikler.muhitOzellikleri.length > 0 && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#0B1F3A] mb-2 sm:mb-3">
                          Muhit Ozellikleri
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {ilan.ozellikler.muhitOzellikleri.map((ozellik: string) => (
                            <span
                              key={ozellik}
                              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#0B1F3A]/10 text-[#0B1F3A] rounded-full text-xs sm:text-sm font-medium"
                            >
                              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                              {ozellik}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Guvenlik Ozellikleri */}
                    {ilan.ozellikler?.guvenlikOzellikleri && ilan.ozellikler.guvenlikOzellikleri.length > 0 && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#0B1F3A] mb-2 sm:mb-3">
                          Guvenlik Ozellikleri
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {ilan.ozellikler.guvenlikOzellikleri.map((ozellik: string) => (
                            <span
                              key={ozellik}
                              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#0B1F3A]/10 text-[#0B1F3A] rounded-full text-xs sm:text-sm font-medium"
                            >
                              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                              {ozellik}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cephe */}
                    {ilan.ozellikler?.cephe && ilan.ozellikler.cephe.length > 0 && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#0B1F3A] mb-2 sm:mb-3">
                          Cephe
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {ilan.ozellikler.cephe.map((ozellik: string) => (
                            <span
                              key={ozellik}
                              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] rounded-full text-xs sm:text-sm font-medium"
                            >
                              {ozellik}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Manzara */}
                    {ilan.ozellikler?.manzara && ilan.ozellikler.manzara.length > 0 && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#0B1F3A] mb-2 sm:mb-3">
                          Manzara
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {ilan.ozellikler.manzara.map((ozellik: string) => (
                            <span
                              key={ozellik}
                              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] rounded-full text-xs sm:text-sm font-medium"
                            >
                              {ozellik}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Altyapi Detay - Arsa icin */}
                    {ilan.ozellikler?.altyapiDetay && ilan.ozellikler.altyapiDetay.length > 0 && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#0B1F3A] mb-2 sm:mb-3">
                          Altyapi
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {ilan.ozellikler.altyapiDetay.map((ozellik: string) => (
                            <span
                              key={ozellik}
                              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#0B1F3A]/10 text-[#0B1F3A] rounded-full text-xs sm:text-sm font-medium"
                            >
                              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                              {ozellik}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tarim Ozellikleri - Arsa icin */}
                    {ilan.ozellikler?.tarimOzellikleri && ilan.ozellikler.tarimOzellikleri.length > 0 && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#0B1F3A] mb-2 sm:mb-3">
                          Tarim Ozellikleri
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {ilan.ozellikler.tarimOzellikleri.map((ozellik: string) => (
                            <span
                              key={ozellik}
                              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#0B1F3A]/10 text-[#0B1F3A] rounded-full text-xs sm:text-sm font-medium"
                            >
                              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                              {ozellik}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Depo Ozellikleri - Ticari icin */}
                    {ilan.ozellikler?.depoOzellikleri && ilan.ozellikler.depoOzellikleri.length > 0 && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#0B1F3A] mb-2 sm:mb-3">
                          Depo Ozellikleri
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {ilan.ozellikler.depoOzellikleri.map((ozellik: string) => (
                            <span
                              key={ozellik}
                              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#0B1F3A]/10 text-[#0B1F3A] rounded-full text-xs sm:text-sm font-medium"
                            >
                              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                              {ozellik}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>

              {/* Map */}
              {ilan.konum?.koordinatlar && (
                <Card padding="md" className="sm:p-6 lg:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A] mb-3 sm:mb-4">Konum</h2>
                  <div className="aspect-[4/3] sm:aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-[#e0e0e0]">
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
              {/* Contact Card - Hidden on mobile, shown on tablet/desktop */}
              <Card padding="md" className="hidden lg:block sm:p-6 lg:p-8 lg:sticky lg:top-24">
                <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] mb-3 sm:mb-4">
                  Iletisime Gec
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
                      {ilan.danisman?.unvan || "Emlak Danismani"}
                    </p>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-2 sm:space-y-3">
                  <a
                    href={createWhatsAppLink(
                      ilan.danisman?.whatsapp || ilan.danisman?.telefon || "905370530754",
                      `Merhaba, ${ilan.ilanNo || ''} numarali "${ilan.baslik}" ilani hakkinda bilgi almak istiyorum.`
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
                      WhatsApp ile Yaz
                    </Button>
                  </a>

                  <a href={`tel:+${ilan.danisman?.telefon?.replace(/\D/g, '') || "905370530754"}`} className="block">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full text-sm sm:text-base"
                      leftIcon={<Phone className="w-4 h-4 sm:w-5 sm:h-5" />}
                    >
                      Hemen Ara
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
                    <span className="text-[#666666] text-sm">Fiyat</span>
                    <span className="font-bold text-[#0B1F3A] text-sm sm:text-base">
                      {formatPrice(ilan.fiyat)}
                      {ilan.kategori === "kiralik" && "/ay"}
                    </span>
                  </div>
                  {ilan.ozellikler?.metrekare && ilan.ozellikler.metrekare > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#666666] text-sm">m2 Fiyati</span>
                      <span className="font-bold text-[#0B1F3A] text-sm sm:text-base">
                        {formatPrice(Math.round(ilan.fiyat / ilan.ozellikler.metrekare))}
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Tablet Contact Card - Only visible on tablet */}
              <Card padding="md" className="hidden sm:block lg:hidden">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {ilan.danisman?.foto ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={ilan.danisman.foto}
                          alt={ilan.danisman.ad}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                        <Building className="w-6 h-6 text-[#C9A84C]" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-[#0B1F3A]">
                        {ilan.danisman?.ad || "Kalinda Yapi"}
                      </p>
                      <p className="text-sm text-[#666666]">
                        {ilan.danisman?.unvan || "Emlak Danismani"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={createWhatsAppLink(
                        ilan.danisman?.whatsapp || ilan.danisman?.telefon || "905370530754",
                        `Merhaba, ${ilan.ilanNo || ''} numarali "${ilan.baslik}" ilani hakkinda bilgi almak istiyorum.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="whatsapp" size="md" leftIcon={<MessageCircle className="w-4 h-4" />}>
                        WhatsApp
                      </Button>
                    </a>
                    <a href={`tel:+${ilan.danisman?.telefon?.replace(/\D/g, '') || "905370530754"}`}>
                      <Button variant="primary" size="md" leftIcon={<Phone className="w-4 h-4" />}>
                        Ara
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Similar Listings */}
          {benzerIlanlar.length > 0 && (
            <div className="mt-8 sm:mt-12 lg:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] mb-4 sm:mb-6 lg:mb-8">
                Benzer Ilanlar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {benzerIlanlar.map((benzerIlan, index) => (
                  <IlanKart key={benzerIlan.id} ilan={benzerIlan} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Fixed Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e0e0e0] p-3 sm:p-4 lg:hidden z-50 safe-area-inset-bottom">
        <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-3">
          {/* Price on mobile */}
          <div className="hidden sm:block min-w-0 flex-shrink">
            <p className="text-xs text-[#666666]">Fiyat</p>
            <p className="font-bold text-[#0B1F3A] truncate">
              {formatPrice(ilan.fiyat)}
              {ilan.kategori === "kiralik" && <span className="text-xs font-normal">/ay</span>}
            </p>
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-2 flex-1 sm:flex-initial justify-end">
            <a
              href={createWhatsAppLink(
                ilan.danisman?.whatsapp || ilan.danisman?.telefon || "905370530754",
                `Merhaba, ${ilan.ilanNo || ''} numarali "${ilan.baslik}" ilani hakkinda bilgi almak istiyorum.`
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
                Ara
              </Button>
            </a>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: ilan.baslik,
                    text: ilan.aciklama?.slice(0, 100) || '',
                    url: window.location.href,
                  });
                }
              }}
              className="p-2.5 bg-[#F5F5F5] rounded-lg hover:bg-[#e0e0e0] transition-colors sm:hidden"
              aria-label="Paylas"
            >
              <Share2 className="w-5 h-5 text-[#0B1F3A]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
