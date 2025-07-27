/// <reference types="cypress" />
import { homePage } from "../../pages/homePage";
import { cropsPage } from "../../pages/cropsPage";
import { sunflowerCropPage } from "../../pages/sunflowerCropPage";

describe("Crops tests", () => {
  beforeEach(() => {
    cy.loginWithKeycloak().then(() => {
      cy.visit("/");
    });
  });

  it("Crops functionalities are correct", () => {
    /* Error message is displaying when land page is url which is deined in task
    'https://app.e2e.gcp.logineko.com/logineko/map?loc=20.174149,45.679332&zoom=9.74&date=1'
    */
    cy.contains("LoginEKO");

    //validation Crops sidebar is not opened by default
    cropsPage.elements.sectionTitle().should("not.exist");

    homePage.elements.cropsIcon().click();

    //validation section has correct title
    cropsPage.elements.sectionTitle().contains("Crops");

    //Validate total number crops and are is displayed. Probably these are dynamic values so I didn't hardcode value of crops and ha
    cropsPage.elements.totalCropsArea().should("contain", /crops.*ha/i);

    //The list includes crop items (e.g. "Pea") with a visible area label (e.g. "638.01).I have validate that all items have name and label
    cy.get(".sidebar-list-item.interactable").each(($item) => {
      cy.wrap($item).within(() => {
        // Check iem has non-empty text
        cropsPage.elements
          .itemsCrops()
          .invoke("text")
          .then((text) => {
            expect(text.trim()).to.not.be.empty;
          });

        // Check label has non-empty text
        cropsPage.elements
          .areaCrops()
          .invoke("text")
          .then((text) => {
            expect(text.trim()).to.not.be.empty;
          });
      });
    });

    cropsPage.elements.sunflowerCrop().click();

    //Validate section title is correct
    sunflowerCropPage.elements.sectionTitle().contains(" Sunflower ");

    //Validate filters are displayed
    cy.contains("Varieties");
    cy.contains("Organic certification status");

    //Validate fields and ha are shown. It is probably dynamic values so I didn't hardcoded values
    sunflowerCropPage.elements
      .sunflowerTotalCropsArea()
      .invoke("text")
      .should("match", /fields.*ha/i);

    cy.contains(" Suncokret - NS Kruna ").click();

    //Validate only parcels that belong to the selected variety.
    cy.contains("MU-108");
    cy.contains("MU-12");
    cy.contains("DJ-12").should("not.exist");
    cy.contains("DJ-").should("not.exist");

    //Validate ‘Organic certification status’ list does not contain items that do not match variety.
    cy.contains(" Not certified ");
    cy.contains("In certification, 1st year").should("not.exist");
    cy.contains(" Certified organic ");

    // validate back button is correct
    cy.contains("MU-108").click();
    sunflowerCropPage.elements.backButton().click();
    cy.get(".title-container").should("not.contain", "Varieties");

    //Validate all crops are listed All crops are listed again.
    cy.contains("Sunflower");
    cy.contains("Sorghum");
    cy.contains("Millet");
    cy.contains("Pea");
    cy.contains("Hemp");
    cy.contains("Orchardgrass & Red clover & Tall fescue");
    cy.contains("Chickpea");
    cy.contains("Cowpea");
    cy.contains("Orchardgrass & Sorghum & Tall fescue");
    cy.contains("Bean");
    cy.contains("Amaranth");
    cy.contains("Lettuce");
    cy.contains("Broad bean & Oat");
    cy.contains("Broad bean");
    cy.contains("Oat & Pea");
    cy.contains("Paprika");
    cy.contains("Nettle");
    cy.contains("Yarrow");
    cy.contains("Valerian");
    cy.contains("Dandelion");
    cy.contains("Field horsetail");
    cy.contains("No crop");

    cropsPage.elements
      .totalCropsArea()
      .invoke("text")
      .should("match", /crops.*ha/i);
  });

  afterEach(() => {
    Cypress.session.clearAllSavedSessions();
  });
});
