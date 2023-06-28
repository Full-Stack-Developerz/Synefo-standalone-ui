import { createSlice } from "@reduxjs/toolkit";
import { organizationsAsyncThunk } from "redux/assetManager/organization/organizationThunk";

export const organizationsSlice = createSlice({
  name: "organizations",
  initialState: {},
  extraReducers: {
    [organizationsAsyncThunk.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default organizationsSlice.reducer;
