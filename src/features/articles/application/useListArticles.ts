import type { Paginated, Article } from "../domain/types";

export function useListArticles(_params: {
  page: number;
  pageSize: number;
  q?: string;
  categoryId?: string;
  subcategoryId?: string;
}): { data?: Paginated<Article>; isLoading: boolean; error?: unknown } {
  return { data: undefined, isLoading: false, error: undefined };
}
