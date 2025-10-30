import type { Paginated, Article } from "../../domain/types";

export interface ListParams {
  page: number;
  pageSize: number;
  q?: string;
  categoryId?: string;
  subcategoryId?: string;
}
// portinterface
export interface ArticlesServicePort {
  list(params: ListParams): Promise<Paginated<Article>>;
  get(id: string): Promise<Article>;
  create(
    input: Omit<Article, "id" | "ratingAvg" | "createdAt" | "updatedAt">,
  ): Promise<Article>;
  update(
    id: string,
    input: Partial<Omit<Article, "id" | "createdAt" | "updatedAt">>,
  ): Promise<Article>;
}

// todo: implement functions
export const articlesService: ArticlesServicePort = {
  async list() {
    return { items: [], total: 0, page: 1, pageSize: 10 };
  },
  async get() {
    throw new Error("no-implemented");
  },
  async create() {
    throw new Error("no-implemented");
  },
  async update() {
    throw new Error("no-implemented");
  },
};
