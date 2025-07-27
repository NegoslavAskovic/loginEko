declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginWithKeycloak(): Chainable<{
      accessToken: string;
      sessionState: string;
    }>;
  }
}
