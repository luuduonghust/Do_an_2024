import { createSlice } from "@reduxjs/toolkit";
// import * as actions from "./asynAction";
import { getNewProducts } from "./asynsAction";

export const productSlide = createSlice({
  name: "product",
  initialState: {
    newProducts: null,
    errorMessage: "",
  },
  reducers: {},
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(getNewProducts.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(getNewProducts.fulfilled, (state, action) => {
      // console.log("xacxa", action);
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.newProducts = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(getNewProducts.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.error?.message||"Error";
    });
  },
});
export const { increment, decrement, incrementByAmount } = productSlide.actions;
export default productSlide.reducer;
