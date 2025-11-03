import { configureStore } from "@reduxjs/toolkit";
import ui from "./uiSlice";
import favorites from "../features/articles/store/favoritesSlice";
import ratings from "../features/articles/store/ratingSlice";

export const store = configureStore({
  reducer: { ui, favorites, ratings },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
