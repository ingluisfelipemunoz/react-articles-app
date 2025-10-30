import type { Article } from "../domain/types";

export function useGetArticle(_id: string): {
  data?: Article;
  isLoading: boolean;
  error?: unknown;
} {
  return { data: undefined, isLoading: false, error: undefined };
}
