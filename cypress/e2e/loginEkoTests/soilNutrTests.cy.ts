import { homePage } from "../../pages/homePage";
import { soilPage } from "../../pages/soilPage";

describe("Soil nutrients tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it(" soil nutrient type has correct legend", () => {
    homePage.elements.soilNutrients().click();

    //Validate The "Soil nutrients" panel is visible.
    soilPage.elements.sectionTitle().contains(" Soil nutrients ");

    // Validate list of nutrient types is available
    cy.fixture("soilNutrientMap").then((map) => {
      const keys = Object.keys(map);

      // Get the radio group container
      cy.get(".v-input--radio-group__input").then(($container) => {
        keys.forEach((key) => {
          // Check that each key (label text) is visible inside the container
          cy.wrap($container).should("contain.text", key);
        });
      });
    });

    // Validate label or title of the legend changes appropriately when selecting different nutrient types
    cy.fixture("soilNutrientMap").then((map) => {
      const keys = Object.keys(map);
      cy.get(".pb-3 > .v-input").find(".v-radio").as("radioButtons");
      cy.get("@radioButtons").each(($radio, index) => {
        cy.wrap($radio)
          .invoke("text")
          .then((radioLabelRaw) => {
            const radioLabel = radioLabelRaw.trim();

            // Find matching key from fixture
            const matchedKey = keys.find((key) => radioLabel.includes(key));
            expect(
              matchedKey,
              `Radio label "${radioLabel}" should match one of the fixture keys`
            ).to.exist;
            const expectedValue = map[matchedKey as keyof typeof map];

            // Click the radio
            cy.wrap($radio)
              .find(".v-input--selection-controls__ripple")
              .click({ force: true });

            // Assert the dependent element updates correctly
            cy.get("[test-selected-nutrient]")
              .invoke("text")
              .should("contain", expectedValue);
          });
      });
    });
  });

  afterEach(() => {
    Cypress.session.clearAllSavedSessions();
  });
});
