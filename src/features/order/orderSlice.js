import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, orderUpdate } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  orderCurrent: null,
  ordersTotal: 0,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({sort, pagination}) => {
    const response = await fetchAllOrders(sort, pagination);
    return response.data;
  }
);

export const orderUpdateAsync = createAsyncThunk(
  "order/orderUpdate",
  async (order) => {
    const response = await orderUpdate(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    orderReset: (state) => {
      state.orderCurrent = null;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.orderCurrent = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.ordersTotal = action.payload.totalOrders;
      })
      .addCase(orderUpdateAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(orderUpdateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex((order) => order.id === action.payload.id);
        state.orders[index] = action.payload;
      });
  },
});

export const { orderReset } = orderSlice.actions;
export const selectOrderCurrent = (state) => state.order.orderCurrent;
export const selectOrders = (state) => state.order.orders;
export const selectOrdersTotal = (state) => state.order.ordersTotal;

export default orderSlice.reducer;