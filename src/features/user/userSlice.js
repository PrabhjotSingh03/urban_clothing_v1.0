import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './userAPI';
import { fetchUserOrders } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
};


export const fetchUserOrdersAsync = createAsyncThunk(
  'user/fetchUserOrders',
  async (id) => {
    const response = await fetchUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;
export const selectOrdersOfUser = (state) => state.user.userOrders;
export default userSlice.reducer;
