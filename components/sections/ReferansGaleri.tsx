"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

interface Proje {
  id: string;
  baslik: string;
  kategori: string | null;
  konum: string | null;
  oncesiFoto: string;
  sonrasiFoto: string;
}

// Fallback data in case API fails
const fallbackProjeler: Proje[] = [
  {
    id: "1",
    baslik: "Villa Projesi - Dalyan",
    kategori: "İnşaat",
    konum: "Dalyan, Ortaca",
    oncesiFoto: "/images/projects/villa-oncesi.jpg",
    sonrasiFoto: "/images/projects/villa-sonrasi.jpg",
  },
  {
    id: "2",
    baslik: "Mutfak Yenileme - Ortaca",
    kategori: "Tadilat",
    konum: "Ortaca Merkez",
    oncesiFoto: "/images/projects/mutfak-oncesi.jpg",
    sonrasiFoto: "/images/projects/mutfak-sonrasi.jpg",
  },
  {
    id: "3",
    baslik: "Daire Renovasyonu - Köyceğiz",
    kategori: "Tadilat",
    konum: "Köyceğiz Merkez",
    oncesiFoto: "/images/projects/daire-oncesi.jpg",
    sonrasiFoto: "/images/projects/daire-sonrasi.jpg",
  },
  {
    id: "4",
    baslik: "Bahçeli Ev - Dalaman",
    kategori: "İnşaat",
    konum: "Dalaman",
    oncesiFoto: "/images/projects/bahce-oncesi.jpg",
    sonrasiFoto: "/images/projects/bahce-sonrasi.jpg",
  },
  {
    id: "5",
    baslik: "Banyo Yenileme - Ortaca",
    kategori: "Tadilat",
    konum: "Ortaca Merkez",
    oncesiFoto: "/images/projects/banyo-oncesi.jpg",
    sonrasiFoto: "/images/projects/banyo-sonrasi.jpg",
  },
];

export default function ReferansGaleri() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAfter, setShowAfter] = useState<{ [key: string]: boolean }>({});
  const [projeler, setProjeler] = useState<Proje[]>(fallbackProjeler);

  useEffect(() => {
    const fetchProjeler = async () => {
      try {
        const response = await fetch('/api/oncesi-sonrasi');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setProjeler(data);
          }
        }
      } catch (error) {
        console.error('Projeler yuklenemedi:', error);
      }
    };
    fetchProjeler();
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const toggleImage = (id: string) => {
    setShowAfter((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
            Referans Projeler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            Öncesi - Sonrası Galeri
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            Tamamladığımız projelerden örnekler. Kaliteli işçilik ve
            profesyonel yaklaşımımızla fark yaratıyoruz.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors hidden md:flex"
            aria-label="Önceki"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors hidden md:flex"
            aria-label="Sonraki"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {projeler.map((proje) => (
                <div
                  key={proje.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                    {/* Image Container */}
                    <div
                      className="relative aspect-[4/3] cursor-pointer overflow-hidden"
                      onClick={() => toggleImage(proje.id)}
                    >
                      {/* Before Image */}
                      <Image
                        src={proje.oncesiFoto}
                        alt={`${proje.baslik} - Öncesi`}
                        fill
                        className={`object-cover transition-opacity duration-500 ${
                          showAfter[proje.id] ? "opacity-0" : "opacity-100"
                        }`}
                      />
                      {/* After Image */}
                      <Image
                        src={proje.sonrasiFoto}
                        alt={`${proje.baslik} - Sonrası`}
                        fill
                        className={`object-cover transition-opacity duration-500 ${
                          showAfter[proje.id] ? "opacity-100" : "opacity-0"
                        }`}
                      />

                      {/* Label */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                          {showAfter[proje.id] ? "SONRASI" : "ÖNCESİ"}
                        </span>
                      </div>

                      {/* Toggle Hint */}
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        Tıkla & Değiştir
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-accent text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                          {proje.kategori}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-primary mb-2">
                        {proje.baslik}
                      </h3>
                      <div className="flex items-center gap-1 text-text-light text-sm">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>{proje.konum}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm text-text-muted mt-6"
        >
          Görsellere tıklayarak öncesi-sonrası karşılaştırmasını görebilirsiniz
        </motion.p>
      </div>
    </section>
  );
}
