import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CustomDevicesApi = createApi({
  reducerPath: "CustomDevices",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.passenger-mea.com/backend/vehicles/users",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCustomDevices: builder.query({
      query: () => "/devices/all",
    }),

  }),
});

export const { useGetAllCustomDevicesQuery} = CustomDevicesApi;
