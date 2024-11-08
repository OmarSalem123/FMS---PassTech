import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UsersApi = createApi({
  reducerPath: "Users",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.passenger-mea.com/api",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getChildUsers: builder.query({
      query: (userId) => `/users?userId=${userId}`,
    }),
    getSpecificUser: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
     addUser: builder.mutation({
      query: (val) => ({
        url: `/users`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: val,
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, val }) => ({
        url: `/users/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: val,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetChildUsersQuery,
  useGetSpecificUserQuery,
  useLazyGetChildUsersQuery,
  useLazyGetAllUsersQuery,
  useLazyGetSpecificUserQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = UsersApi;
