import { createSlice } from '@reduxjs/toolkit';
import { fetchSignUp, fetchSignIn, fetchSignOut } from './authThunkActions';

const initialState = {
  user: {},
  login: '',
  id: 0,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.login = action.payload.login;
      state.id = action.payload.id;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = {};
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.login = action.payload.login;
        state.id = action.payload.id;
        state.isLoading = false;
        console.log(state.user);
      })
      .addCase(fetchSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.login = action.payload.login;
        state.id = action.payload.id;
        state.isLoading = false;
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSignOut.fulfilled, (state) => {
        state.user = {};
        state.isLoading = false;
      })
      .addCase(fetchSignOut.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
