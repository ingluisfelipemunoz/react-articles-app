/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
describe("Crear artículo y calificar", () => {
  it("crea un artículo y le da rating", () => {
    cy.visit("/articles", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "app:auth",
          JSON.stringify({ user: { id: "u1", name: "cypress", role: "editor" } }),
        );
      },
    });

    // Ir a Nuevo articulo
    cy.contains("Crear Articulo").click();
    cy.url().should("include", "/articles/new");

    // Completar form
    cy.findByPlaceholderText(/título del artículo/i).type("Nuevo Cypress");
    cy.findByPlaceholderText(/contenido\.{3}/i).type("Contenido de prueba suficiente");
    cy.get('select[name="categoryId"]').select("Negocios");

    cy.findByRole("button", { name: /crear/i }).click();

    // Debe navegar al detalle
    cy.url().should("match", /\/articles\/\d+$/);
    cy.contains("Nuevo Cypress");

    // Dar rating (ej. 4)
    cy.findAllByRole("radio").eq(3).click();
    cy.findByText(/\/5$/); // muestra -/5 o n/5
  });
});
