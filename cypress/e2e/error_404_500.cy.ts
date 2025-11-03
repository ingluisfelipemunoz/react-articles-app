describe("Manejo de errores 404 y 500", () => {
  it("muestra 404 en detalle", () => {
    cy.visit("/articles/999?__error=404");
    cy.contains(/error al cargar el artículo/i).should("exist");
  });

  it("muestra 500 en detalle (via MSW query)", () => {
    cy.visit("/articles/1?__error=500");
    cy.contains(/error al cargar el artículo/i).should("exist");
  });
});
