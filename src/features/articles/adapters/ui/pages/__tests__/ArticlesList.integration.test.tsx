import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppProviders } from "../../../../../../app/providers";
import { store } from "../../../../../../app/store";
import { selectFavoritesIds } from "../../../../store/selectors";

// Mock del hook useListArticles
jest.mock("../../../../application/useListArticles", () => ({
  useListArticles: () => ({
    data: {
      items: [
        { id: "a1", title: "Articulo A", body: "Body A", categoryId: "tech", subcategoryId: "fe", ratingAvg: 4, createdAt: "", updatedAt: "" },
        { id: "a2", title: "Articulo B", body: "Body B", categoryId: "life", subcategoryId: null, ratingAvg: 3, createdAt: "", updatedAt: "" },
      ],
      total: 2, page: 1, pageSize: 10
    },
    isLoading: false,
    error: null,
  }),
}));

jest.mock("../../../../application/useListCategories", () => ({
  useListCategories: () => ({
    data: [
      { id: "tech", name: "Tech", subcategories: [{ id: "fe", name: "Frontend" }] },
      { id: "life", name: "Lifestyle" }
    ],
    isLoading: false,
  }),
}));
import ArticlesListPage from "../ArticlesListPage";

function renderList() {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={["/articles"]}>
        <Routes><Route path="/articles" element={<ArticlesListPage />} /></Routes>
      </MemoryRouter>
    </AppProviders>
  );
}

test("carga articulos con React Query y permite marcar favorito en Redux", async () => {
  renderList();

  // Espera que se carguen dos cards
  // Busca por texto visible
  expect(await screen.findByText("Articulo A")).toBeInTheDocument();
  expect(screen.getByText("Articulo B")).toBeInTheDocument();

  // Marca favorito en la primera card
  const favBtn = screen.getAllByRole("button", { name: /fav/i })[0];
  await userEvent.click(favBtn);

  // Verifica estado en Redux
  const favIds = selectFavoritesIds(store.getState());
  expect(favIds).toContain("a1");
});
