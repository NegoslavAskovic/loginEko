export class HomePage {
  elements = {
    cropsIcon: (): Cypress.Chainable<any> => cy.contains("Crops"),
    weatherStationIcon: (): Cypress.Chainable<any> =>
      cy.contains(" Weather stations "),
    soilNutrients: (): Cypress.Chainable<any> =>
      cy.contains(" Soil nutrients "),
  };
}
export const homePage = new HomePage();
