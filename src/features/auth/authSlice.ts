import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/auth.types";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isHydrated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user?: User }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      state.isHydrated = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isHydrated = true;
    },
    setHydrated: (state) => {
      state.isHydrated = true;
    },
  },
});

export const { setCredentials, setUser, clearCredentials, setHydrated } =
  authSlice.actions;

// Selectors — use a minimal local type to avoid circular deps with @/store
type StateWithAuth = { auth: AuthState };

export const selectCurrentUser = (state: StateWithAuth) => state.auth.user;
export const selectAccessToken = (state: StateWithAuth) =>
  state.auth.accessToken;
export const selectIsAuthenticated = (state: StateWithAuth) =>
  !!state.auth.accessToken;
export const selectIsHydrated = (state: StateWithAuth) => state.auth.isHydrated;

export default authSlice.reducer;
