import { useQuery } from "@tanstack/react-query";
import type { Article } from "../domain/types";
import { articlesService } from "../adapters/http/articlesService";

export function useGetArticle(_id: string): {
  data?: Article;
  isLoading: boolean;
  error?: unknown;
} {
  return useQuery<Article, Error>({
    queryKey: ["article", _id],
    queryFn: () => {
      if (!_id) throw new Error("Falta el id");
      return articlesService.get(_id);
    },
    enabled: !!_id,
    staleTime: 60_000,
  });
}
