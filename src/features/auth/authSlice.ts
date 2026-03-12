import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types/auth.types'

interface AuthState {
  accessToken: string | null
  user: User | null
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user?: User }>,
    ) => {
      state.accessToken = action.payload.accessToken
      if (action.payload.user) {
        state.user = action.payload.user
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    clearCredentials: (state) => {
      state.accessToken = null
      state.user = null
    },
  },
})

export const { setCredentials, setUser, clearCredentials } = authSlice.actions

// Selectors — use a minimal local type to avoid circular deps with @/store
type StateWithAuth = { auth: AuthState }

export const selectCurrentUser = (state: StateWithAuth) => state.auth.user
export const selectAccessToken = (state: StateWithAuth) => state.auth.accessToken
export const selectIsAuthenticated = (state: StateWithAuth) =>
  !!state.auth.accessToken

export default authSlice.reducer
