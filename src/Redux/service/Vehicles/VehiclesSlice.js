import { createSlice } from "@reduxjs/toolkit";

export const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: {
    vehicles: [],
    totalCount: 0,
  },
  reducers: {
    addVehicles: (state, action) => {
      state.vehicles = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
});

export const { addVehicles, setTotalCount } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
