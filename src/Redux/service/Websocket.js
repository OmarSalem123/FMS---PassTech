// src/service/webSocketSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const webSocketSlice = createSlice({
  name: "webSocket",
  initialState: {
    data: null,
    positions: [],
    devices: [],
    historypositions: [],
  },
  reducers: {
    setWebSocketData: (state, action) => {
      state.data = action.payload;
    },
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    setHistoryPositions: (state, action) => {
      state.historypositions = action.payload;
    },
  },
});

export const {
  setWebSocketData,
  setPositions,
  setDevices,
  setHistoryPositions,
} = webSocketSlice.actions;

export default webSocketSlice.reducer;
