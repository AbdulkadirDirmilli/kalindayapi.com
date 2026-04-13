"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, Grid3X3, List, ChevronDown, ShieldCheck } from "lucide-react";
import { Input, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { type Locale, defaultLocale } from "@/lib/i18n";
import { useLocale } from "@/components/providers/LocaleProvider";

interface FilterState {
  kategori: string;
  tip: string;
  konum: string;
  minFiyat: string;
  maxFiyat: string;
  arama: string;
  eidsStatus: string;
}

interface IlanFiltresiProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  totalCount: number;
  locale?: Locale;
}

// Static location options (city names don't change)
const konumSecenekleriBase = [
  { value: "Ortaca", label: "Ortaca" },
  { value: "Dalyan", label: "Dalyan" },
  { value: "Köyceğiz", label: "Köyceğiz" },
  { value: "Dalaman", label: "Dalaman" },
  { value: "Fethiye", label: "Fethiye" },
  { value: "Marmaris", label: "Marmaris" },
  { value: "Bodrum", label: "Bodrum" },
  { value: "Milas", label: "Milas" },
  { value: "Datça", label: "Datça" },
  { value: "Menteşe", label: "Menteşe" },
  { value: "Yatağan", label: "Yatağan" },
  { value: "Ula", label: "Ula" },
  { value: "Kavaklıdere", label: "Kavaklıdere" },
  { value: "Seydikemer", label: "Seydikemer" },
];

export default function IlanFiltresi({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  totalCount,
}: IlanFiltresiProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { dict } = useLocale();

  // Çeviriler
  const filtersT = dict?.filters || {
    allCategories: "Tüm Kategoriler",
    allTypes: "Tüm Tipler",
    allLocations: "Tüm Konumlar",
    searchPlaceholder: "İlan ara..."
  };

  const listingsT = dict?.listings || {};
  const categoriesT = listingsT?.categories || {};
  const typesT = listingsT?.types || {};
  const filtersListT = listingsT?.filters || {};

  // Dynamic options with translations
  const kategoriSecenekleri = [
    { value: "", label: filtersT.allCategories },
    { value: "satilik", label: categoriesT.satilik || "Satılık" },
    { value: "kiralik", label: categoriesT.kiralik || "Kiralık" },
  ];

  const tipSecenekleri = [
    { value: "", label: filtersT.allTypes },
    { value: "daire", label: typesT.daire || "Daire" },
    { value: "villa", label: typesT.villa || "Villa" },
    { value: "arsa", label: typesT.arsa || "Arsa" },
    { value: "ticari", label: typesT.ticari || "Ticari" },
  ];

  const konumSecenekleri = [
    { value: "", label: filtersT.allLocations },
    ...konumSecenekleriBase
  ];

  const handleChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      kategori: "",
      tip: "",
      konum: "",
      minFiyat: "",
      maxFiyat: "",
      arama: "",
      eidsStatus: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Quick Filters Bar */}
      <div className="p-4 border-b border-[#e0e0e0]">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input
              placeholder={filtersT.searchPlaceholder}
              value={filters.arama}
              onChange={(e) => handleChange("arama", e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>

          {/* Quick Category Buttons */}
          <div className="flex gap-2">
            {kategoriSecenekleri.slice(1).map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  handleChange(
                    "kategori",
                    filters.kategori === opt.value ? "" : opt.value
                  )
                }
                className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  filters.kategori === opt.value
                    ? "bg-[#0B1F3A] text-white"
                    : "bg-[#F5F5F5] text-[#666666] hover:bg-[#e0e0e0]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Filter Toggle */}
          <Button
            variant={isExpanded ? "primary" : "outline"}
            onClick={() => setIsExpanded(!isExpanded)}
            leftIcon={<SlidersHorizontal className="w-4 h-4" />}
          >
            {filtersT.filter || "Filtrele"}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-[#F5F5F5] border-b border-[#e0e0e0]">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select
                  label={filtersT.propertyType || "Emlak Tipi"}
                  value={filters.tip}
                  onChange={(e) => handleChange("tip", e.target.value)}
                  options={tipSecenekleri}
                />

                <Select
                  label={filtersT.location || "Konum"}
                  value={filters.konum}
                  onChange={(e) => handleChange("konum", e.target.value)}
                  options={konumSecenekleri}
                />

                <Input
                  label={filtersT.minPrice || "Min. Fiyat (TL)"}
                  type="number"
                  value={filters.minFiyat}
                  onChange={(e) => handleChange("minFiyat", e.target.value)}
                  placeholder={filtersT.min || "Min"}
                />

                <Input
                  label={filtersT.maxPrice || "Max. Fiyat (TL)"}
                  type="number"
                  value={filters.maxFiyat}
                  onChange={(e) => handleChange("maxFiyat", e.target.value)}
                  placeholder={filtersT.max || "Max"}
                />
              </div>

              {/* EIDS Filter */}
              <div className="mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.eidsStatus === "verified"}
                    onChange={(e) =>
                      handleChange("eidsStatus", e.target.checked ? "verified" : "")
                    }
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-[#1a1a1a]">
                    {filtersT.onlyVerified || "Sadece EIDS Doğrulanmış İlanları Göster"}
                  </span>
                </label>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    leftIcon={<X className="w-4 h-4" />}
                  >
                    {filtersT.clearFilters || "Filtreleri Temizle"}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Bar */}
      <div className="px-4 py-3 flex items-center justify-between bg-white">
        <p className="text-sm text-[#666666]">
          <span className="font-semibold text-[#0B1F3A]">{totalCount}</span> {filtersT.listingsFound || "ilan bulundu"}
        </p>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-[#F5F5F5] rounded-lg p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-white text-[#0B1F3A] shadow-sm"
                : "text-[#666666] hover:text-[#0B1F3A]"
            }`}
            aria-label={filtersT.gridView || "Grid görünümü"}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-white text-[#0B1F3A] shadow-sm"
                : "text-[#666666] hover:text-[#0B1F3A]"
            }`}
            aria-label={filtersT.listView || "Liste görünümü"}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
