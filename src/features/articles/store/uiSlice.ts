import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: { theme: "light" as "light" | "dark", globalLoading: false },
  reducers: {
    setTheme(state, action: { payload: "light" | "dark" }) {
      state.theme = action.payload;
    },
    setGlobalLoading(state, action: { payload: boolean }) {
      state.globalLoading = action.payload;
    },
  },
});

export const { setTheme, setGlobalLoading } = slice.actions;
export default slice.reducer;
