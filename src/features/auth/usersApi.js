import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../app/url";

export const userApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ["User"],
    endpoints: (builder)=> ({
        getUsers: builder.query({
            query: () => 'users',
            providesTags: (result) => {
                const list = result?.users || [];
                 return [
                ...list.map(({ _id }) => ({ type: "User", id: _id })),
                { type: "User", id: "LIST" },
                ];
            },
        }),
        addUser: builder.mutation({
            query: (body) => ({
                url: 'users/create',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),

        loginUser: builder.mutation({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        })
    }),
})

export const {useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useLoginUserMutation} = userApi
