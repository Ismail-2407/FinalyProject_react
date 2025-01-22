import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number | null;
  email: string | null;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    id: null,
    email: null,
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ id: number; email: string }>) {
      state.isLoggedIn = true;
      state.user.id = action.payload.id;
      state.user.email = action.payload.email;
      state.loading = false;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.isLoggedIn = false;
      state.user.id = null;
      state.user.email = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user.id = null;
      state.user.email = null;
    },
    loading(state) {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { loginSuccess, logout, loginFailed, loading } = authSlice.actions;
export default authSlice.reducer;
