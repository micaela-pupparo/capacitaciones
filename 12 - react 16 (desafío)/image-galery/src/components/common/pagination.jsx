const Pagination = ({ currentPage, onPageChange }) => {
  let getNumberPages = (currentPage) => {
    console.log(currentPage);
    if (currentPage === 1)
      return [currentPage, currentPage + 1, currentPage + 2];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  let arrayOfPages = getNumberPages(currentPage);

  return (
    <nav aria-label="...">
      <ul className="pagination">
        {arrayOfPages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={`page-${page}`}
            id={`${page}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
