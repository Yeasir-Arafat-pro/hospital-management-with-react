import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../app/url";

export const billingApi = createApi({
    reducerPath: 'billingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include'

    }),
    tagTypes: ["Billing"],
    endpoints: (builder)=> ({
        getBilling: builder.query({
            // query: ({search, page, limit, sortBy, sortOrder}) => `billing?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            query: () => 'billing',
            providesTags: (result) => {
                const list = result?.rooms || [];
                return [
                ...list.map(({ _id }) => ({ type: "Billing", id: _id })),
                { type: "Billing", id: "LIST" },
                ];
            },
        }),
                getBillingById: builder.query({
            // query: ({search, page, limit, sortBy, sortOrder}) => `billing?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            query: (id) => ({
                url: `billing/${id}`,
            }),
            providesTags: (result) => {
                const list = result?.rooms || [];
                return [
                ...list.map(({ _id }) => ({ type: "Billing", id: _id })),
                { type: "Billing", id: "LIST" },
                ];
            },
        }),
        addBilling: builder.mutation({
            query: (body) => ({
                url: 'billing/create',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: "Billing", id: "LIST" }],
        }),

         updateBillingById: builder.mutation({
            query: ({id, data}) => ({

                url: `billing/${id}`,
                method: 'PUT',
                body: data
             
            }),
            invalidatesTags: [{ type: "Billing", id: "LIST" }],
        }),

        deleteBilling: builder.mutation({
            query: (id) => ({
                url: `billing/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: "Billing", id: "LIST" }],
        })
    }),
})

export const {useGetBillingQuery,useGetBillingByIdQuery, useAddBillingMutation, useDeleteBillingMutation, useUpdateBillingByIdMutation} = billingApi
