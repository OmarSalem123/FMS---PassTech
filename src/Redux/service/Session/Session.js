import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";

// Redux API for Session and Token Management
export const SessionApi = createApi({
  reducerPath: "Session",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.passenger-mea.com/backend/api",
    credentials: "include", // Include cookies for session
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (val) => {
        const data = qs.stringify(val);
        return {
          url: "/session",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
      },
    }),
    getToken: builder.mutation({
      query: (credentials) => {
        const { email, password } = credentials;
        return {
          url: "/session/token",
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(`${email}:${password}`)}`,
          },
          withCredentials: true, 
        };
      },
    }),
    getSession: builder.query({
      query: () => "/session",
    }),
  }),
});

export const { useLoginUserMutation, useGetTokenMutation, useGetSessionQuery } =
  SessionApi;
