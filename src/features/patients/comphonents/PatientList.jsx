import React, { useMemo, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import BasicTable from "../../../Comphonents/BasicTable";
import { useDeletePatientMutation, useGetPatientQuery } from "../patientsApi";

//const columnHelper = createColumnHelper();

const PatientList = () => {
  const navigate = useNavigate();
  const { data } = useGetPatientQuery();
  const patients = useMemo(() => data?.payload?.patients ?? [], [data]);
const [deletePatient] = useDeletePatientMutation()


  /** @type import('@tanstack/react-table').columnDef<any> */
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "contact.email",
    },
    {
      header: "Phone",
      accessorKey: "contact.phone",
    },
    {
      header: "Address",
      accessorFn: (row) => `${row.address?.street}, ${row.address?.city}`,
      cell: (info) => info.getValue(),
    },
    {
      header: "Actions",
      accessorFn: (row) => (
        <>
          <button
            className="btn-outline"
            onClick={() => navigate(`/patients/details/${row._id}`)} > View </button>

          <button className="btn-outline" 
            onClick={() => navigate(`/patients/edit/${row._id}`)} >Edit</button>
          <button className="btn-outline danger" onClick={() => deletePatient(row._id)}>Remove</button>
        </>
      ),
      cell: (info) => info.getValue(),
    },
  ];

  const [filtering, setFiltering] = useState([]);

  return (
    <>
      <section className="page-header">
        <button className="btn">
          <NavLink to="/patients/create" className="nav-link">
            Add Patient
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
        data={patients}
        columns={columns}
        filtering={filtering}
        setFiltering={setFiltering}
      />
    </>
  );
};

export default PatientList;
