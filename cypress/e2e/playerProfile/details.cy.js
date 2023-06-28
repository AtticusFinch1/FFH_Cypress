/// <reference types="cypress" />

import { should } from 'chai';
import './commands';
import profileLocators from './locators'
const apiUrl = Cypress.env('API_URL') 
context('Actions', () => {
    beforeEach(() => {
        cy.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'))
        cy.viewport(1200, 800)
    })
    it('Verify Personal Details', ()=> {
        cy.visit(`${apiUrl}/settings/details`)
        cy.verifyPersonalDetails()
        cy.verifyContacts();
        cy.verifyPosition();
        cy.visit(`${apiUrl}/settings/security`);
        cy.changePassword();
    })
})