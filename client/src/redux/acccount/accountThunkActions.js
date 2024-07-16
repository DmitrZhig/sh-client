import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//! смена фото
export const fetchEditAcc = createAsyncThunk('acc/photoEdit', async (data) => {
  const response = await axios.put(`${import.meta.env.VITE_URL}/acc/ed`, data, {
    withCredentials: true,
    headers: { 'content-type': 'multipart/form-data' },
  });
  return response.data;
});

//! смена пароля
export const fetchEditPass = createAsyncThunk(
  'acc/passEdit',
  async (inputEdit) => {
    const response = await axios.put(
      `${import.meta.env.VITE_URL}/acc/passEd`,
      inputEdit,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

//! опубликованые посты этого юзера
export const fetchAllWorksUser = createAsyncThunk('all/worksUser', async () => {
  const response = await axios.get(`${import.meta.env.VITE_URL}/acc/userWork`, {
    withCredentials: true,
  });
  return response.data;
});

//! отправка купленного поста в БД
export const fetchBuyPosts = createAsyncThunk('posts/buy', async (job) => {
  const response = await axios.post(
    `${import.meta.env.VITE_URL}/acc/buyPost`,
    job,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

//! купленые посты этого юзера
export const fetchBuyPostsUser = createAsyncThunk('all/buyUser', async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_URL}/acc/buyPostUser`,
    {
      withCredentials: true,
    }
  );
  return response.data;
});
