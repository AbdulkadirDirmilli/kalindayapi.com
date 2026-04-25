"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IlanKart, IlanFiltresi, IlanPagination } from "@/components/ilan";
import { Ilan } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { type Locale, defaultLocale } from "@/lib/i18n";

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

interface IlanlarClientProps {
  initialIlanlar: Ilan[];
  initialTotal: number;
  locale: Locale;
  texts: {
    loading: string;
    error: string;
    retry: string;
    noResults: string;
    noResultsDesc: string;
    clearFilters: string;
  };
}

export default function IlanlarClient({
  initialIlanlar,
  initialTotal,
  locale,
  texts,
}: IlanlarClientProps) {
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
  const [ilanlar, setIlanlar] = useState<Ilan[]>(initialIlanlar);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(initialTotal);
  const [totalPages, setTotalPages] = useState(Math.ceil(initialTotal / ITEMS_PER_PAGE));
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Fetch ilanlar from API when filters change or user paginates
  useEffect(() => {
    // Skip initial fetch since we have SSR data
    if (!hasUserInteracted) return;

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
        params.append("lang", locale);

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
  }, [currentPage, filters, locale, hasUserInteracted]);

  // Reset page when filters change
  const handleFilterChange = (newFilters: FilterState) => {
    setHasUserInteracted(true);
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setHasUserInteracted(true);
    setCurrentPage(page);
    // Scroll to top of listings
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <>
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
          locale={locale}
        />
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#C9A84C]" />
          <span className="ml-3 text-lg text-gray-600">{texts.loading}</span>
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
          <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">{texts.error}</h3>
          <p className="text-[#666666] mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#C9A84C] text-white rounded-lg hover:bg-[#b8973f] transition-colors"
          >
            {texts.retry}
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
                locale={locale}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <IlanPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
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
          <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">{texts.noResults}</h3>
          <p className="text-[#666666] mb-6">{texts.noResultsDesc}</p>
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
            {texts.clearFilters}
          </button>
        </motion.div>
      )}
    </>
  );
}
