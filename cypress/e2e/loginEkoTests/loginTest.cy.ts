describe("Programmatic Keycloak Login and Authenticated Visit", () => {
  it("logs in, exchanges token, and shows logged-in UI", () => {
    cy.programmaticLogin()
      .then((code) => cy.exchangeCodeForToken(code))
      .then(({ access_token }) => {
        cy.log("Access Token:", access_token);

        // Save token to localStorage so app knows user is logged in
        cy.window().then((win) => {
          win.localStorage.setItem("token_logineko", access_token);
        });

        // Visit the app now that we have token in localStorage
        cy.visit("/");

        // Assert logged-in UI appears
        cy.contains("e2e tester", { timeout: 10000 })
          .scrollIntoView()
          .should("be.visible");
      });
  });
});
