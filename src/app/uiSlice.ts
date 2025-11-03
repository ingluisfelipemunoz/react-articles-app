import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark" | "system";
type UiState = { theme: Theme };

const initialState: UiState = {
  theme: (localStorage.getItem("app:theme") as Theme) || "system",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      localStorage.setItem("app:theme", action.payload);
    },
  },
});

export const { setTheme } = uiSlice.actions;
export default uiSlice.reducer;
