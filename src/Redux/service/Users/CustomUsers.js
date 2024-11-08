import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CustomUsersApi = createApi({
  reducerPath: "CustomUsersApi",
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
 
    getSpecificCustomUser: builder.query({
      query: () => `/vehicles/users/vehicles
`,
    }),
  }),
});

export const {
  useGetSpecificCustomUserQuery
} = CustomUsersApi;
