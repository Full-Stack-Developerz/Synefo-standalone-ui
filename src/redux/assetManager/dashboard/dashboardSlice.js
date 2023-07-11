import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentHourSpendRate,
  getCurrentDaySpendRate,
  getTodaySpendAnalytics,
  getYesterdaySpendAnalytics,
} from "redux/assetManager/dashboard/dashboardThunk";
import status from "redux/constants/commonDS";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    currentHourSpendRate: {
      status: null,
      data: [],
    },
    currentDaySpendRate: {
      status: null,
      data: [],
    },
    todaySpendAnalytics: {
      status: null,
      data: [],
    },
    yesterdaySpendAnalytics: {
      status: null,
      data: [],
    },
  },
  reducers: {},
  extraReducers: {
    [getCurrentHourSpendRate.pending]: (state, action) => {
      return {
        ...state,
        currentHourSpendRate: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getCurrentHourSpendRate.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        currentHourSpendRate: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getCurrentHourSpendRate.rejected]: (state, action) => {
      return {
        ...state,
        currentHourSpendRate: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getCurrentDaySpendRate.pending]: (state, action) => {
      return {
        ...state,
        currentDaySpendRate: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getCurrentDaySpendRate.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        currentDaySpendRate: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getCurrentDaySpendRate.rejected]: (state, action) => {
      return {
        ...state,
        currentDaySpendRate: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getTodaySpendAnalytics.pending]: (state, action) => {
      return {
        ...state,
        todaySpendAnalytics: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getTodaySpendAnalytics.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        todaySpendAnalytics: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getTodaySpendAnalytics.rejected]: (state, action) => {
      return {
        ...state,
        todaySpendAnalytics: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getYesterdaySpendAnalytics.pending]: (state, action) => {
      return {
        ...state,
        yesterdaySpendAnalytics: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getYesterdaySpendAnalytics.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        yesterdaySpendAnalytics: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getYesterdaySpendAnalytics.rejected]: (state, action) => {
      return {
        ...state,
        yesterdaySpendAnalytics: {
          status: status.FAILURE,
          data: [],
        },
      };
    },
  },
});

export default dashboardSlice.reducer;
