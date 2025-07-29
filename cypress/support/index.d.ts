/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    // Log in programmatically and get the authorization code
    programmaticLogin(): Chainable<string>;

    //Exchange authorization code for tokens
    exchangeCodeForToken(
      code: string
    ): Chainable<{ access_token: string; refresh_token: string }>;
  }
}
