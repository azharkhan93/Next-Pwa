"use client";

import React from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md";
import { Button } from "../Button";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
  className,
  size = "md",
}) => {
  // Validation
  if (totalPages <= 0) return null;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const getVisiblePages = (): number[] => {
    const pages: number[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={`flex items-center justify-center gap-1 ${className ?? ""}`}
    >
      {/* First Page Button */}
      {showFirstLast && (
        <Button
          variant="outlined"
          size={size}
          onClick={() => handlePageClick(1)}
          disabled={isFirstPage}
          className="min-w-[auto]"
          aria-label="First page"
        >
          <MdFirstPage size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
        </Button>
      )}

      {/* Previous Button */}
      <Button
        variant="outlined"
        size={size}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={isFirstPage}
        className="min-w-[auto]"
        aria-label="Previous page"
      >
        <MdChevronLeft size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
      </Button>

      {/* Page Numbers */}
      {visiblePages[0] > 1 && (
        <>
          <Button
            variant="outlined"
            size={size}
            onClick={() => handlePageClick(1)}
            className="min-w-[auto]"
          >
            1
          </Button>
          {visiblePages[0] > 2 && (
            <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
          )}
        </>
      )}

      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "primary" : "outlined"}
          size={size}
          onClick={() => handlePageClick(page)}
          className="min-w-[auto]"
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
          )}
          <Button
            variant="outlined"
            size={size}
            onClick={() => handlePageClick(totalPages)}
            className="min-w-[auto]"
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next Button */}
      <Button
        variant="outlined"
        size={size}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={isLastPage}
        className="min-w-[auto]"
        aria-label="Next page"
      >
        <MdChevronRight size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
      </Button>

      {/* Last Page Button */}
      {showFirstLast && (
        <Button
          variant="outlined"
          size={size}
          onClick={() => handlePageClick(totalPages)}
          disabled={isLastPage}
          className="min-w-[auto]"
          aria-label="Last page"
        >
          <MdLastPage size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
        </Button>
      )}
    </div>
  );
};
