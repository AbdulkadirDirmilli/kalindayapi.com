"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin, Maximize2, BedDouble, Bath, ArrowRight, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice, Ilan } from "@/lib/utils";

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

export default function OneCikanIlanlar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [oneCikanIlanlar, setOneCikanIlanlar] = useState<Ilan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOneCikanIlanlar = async () => {
      try {
        const response = await fetch("/api/ilanlar?oneCikan=true&limit=6");
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
  }, []);

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
            One Cikan Ilanlar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            En Guncel Emlak Firsatlari
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            Mugla'nin tum ilcelerinden seckin ilanlarimizi kesfedin.
            Satilik ve kiralik secenekler.
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
                <Link href={`/ilanlar/${ilan.slug || ilan.id}`}>
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
                          <Image
                            src={kapakFoto}
                            alt={ilan.baslik}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant={ilan.kategori === "satilik" ? "satilik" : "kiralik"}
                          size="md"
                        >
                          {ilan.kategori === "satilik" ? "Satilik" : "Kiralik"}
                        </Badge>
                      </div>

                      {/* Price */}
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-primary text-white px-3 py-1.5 rounded-lg font-bold">
                          {formatPrice(ilan.fiyat, ilan.paraBirimi)}
                          {ilan.kategori === "kiralik" && (
                            <span className="text-xs font-normal">/ay</span>
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
                        {ilan.baslik}
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
              Henuz one cikan ilan bulunmuyor.
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
          <Link href="/ilanlar">
            <Button
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Tum Ilanlari Gor
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
