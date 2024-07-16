import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllWorksUser,
  fetchBuyPostsUser,
  fetchEditAcc,
  fetchEditPass,
} from './accountThunkActions';
import { fetchEditStatus } from '../auth/authThunkActions';

const initialState = {
  users: [],
  posts: [],
  buyPosts: [],
};

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder.addCase(fetchEditAcc.fulfilled, (state, action) => {
      const index = state.users.findIndex((el) => el.id === action.payload);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
    bulder.addCase(fetchEditPass.fulfilled, (state, action) => {
      const index = state.users.findIndex((el) => el.id === action.payload);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
    bulder.addCase(fetchAllWorksUser.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    bulder.addCase(fetchBuyPostsUser.fulfilled, (state, action) => {
      state.buyPosts = action.payload;
    });
    bulder.addCase(fetchEditStatus.fulfilled, (state, action)=>{
      const index = state.users.findIndex((el) => el.id === action.payload);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    })
  },
});

export default accountSlice.reducer;
