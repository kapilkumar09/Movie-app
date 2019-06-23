import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Paginantion = props => {
  const { totalItems, pageSize, onPageChange, currentPage } = props;
  const numOfPages = Math.ceil(totalItems / pageSize);
  if (numOfPages === 1) return null;
  const pages = _.range(1, numOfPages + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
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

Paginantion.propTypes = {
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Paginantion;
