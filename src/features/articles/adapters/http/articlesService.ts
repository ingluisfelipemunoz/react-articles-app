import type { Paginated, Article, Category } from "../../domain/types";

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
  categories(): Promise<Category[]>;
}

function toQuery(
  params: Record<string, string | number | undefined> | ListParams,
): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      sp.set(key, String(value));
    }
  });
  return sp.toString();
}

export const articlesService: ArticlesServicePort = {
  async list(params) {
    const queryString = toQuery(params);
    const currentSearch = typeof window !== "undefined" ? window.location.search : "";
    const currentError = currentSearch
      ? new URLSearchParams(currentSearch).get("__error")
      : null;
    const errorQS = currentError ? `__error=${encodeURIComponent(currentError)}` : "";
    const finalQS = [queryString, errorQS].filter(Boolean).join("&");
    const res = await fetch(`/api/articles?${finalQS}`);
    if (!res.ok) throw new Error(`List failed: ${res.status}`);
    return res.json();
  },
  async get(id: string) {
    const currentSearch = typeof window !== "undefined" ? window.location.search : "";
    const currentError = currentSearch
      ? new URLSearchParams(currentSearch).get("__error")
      : null;
    const errorSuffix = currentError
      ? `?__error=${encodeURIComponent(currentError)}`
      : "";
    const res = await fetch(`/api/articles/${id}${errorSuffix}`);
    if (!res.ok) throw new Error(`Get failed ${res.status}`);
    return res.json();
  },
  async create(input) {
    const res = await fetch(`/api/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Create failed ${res.status}`);
    return res.json();
  },
  async update(id: string, input) {
    const res = await fetch(`/api/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Update failed ${res.status}`);
    return res.json();
  },

  async categories(): Promise<Category[]> {
    const res = await fetch(`/api/categories`);
    if (!res.ok) throw new Error(`Categories failed ${res.status}`);
    return res.json();
  },
};
