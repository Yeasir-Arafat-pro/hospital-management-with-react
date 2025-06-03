import React, { useMemo, useState } from "react";
import "./DoctorLish.css";
import { useGetDoctorQuery, useUpdateDoctorMutation } from "../doctorApi";
import BasicTable from "../../../Comphonents/BasicTable";
import { NavLink, useNavigate } from "react-router-dom";

const DoctorList = () => {
  const navigate = useNavigate()
  const { data: doctors, isLoading, error } = useGetDoctorQuery();
  const [updateDoctor] = useUpdateDoctorMutation();

  const doctorsData = useMemo(() => doctors?.payload?.doctors ?? [], [doctors]);

  const handleDeactive = (id) => {
    updateDoctor({
      id: id,
      isActive: false,
    });
  };
  const handleActive = (id) => {
    updateDoctor({
      id: id,
      isActive: true,
    });
  };

  /** @type import('@tanstack/react-table').columnDef<any> */
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Specialty",
      accessorKey: "specialty",
    },
    {
      header: "Department",
      accessorKey: "department.name",
    },
    {
      header: "Availability",
      accessorFn: (row) => row?.readableAvailability,
    },
    {
      header: "Status",
      accessorFn: (row) => (
        <span className={`status-badge ${row.isActive ? "active" : "inactive" }`}>
          {" "}
          {row.isActive ? "ACTIVE" : "INACTIVE"}{" "}
        </span>
      ),
      // row.isActive ? (
      //   <span className={`status-badge active`}>Active</span>
      // ) : (
      //   <span className={`status-badge inactive`}>Inactive</span>
      // ),
      cell: (info) => info.getValue(),
    },
    {
      header: "Actions",
      accessorFn: (row) => (
        <>
          <button className="btn-outline" onClick={()=> navigate(`/doctors/${row._id}`)}>View</button>
          {row.isActive === true ? (
            <button
              className="btn-outline danger"
              type="button"
              onClick={() => handleDeactive(row._id)}
            >
              Deactivate
            </button>
          ) : (
            <button
              className="btn-outline danger"
              type="button"
              onClick={() => handleActive(row._id)}
            >
              Active
            </button>
          )}
        </>
      ),

      cell: (info) => info.getValue(),
    },
  ];

  const [filtering, setFiltering] = useState([]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="page-header">
        <button className="btn">
          <NavLink to="/doctors/create" className="nav-link">
            Add Doctors
          </NavLink>
        </button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Patients..."
            id="user-search"
            onChange={(e) => setFiltering(e.target.value)}
          />
          <button id="search-user-btn">🔍</button>
        </div>
      </section>
      <BasicTable
        data={doctorsData}
        columns={columns}
        filtering={filtering}
        setFiltering={setFiltering}
      />
    </>
  );
};

export default DoctorList;
