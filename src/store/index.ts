import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./foodSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    foods: foodReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
