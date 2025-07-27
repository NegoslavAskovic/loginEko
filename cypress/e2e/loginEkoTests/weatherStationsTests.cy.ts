import { homePage } from "../../pages/homePage";
import { weatherStationsPage } from "../../pages/weatherStationPage";

describe("Weather Stations tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it(" filter manipulation has correct results", () => {
    homePage.elements.weatherStationIcon().click();

    //validation panel is displayed is opened and "All" is preselected
    weatherStationsPage.elements.sectionTitle().contains(" Weather stations ");
    weatherStationsPage.elements.filter().should("be.visible").contains("All");

    // Validate each station has value for name , tem. and raifall data and label Private or Public
    cy.get(".sidebar-list-item.interactable").each(($el) => {
      // Validate "Name" is not empty
      cy.wrap($el)
        .find(".normal-text")
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.not.be.empty;
        });

      // Validate "Temperature and rainfall data" is not empty
      cy.wrap($el)
        .find(".small-text.details")
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.not.be.empty;
        });

      // Validate "Label" contains "private" or "public"
      cy.wrap($el)
        .find(".ml-auto")
        .invoke("text")
        .then((text) => {
          const trimmed = text.trim().toLowerCase();
          expect(["private", "public"]).to.include(
            trimmed,
            'should be "private" or "public"'
          );
        });
    });

    //Validate "The message for public weather stations is shown if there is no stations".
    weatherStationsPage.elements.filter().click();
    cy.contains("Public").click();
    cy.get("body").then(($body) => {
      const items = $body.find(".sidebar-list-item.interactable");
      if (items.length === 0) {
        cy.contains("No public weather stations found on").should("be.visible");
      }
    });

    //Validate "A link labeled “view all” is visible and clickable"
    weatherStationsPage.elements
      .linkPublicOption()
      .should("be.visible")
      .click();

    //Validate "Clicking the link resets the filter back to “All”, and the list is repopulated"
    weatherStationsPage.elements.filter().should("be.visible").contains("All");
    cy.contains("Kumane");
  });

  afterEach(() => {
    Cypress.session.clearAllSavedSessions();
  });
});
