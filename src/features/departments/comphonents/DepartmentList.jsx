import React, { useMemo, useState } from "react";

import BasicTable from "../../../Comphonents/BasicTable";
import { NavLink } from "react-router-dom";
import { useGetDepartmentQuery } from "../departmentApi";

//const columnHelper = createColumnHelper();

const DepartmentList = () => {
  const { data } = useGetDepartmentQuery();
  const departments = useMemo(() => data?.payload?.departments ?? [], [data]);

  /** @type import('@tanstack/react-table').columnDef<any> */
  const columns = [
   {
     header: 'Name',
    accessorKey: 'name'
   },
    {
     header: 'Description',
    accessorKey: 'description'
   },
   {
     header: 'Status',
     accessorKey: 'isActive',
     accessorFn: row => row.isActive === true ? 'active': 'inactive',
      cell: info =>(
      <span className={`status-badge ${info.getValue()}`}>{info.getValue()}</span>
    )
   },
   {
     header: 'Actions',
    cell: (info) => (
      <>
        <button className="btn-outline">Edit</button>
        <button className="btn-outline danger">Delete</button>
      </>
    ),

  }

]

const [filtering, setFiltering] = useState([])

  return (
    <>
      <section className="page-header">
              <button className="btn">
                  <NavLink to="/departments/create" className='nav-link'>
                    Add Department
                  </NavLink>
                </button>
        <div className="search-bar">
          <input type="text" placeholder="Search users..." id="user-search" onChange={(e)=> setFiltering(e.target.value)} />
          <button id="search-user-btn">🔍</button>
        </div>
      </section>
      <BasicTable data={departments} columns={columns} filtering={filtering} setFiltering={setFiltering}  />
    </>
  );
};

export default DepartmentList;




