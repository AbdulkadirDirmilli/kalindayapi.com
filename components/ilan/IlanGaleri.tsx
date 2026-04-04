"use client";

import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import WatermarkImage from "@/components/ui/WatermarkImage";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Lightbox } from "@/components/ui/Modal";
import { motion, AnimatePresence } from "framer-motion";

interface IlanGaleriProps {
  fotograflar: string[];
  baslik: string;
}

// Video dosyası olup olmadığını kontrol et
function isVideo(url: string): boolean {
  return url.includes('/videos/') || /\.(mp4|webm|mov|avi)$/i.test(url);
}

export default function IlanGaleri({ fotograflar, baslik }: IlanGaleriProps) {
  // Videoları filtrele, sadece fotoğrafları göster
  const sadeceFotograflar = fotograflar.filter(url => !isVideo(url));

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
      setSelectedIndex(index);
    },
    [mainApi, thumbApi]
  );

  const scrollPrev = useCallback(() => {
    if (mainApi) {
      mainApi.scrollPrev();
      setSelectedIndex(mainApi.selectedScrollSnap());
    }
  }, [mainApi]);

  const scrollNext = useCallback(() => {
    if (mainApi) {
      mainApi.scrollNext();
      setSelectedIndex(mainApi.selectedScrollSnap());
    }
  }, [mainApi]);

  const onSelect = useCallback(() => {
    if (!mainApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
  }, [mainApi]);

  // Update selected index on scroll
  useState(() => {
    if (!mainApi) return;
    mainApi.on("select", onSelect);
  });

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <div className="relative rounded-2xl overflow-hidden bg-[#F5F5F5]">
        <div className="overflow-hidden" ref={mainRef}>
          <div className="flex">
            {sadeceFotograflar.map((foto, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 relative aspect-[16/10] cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <WatermarkImage
                  src={foto}
                  alt={`${baslik} - Görsel ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority={index === 0}
                  watermarkSize="lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {sadeceFotograflar.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#0B1F3A] hover:bg-white transition-colors shadow-lg"
              aria-label="Önceki görsel"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#0B1F3A] hover:bg-white transition-colors shadow-lg"
              aria-label="Sonraki görsel"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Expand Button */}
        <button
          onClick={() => openLightbox(selectedIndex)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#0B1F3A] hover:bg-white transition-colors shadow-lg"
          aria-label="Tam ekran görüntüle"
        >
          <Expand className="w-5 h-5" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm">
          {selectedIndex + 1} / {sadeceFotograflar.length}
        </div>
      </div>

      {/* Thumbnails */}
      {sadeceFotograflar.length > 1 && (
        <div className="overflow-hidden" ref={thumbRef}>
          <div className="flex gap-3">
            {sadeceFotograflar.map((foto, index) => (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                className={`flex-[0_0_80px] min-w-0 relative aspect-square rounded-lg overflow-hidden transition-all ${
                  index === selectedIndex
                    ? "ring-2 ring-[#C9A84C] ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <WatermarkImage
                  src={foto}
                  alt={`${baslik} - Küçük görsel ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  watermarkSize="sm"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={sadeceFotograflar}
        currentIndex={selectedIndex}
        onPrev={() =>
          setSelectedIndex((prev) =>
            prev === 0 ? sadeceFotograflar.length - 1 : prev - 1
          )
        }
        onNext={() =>
          setSelectedIndex((prev) =>
            prev === sadeceFotograflar.length - 1 ? 0 : prev + 1
          )
        }
      />
    </div>
  );
}
