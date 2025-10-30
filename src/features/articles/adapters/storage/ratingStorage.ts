import { getJSON, setJSON } from "../../../../shared/lib/storage";
const KEY = "articles:ratings";

export type RatingsState = { byId: Record<string, number> };

export function loadRatings(): RatingsState {
  return getJSON<RatingsState>(KEY, { byId: {} });
}
export function saveRatings(state: RatingsState) {
  setJSON(KEY, state);
}
