Cypress.Commands.add(
  "loginWithKeycloak",
  (): Cypress.Chainable<{ accessToken: string; sessionState: string }> => {
    return cy
      .request({
        method: "POST",
        url: Cypress.env("URL"),
        form: true,
        body: {
          grant_type: Cypress.env("GRANT_TYPE"),
          client_id: Cypress.env("CLIENT_ID"),
          username: Cypress.env("USERNAME"),
          password: Cypress.env("PASSWORD"),
        },
      })
      .then((resp) => {
        expect(resp.status).to.eq(200);

        const accessToken = resp.body.access_token as string;
        const sessionState = resp.body.session_state as string;

        if (!accessToken) throw new Error("No access_token found");
        if (!sessionState) throw new Error("No session_state found");

        return cy.wrap({ accessToken, sessionState });
      });
  }
);
