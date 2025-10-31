import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Article } from "../domain/types";
import { articlesService } from "../adapters/http/articlesService";

type CreateInput = Omit<Article, "id" | "ratingAvg" | "createdAt" | "updatedAt">;
type UpdateInput = Partial<Omit<Article, "id" | "createdAt" | "updatedAt">>;

export function useUpsertArticle(id?: string) {
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: (input: CreateInput) => articlesService.create(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const update = useMutation({
    mutationFn: (input: UpdateInput) => {
      if (!id) throw new Error("Id invalido");
      return articlesService.update(id, input);
    },
    onSuccess: (_data, _vars, _ctx) => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      if (id) qc.invalidateQueries({ queryKey: ["article", id] });
    },
  });

  return { create, update };
}
