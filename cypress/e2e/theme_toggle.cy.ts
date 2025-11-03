describe("Theme toggle", () => {
  it("aplica y quita clase dark en <html>", () => {
    cy.visit("/articles");

    // Cambiar a dark
    cy.contains(/^dark$/i).click();
    cy.get("html").should("have.class", "dark");

    // Cambiar a light
    cy.contains(/^light$/i).click();
    cy.get("html").should("not.have.class", "dark");
  });
});
