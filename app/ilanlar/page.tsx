"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { IlanKart, IlanFiltresi, IlanPagination } from "@/components/ilan";
import { generateBreadcrumbSchema } from "@/lib/jsonld";
import { Ilan } from "@/lib/utils";
import ilanlarData from "@/data/ilanlar.json";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 12;

interface FilterState {
  kategori: string;
  tip: string;
  konum: string;
  minFiyat: string;
  maxFiyat: string;
  arama: string;
}

export default function IlanlarPage() {
  const [filters, setFilters] = useState<FilterState>({
    kategori: "",
    tip: "",
    konum: "",
    minFiyat: "",
    maxFiyat: "",
    arama: "",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const allIlanlar = ilanlarData.ilanlar as Ilan[];

  // Filter listings
  const filteredIlanlar = useMemo(() => {
    return allIlanlar.filter((ilan) => {
      // Kategori filter
      if (filters.kategori && ilan.kategori !== filters.kategori) return false;

      // Tip filter
      if (filters.tip && ilan.tip !== filters.tip) return false;

      // Konum filter
      if (filters.konum) {
        const konumMatch =
          ilan.konum.ilce.toLowerCase().includes(filters.konum.toLowerCase()) ||
          ilan.konum.mahalle.toLowerCase().includes(filters.konum.toLowerCase());
        if (!konumMatch) return false;
      }

      // Min price filter
      if (filters.minFiyat && ilan.fiyat < parseInt(filters.minFiyat)) return false;

      // Max price filter
      if (filters.maxFiyat && ilan.fiyat > parseInt(filters.maxFiyat)) return false;

      // Search filter
      if (filters.arama) {
        const searchLower = filters.arama.toLowerCase();
        const matchesSearch =
          ilan.baslik.toLowerCase().includes(searchLower) ||
          ilan.aciklama.toLowerCase().includes(searchLower) ||
          ilan.konum.ilce.toLowerCase().includes(searchLower) ||
          ilan.konum.mahalle.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [allIlanlar, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredIlanlar.length / ITEMS_PER_PAGE);
  const paginatedIlanlar = filteredIlanlar.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "İlanlar", url: "/ilanlar" },
  ]);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hero Banner */}
      <section className="bg-[#0B1F3A] pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">İlanlar</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Emlak İlanları
            </h1>
            <p className="text-gray-300 max-w-2xl">
              Muğla'nın tüm ilçelerinde satılık ve kiralık gayrimenkuller.
              Hayalinizdeki evi bulun.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <IlanFiltresi
              filters={filters}
              onFilterChange={handleFilterChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalCount={filteredIlanlar.length}
            />
          </motion.div>

          {/* Listings */}
          {paginatedIlanlar.length > 0 ? (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {paginatedIlanlar.map((ilan, index) => (
                  <IlanKart
                    key={ilan.id}
                    ilan={ilan}
                    variant={viewMode}
                    index={index}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <IlanPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-[#e0e0e0] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-[#999999]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">
                İlan Bulunamadı
              </h3>
              <p className="text-[#666666] mb-6">
                Arama kriterlerinize uygun ilan bulunamadı. Filtreleri değiştirmeyi
                deneyin.
              </p>
              <button
                onClick={() =>
                  handleFilterChange({
                    kategori: "",
                    tip: "",
                    konum: "",
                    minFiyat: "",
                    maxFiyat: "",
                    arama: "",
                  })
                }
                className="text-[#C9A84C] font-medium hover:underline"
              >
                Tüm filtreleri temizle
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
