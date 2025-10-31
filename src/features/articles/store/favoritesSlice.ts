import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  loadFavorites,
  saveFavorites,
  type FavoritesState,
} from "../adapters/storage/favoritesStorage";

const initialState: FavoritesState = loadFavorites();

const slice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.ids = state.ids.includes(id)
        ? state.ids.filter((x) => x !== id)
        : [...state.ids, id];
      saveFavorites(state);
    },
  },
});

export const { toggle } = slice.actions;
export default slice.reducer;
