import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//! все работы
export const fetchAllJobs = createAsyncThunk('job/all', async () => {
  const response = await axios.get(`${import.meta.env.VITE_URL}/main/jobs`, {
    withCredentials: true,
  });
  return response.data;
});
