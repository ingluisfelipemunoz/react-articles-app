import { useSearchParams } from "react-router-dom";

export function useArticlesParams() {
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") ?? 1);
  const pageSize = Number(sp.get("pageSize") ?? 10);
  const q = sp.get("q") ?? "";
  const categoryId = sp.get("categoryId") ?? "";
  const subcategoryId = sp.get("subcategoryId") ?? "";
  const showOnlyFavorites = sp.get("showOnlyFavorites") === "true";

  const set = (patch: Record<string, string | number | undefined>) => {
    const next = new URLSearchParams(sp);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === "") next.delete(k);
      else next.set(k, String(v));
    });
    setSp(next, { replace: true });
  };

  return { page, pageSize, q, categoryId, subcategoryId, showOnlyFavorites, set };
}
