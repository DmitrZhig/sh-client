import { createSlice } from '@reduxjs/toolkit';
import { fetchAddSubject } from './addSubThunkActions';

const initialState = {
  subjects: [],
};

const accountSlice = createSlice({
  name: 'addSubSlice',
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder.addCase(fetchAddSubject.fulfilled, (state, action) => {
      state.subjects.push(action.payload);
    });
  },
});

export default accountSlice.reducer;
