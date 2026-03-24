"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Maximize2, BedDouble, Bath, Calendar, Heart } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatPrice, getRelativeTime, Ilan } from "@/lib/utils";

interface IlanKartProps {
  ilan: Ilan;
  variant?: "grid" | "list";
  index?: number;
}

export default function IlanKart({ ilan, variant = "grid", index = 0 }: IlanKartProps) {
  if (variant === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <Link href={`/ilanlar/${ilan.id}`}>
          <Card
            variant="interactive"
            padding="none"
            className="flex flex-col sm:flex-row overflow-hidden group"
          >
            {/* Image */}
            <div className="relative w-full sm:w-72 h-48 sm:h-auto flex-shrink-0">
              <Image
                src={ilan.fotograflar[0]}
                alt={ilan.baslik}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Badge */}
              <div className="absolute top-3 left-3">
                <Badge
                  variant={ilan.kategori === "satilik" ? "satilik" : "kiralik"}
                  size="sm"
                >
                  {ilan.kategori === "satilik" ? "Satılık" : "Kiralık"}
                </Badge>
              </div>
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
                      <span>{ilan.ozellikler.banyoSayisi} Banyo</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e0e0e0]">
                <span className="text-xl font-bold text-[#0B1F3A]">
                  {formatPrice(ilan.fiyat)}
                  {ilan.kategori === "kiralik" && (
                    <span className="text-sm font-normal text-[#666666]">/ay</span>
                  )}
                </span>
                <span className="text-xs text-[#999999] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {getRelativeTime(ilan.yayinTarihi)}
                </span>
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
      <Link href={`/ilanlar/${ilan.id}`}>
        <Card
          variant="interactive"
          padding="none"
          className="h-full overflow-hidden group"
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={ilan.fotograflar[0]}
              alt={ilan.baslik}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badge */}
            <div className="absolute top-4 left-4">
              <Badge
                variant={ilan.kategori === "satilik" ? "satilik" : "kiralik"}
                size="md"
              >
                {ilan.kategori === "satilik" ? "Satılık" : "Kiralık"}
              </Badge>
            </div>

            {/* Favorite Button */}
            <button
              className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                // TODO: Add to favorites
              }}
              aria-label="Favorilere ekle"
            >
              <Heart className="w-4 h-4 text-[#0B1F3A]" />
            </button>

            {/* Price */}
            <div className="absolute bottom-4 right-4">
              <span className="bg-[#0B1F3A] text-white px-3 py-1.5 rounded-lg font-bold">
                {formatPrice(ilan.fiyat)}
                {ilan.kategori === "kiralik" && (
                  <span className="text-xs font-normal">/ay</span>
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

            {/* Date */}
            <div className="mt-4 pt-4 border-t border-[#e0e0e0] flex items-center justify-between">
              <span className="text-xs text-[#999999]">
                İlan No: {ilan.ilanNo}
              </span>
              <span className="text-xs text-[#999999] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {getRelativeTime(ilan.yayinTarihi)}
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
