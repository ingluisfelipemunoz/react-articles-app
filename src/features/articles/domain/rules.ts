import type { Category } from "./types";

export function isValidCategory(
  categoryId: string,
  subsId: string | null | undefined,
  categories: Category[],
): boolean {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return false;
  if (!subsId) return true;
  const subcategory = category.subcategories?.find((s) => s.id === subsId);
  return !!subcategory;
}
