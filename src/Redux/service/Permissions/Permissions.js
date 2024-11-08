import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PermissionsApi = createApi({
  reducerPath: "Permissions",
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
    addPermission: builder.mutation({
      query: (val) => ({
        url: `/permissions`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: val,
      }),
    }),
    deletePermission: builder.mutation({
      query: (val) => ({
        url: `/permissions`,
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: val,
      }),
    }),
  }),
});

export const { useAddPermissionMutation , useDeletePermissionMutation } = PermissionsApi;
