import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectTotalPages,
  setCurrentPage,
} from '../features/postSlice';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

/**
 * Pagination renders page number buttons along with prev/next arrows.
 */
function Pagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  if (totalPages <= 1) return null;

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  // Build the array of page numbers to display
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Post pagination">
      <button
        className="pagination__btn pagination__btn--arrow"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <MdChevronLeft />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`pagination__btn ${
            page === currentPage ? 'pagination__btn--active' : ''
          }`}
          onClick={() => handlePageClick(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination__btn pagination__btn--arrow"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <MdChevronRight />
      </button>
    </nav>
  );
}

export default Pagination;
