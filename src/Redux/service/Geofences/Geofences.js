import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const GeofencesApi = createApi({
	reducerPath: "Geofences",
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
		getAllGeofences: builder.query({
			query: () => "/geofences",
		}),
		getSpecificGeofence: builder.query({
			query: (id) => `/geofences/${id}`,
		}),
		getDevicesGeofences: builder.query({
			query: (id) => `/geofences?=deviceId=${id}`,
		}),
		getUsersGeofences: builder.query({
			query: (id) => `/geofences?userId=${id}`,
		}),
		addGeofences: builder.mutation({
			query: (val) => ({
				url: `/geofences`,
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: val,
			}),
		}),
		editGeofences: builder.mutation({
			query: ({ id, val }) => ({
				url: `/geofences/${id}`,
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: val,
			}),
		}),
		deleteGeofences: builder.mutation({
			query: (id) => ({
				url: `/geofences/${id}`,
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: id,
			}),
		}),
		getGeofencesByDevice: builder.query({
			query: (deviceId) => `/geofences?deviceId=${deviceId}`,
		}),
	}),
});

export const {
	useGetAllGeofencesQuery,
	useGetUsersGeofencesQuery,
	useGetSpecificGeofenceQuery,
	useAddGeofencesMutation,
	useEditGeofencesMutation,
	useGetDevicesGeofencesQuery,
	useDeleteGeofencesMutation,
	useGetGeofencesByDeviceQuery,
} = GeofencesApi;
