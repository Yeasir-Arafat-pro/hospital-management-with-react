import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../app/url";

export const appointmentApi = createApi({
    reducerPath: 'appointmentApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ["Appointment"],
    endpoints: (builder)=> ({
        getAppointment: builder.query({
            // query: ({search, page, limit, sortBy, sortOrder}) => `appointment?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            query: () => 'appointment',
            providesTags: (result) => {
                const list = result?.appointments || [];
                return [
                ...list.map(({ _id }) => ({ type: "Appointment", id: _id })),
                { type: "Appointment", id: "LIST" },
                ];
            },
        }),

        getAppointmentSlots: builder.query({
            // query: ({search, page, limit, sortBy, sortOrder}) => `appointment?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            query: (date) => `appointment/slots?date=${date}`,
            providesTags: (result) => {
                const list = result?.appointments || [];
                return [
                ...list.map(({ _id }) => ({ type: "Appointment", id: _id })),
                { type: "Appointment", id: "LIST" },
                ];
            },
        }),

        addAppointment: builder.mutation({
            query: (body) => ({
                url: 'appointment/create',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: "Appointment", id: "LIST" }],
        }),

        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `appointment/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: "Appointment", id: "LIST" }],
        })
    }),
})

export const {useGetAppointmentQuery, useAddAppointmentMutation, useDeleteAppointmentMutation, useGetAppointmentSlotsQuery} = appointmentApi