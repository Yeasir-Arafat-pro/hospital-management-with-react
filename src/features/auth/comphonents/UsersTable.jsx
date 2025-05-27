import React, { useMemo, useState } from "react";

import { useGetUsersQuery } from "../usersApi";
import BasicTable from "../../../Comphonents/BasicTable";
import { NavLink } from "react-router-dom";

//const columnHelper = createColumnHelper();

const UsersTable = () => {
  const { data } = useGetUsersQuery();
  const users = useMemo(() => data?.payload?.users ?? [], [data]);

  /** @type import('@tanstack/react-table').columnDef<any> */
  const columns = [
   {
     header: 'Name',
    accessorKey: 'name'
   },
   {
     header: 'Email',
    accessorKey: 'email'
   },
   {
     header: 'Address',
    accessorKey: 'address'
   },
   {
     header: 'Role',
    accessorKey: 'role'
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
                  <NavLink to="/users/create" className='nav-link'>
                    Add User
                  </NavLink>
                </button>
        <div className="search-bar">
          <input type="text" placeholder="Search users..." id="user-search" onChange={(e)=> setFiltering(e.target.value)} />
          <button id="search-user-btn">🔍</button>
        </div>
      </section>
      <BasicTable data={users} columns={columns} filtering={filtering} setFiltering={setFiltering}  />
    </>
  );
};

export default UsersTable;




