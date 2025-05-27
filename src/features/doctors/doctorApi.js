import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../app/url";

export const doctorApi = createApi({
    reducerPath: 'doctorApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ["Doctor"],
    endpoints: (builder)=> ({
        getDoctor: builder.query({
            query: () => `doctor`,
            providesTags: (result) => {
                const list = result?.doctors || [];
                return [
                ...list.map(({ _id }) => ({ type: "Doctor", id: _id })),
                { type: "Doctor", id: "LIST" },
                ];
            },
        }),
        addDoctor: builder.mutation({
            query: (body) => ({
                url: 'doctor/create',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: "Doctor", id: "LIST" }],
        }),

        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `doctor/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: "Doctor", id: "LIST" }],
        })
    }),
})

export const {useGetDoctorQuery, useAddDoctorMutation, useDeleteDoctorMutation} = doctorApi