import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import appReducer from "./reducer";

const store = configureStore({
  reducer: appReducer,
  middleware: [...getDefaultMiddleware(), thunk],
});

export default store;
