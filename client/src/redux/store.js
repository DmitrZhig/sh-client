import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import accountSlice from './acccount/accountSlice';
import addSubSlice from './addSub/addSubSlice';
import jobsMainSlice from './jobsMain/jobsMainSlice';

const storeOptions = {
  reducer: {
    authSlice,
    accountSlice,
    addSubSlice,
    jobsMainSlice,
  },
};

export const store = configureStore(storeOptions);
