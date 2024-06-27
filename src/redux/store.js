import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
});
