import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PositionsApi = createApi({
  reducerPath: "Positions",
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
    getAllPositions: builder.query({
      query: () => "/positions",
    }),
    getDevicePosition: builder.query({
      query: (deviceId) => `/positions?deviceId=${deviceId}`,
    }),
    getHistoryPosition: builder.query({
      query: ({ deviceId, from, to }) =>
        `/positions?deviceId=${deviceId}&from=${from}&to=${to}`,
    }),
    getGeoCodePosition: builder.query({
      query: ({ lat, lon }) =>
        `/server/geocode?latitude=${lat}&longitude=${lon}`,
    }),
  }),
});

export const {
  useGetAllPositionsQuery,
  useGetDevicePositionQuery,
  useGetHistoryPositionQuery,
  useLazyGetHistoryPositionQuery,
  useGetGeoCodePositionQuery,
  useLazyGetGeoCodePositionQuery,
} = PositionsApi;
