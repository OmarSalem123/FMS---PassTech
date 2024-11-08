import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const SessionApi = createApi({
  reducerPath: "Session",
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
    getSession: builder.query({
      query: () => "/session",
    }),
  }),
});

export const { useGetSessionQuery } = SessionApi;
