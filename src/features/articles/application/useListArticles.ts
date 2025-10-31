import { useQuery } from "@tanstack/react-query";
import type { Paginated, Article } from "../domain/types";
import { articlesService } from "../adapters/http/articlesService";

export type ListParams = {
  page: number;
  pageSize: number;
  q?: string;
  categoryId?: string;
  subcategoryId?: string;
};

export function useListArticles(_params: ListParams) {
  return useQuery<Paginated<Article>, Error>({
    queryKey: ["articles", _params],
    queryFn: () => articlesService.list(_params),
    staleTime: 60_000,
    placeholderData: (prev) => prev,
  });
}
