
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AlertsApi = createApi({
  reducerPath: "Alerts",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllAlert: builder.query({
      query: () => "/events/alerts/count",
    }),
    getSpeedAlert: builder.query({
      query: (val) => {
        const page = val.page ?? 1;
        const limit = val.limit ?? 5;
        const search = val.search ?? "";
        const sortBy = val.sortBy ?? "";
        const sortOrder = val.sortOrder ?? "";
        return `/events/alerts/info/deviceOverSpeed?search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`;
      },
    }),
    getGeofencesEnterAlert: builder.query({
      query: (val) => {
        const page = val.page ?? 1;
        const limit = val.limit ?? 5;
        const search = val.search ?? "";
        const sortBy = val.sortBy ?? "";
        const sortOrder = val.sortOrder ?? "";
        return `/events/alerts/info/geofenceEnter?search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`;
      },
    }),
    getGeofencesExitAlert: builder.query({
      query: () => "/events/alerts/info/geofenceExit",
    }),
    getIdleAlert: builder.query({
      query: () => "/events/alerts/info/deviceOverspeed",
    }),
    getSosAlert: builder.query({
      query: () => "/events/alerts/info/deviceOverspeed",
    }),
    getPowerCutAlert: builder.query({
      query: () => "/events/alerts/info/deviceOverspeed",
    }),
    getOtherAlert: builder.query({
      query: (val) => {
        const page = val.page ?? 1;
        const limit = val.limit ?? 5;
        const search = val.search ?? "";
        const sortBy = val.sortBy ?? "";
        const sortOrder = val.sortOrder ?? "";
        return `/events/alerts/others?search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`;
      },
    }),
    getAllDevicesStatus: builder.query({
      query: () => "/events/devices/counts",
    }),
  }),
});

export const {
  useGetAllAlertQuery,
  useGetSpeedAlertQuery,
  useGetIdleAlertQuery,
  useGetGeofencesExitAlertQuery,
  useGetGeofencesEnterAlertQuery,
  useGetOtherAlertQuery,
  useGetPowerCutAlertQuery,
  useGetSosAlertQuery,
  useGetAllDevicesStatusQuery,
} = AlertsApi;
