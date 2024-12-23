import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Example slice
import busReducer from "./slices/busSlice"; // Another slice example

const store = configureStore({
  reducer: {
    auth: authReducer,
    // bus: busReducer,
  },
});

export default store;
