import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../app/url";

export const departmentApi = createApi({
    reducerPath: 'departmentApi',
    baseQuery: fetchBaseQuery({baseUrl: 
        BASE_URL,
        credentials: 'include'
    }),
    tagTypes: ["Department"],
    endpoints: (builder)=> ({
        getDepartment: builder.query({
            // query: ({search, page, limit, sortBy, sortOrder}) => `department?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            query: () => 'department',
            providesTags: (result) => {
                const list = result?.departments || [];
                return [
                ...list.map(({ _id }) => ({ type: "Department", id: _id })),
                { type: "Department", id: "LIST" },
                ];
            },
        }),
        addDepartment: builder.mutation({
            query: (body) => ({
                url: 'department/create',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: "Department", id: "LIST" }],
        }),

        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `department/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: "Department", id: "LIST" }],
        })
    }),
})

export const {useGetDepartmentQuery, useAddDepartmentMutation, useDeleteDepartmentMutation} = departmentApi

//<span className="status-badge active">Active</span>