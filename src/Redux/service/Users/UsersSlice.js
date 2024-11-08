import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    users:[]
  },
  reducers: {
    setUserInf: (state, action) => {
      state.user = action.payload;
    },
    setUsers:(state,action)=>{
      state.users= action.payload
    }
  },
});

export const { setUserInf , setUsers } = userSlice.actions;
export default userSlice.reducer;
