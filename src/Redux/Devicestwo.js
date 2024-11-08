import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DevicestwoApi = createApi({
  reducerPath: "Devicestwo",
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
    getAllDevices: builder.query({
      query: () => "/devices",
    }),
    getSpecificDevice: builder.query({
      query: (deviceId) => `/devices?id=${deviceId}`,
    }),
    getUsersDevice: builder.query({
      query: (userId) => `/devices?userId=${userId}`,
    }),
    updateDeviceById: builder.mutation({
      query: ({ id, val }) => ({
        url: `/devices/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: val,
      }),
    }),
  }),
});

export const {
  useGetAllDevicesQuery,
  useGetSpecificDeviceQuery,
  useGetUsersDeviceQuery,
  useLazyGetUsersDeviceQuery,
  useUpdateDeviceByIdMutation,
} = DevicestwoApi;
