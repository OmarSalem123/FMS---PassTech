import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DevicesApi = createApi({
  reducerPath: "Devices",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.passenger-mea.com/backend/vehicles/user/",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllDevices: builder.query({
      query: () => "/uniquedevices",
    }),
    getSpecificDevice: builder.query({
      query: (deviceId) => `/uniquedevices?id=${deviceId}`,
    }),
    getUsersDevice: builder.query({
      query:(userId)=> `/uniquedevices?userId=${userId}`
    })
  }),
});

export const { useGetAllDevicesQuery, useGetSpecificDeviceQuery, useGetUsersDeviceQuery  ,useLazyGetUsersDeviceQuery} = DevicesApi;
