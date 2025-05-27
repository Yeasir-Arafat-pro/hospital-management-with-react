import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../app/url";

export const roomApi = createApi({
    reducerPath: 'roomApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ["Room"],
    endpoints: (builder)=> ({
        getRoom: builder.query({
            // query: ({search, page, limit, sortBy, sortOrder}) => `room?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            query: () => 'room',
            providesTags: (result) => {
                const list = result?.rooms || [];
                return [
                ...list.map(({ _id }) => ({ type: "Room", id: _id })),
                { type: "Room", id: "LIST" },
                ];
            },
        }),
                getRoomById: builder.query({
            // query: ({search, page, limit, sortBy, sortOrder}) => `room?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            query: (id) => ({
                url: `room/${id}`,
            }),
            providesTags: (result) => {
                const list = result?.rooms || [];
                return [
                ...list.map(({ _id }) => ({ type: "Room", id: _id })),
                { type: "Room", id: "LIST" },
                ];
            },
        }),
        addRoom: builder.mutation({
            query: (body) => ({
                url: 'room/create',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: "Room", id: "LIST" }],
        }),

         updateRoomById: builder.mutation({
            query: ({id, data}) => ({

                url: `room/${id}`,
                method: 'PUT',
                body: data
             
            }),
            invalidatesTags: [{ type: "Room", id: "LIST" }],
        }),

        deleteRoom: builder.mutation({
            query: (id) => ({
                url: `room/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: "Room", id: "LIST" }],
        })
    }),
})

export const {useGetRoomQuery,useGetRoomByIdQuery, useAddRoomMutation, useDeleteRoomMutation, useUpdateRoomByIdMutation} = roomApi

// import React from 'react'
// import './RoomList.css'

// const RoomList = () => {
//   return (
//     <>
//       <section className="page-header">
//   <h1>Room Management</h1>
//   <div className="search-bar">
//     <input type="text" placeholder="Search rooms..." id="room-search" />
//     <button id="search-room-btn">🔍</button>
//   </div>
// </section>

// <section className="table-container">
//   <table className="data-table">
//     <thead>
//       <tr>
//         <th>Ward</th>
//         <th>Room No.</th>
//         <th>Bed No.</th>
//         <th>Status</th>
//         <th>Patient</th>
//         <th>Admitted At</th>
//         <th>Actions</th>
//       </tr>
//     </thead>
//     <tbody>

//       <tr>
//         <td>General</td>
//         <td>101</td>
//         <td>A</td>
//         <td><span className="status-badge available">Available</span></td>
//         <td>—</td>
//         <td>—</td>
//         <td>
//           <button className="btn-outline">Edit</button>
//           <button className="btn-outline danger">Delete</button>
//         </td>
//       </tr>
//       <tr>
//         <td>General</td>
//         <td>101</td>
//         <td>B</td>
//         <td><span className="status-badge occupied">Occupied</span></td>
//         <td>John Doe</td>
//         <td>2025‑05‑12</td>
//         <td>
//           <button className="btn-outline">View</button>
//           <button className="btn-outline danger">Discharge</button>
//         </td>
//       </tr>

//     </tbody>
//   </table>
// </section>

// <nav className="pagination">
//   <button className="page-btn" disabled>‹ Prev</button>
//   <span>Page <strong>1</strong> of <strong>3</strong></span>
//   <button className="page-btn">Next ›</button>
// </nav>
//     </>
//   )
// }

// export default RoomList