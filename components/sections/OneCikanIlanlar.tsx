"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import WatermarkImage from "@/components/ui/WatermarkImage";
import { motion, useInView } from "framer-motion";
import { MapPin, Maximize2, BedDouble, Bath, ArrowRight, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice, getInsaatDurumuLabel, getInsaatDurumuBadgeClass, getIlanBaslik, Ilan } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

// Video dosyası olup olmadığını kontrol et
function isVideo(url: string): boolean {
  return url.includes('/videos/') || /\.(mp4|webm|mov|avi)$/i.test(url);
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

interface OneCikanIlanlarProps {
  lang?: Locale;
  dict?: any;
}

export default function OneCikanIlanlar({ lang = 'tr', dict }: OneCikanIlanlarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [oneCikanIlanlar, setOneCikanIlanlar] = useState<Ilan[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback translations
  const t = dict?.home?.featured || {
    badge: "Öne Çıkan İlanlar",
    title: "En Güncel Emlak Fırsatları",
    subtitle: "Muğla'nın tüm ilçelerinden seçkin ilanlarımızı keşfedin. Satılık ve kiralık seçenekler.",
    forSale: "Satılık",
    forRent: "Kiralık",
    noListings: "Henüz öne çıkan ilan bulunmuyor.",
    viewAll: "Tüm İlanları Gör",
    perMonth: "/ay",
  };

  useEffect(() => {
    const fetchOneCikanIlanlar = async () => {
      try {
        const response = await fetch(`/api/ilanlar?oneCikan=true&limit=6&lang=${lang}`);
        if (response.ok) {
          const data = await response.json();
          setOneCikanIlanlar(data.ilanlar || []);
        }
      } catch (error) {
        console.error("One cikan ilanlar yuklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOneCikanIlanlar();
  }, [lang]);

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            {t.title}
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        )}

        {/* Listings Grid */}
        {!loading && oneCikanIlanlar.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {oneCikanIlanlar.map((ilan) => (
              <motion.div key={ilan.id} variants={itemVariants}>
                <Link href={`/${lang}/ilanlar/${ilan.slug || ilan.id}`}>
                  <Card
                    variant="interactive"
                    padding="none"
                    className="h-full overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      {(() => {
                        const kapakFoto = ilan.fotograflar?.find(f => !isVideo(f));
                        return kapakFoto ? (
                          <WatermarkImage
                            src={kapakFoto}
                            alt={getIlanBaslik(ilan, lang)}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            watermarkSize="md"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Maximize2 className="w-12 h-12" />
                          </div>
                        );
                      })()}
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
                        <span className="bg-primary text-white px-3 py-1.5 rounded-lg font-bold">
                          {formatPrice(ilan.fiyat, ilan.paraBirimi)}
                          {ilan.kategori === "kiralik" && (
                            <span className="text-xs font-normal">{t.perMonth}</span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Location */}
                      <div className="flex items-center gap-1 text-text-light text-sm mb-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>
                          {ilan.konum.mahalle ? `${ilan.konum.mahalle}, ` : ""}
                          {ilan.konum.ilce}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                        {getIlanBaslik(ilan, lang)}
                      </h3>

                      {/* Features */}
                      <div className="flex items-center gap-4 text-sm text-text-light">
                        {ilan.ozellikler?.metrekare && (
                          <div className="flex items-center gap-1">
                            <Maximize2 className="w-4 h-4" />
                            <span>{ilan.ozellikler.metrekare} m²</span>
                          </div>
                        )}
                        {ilan.ozellikler?.odaSayisi && (
                          <div className="flex items-center gap-1">
                            <BedDouble className="w-4 h-4" />
                            <span>{ilan.ozellikler.odaSayisi}</span>
                          </div>
                        )}
                        {ilan.ozellikler?.banyoSayisi && (
                          <div className="flex items-center gap-1">
                            <Bath className="w-4 h-4" />
                            <span>{ilan.ozellikler.banyoSayisi}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && oneCikanIlanlar.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-light">
              {t.noListings}
            </p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href={`/${lang}/ilanlar`}>
            <Button
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {t.viewAll}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
