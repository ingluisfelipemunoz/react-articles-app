export type ID = string;

export interface Category {
  id: ID;
  name: string;
  subcategories?: Category[];
}

export interface Article {
  id: ID;
  title: string;
  body: string;
  categoryId: ID;
  subcategoryId?: ID | null;
  ratingAvg: number;
  createdAt: string;
  updatedAt: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
