import {Given} from "cypress-cucumber-preprocessor/steps"

const STORYBOOK_URL = "http://localhost:6006/iframe.html?id="
const getStoryUrl = id => `${STORYBOOK_URL}${id}`

Given(`I open {string} story`, url => {
  cy.visit(getStoryUrl(url))
})
