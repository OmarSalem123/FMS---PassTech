import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DriverApi = createApi({
  reducerPath: "driver",
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
    listAllDrivers: builder.query({
      query: () => "/drivers/get/all",
    }),
    getAllDrivers: builder.query({
      query: (val) => {
        const page = val.page ?? 1;
        const limit = val.limit ?? 5;
        return `/drivers?page=${page}&limit=${limit}&sortBy=id&sortOrder=desc`;
      },
    }),
    getSpecificDriver: builder.query({
      query: (id) => `/drivers/${id}`,
    }),
    getDriversSearch: builder.query({
      query: ({ page, search, limit }) =>
        `/drivers?page=${page}&limit=${limit}&search=${search}&sortBy=id&sortOrder=desc`,
    }),
    deleteDriver: builder.mutation({
      query: (id) => ({
        url: `drivers/${id}`,
        method: "DELETE",
      }),
    }),
    addDriver: builder.mutation({
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
          url: "/drivers/register",
          method: "POST",
          body: formData,
        };
      },
    }),
    EditDriver: builder.mutation({
      query: ({ id, val }) => {
        console.log("ID", id);
        console.log("Values", val);

        const formData = new FormData();

        // Append each field to the FormData object except for 'attachments'
        for (const key in val) {
          if (!Array.isArray(val.picture)) {
            delete val.picture;
          }
          if (key === "picture" && Array.isArray(val.picture)) {
            // Handle array fields like 'picture'
            val.picture.forEach((file) => {
              formData.append("picture", file);
            });
          } else if (key !== "attachments") {
            // Append other fields (exclude 'attachments')
            formData.append(key, val[key]);
          }
        }

        return {
          url: `/drivers/${id}`,
          method: "PUT",
          body: formData,
        };
      },
    }),
    editDriverAttachment: builder.mutation({
      query: ({ driverId, attachments }) => {
        console.log("Add attach looks ", attachments);

        const formData = new FormData();
        if (Array.isArray(attachments)) {
          // Handle array fields like attachments
          attachments.forEach((file) => {
            formData.append("attachments", file);
          });
        }
        return {
          url: `/drivers/attachments/${driverId}`,
          method: "PUT",
          body: formData,
        };
      },
    }),
    deleteDriverAttachment: builder.mutation({
      query: (id) => ({
        url: `drivers/attachments/${id}`,
        method: "DELETE",
      }),
    }),
    deleteDriverPicture: builder.mutation({
      query: (id) => ({
        url: `drivers/picture/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllDriversQuery,
  useListAllDriversQuery,
  useGetSpecificDriverQuery,
  useGetDriversSearchQuery,
  useDeleteDriverMutation,
  useAddDriverMutation,
  useEditDriverMutation,
  useEditDriverAttachmentMutation,
  useDeleteDriverAttachmentMutation,
  useDeleteDriverPictureMutation,
} = DriverApi;
