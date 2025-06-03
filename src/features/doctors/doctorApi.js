import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../app/url";

export const doctorApi = createApi({
    reducerPath: 'doctorApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
   // keepUnusedDataFor: 30, //gcTime default 60 seceonds
    tagTypes: ["Doctor"],
    endpoints: (builder)=> ({
        getDoctor: builder.query({
            query: () => `doctor`,
            //refetchOnMountOrArgChange: 30, // staleTime 30 seconds 
            providesTags: (result) => {
                const list = result?.doctors || [];
                return [
                ...list.map(({ _id }) => ({ type: "Doctor", id: _id })),
                { type: "Doctor", id: "LIST" },
                ];
            },
        }),

        getDoctorById: builder.query({
            query: (id) => `doctor/${id}`,
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

        updateDoctor: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `doctor/${id}`,
                method: 'PATCH',
                body: {...rest}
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

export const {useGetDoctorQuery, useAddDoctorMutation, useDeleteDoctorMutation, useUpdateDoctorMutation, useGetDoctorByIdQuery} = doctorApi

// pollingInterval: <মিলিসেকেন্ড> → ব্যাকগ্রাউন্ডে নির্দিষ্ট ইনটারভালে ফেচ চালাবে

// refetchOnFocus: true/false → ট্যাব/উইন্ডো focus এ পুনরায় ফেচ করবে কি না

// refetchOnReconnect: true/false → নেটওয়ার্ক পুনরায় সংযুক্ত হলে পুনরায় ফেচ করবে কি না

//  const { data, isLoading } = useGetTodosQuery(undefined, {
//     refetchOnMountOrArgChange: 60,
//     // pollingInterval: 10000,  // প্রতি ১০ সেকেন্ডে auto-fetch করতে চাইলে
//   });