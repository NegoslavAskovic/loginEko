export class CropsPage {
  elements = {
    sectionTitle: (): Cypress.Chainable<any> => cy.get(".title-container"),
    totalCropsArea: (): Cypress.Chainable<any> => cy.get(".regular-text"),
    sunflowerCrop: (): Cypress.Chainable<any> => cy.contains("Sunflower"),
    itemsCrops: (): Cypress.Chainable<any> =>
      cy.get(".normal-text.normal-text--bold.mb-0"),
    areaCrops: (): Cypress.Chainable<any> => cy.get(".small-text.mb-0"),
  };
}
export const cropsPage = new CropsPage();
