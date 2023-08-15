/// <reference types="cypress" />

import { should } from 'chai';
const apiUrl = Cypress.env('API_URL') 
import './commands';
import locators from './locators';
import data from './constants';
import generalActions from "./actions";

const actions = new generalActions();

Cypress.on('uncaught:exception', (err, runnable) => {
    cy.log(err);
    return false;
})

context('Actions', () => {
    beforeEach(() => {
        cy.login(Cypress.env('EMAIL_SETTINGS'), Cypress.env('PASSWORD'))
        cy.viewport(1200, 800);         
    })
    it('Verify profile menu', () => {
          cy.getName().then(name => {
            cy.checkProfile(name, 'Player', { visitProfile: true });
        });
      });
    it('Fill the profile from settings', () => {
        cy.visit(`${apiUrl}settings`)
        const tabInfo = [
            { index: 0, text: data.tabGeneral,    href: '/settings'},
            { index: 1, text: data.tabDetails,    href: '/settings/details'},
            { index: 2, text: data.tabSecurity,   href: '/settings/security'},
            { index: 3, text: data.tabFollowings, href: '/settings/followings'},
            { index: 4, text: data.tabInvoices,   href: '/settings/payment/invoices'},
            { index: 5, text: data.tabPackages,   href: '/settings/packages'},            
        ]
        tabInfo.forEach((tab) => {
            actions.getNthChild(
                locators.settingsMenu, 
                tab.index, 
                'a'
            )
            .find(locators.settingsTab)
            .should('have.text', tab.text)
            .parent()
            .parent()
            .should('have.attr', 'href')
            .and('include', tab.href)
        })
    })
    it('Verify Genereal Tab', () => {       
        cy.visit(`${apiUrl}settings`);
        actions.getFirstChild(locators.profilePhoto)
        .should('have.attr', 'style', 'font-size: 38px;')
        .should('have.class', locators.profilePhotoClass);
        cy.checkAvatar(locators.profilePhotoDefault);   
        actions.getElement(locators.profilePhotoEdit)  
        .should('have.attr', 'type', 'button')
        .should('have.attr', 'style', 'font-size: 12px;');
        cy.uploadPhoto(
            data.profilePhotoPath+'img2.png', 
            {cropAfterUpload:true}
        );
        cy.verifyPhoto(locators.profilePhotoPng);
        cy.deletePhoto();
        cy.uploadPhoto(
            data.profilePhotoPath+'img3.jpeg',
            {cropAfterUpload:true}
        );
        cy.verifyPhoto(locators.profilePhotoJpg);
        cy.deletePhoto();
        cy.uploadPhoto(data.profilePhotoPath+'img4.webp');
        cy.get(locators.allowedFormat)
        .should('have.text', data.imageFormat)
        cy.contains('.block', 'Cancel')
        .click()
        cy.verifyPhoto(locators.profilePhotoJpg);
        cy.getRandomNames().then(names => {
            //cy.changeName(names.nameFirst, names.nameLast);  
            cy.verifyUsername(names.fullName);
            cy.verifyCountry(names.fullName, names.fullName, data.playerPhone);
        })
        cy.verifyEducation("High School", data.playerSchool, data.playerAgent)
    })


})