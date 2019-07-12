import {Then} from "cypress-cucumber-preprocessor/steps"

Then("I click {string}", label => {
  cy.contains(label).click()
})

Then("I can see {string}", label => {
  cy.contains(label).should("exist")
})
