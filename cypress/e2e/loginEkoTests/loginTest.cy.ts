beforeEach(() => {
  cy.loginWithKeycloak().then(({ accessToken, sessionState }) => {
    cy.setCookie("KEYCLOAK_IDENTITY", accessToken, { path: "/" });
    cy.setCookie("KEYCLOAK_SESSION", sessionState, { path: "/" });

    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("token_logineko", accessToken);
      },
    });
  });
});

it("should show logged-in UI", () => {
  cy.getCookie("KEYCLOAK_IDENTITY").should("exist");
  cy.window().then((win) => {
    const token = win.localStorage.getItem("token_logineko");
    expect(token).to.exist;
  });
  cy.contains("e2E tester", { timeout: 10000 }).should("be.visible");
});
