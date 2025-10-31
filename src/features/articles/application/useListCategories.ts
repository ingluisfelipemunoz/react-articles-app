import { useQuery } from "@tanstack/react-query";
import type { Category } from "../domain/types";
import { articlesService } from "../adapters/http/articlesService";

export function useListCategories() {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => articlesService.categories(),
  });
}
