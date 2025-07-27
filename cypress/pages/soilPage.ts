export class SoilPage {
  elements = {
    sectionTitle: (): Cypress.Chainable<any> => cy.get(".title-container"),
  };
}
export const soilPage = new SoilPage();
