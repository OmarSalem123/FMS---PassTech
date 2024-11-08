import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const VehicleApi = createApi({
  reducerPath: "vehicle",
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
    listAllVehicles: builder.query({
      query: () => "/vehicles/all",
    }),
    getAllVehicles: builder.query({
      query: (val) => {
        const page = val.page ?? 1; 
        const limit = val.limit ?? 5; 
        return `/vehicles?page=${page}&limit=${limit}&sortBy=id&sortOrder=desc`;
      },
    }),
    getVehiclesSearch: builder.query({
      query: ({ page, search }) =>
        `/vehicles?page=${page}&limit=5&search=${search}&sortBy=id&sortOrder=desc`,
    }),
    getSpecificVehicle: builder.query({
      query: (id) => `/vehicles/${id}`,
    }),
    getSpecificVehicleImei: builder.query({
      query: (imei) => `/vehicles/imei/${imei}`,
    }),
    addVehicles: builder.mutation({
      query: (val) => {
        const formData = new FormData();
        for (const key in val) {
          if (Array.isArray(val[key])) {
            val[key].forEach((file) => {
              formData.append(key, file);
            });
          } else if (val[key] !== null) {
            formData.append(key, val[key]);
          }
        }
        return {
          url: "/vehicles/register",
          method: "POST",
          body: formData,
        };
      },
    }),

    editVehicle: builder.mutation({
      query: ({ id, val }) => ({
        url: `vehicles/${id}`,
        method: "PUT",
        body: val,
      }),
    }),

    editVehicleAttachments: builder.mutation({
      query: ({ vehicleId, attachments }) => {

        const formData = new FormData();
        if (Array.isArray(attachments)) {
          // Handle array fields like attachments
          attachments.forEach((file) => {
            formData.append("attachments", file);
          });
        }
        return {
          url: `/vehicles/${vehicleId}/attachments`,
          method: "PUT",
          body: formData,
        };
      },
    }),
    deleteVehicle: builder.mutation({
      query: (val) => ({
        url: `vehicles/${val}`,
        method: "DELETE",
        body: val,
      }),
    }),

    deleteVehicleAttachments: builder.mutation({
      query: (id) => ({
        url: `vehicles/attachments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useListAllVehiclesQuery,
  useGetAllVehiclesQuery,
  useGetVehiclesSearchQuery,
  useGetSpecificVehicleQuery,
  useGetSpecificVehicleImeiQuery,
  useLazyGetAllVehiclesQuery,
  useLazyGetSpecificVehicleQuery,
  useAddVehiclesMutation,
  useEditVehicleMutation,
  useEditVehicleAttachmentsMutation,
  useDeleteVehicleMutation,
  useDeleteVehicleAttachmentsMutation,
} = VehicleApi;
