import React from "react";
import { NavLink } from "react-router-dom";

const PageHeader = ({ setSearch }) => {
  return (
    <section className="page-header">
      <button className="page-btn">
        <NavLink to="/doctors/create" className="nav-link">
          Add Patient
        </NavLink>
      </button>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search doctors..."
          id="doctor-search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button id="search-doctor-btn">🔍</button>
      </div>
    </section>
  );
};

export default PageHeader;
