import type { RootState } from "../../../app/store";

export const selectFavoritesIds = (s: RootState) => s.favorites.ids;
export const selectIsFavorite = (id: string) => (s: RootState) =>
  s.favorites.ids.includes(id);

export const selectRatingById = (id: string) => (s: RootState) => s.ratings.byId[id] ?? 0;
