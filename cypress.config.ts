import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://app.e2e.gcp.logineko.com/logineko",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.ts"
  }
});
