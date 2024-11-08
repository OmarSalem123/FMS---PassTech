import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ReportsApi = createApi({
	reducerPath: "Reports",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://test.passenger-mea.com/backend/reports",
		prepareHeaders: (headers) => {
			const token = sessionStorage.getItem("token");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			headers.set("Accept", "application/json");
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getVehicleTrips: builder.query({
			query: ({
				from: startdate,
				to: enddate,
				selectedids: ids,
				page: currentpage,
				pageSize: limit,
			}) =>
				`/tracking?from=${startdate}&to=${enddate}&deviceId=${ids}&page=${currentpage}&pageSize=${limit}&sortBy=engineHours&sortOrder=desc`,
		}),
		getVehicleRoutes: builder.query({
			query: ({
				from: startdate,
				to: enddate,
				selectedids: ids,
				page: currentpage,
				pageSize: limit,
			}) =>
				`/route?from=${startdate}&to=${enddate}&deviceId=${ids}&page=${currentpage}&pageSize=${limit}&sortBy=engineHours&sortOrder=desc`,
		}),
		getSpeedReport: builder.query({
			query: ({
				from: startdate,
				to: enddate,
				selectedids: ids,
				page: currentpage,
				pageSize: limit,
			}) =>
				`/speed?from=${startdate}&to=${enddate}&deviceId=${ids}&page=${currentpage}&pageSize=${limit}&sortBy=engineHours&sortOrder=desc`,
		}),
		getSummaryReport: builder.query({
			query: ({
				from: startdate,
				to: enddate,
				selectedids: ids,
				conditiondaily: daily,
			}) => `/summary?from=${startdate}&to=${enddate}&daily=${daily}&${ids}`,
		}),
		getEventReport: builder.query({
			query: ({
				from: startdate,
				to: enddate,
				selectedids: id,
				eventtype: type,
			}) => `/events?${id}&from=${startdate}&to=${enddate}&${type}`,
		}),
		getAlarmReport: builder.query({
			query: ({
				from: startdate,
				to: enddate,
				selectedids: id,
				eventtype: type,
			}) => `/events?${id}&from=${startdate}&to=${enddate}&type=${type}`,
		}),

		getStopReport: builder.query({
			query: ({
				from: startdate,
				to: enddate,
				selectedids: ids,
				page: currentpage,
				pageSize: limit,
			}) =>
				`/stop?from=${startdate}&to=${enddate}&deviceId=${ids}&page=${currentpage}&pageSize=${limit}&sortBy=engineHours&sortOrder=desc`,
		}),

		getDistanceReport: builder.query({
			query: ({
				from: startdate,
				to: enddate,
				selectedids: ids,
				page: currentpage,
				pageSize: limit,
			}) =>
				`/distance?from=${startdate}&to=${enddate}&deviceId=${ids}&page=${currentpage}&pageSize=${limit}&sortBy=engineHours&sortOrder=desc`,
		}),
		getFuelReport: builder.query({
			query: ({
				from: startdate,
				to: enddate,
				selectedids: ids,
				page: currentpage,
				pageSize: limit,
			}) =>
				`/fuel?from=${startdate}&to=${enddate}&deviceId=${ids}&page=${currentpage}&pageSize=${limit}&sortBy=engineHours&sortOrder=desc`,
		}),
		getOdometerReport: builder.query({
			query: ({
				from: startdate,
				to: enddate,
				selectedids: ids,
				page: currentpage,
				pageSize: limit,
			}) =>
				`/odometer?from=${startdate}&to=${enddate}&deviceId=${ids}&page=${currentpage}&pageSize=${limit}&sortBy=engineHours&sortOrder=desc`,
		}),
	}),
});

export const {
	useGetVehicleTripsQuery,
	useGetVehicleRoutesQuery,
	useGetSummaryReportQuery,
	useGetSpeedReportQuery,
	useGetEventReportQuery,
	useGetAlarmReportQuery,
	useGetStopReportQuery,
	useGetDistanceReportQuery,
	useGetFuelReportQuery,
	useGetOdometerReportQuery
} = ReportsApi;
