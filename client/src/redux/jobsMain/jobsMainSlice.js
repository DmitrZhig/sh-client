import { createSlice } from '@reduxjs/toolkit';
import { fetchAllJobs } from './jobsMainThunkActions';

const initialState = {
  jobs: [],
};

const jobsMainSlice = createSlice({
  name: 'jobsMainSlice',
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder.addCase(fetchAllJobs.fulfilled, (state, action) => {
      state.jobs = action.payload;
    });
  },
});

export default jobsMainSlice.reducer;
