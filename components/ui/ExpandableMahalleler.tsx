"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Çeviriler
const translations = {
  tr: {
    title: "{district} Mahalleleri",
    description: "{district} ilçesinde toplam {count} mahalle bulunmaktadır. Emlak, tadilat ve inşaat hizmetlerimiz tüm mahallelerde geçerlidir.",
    more: "+{count} mahalle daha",
    less: "Daha az göster",
  },
  en: {
    title: "{district} Neighborhoods",
    description: "There are {count} neighborhoods in {district} district. Our real estate, renovation and construction services are available in all neighborhoods.",
    more: "+{count} more neighborhoods",
    less: "Show less",
  },
  ar: {
    title: "أحياء {district}",
    description: "يوجد {count} حي في منطقة {district}. خدماتنا العقارية والتجديد والبناء متاحة في جميع الأحياء.",
    more: "+{count} أحياء أخرى",
    less: "عرض أقل",
  },
  de: {
    title: "Stadtteile von {district}",
    description: "In {district} gibt es {count} Stadtteile. Unsere Immobilien-, Renovierungs- und Baudienstleistungen sind in allen Stadtteilen verfügbar.",
    more: "+{count} weitere Stadtteile",
    less: "Weniger anzeigen",
  },
  ru: {
    title: "Районы {district}",
    description: "В {district} {count} районов. Наши услуги по недвижимости, ремонту и строительству доступны во всех районах.",
    more: "+{count} районов ещё",
    less: "Показать меньше",
  },
};

interface ExpandableMahallelerProps {
  mahalleler: string[];
  ilceAd: string;
  locale?: string;
  initialCount?: number;
}

export default function ExpandableMahalleler({
  mahalleler,
  ilceAd,
  locale = "tr",
  initialCount = 20,
}: ExpandableMahallelerProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = mahalleler.length > initialCount;
  const displayedMahalleler = expanded ? mahalleler : mahalleler.slice(0, initialCount);
  const remainingCount = mahalleler.length - initialCount;

  const t = translations[locale as keyof typeof translations] || translations.tr;

  const formatText = (template: string) => {
    return template
      .replace("{district}", ilceAd)
      .replace("{count}", mahalleler.length.toString());
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">
        {formatText(t.title)}
      </h2>
      <p className="text-[#666666] mb-4">
        {formatText(t.description)}
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
            {t.more.replace("{count}", remainingCount.toString())}
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
          {t.less}
        </button>
      )}
    </div>
  );
}
