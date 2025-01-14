import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import productSlide from "./products/productSlide";
// const emptyReducer = (state = {}) => state;
import storage from "redux-persist/lib/storage";
import userSlice from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";

const commonConfig = {
  key: "shop/user",
  storage,
};
const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token", "current", "currentCart"],
  key: "shop/user",
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    products: productSlide,
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
