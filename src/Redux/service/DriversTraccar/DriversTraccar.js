import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DriverTraccarApi = createApi({
  reducerPath: "driverTraccar",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllDrivers: builder.query({
        query: () => "/drivers",
    }), 
    getDriversByDevice: builder.query({
        query: (id) => `/drivers?deviceId=${id}`,
    }),
  }),
})

export const {
  useGetAllDriversQuery,
  useGetDriversByDeviceQuery,
} = DriverTraccarApi;
