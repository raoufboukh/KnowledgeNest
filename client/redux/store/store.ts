import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../Slices/AuthSlice";
import { carSlice } from "../Slices/CarSlices";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cars: carSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
