"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { IlanKart, IlanFiltresi, IlanPagination } from "@/components/ilan";
import { generateBreadcrumbSchema } from "@/lib/jsonld";
import { Ilan } from "@/lib/utils";
import { ChevronRight, Home, Loader2 } from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 12;

interface FilterState {
  kategori: string;
  tip: string;
  konum: string;
  minFiyat: string;
  maxFiyat: string;
  arama: string;
  eidsStatus: string;
}

export default function IlanlarPage() {
  const [filters, setFilters] = useState<FilterState>({
    kategori: "",
    tip: "",
    konum: "",
    minFiyat: "",
    maxFiyat: "",
    arama: "",
    eidsStatus: "",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch ilanlar from API
  useEffect(() => {
    const fetchIlanlar = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        params.append("limit", ITEMS_PER_PAGE.toString());

        if (filters.kategori) params.append("kategori", filters.kategori);
        if (filters.tip) params.append("tip", filters.tip);
        if (filters.konum) params.append("konum", filters.konum);
        if (filters.minFiyat) params.append("minFiyat", filters.minFiyat);
        if (filters.maxFiyat) params.append("maxFiyat", filters.maxFiyat);
        if (filters.arama) params.append("search", filters.arama);
        if (filters.eidsStatus) params.append("eidsStatus", filters.eidsStatus);

        const response = await fetch(`/api/ilanlar?${params.toString()}`);

        if (!response.ok) {
          throw new Error("İlanlar yüklenirken hata oluştu");
        }

        const data = await response.json();
        setIlanlar(data.ilanlar || []);
        setTotalCount(data.pagination?.total || 0);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bir hata oluştu");
        setIlanlar([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIlanlar();
  }, [currentPage, filters]);

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
              totalCount={totalCount}
            />
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#C9A84C]" />
              <span className="ml-3 text-lg text-gray-600">
                İlanlar yükleniyor...
              </span>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">
                Hata Oluştu
              </h3>
              <p className="text-[#666666] mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-[#C9A84C] text-white rounded-lg hover:bg-[#b8973f] transition-colors"
              >
                Tekrar Dene
              </button>
            </div>
          )}

          {/* Listings */}
          {!loading && !error && ilanlar.length > 0 && (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {ilanlar.map((ilan, index) => (
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
          )}

          {/* Empty State */}
          {!loading && !error && ilanlar.length === 0 && (
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
                    eidsStatus: "",
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
