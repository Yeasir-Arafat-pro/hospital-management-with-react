import React, { useEffect, useMemo, useState } from "react";

import { format } from "date-fns";

import BasicTable from "../../../Comphonents/BasicTable";
import { NavLink } from "react-router-dom";
import { useDeleteRoomMutation, useGetRoomByIdQuery, useGetRoomQuery, useUpdateRoomByIdMutation } from "../roomApi";
import "./RoomList.css";
//const columnHelper = createColumnHelper();

const RoomList = () => {
  const [roomId, setRoomId] = useState('');
  //const {deleteRoom} = useDeleteRoomMutation()
  const { data } = useGetRoomQuery();  
  
  const {data: room} = useGetRoomByIdQuery(roomId, {skip: !roomId})
  const [updateRoomById] =useUpdateRoomByIdMutation()
  

  

  
  const rooms = useMemo(() => data?.payload?.rooms ?? [], [data]);
  const singleRoom = useMemo(() => room?.payload?.room ?? [], [room]);

  const handleDischarge = async (id) => {
    const data = {
      dischargedAt: new Date()
    }
   await updateRoomById({id, data})
  }


  // const handleRoomAdmitView =  (id) => {
  //     //const room =   getRoomById(id)
  //    // console.log(room);
      
  // }
  /** @type import('@tanstack/react-table').columnDef<any> */
  const columns = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <button
        className={row.getIsExpanded() ? "status-badge occupied" : "status-badge  active"}
          onClick={row.getToggleExpandedHandler()}
          style={{ cursor: "pointer", padding: "0 8px" }}
        >
          {row.getIsExpanded() ? "➖" : "➕"}
        </button>
      ) : null,
  },
    {
      header: "Ward",
      accessorKey: "ward",
    },
    {
      header: "Room No.",
      accessorKey: "roomNumber",
    },
    {
      header: "Bed No.",
      accessorKey: "bedNumber",
    },
    {
      header: "Status",
      accessorKey: "isAvailable",
      accessorFn: (row) =>
        row.isAvailable === true ? "available" : "occupied",
      cell: (info) => (
        <span className={`status-badge ${info.getValue()}`}>
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "patient",
      accessorFn: (row) => (row.patient ? row.patient.name : "—"),
      cell: (info) => info.getValue(),
    },
    {
      header: "Admitted At",
      accessorKey: "admittedAt",
      accessorFn: (row) =>
        row.admittedAt ? format(new Date(row.admittedAt), "dd MMM yyyy") : "—",
      cell: (info) => info.getValue(),
    },
    {
      header: "Actions",
      accessorFn: (row) =>
        row.admittedAt ? (
          <>
            <NavLink state={row} className="btn btn-outline danger" onClick={()=> setRoomId(row._id)} to='/rooms/detail'>View</NavLink>
            <button className="btn-outline danger" onClick={() => handleDischarge(row._id)}>Discharge</button>
          </>
        ) : (
          <>
            <NavLink state={row} className="nav-link btn-outline danger" onClick={()=> setRoomId(row._id)} to='/rooms/update'>Edit</NavLink>
            <button className="btn-outline danger">Delete</button>
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
          <NavLink to="/rooms/create" className="nav-link">
            Add Room
          </NavLink>
        </button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search users..."
            id="user-search"
            onChange={(e) => setFiltering(e.target.value)}
          />
          <button id="search-user-btn">🔍</button>
        </div>
      </section>
      <BasicTable
        data={rooms}
        singleData={singleRoom}
        columns={columns}
        filtering={filtering}
        setFiltering={setFiltering}
      />
    </>
  );
};

export default RoomList;

// import React, { useMemo } from 'react'
// import { useLocation } from 'react-router-dom'
// import { useGetPatientQuery } from '../../patients/patientsApi';
// import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
// import * as Yup from "yup";


// const RoomUpdate = () => {
//   const {state} = useLocation()
//   const {ward, roomNumber, bedNumber, _id} = state
  
//   const {data} = useGetPatientQuery()

//   const patients = useMemo(() => data?.payload?.patients ?? [], [data]);

//   return (
//    <>
// <section  className="form-container">
//   <h2>Admit / Transfer Patient</h2>
//   <form id="admit-form"  className="grid-form">

//   </form>
// </section>
// </>
//   )
// }

// export default RoomUpdate
