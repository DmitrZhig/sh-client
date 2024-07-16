import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//! добавление нового объявления
export const fetchAddSubject = createAsyncThunk('post/add', async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_URL}/acc/addSub`,
    data,
    {
      withCredentials: true,
      headers: { 'content-type': 'multipart/form-data' },
    }
  );
  return response.data;
});
