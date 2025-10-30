import { getJSON, setJSON } from "../../../../shared/lib/storage";
const KEY = "articles:favorites";

export type FavoritesState = { ids: string[] };

export function loadFavorites(): FavoritesState {
  return getJSON<FavoritesState>(KEY, { ids: [] });
}
export function saveFavorites(state: FavoritesState) {
  setJSON(KEY, state);
}
