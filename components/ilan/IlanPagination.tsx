"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface IlanPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function IlanPagination({
  currentPage,
  totalPages,
  onPageChange,
}: IlanPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5; // Number of page buttons to show

    if (totalPages <= showPages + 2) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label="Sayfalama"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-colors ${
          currentPage === 1
            ? "text-[#999999] cursor-not-allowed"
            : "text-[#0B1F3A] hover:bg-[#F5F5F5]"
        }`}
        aria-label="Önceki sayfa"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Önceki</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-10 h-10 flex items-center justify-center text-[#999999]"
              >
                <MoreHorizontal className="w-4 h-4" />
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = currentPage === pageNum;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-[#0B1F3A] text-white"
                  : "text-[#0B1F3A] hover:bg-[#F5F5F5]"
              }`}
              aria-label={`Sayfa ${pageNum}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-colors ${
          currentPage === totalPages
            ? "text-[#999999] cursor-not-allowed"
            : "text-[#0B1F3A] hover:bg-[#F5F5F5]"
        }`}
        aria-label="Sonraki sayfa"
      >
        <span className="hidden sm:inline">Sonraki</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
