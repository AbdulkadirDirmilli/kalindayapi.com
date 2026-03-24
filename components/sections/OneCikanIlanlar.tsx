"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin, Maximize2, BedDouble, Bath, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice, Ilan } from "@/lib/utils";
import ilanlarData from "@/data/ilanlar.json";

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

  // Get featured listings
  const oneCikanIlanlar = (ilanlarData.ilanlar as Ilan[])
    .filter((ilan) => ilan.oneCikan)
    .slice(0, 6);

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
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
            Öne Çıkan İlanlar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-2 mb-4">
            En Güncel Emlak Fırsatları
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            Muğla'nın tüm ilçelerinden seçkin ilanlarımızı keşfedin.
            Satılık ve kiralık seçenekler.
          </p>
        </motion.div>

        {/* Listings Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {oneCikanIlanlar.map((ilan) => (
            <motion.div key={ilan.id} variants={itemVariants}>
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
                    <h3 className="text-lg font-bold text-[#0B1F3A] mb-3 line-clamp-2 group-hover:text-[#C9A84C] transition-colors">
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
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

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
              Tüm İlanları Gör
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
