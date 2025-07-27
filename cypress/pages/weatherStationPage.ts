export class WeatherStationsPage {
  elements = {
    sectionTitle: (): Cypress.Chainable<any> => cy.get(".title-container"),
    filter: (): Cypress.Chainable<any> => cy.get(".v-btn__content"),
    linkPublicOption: (): Cypress.Chainable<any> =>
      cy.get(".link").contains(" view all "),
  };
}
export const weatherStationsPage = new WeatherStationsPage();
