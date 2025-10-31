import type { Article, Category, ID, Paginated } from "../features/articles/domain/types";

export const categories: Category[] = [
  {
    id: "neg",
    name: "Negocios",
    subcategories: [
      { id: "emp", name: "Emprendimiento" },
      { id: "fin", name: "Finanzas" },
      { id: "mkt", name: "Marketing" },
    ],
  },
  { id: "salud", name: "Salud" },
  { id: "viajes", name: "Viajes" },
];

let _idCounter = 1;
function makeId(): ID {
  return String(_idCounter++);
}
function nowISO() {
  return new Date().toISOString();
}

export const articlesDB: Article[] = [
  {
    id: makeId(),
    title: "Cómo fijar precios en tu pyme",
    body: "Calcula costo, suma margen y compara con el mercado. Evita competir solo por precio.",
    categoryId: "neg",
    subcategoryId: "emp",
    ratingAvg: 4.4,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
  {
    id: makeId(),
    title: "Flujo de caja en 10 pasos",
    body: "Registra entradas/salidas a diario, separa impuestos y crea un colchón de 3 meses.",
    categoryId: "neg",
    subcategoryId: "fin",
    ratingAvg: 4.1,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
  {
    id: makeId(),
    title: "Caminar 30 min: efectos reales",
    body: "Mejora el ánimo, regula el azúcar y duerme mejor. Hazlo después de comer o al atardecer.",
    categoryId: "salud",
    subcategoryId: null,
    ratingAvg: 4.0,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
  {
    id: makeId(),
    title: "Fin de semana en Jarabacoa",
    body: "Río Yaque, cascadas y café local. Lleva abrigo ligero y reserva cabaña con tiempo.",
    categoryId: "viajes",
    subcategoryId: null,
    ratingAvg: 4.3,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
];

export type ListParams = {
  page: number;
  pageSize: number;
  q?: string;
  categoryId?: string;
  subcategoryId?: string;
};

export function paginate<T>(items: T[], page: number, pageSize: number): Paginated<T> {
  const total = items.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    items: items.slice(start, end),
    total,
    page,
    pageSize,
  };
}

export function filterArticles(data: Article[], p: Partial<ListParams>) {
  const q = (p.q ?? "").trim().toLowerCase();
  return data.filter((a) => {
    const matchQ =
      !q || a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q);
    const matchC = !p.categoryId || a.categoryId === p.categoryId;
    const matchS = !p.subcategoryId || a.subcategoryId === p.subcategoryId;
    return matchQ && matchC && matchS;
  });
}

export function upsertArticle(
  input: Partial<Article> & {
    title: string;
    body: string;
    categoryId: ID;
    subcategoryId?: ID | null;
    id?: ID;
  },
) {
  const now = nowISO();
  if (input.id) {
    const idx = articlesDB.findIndex((a) => a.id === input.id);
    if (idx === -1) return null;
    const prev = articlesDB[idx];
    const updated: Article = {
      ...prev,
      title: input.title ?? prev.title,
      body: input.body ?? prev.body,
      categoryId: input.categoryId ?? prev.categoryId,
      subcategoryId:
        input.subcategoryId !== undefined ? input.subcategoryId : prev.subcategoryId,
      updatedAt: now,
    };
    articlesDB[idx] = updated;
    return updated;
  }
  const created: Article = {
    id: makeId(),
    title: input.title,
    body: input.body,
    categoryId: input.categoryId,
    subcategoryId: input.subcategoryId ?? null,
    ratingAvg: 0,
    createdAt: now,
    updatedAt: now,
  };
  articlesDB.unshift(created);
  return created;
}
