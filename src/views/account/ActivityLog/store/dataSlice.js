import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getNewActivityLogs } from "../../../../services/activityLogsService";

export const getLogs = createAsyncThunk(
  "accountActivityLog/data/getLogs",
  async (data) => {
    const response = await getNewActivityLogs();
    console.log(response);
    return response.data;
  }
);

export const filterLogs = createAsyncThunk(
  "accountActivityLog/data/filterLogs",
  async (data) => {
    console.log(data);
    const response = await getNewActivityLogs();
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "accountActivityLog/data",
  initialState: {
    page: {},
    loading: false,
    loadMoreLoading: false,
    loadable: false,
    activityIndex: 1,
    logs: [],
  },
  reducers: {
    setLogs: (state, action) => {
      state.logs = action.payload;
    },
    setActivityIndex: (state, action) => {
      state.activityIndex = action.payload;
    },
  },
  extraReducers: {
    [getLogs.fulfilled]: (state, action) => {
      const currentState = current(state);
      console.log(action.payload);
      state.logs = [...currentState.logs, ...action.payload.results];
      state.loadMoreLoading = false;
      state.loadable = true;
      state.page.pageSize = action.payload.limit;
      state.page.total = action.payload.totalResults;
      state.page.pageIndex = action.payload.page;
    },
    [getLogs.pending]: (state) => {
      state.loadMoreLoading = true;
    },
    [filterLogs.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.logs = action.payload.results;
      state.loading = false;
      state.loadable = true;
      state.page.pageSize = action.payload.limit;
      state.page.total = action.payload.totalResults;
      state.page.pageIndex = action.payload.page;
    },
    [filterLogs.pending]: (state) => {
      state.loading = true;
    },
  },
});

export const { setActivityIndex } = dataSlice.actions;

export default dataSlice.reducer;
