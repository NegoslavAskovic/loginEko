export class SunflowerCropPage {
  elements = {
    sectionTitle: (): Cypress.Chainable<any> => cy.get(".title-container"),
    sunflowerTotalCropsArea: (): Cypress.Chainable<any> =>
      cy.get(".regular-text"),
    backButton: (): Cypress.Chainable<any> => cy.get(".header-button"),
  };
}
export const sunflowerCropPage = new SunflowerCropPage();
