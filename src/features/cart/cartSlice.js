import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addProductToCart, fetchProductsByUserId, updateCart, deleteProductFromCart, cartReset } from './cartAPI';

const initialState = {
  value: 0,
  items: [],
  status: "idle",
  cartLoaded: false,
};


export const addProductToCartAsync = createAsyncThunk(
  'cart/addProductToCart',
  async (item) => {
    const response = await addProductToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByUserIdAsync = createAsyncThunk(
  'cart/fetchProductsByUserId',
  async (userId) => {
    const response = await fetchProductsByUserId();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteProductFromCartAsync = createAsyncThunk(
  'cart/deleteProductFromCart',
  async (itemId) => {
    const response = await deleteProductFromCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartResetAsync = createAsyncThunk(
  'cart/cartReset',
  async () => {
    const response = await cartReset();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
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
      .addCase(addProductToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchProductsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchProductsByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteProductFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items.splice(index, 1);
      })
      .addCase(cartResetAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cartResetAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      });
  },
});

export const { increment } = cartSlice.actions;
export const selectItems = (state) => state.cart.items;
export const selectCartLoaded = (state) => state.cart.cartLoaded;
export default cartSlice.reducer;