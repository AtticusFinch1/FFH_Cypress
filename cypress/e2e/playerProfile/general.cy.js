/// <reference types="cypress" />

import { should } from 'chai';
const apiUrl = Cypress.env('API_URL') 
import './commands';
import {
    settingsMenu,
    settingsHeader,
    settingsPoints,
    pointsClass,
    pointsCount,
    profilePhoto,
    profilePhotoClass,
    profilePhotoDefault,
    profilePhotoEdit,
    profilePhotoPng,
    profilePhotoJpg,
    allowedFormat,
} from './locators'
import {
    tabGeneral,
    tabDetails,
    tabSecurity,
    tabFollowings,
    tabInvoices,
    tabPackages, 
    nameFirst,
    nameLast,
    nameFormat,
    playerCountry,
    playerCity, 
    playerAddress,
    playerPhone, 
    playerSchool, 
    playerUni,
    playerAgent,
    imageFormat,
} from './constants';

context('Actions', () => {
    beforeEach(() => {
        cy.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'))
        cy.viewport(1200, 800)
    })
    it('Verify profile menu', () => {
        cy.checkProfile('player1 p.', 'Player', {visitProfile:true});    
    })
    it('Fill the profile from settings', () => {
        cy.visit(`${apiUrl}settings`)
        cy.get(settingsMenu)
        .children('a')
        .first()
        .should('have.attr', 'href', '/settings')
        .should('have.text', tabGeneral)
        .should('have.attr', 'aria-selected', 'true')
        .next()
        .should('have.attr', 'href', '/settings/details')
        .should('have.text', tabDetails)
        .next()
        .should('have.attr', 'href', '/settings/security')
        .should('have.text', tabSecurity)
        .next()
        .should('have.attr', 'href', '/settings/followings')
        .should('have.text', tabFollowings)
        .next()
        .should('have.attr', 'href', '/settings/payment/invoices')
        .should('have.text', tabInvoices)
        .next()
        .should('have.attr', 'href', '/settings/packages')
        .should('have.text', tabPackages)
    })
    it('Check header', () => {
        cy.visit(`${apiUrl}settings`)
        cy.get(settingsHeader)
        .should('have.text', 'General')
        cy.get(settingsPoints)
        .children()
        .first()
        .should('have.class', pointsClass)
        cy.get(pointsCount)
        .should('have.text', '50')
    })
    it('Verify Genereal Tab', () => {       
        cy.visit(`${apiUrl}settings`);
        cy.get(profilePhoto)
        .children()
        .first()
        .should('have.attr', 'style', 'font-size: 38px;')
        .should('have.class', profilePhotoClass);
        cy.verifyPhoto(profilePhotoDefault);
        cy.get(profilePhotoEdit)
        .should('have.attr', 'type', 'button')
        .should('have.attr', 'style', 'font-size: 12px;')
        cy.uploadPhoto('cypress/fixtures/img2.png', {cropAfterUpload:true});
        cy.verifyPhoto(profilePhotoPng, {deleteAfterUpload:true});
        cy.uploadPhoto('cypress/fixtures/img3.jpeg', {cropAfterUpload:true});
        cy.verifyPhoto(profilePhotoJpg);
        cy.uploadPhoto('cypress/fixtures/img4.webp');
        cy.get(allowedFormat)
        .should('have.text', imageFormat)
        cy.contains('.block', 'Cancel')
        .click()
        cy.verifyPhoto(profilePhotoJpg);
        cy.changeName(nameFirst, nameLast);
        cy.verifyUsername(nameFirst, nameFormat);
        cy.verifyCountry(playerCountry, playerCity, playerAddress, playerPhone);
        cy.verifyEducation("High School", playerSchool, playerAgent)
    })


})