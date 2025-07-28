Cypress.Commands.add(
  "programmaticLogin",
  function (this: any): Cypress.Chainable<string> {
    const authUrl = `${Cypress.env("KEYCLOAK_BASE_URL")}/realms/${Cypress.env(
      "REALM"
    )}/protocol/openid-connect/auth`;

    const params = new URLSearchParams({
      client_id: Cypress.env("CLIENT_ID"),
      redirect_uri: Cypress.env("REDIRECT_URI"),
      response_type: "code",
      scope: "openid",
    });

    return cy
      .request({
        method: "GET",
        url: `${authUrl}?${params.toString()}`,
        followRedirect: false,
      })
      .then((response) => {
        const html = document.createElement("html");
        html.innerHTML = response.body;

        const form = html.querySelector("form") as HTMLFormElement;
        if (!form) {
          throw new Error("Login form not found in Keycloak response.");
        }

        const action = form.action;
        const inputs = Array.from(form.querySelectorAll("input"));
        const formData: Record<string, string> = {};

        for (const input of inputs) {
          if (input.name && input.value) {
            formData[input.name] = input.value;
          }
        }

        formData.username = Cypress.env("USERNAME");
        formData.password = Cypress.env("PASSWORD");

        return cy
          .request({
            method: "POST",
            url: action,
            form: true,
            body: formData,
            followRedirect: false,
          })
          .then((loginResponse) => {
            const location = loginResponse.headers["location"];

            if (typeof location !== "string" || !location.includes("code=")) {
              throw new Error(
                "Expected redirect with code param was not found."
              );
            }

            cy.log("✅ Login redirect successful:", location);

            const urlObj = new URL(location);
            const code = urlObj.searchParams.get("code");

            if (!code) {
              throw new Error("Authorization code not found in redirect URL.");
            }

            return cy.wrap(code);
          });
      });
  }
);
Cypress.Commands.add(
  "exchangeCodeForToken",
  function (
    code: string
  ): Cypress.Chainable<{ access_token: string; refresh_token: string }> {
    const tokenUrl = `${Cypress.env("KEYCLOAK_BASE_URL")}/realms/${Cypress.env(
      "REALM"
    )}/protocol/openid-connect/token`;

    const body = {
      grant_type: "authorization_code",
      client_id: Cypress.env("CLIENT_ID"),
      code: code,
      redirect_uri: Cypress.env("REDIRECT_URI"),
      // client_secret if needed:
      // client_secret: Cypress.env("CLIENT_SECRET"),
    };

    return cy
      .request({
        method: "POST",
        url: tokenUrl,
        form: true,
        body: body,
        failOnStatusCode: false,
      })
      .then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body).to.have.property("access_token");
        return resp.body;
      });
  }
);
