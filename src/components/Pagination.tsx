import usePagination, { DOTS } from "../hooks/usePagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const paginationRange = usePagination({ totalPages, currentPage });

  const nextPage = () => {
    onPageChange(currentPage + 1);
  };

  const prevPage = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <nav className="pagination">
      <button onClick={prevPage} disabled={currentPage === 1}>
        &lt;
      </button>

      <ul className="pagination__list">
        {paginationRange?.map((item, index: number) => {
          if (item === DOTS) {
            return (
              <span key={index} className="pagination__dots">
                &#8230;
              </span>
            );
          }

          if (typeof item === "number") {
            return (
              <li
                key={index}
                className={`${
                  currentPage === item ? "pagination__item-selected" : ""
                }`}
              >
                <button onClick={() => onPageChange(item)}>{item}</button>
              </li>
            );
          }

          return null;
        })}
      </ul>

      <button onClick={nextPage} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
