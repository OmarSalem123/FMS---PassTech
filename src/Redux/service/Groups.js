import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GroupsApi = createApi({
  reducerPath: "Groups",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.passenger-mea.com/backend/api",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllGroups: builder.query({
      query: () => "/groups",
    }),
  }),
});

export const { useGetAllGroupsQuery } = GroupsApi;
