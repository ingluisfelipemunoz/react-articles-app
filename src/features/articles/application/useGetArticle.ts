import { useQuery } from "@tanstack/react-query";
import type { Article } from "../domain/types";
import { articlesService } from "../adapters/http/articlesService";

export function useGetArticle(_id: string | undefined): {
  data?: Article;
  isLoading: boolean;
  error?: unknown;
} {
  const errorFlag = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("__error") : null;
  return useQuery<Article, Error>({
    queryKey: ["article", _id, { __error: errorFlag }],
    queryFn: () => {
      if (!_id) throw new Error("Falta el id");
      return articlesService.get(_id);
    },
    enabled: !!_id,
    staleTime: errorFlag ? 0 : 60_000,
  });
}
