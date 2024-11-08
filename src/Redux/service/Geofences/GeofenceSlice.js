import { createSlice } from "@reduxjs/toolkit";

export const geofencesSlice = createSlice({
  name: "geofences",
  initialState: {
    geofences: [],
  },
  reducers: {
    addGeofence: (state, action) => {
      state.geofences.push(action.payload);
    },
    editGeofence: (state, action) => {
      const index = state.geofences.findIndex(
        (g) => g.id === action.payload.id
      );
      if (index !== -1) {
        state.geofences[index] = action.payload;
      }
    },
    deletedGeofence: (state, action) => {
      state.geofences = state.geofences.filter((g) => g.id !== action.payload);
    },
  },
});

export const { addGeofence, editGeofence, deletedGeofence } =
  geofencesSlice.actions;

export default geofencesSlice.reducer;
