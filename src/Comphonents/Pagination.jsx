import React from "react";

const Pagination = () => {
  return (
    <nav className="pagination">
      <button className="page-btn" disabled>
        ‹ Prev
      </button>
      <span>
        Page <strong>1</strong> of <strong>5</strong>
      </span>
      <button className="page-btn">Next ›</button>
    </nav>
  );
};

export default Pagination;
