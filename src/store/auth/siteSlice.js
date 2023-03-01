import { createSlice } from "@reduxjs/toolkit";

export const initialState = {};

export const siteSlice = createSlice({
  name: "auth/site",
  initialState,
  reducers: {
    setSite: (_, action) => action.payload,
    userLoggedOut: () => initialState,
  },
});

export const { setSite } = siteSlice.actions;

export default siteSlice.reducer;
