import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type User = { id: string; name: string; role: "editor" | "viewer" };
type AuthState = { user: User | null };

const persisted = localStorage.getItem("app:auth");
const initialState: AuthState = persisted ? JSON.parse(persisted) : { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      // simulacion cualquier credencial valida loguea como editor
      state.user = { id: "u1", name: action.payload.username, role: "editor" };
      localStorage.setItem("app:auth", JSON.stringify(state));
    },
    logout(state) {
      state.user = null;
      localStorage.setItem("app:auth", JSON.stringify(state));
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
