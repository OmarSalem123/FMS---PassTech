import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CustomVehicleApi = createApi({
  reducerPath: "CustomVehicle",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.passenger-mea.com/backend",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
   
    getAllCustomVehicles: builder.query({
      query: (val) => {
        const page = val.page ?? 1; 
        const limit = val.limit ?? 5; 
        return `/vehicles?page=${page}&limit=${limit}&sortBy=lastUpdate&sortOrder=desc`;
      },
    }),
   
  }),
});

export const {
  useGetAllCustomVehiclesQuery
} = CustomVehicleApi;
