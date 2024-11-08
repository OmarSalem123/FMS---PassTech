import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { PositionsApi } from "./service/Positions";
import { webSocketSlice } from "./service/Websocket";
import { DevicesApi } from "./service/Devices";
import { GroupsApi } from "./service/Groups";
import { UsersApi } from "./service/Users/Users";
import { GeofencesApi } from "./service/Geofences/Geofences";
import { geofencesSlice } from "./service/Geofences/GeofenceSlice";
import { VehicleApi } from "./service/Vehicles/Vehicles";
import { vehiclesSlice } from "./service/Vehicles/VehiclesSlice";
import { thunk } from "redux-thunk";
import { DriverApi } from "./service/Drivers/Drivers";
import { driversSlice } from "./service/Drivers/DriversSlice";

// Redux Persist imports
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to sessionStorage for web
import { combineReducers } from "redux";
import { userSlice } from "./service/Users/UsersSlice";
import { SessionApi } from "./service/Session/Session";
import { CustomDevicesApi } from "./service/CustomDevices";
import { CustomUsersApi } from "./service/Users/CustomUsers";
import { CustomVehicleApi } from "./service/Vehicles/CustomVehicles";
import { AlertsApi } from "./service/Alerts/Alerts";
import { ReportsApi } from "./service/Reports/Reports";
import { PermissionsApi } from "./service/Permissions/Permissions";
import { DevicestwoApi } from "./Devicestwo";
import { DriverTraccarApi } from "./service/DriversTraccar/DriversTraccar";

// Configuration for redux-persist
const persistConfig = {
	key: "root", // The key in storage (sessionStorage in this case)
	storage, // Define the storage engine (sessionStorage)
	whitelist: ["users"], // The slices you want to persist
};

// Combine the reducers
const rootReducer = combineReducers({
	[PositionsApi.reducerPath]: PositionsApi.reducer,
	[DevicesApi.reducerPath]: DevicesApi.reducer,
	[DevicestwoApi.reducerPath]: DevicestwoApi.reducer,
	[CustomDevicesApi.reducerPath]: CustomDevicesApi.reducer,
	[UsersApi.reducerPath]: UsersApi.reducer,
	[CustomUsersApi.reducerPath]: CustomUsersApi.reducer,
	users: userSlice.reducer,
	[GroupsApi.reducerPath]: GroupsApi.reducer,
	[GeofencesApi.reducerPath]: GeofencesApi.reducer,
	geofences: geofencesSlice.reducer,
	[VehicleApi.reducerPath]: VehicleApi.reducer,
	[CustomVehicleApi.reducerPath]: CustomVehicleApi.reducer,
	vehicles: vehiclesSlice.reducer,
	[DriverApi.reducerPath]: DriverApi.reducer,
	[DriverTraccarApi.reducerPath]: DriverTraccarApi.reducer,
	drivers: driversSlice.reducer,
	webSocket: webSocketSlice.reducer,
	[SessionApi.reducerPath]: SessionApi.reducer,
	[AlertsApi.reducerPath]: AlertsApi.reducer,
	[ReportsApi.reducerPath]: ReportsApi.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Turn off serializability check for redux-persist
		}).concat(
			PositionsApi.middleware,
			DevicesApi.middleware,
			DevicestwoApi.middleware,
			CustomDevicesApi.middleware,
			DriverTraccarApi.middleware,
			UsersApi.middleware,
			CustomUsersApi.middleware,
			GroupsApi.middleware,
			GeofencesApi.middleware,
			VehicleApi.middleware,
			CustomVehicleApi.middleware,
			DriverApi.middleware,
			SessionApi.middleware,
			AlertsApi.middleware,
			ReportsApi.middleware,
			PermissionsApi.middleware,
			thunk
		),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
