import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUser, clearUser } from './authSlice';

export const fetchSignUp = createAsyncThunk(
  'SignUp',
  async (data, { dispatch }) => {
    const response = await axios.post(`${import.meta.env.VITE_URL}/reg`, data, {
      withCredentials: true,
    });
    dispatch(setUser(response.data));
    return response.data;
  }
);

export const fetchSignIn = createAsyncThunk(
  'SignIn',
  async (data, { dispatch }) => {
    const response = await axios.post(`${import.meta.env.VITE_URL}/log`, data, {
      withCredentials: true,
    });
    dispatch(setUser(response.data));
    return response.data;
  }
);

export const checkUser = createAsyncThunk(
  'CheckUser',
  async (data, { dispatch }) => {
    const response = await axios.get(`${import.meta.env.VITE_URL}/`, {
      withCredentials: true,
    });
    dispatch(setUser(response.data));
    return response.data;
  }
);

export const fetchSignOut = createAsyncThunk(
  'SignOut',
  async (_, { dispatch }) => {
    const response = await axios.get(`${import.meta.env.VITE_URL}/logout`, {
      withCredentials: true,
    });
    dispatch(clearUser());
    return response.data;
  }
);

//! меняем статус юзера на try
export const fetchEditStatus = createAsyncThunk(
  'user/status',
  async (userAccess) => {
    const response = await axios.put(
      `${import.meta.env.VITE_URL}/userAccess`,
      userAccess,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);
