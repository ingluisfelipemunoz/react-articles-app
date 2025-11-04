import { useQuery } from "@tanstack/react-query";
import type { Paginated, Article } from "../domain/types";
import { articlesService } from "../adapters/http/articlesService";
const simulateSleep = false;
const simululateError = false;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export type ListParams = {
  page: number;
  pageSize: number;
  q?: string;
  categoryId?: string;
  subcategoryId?: string;
};

export function useListArticles(_params: ListParams) {
  const errorFlag =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("__error")
      : null;
  return useQuery<Paginated<Article>, Error>({
    queryKey: ["articles", _params, { __error: errorFlag }],
    queryFn: async () => {
      if (simulateSleep) await sleep(2000);
      if (simululateError) throw new Error("error de carga");
      return articlesService.list(_params);
    },
    // Si hay __error, no usar cache larga
    staleTime: errorFlag ? 0 : 60_000,
    placeholderData: (prev) => prev,
  });
}
