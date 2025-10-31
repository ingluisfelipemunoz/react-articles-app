import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  loadRatings,
  saveRatings,
  type RatingsState,
} from "../adapters/storage/ratingStorage";

const initialState: RatingsState = loadRatings();

const slice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    rate(state, action: PayloadAction<{ id: string; value: number }>) {
      const { id, value } = action.payload;
      state.byId[id] = Math.max(1, Math.min(5, value));
      saveRatings(state);
    },
  },
});

export const { rate } = slice.actions;
export default slice.reducer;
