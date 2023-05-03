import { useMemo } from "react";

export const DOTS = "...";

interface PaginationRangeProps {
  totalPages: number;
  currentPage: number;
}

const usePagination = ({ totalPages, currentPage }: PaginationRangeProps) => {
  return useMemo(() => {
    const paginationRange = [];
    const maxPagesToShow = 6;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        paginationRange.push(i);
      }
    } else {
      const middlePage = Math.floor(maxPagesToShow / 2);
      const hasLeftDots = currentPage - middlePage > 1;
      const hasRightDots = currentPage + middlePage < totalPages;

      if (hasLeftDots && !hasRightDots) {
        paginationRange.push(1, DOTS);
        for (let i = totalPages - (maxPagesToShow - 2); i <= totalPages; i++) {
          paginationRange.push(i);
        }
      } else if (!hasLeftDots && hasRightDots) {
        for (let i = 1; i <= maxPagesToShow - 2; i++) {
          paginationRange.push(i);
        }
        paginationRange.push(DOTS, totalPages);
      } else if (hasLeftDots && hasRightDots) {
        paginationRange.push(1, DOTS);
        for (
          let i = currentPage - middlePage + 2;
          i <= currentPage + middlePage - 2;
          i++
        ) {
          paginationRange.push(i);
        }
        paginationRange.push(DOTS, totalPages);
      } else {
        for (let i = 1; i <= maxPagesToShow - 2; i++) {
          paginationRange.push(i);
        }
        paginationRange.push(DOTS);
        paginationRange.push(totalPages);
      }
    }

    return paginationRange;
  }, [totalPages, currentPage]);
};

export default usePagination;
