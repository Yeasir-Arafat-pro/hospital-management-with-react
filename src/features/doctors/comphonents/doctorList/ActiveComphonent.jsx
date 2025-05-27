import React from "react";

const ActiveComphonent = ({ isActive }) => {
  return (

      <td>
        <span className={`status-badge ${isActive ? "active" : "inactive"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </td>

  )
};

export default ActiveComphonent;
