/// <reference types="cypress" />

import { should } from 'chai';
const apiUrl = Cypress.env('API_URL') 
import './commands';
import locators from './locators';
import data from './constants';


context('Actions', () => {
    beforeEach(() => {
        cy.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'))
        cy.viewport(1200, 800)
    })
    // it('Verify profile menu', () => {
    //     cy.getName().then(name => {
    //         cy.checkProfile(name, 'Player', {visitProfile:true});    
    //     })
    // })
    // it('Fill the profile from settings', () => {
    //     cy.visit(`${apiUrl}settings`)
    //     cy.get(locators.settingsMenu)
    //     .children('a')
    //     .first()
    //     .should('have.attr', 'href', '/settings')
    //     .should('have.text',  data.tabGeneral)
    //     .should('have.attr', 'aria-selected', 'true')
    //     .next()
    //     .should('have.attr', 'href', '/settings/details')
    //     .should('have.text', data.tabDetails)
    //     .next()
    //     .should('have.attr', 'href', '/settings/security')
    //     .should('have.text', data.tabSecurity)
    //     .next()
    //     .should('have.attr', 'href', '/settings/followings')
    //     .should('have.text', data.tabFollowings)
    //     .next()
    //     .should('have.attr', 'href', '/settings/payment/invoices')
    //     .should('have.text', data.tabInvoices)
    //     .next()
    //     .should('have.attr', 'href', '/settings/packages')
    //     .should('have.text', data.tabPackages)
    // })
    // it('Check header', () => {
    //     cy.visit(`${apiUrl}settings`)
    //     cy.get(locators.settingsHeader)
    //     .should('have.text', 'General')
    //     cy.get(locators.settingsPoints)
    //     .children()
    //     .first()
    //     .should('have.class', locators.pointsClass)
    //     cy.get(locators.pointsCount)
    //     .should('have.text', '50')
    // })
    it('Verify Genereal Tab', () => {       
        cy.visit(`${apiUrl}settings`);
        cy.get(locators.profilePhoto)
        .children()
        .first()
        .should('have.attr', 'style', 'font-size: 38px;')
        .should('have.class', locators.profilePhotoClass);
        cy.checkAvatar(locators.profilePhotoDefault);     
        cy.get(locators.profilePhotoEdit)
        .should('have.attr', 'type', 'button')
        .should('have.attr', 'style', 'font-size: 12px;')
        cy.uploadPhoto('cypress/fixtures/img2.png', {cropAfterUpload:true});
        cy.verifyPhoto(locators.profilePhotoPng);
        cy.deletePhoto();
        cy.uploadPhoto('cypress/fixtures/img3.jpeg', {cropAfterUpload:true});
        cy.verifyPhoto(locators.profilePhotoJpg);
        cy.uploadPhoto('cypress/fixtures/img4.webp');
        cy.get(locators.allowedFormat)
        .should('have.text', data.imageFormat)
        cy.contains('.block', 'Cancel')
        .click()
        cy.verifyPhoto(locators.profilePhotoJpg);
        // cy.changeName(data.nameFirst, data.nameLast);
        cy.verifyUsername(data.nameFirst, data.nameFormat);
        cy.verifyCountry(data.playerCountry, data.playerCity, data.playerAddress, data.playerPhone);
        cy.verifyEducation("High School", data.playerSchool, data.playerAgent)
    })


})