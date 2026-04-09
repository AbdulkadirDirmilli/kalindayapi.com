"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableMahallelerProps {
  mahalleler: string[];
  ilceAd: string;
  initialCount?: number;
}

export default function ExpandableMahalleler({
  mahalleler,
  ilceAd,
  initialCount = 20,
}: ExpandableMahallelerProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = mahalleler.length > initialCount;
  const displayedMahalleler = expanded ? mahalleler : mahalleler.slice(0, initialCount);
  const remainingCount = mahalleler.length - initialCount;

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">
        {ilceAd} Mahalleleri
      </h2>
      <p className="text-[#666666] mb-4">
        {ilceAd} ilçesinde toplam <strong>{mahalleler.length} mahalle</strong> bulunmaktadır.
        Emlak, tadilat ve inşaat hizmetlerimiz tüm mahallelerde geçerlidir.
      </p>
      <div className="flex flex-wrap gap-2">
        {displayedMahalleler.map((mahalle) => (
          <span
            key={mahalle}
            className="px-3 py-1.5 bg-[#F5F5F5] text-[#666666] text-sm rounded-full"
          >
            {mahalle.replace(" Mahallesi", "")}
          </span>
        ))}
        {hasMore && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="px-3 py-1.5 bg-[#0B1F3A] text-white text-sm rounded-full hover:bg-[#1a3a5c] transition-colors flex items-center gap-1 cursor-pointer"
          >
            +{remainingCount} mahalle daha
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>
      {hasMore && expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-4 px-4 py-2 bg-[#F5F5F5] text-[#666666] text-sm rounded-lg hover:bg-[#E5E5E5] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ChevronUp className="w-4 h-4" />
          Daha az göster
        </button>
      )}
    </div>
  );
}
