import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./reducers/productsSlice";
import authSlice from "./reducers/authSlice";
import userSlice from "./reducers/userSlice";
import cartSlice from "./reducers/cartSlice";
import valuesSlice from "./reducers/valuesSlice";
import drawer from "./reducers/drawer";

const store = configureStore({
  reducer: {
    products: productsSlice,
    auth: authSlice,
    user: userSlice,
    cart: cartSlice,
    values: valuesSlice,
    drawer: drawer,
  },
});

export default store;
