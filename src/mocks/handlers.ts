import { http, HttpResponse } from "msw";
import type { Article } from "../features/articles/domain/types";
import { articlesDB, categories, filterArticles, paginate } from "./data";

// Errores: ?__error=404 o ?__error=500.

export const handlers = [
  // Listado con filtros y paginacion
  http.get("/api/articles", ({ request }) => {
    const url = new URL(request.url);
    const error = url.searchParams.get("__error");
    if (error === "500") {
      return HttpResponse.json({ message: "Server error" }, { status: 500 });
    }

    const page = Number(url.searchParams.get("page") ?? 1);
    const pageSize = Number(url.searchParams.get("pageSize") ?? 10);
    const q = url.searchParams.get("q") ?? undefined;
    const categoryId = url.searchParams.get("categoryId") ?? undefined;
    const subcategoryId = url.searchParams.get("subcategoryId") ?? undefined;

    const filtered = filterArticles(articlesDB, { q, categoryId, subcategoryId });
    const out = paginate(filtered, page, pageSize);
    return HttpResponse.json(out, { status: 200 });
  }),

  // Detalle
  http.get("/api/articles/:id", ({ params, request }) => {
    const url = new URL(request.url);
    const error = url.searchParams.get("__error");
    const id = String(params.id);

    if (error === "500") {
      return HttpResponse.json({ message: "Server error" }, { status: 500 });
    }

    const article = articlesDB.find((a) => a.id === id);
    if (!article || error === "404") {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }
    return HttpResponse.json(article);
  }),

  // Crear
  http.post("/api/articles", async ({ request }) => {
    const body = await request.json() as Partial<Article> & {
      title: string;
      body: string;
      categoryId: string;
      subcategoryId?: string | null;
      id?: string;
    };
    const { upsertArticle } = await import("./data");
    const created = upsertArticle(body);
    if (!created) {
      return HttpResponse.json({ message: "Invalid payload" }, { status: 400 });
    }
    return HttpResponse.json(created, { status: 201 });
  }),

  // Editar
  http.put("/api/articles/:id", async ({ params, request }) => {
    const id = String(params.id);
    const body = await request.json() as Partial<Article> & {
      title: string;
      body: string;
      categoryId: string;
      subcategoryId?: string | null;
      id?: string;
    };
    const { upsertArticle, articlesDB } = await import("./data");
    if (!articlesDB.some((a) => a.id === id)) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }
    const updated = upsertArticle({ ...body, id });
    return HttpResponse.json(updated, { status: 200 });
  }),

  http.get("/api/categories", () => {
    return HttpResponse.json(categories, { status: 200 });
  }),
];
