import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppProviders } from "../../../../../../app/providers";

// Mock de hooks de datos
jest.mock("../../../../application/useListCategories", () => ({
  useListCategories: () => ({
    data: [
      { id: "tech", name: "Tech", subcategories: [{ id: "fe", name: "Frontend" }] },
      { id: "life", name: "Lifestyle" }
    ],
    isLoading: false,
  }),
}));

const createMock = jest.fn();
const updateMock = jest.fn();

jest.mock("../../../../application/useUpsertArticle", () => ({
  useUpsertArticle: (id?: string) => ({
    create: { mutate: (p: any, o: any) => { createMock(p); o?.onSuccess?.({ id: "123" }); }, isPending: false },
    update: { mutate: (p: any, o: any) => { updateMock(p); o?.onSuccess?.({ id: id ?? "1" }); }, isPending: false },
  }),
}));

jest.mock("../../../../application/useGetArticle", () => ({
  useGetArticle: (id?: string) => ({
    data: id ? { id, title: "Old", body: "Old body 123456789", categoryId: "tech", subcategoryId: "fe", ratingAvg: 3.3, createdAt: "", updatedAt: "" } : undefined,
    isLoading: false,
    error: undefined,
  }),
}));

import ArticleFormPage from "../ArticleFormPage";

function renderWithRouter(start: string) {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[start]}>
        <Routes>
          <Route path="/articles/new" element={<ArticleFormPage />} />
          <Route path="/articles/:id/edit" element={<ArticleFormPage />} />
        </Routes>
      </MemoryRouter>
    </AppProviders>
  );
}

test("crea articulo valido e invoca mutate(create)", async () => {
  renderWithRouter("/articles/new");

  await userEvent.type(screen.getByPlaceholderText(/título del artículo/i), "Nuevo post");
  await userEvent.type(screen.getByPlaceholderText(/contenido/i), "Contenido suficientemente largo");
  const categorySelects = screen.getAllByRole("combobox");
  const categorySelect = categorySelects.find(sel => (sel as HTMLSelectElement).name === "categoryId") as HTMLSelectElement;
  await userEvent.selectOptions(categorySelect, "tech");
  // espera a que la subcategoria se habilite
  await waitFor(() => {
    const subcategorySelects = screen.getAllByRole("combobox");
    const subcategorySelect = subcategorySelects.find(sel => (sel as HTMLSelectElement).name === "subcategoryId") as HTMLSelectElement;
    expect(subcategorySelect).not.toBeDisabled();
  });
  const subcategorySelects = screen.getAllByRole("combobox");
  const subcategorySelect = subcategorySelects.find(sel => (sel as HTMLSelectElement).name === "subcategoryId") as HTMLSelectElement;
  await userEvent.selectOptions(subcategorySelect, "fe");

  await userEvent.click(screen.getByRole("button", { name: /crear/i }));
  await waitFor(() => expect(createMock).toHaveBeenCalled());
});

test("muestra errores de validacion", async () => {
  renderWithRouter("/articles/new");
  await userEvent.click(screen.getByRole("button", { name: /crear/i }));

  expect(await screen.findByText(/minimo 3 caracteres/i)).toBeInTheDocument();
  expect(screen.getByText(/minimo 10 caracteres/i)).toBeInTheDocument();
  expect(screen.getByText(/seleccione una categoria/i)).toBeInTheDocument();
});

test("edita articulo e invoca mutate(update)", async () => {
  renderWithRouter("/articles/42/edit");

  // Cambiar titulo y guardar
  const title = screen.getByPlaceholderText(/título del artículo/i) as HTMLInputElement;
  expect(title.value).toBe("Old");
  await userEvent.clear(title);
  await userEvent.type(title, "Nuevo título");

  await userEvent.click(screen.getByRole("button", { name: /guardar/i }));
  await waitFor(() => expect(updateMock).toHaveBeenCalledWith(expect.objectContaining({ title: "Nuevo título" })));
});
