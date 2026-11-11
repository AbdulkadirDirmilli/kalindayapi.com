"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import { getLocalizedRoute, type Locale } from "@/lib/i18n";

interface HeroAramaProps {
  lang?: Locale;
  dict?: any;
}

const KONUMLAR = [
  "Ortaca",
  "Dalyan",
  "Köyceğiz",
  "Dalaman",
  "Fethiye",
  "Marmaris",
  "Bodrum",
  "Milas",
  "Datça",
  "Menteşe",
  "Yatağan",
  "Ula",
  "Kavaklıdere",
  "Seydikemer",
];

// Hizli fiyat secimleri (TL)
const FIYAT_ARALIKLARI = [
  { label: "0 - 3 Mn", min: "", max: "3000000" },
  { label: "3 - 7 Mn", min: "3000000", max: "7000000" },
  { label: "7 - 15 Mn", min: "7000000", max: "15000000" },
  { label: "15 Mn+", min: "15000000", max: "" },
];

export default function HeroArama({ lang = "tr", dict }: HeroAramaProps) {
  const router = useRouter();

  const [kategori, setKategori] = useState("satilik");
  const [konum, setKonum] = useState("");
  const [tip, setTip] = useState("");
  const [minFiyat, setMinFiyat] = useState("");
  const [maxFiyat, setMaxFiyat] = useState("");

  const t = dict?.home?.search || {
    title: "Bölgeyi bilen danışmanla evinizi bulun",
    subtitle:
      "Ortaca, Dalyan, Köyceğiz, Dalaman ve Fethiye'de satılık ve kiralık daire, villa, arsa ve ticari gayrimenkul portföyü.",
    forSale: "Satılık",
    forRent: "Kiralık",
    location: "Konum",
    allLocations: "Tüm Konumlar",
    type: "Emlak Tipi",
    allTypes: "Tüm Tipler",
    minPrice: "Min. Fiyat",
    maxPrice: "Maks. Fiyat",
    submit: "İlanları Ara",
    priceLabel: "Hızlı fiyat aralığı",
    callUs: "Hemen Arayın",
  };

  const typesT = dict?.listings?.types || {};
  const tipSecenekleri = [
    { value: "", label: t.allTypes },
    { value: "daire", label: typesT.daire || "Daire" },
    { value: "villa", label: typesT.villa || "Villa" },
    { value: "arsa", label: typesT.arsa || "Arsa" },
    { value: "ticari", label: typesT.ticari || "Ticari" },
  ];

  const ilanlarYolu = `/${lang}/${getLocalizedRoute("ilanlar", lang)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (kategori) params.set("kategori", kategori);
    if (konum) params.set("konum", konum);
    if (tip) params.set("tip", tip);
    if (minFiyat) params.set("minFiyat", minFiyat);
    if (maxFiyat) params.set("maxFiyat", maxFiyat);
    router.push(`${ilanlarYolu}?${params.toString()}`);
  };

  const selectClass =
    "w-full h-11 px-3 rounded-md border border-border bg-white text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent";
  const inputClass = selectClass;

  return (
    <section className="pt-28 md:pt-32 pb-8 md:pb-10 bg-surface border-b border-black/5">
      <div className="container mx-auto px-4">
        {/* Baslik - buyuk banner yerine kompakt metin */}
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-4xl font-bold text-primary leading-tight">
            {t.title}
          </h1>
          <p className="text-text-light mt-3 text-sm md:text-base">{t.subtitle}</p>
        </div>

        {/* Arama kutusu */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white rounded-xl border border-black/5 shadow-sm p-4 md:p-5"
        >
          {/* Satilik / Kiralik */}
          <div className="inline-flex p-1 bg-surface rounded-md mb-4">
            {[
              { value: "satilik", label: t.forSale },
              { value: "kiralik", label: t.forRent },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setKategori(opt.value)}
                className={`px-5 py-1.5 text-sm font-semibold rounded transition-colors ${
                  kategori === opt.value
                    ? "bg-primary text-white"
                    : "text-text-light hover:text-primary"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Filtre alanlari */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-text-light mb-1.5">
                {t.location}
              </label>
              <select
                value={konum}
                onChange={(e) => setKonum(e.target.value)}
                className={selectClass}
              >
                <option value="">{t.allLocations}</option>
                {KONUMLAR.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-text-light mb-1.5">
                {t.type}
              </label>
              <select
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                className={selectClass}
              >
                {tipSecenekleri.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-text-light mb-1.5">
                {t.minPrice}
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={minFiyat}
                onChange={(e) => setMinFiyat(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>

            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-text-light mb-1.5">
                {t.maxPrice}
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={maxFiyat}
                onChange={(e) => setMaxFiyat(e.target.value)}
                placeholder="—"
                className={inputClass}
              />
            </div>

            <div className="lg:col-span-1 flex items-end">
              <Button
                type="submit"
                variant="accent"
                className="w-full h-11"
                leftIcon={<Search className="w-4 h-4" />}
              >
                {t.submit}
              </Button>
            </div>
          </div>

          {/* Hizli fiyat secimleri */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-black/5">
            <span className="text-xs text-text-muted mr-1">{t.priceLabel}:</span>
            {FIYAT_ARALIKLARI.map((f) => {
              const aktif = minFiyat === f.min && maxFiyat === f.max;
              return (
                <button
                  key={f.label}
                  type="button"
                  onClick={() => {
                    setMinFiyat(f.min);
                    setMaxFiyat(f.max);
                  }}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    aktif
                      ? "border-accent bg-accent/10 text-primary font-semibold"
                      : "border-border text-text-light hover:border-accent/50"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </form>

        {/* Hizli erisim satiri */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm">
          <span className="inline-flex items-center gap-1.5 text-text-light">
            <MapPin className="w-4 h-4 text-accent" />
            Ortaca · Dalyan · Köyceğiz · Dalaman
          </span>
          <a
            href="tel:+905321591556"
            className="inline-flex items-center gap-1.5 text-primary font-semibold hover:text-accent transition-colors"
          >
            <Phone className="w-4 h-4" />
            +90 532 159 15 56
          </a>
          <Link
            href={ilanlarYolu}
            className="text-primary font-semibold hover:text-accent transition-colors"
          >
            {dict?.home?.featured?.viewAll || "Tüm İlanları Gör"} →
          </Link>
        </div>
      </div>
    </section>
  );
}
