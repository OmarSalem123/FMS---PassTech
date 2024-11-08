import { createSlice } from "@reduxjs/toolkit";

export const driversSlice = createSlice({
  name: "vehicles",
  initialState: {
    drivers: [],
  },
  reducers: {
    addDrivers: (state, action) => {
      state.drivers = action.payload;
    },
  },
});

export const { addDrivers } = driversSlice.actions;
export default driversSlice.reducer;
