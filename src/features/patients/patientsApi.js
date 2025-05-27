import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../app/url";

export const patientsApi = createApi({
  reducerPath: "patientsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Patient"],
  endpoints: (builder) => ({
    getPatient: builder.query({
  // query: ({search, page, limit, sortBy, sortOrder}) => `patient?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    query: () => `patient`,
  providesTags: (result) => {
    
    const list = result?.patients || [];
    return [
      ...list.map(({ _id }) => ({ type: "Patient", id: _id })),
      { type: "Patient", id: "LIST" },
    ];
  },
}),

    getPatientById: builder.query({
  query: (id) => `patient/${id}`,
  providesTags: (result) => {
    
    const list = result?.patients || [];
    return [
      ...list.map(({ _id }) => ({ type: "Patient", id: _id })),
      { type: "Patient", id: "LIST" },
    ];
  },
}),

    deletePatient: builder.mutation({
      query: (id) => ({
        url: `patient/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Patient", id: "LIST" }],
    }),
    addPatient: builder.mutation({
      query: (body) => ({
        url: `patient/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Patient", id: "LIST" }],
    }),
    updatePatient: builder.mutation({
        query: ({id, formData}) => ({
          url: `patient/${id}`,
          method: "PUT",
          body: formData
        }),
        invalidatesTags: ({_id}) => [{ type: "Patient", id: _id}],
      }),
  }),
});
export const {
  useGetPatientQuery,
  useGetPatientByIdQuery,
  useDeletePatientMutation,
  useAddPatientMutation,
  useUpdatePatientMutation
} = patientsApi;