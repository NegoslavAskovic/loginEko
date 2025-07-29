describe("Programmatic Login and Authenticated Visit", () => {
  it("Login without UI", () => {
    cy.programmaticLogin()
      .then((code) => cy.exchangeCodeForToken(code))
      .then(({ access_token }) => {
        cy.log("Access Token:", access_token);

        // Save token to localStorage
        cy.window().then((win) => {
          win.localStorage.setItem("token_logineko", access_token);
        });

        /* Error message is displaying when land page is url which is defined in task
        'https://app.e2e.gcp.logineko.com/logineko/map?loc=20.174149,45.679332&zoom=9.74&date=1'
        */
        cy.visit("/");

        // Assert user is logged-in
        cy.contains(" E2e Tester ", { timeout: 10000 })
          .scrollIntoView()
          .should("be.visible");
      });
  });
});
