// /// <reference types="cypress" />

// import { should } from 'chai';
// const apiUrl = Cypress.env('API_URL') 
// import './commands';
// import locators from './locators';
// import data from './constants';
// import generalActions from "./actions";

// const actions = new generalActions();

// Cypress.on('uncaught:exception', (err, runnable) => {
//     cy.log(err);
//     return false;
// })

// context('Actions', () => {
//     beforeEach(() => {
//         cy.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'))
//         cy.viewport(1200, 800);         
//     })
//     it('Verify profile menu', () => {
//           cy.getName().then(name => {
//             cy.checkProfile(name, 'Player', { visitProfile: true });
//         });
//         cy.getUsername().then(username=>{
//             cy.log('username', username)
//         })
//       });
//     it('Fill the profile from settings', () => {
//         cy.visit(`${apiUrl}settings`)
//         actions.getFirstChild(locators.settingsMenu, 'a')
//         .should('have.attr', 'href', '/settings')
//         .should('have.text',  data.tabGeneral)
//         .should('have.attr', 'aria-selected', 'true')
//         .next()
//         .should('have.attr', 'href', '/settings/details')
//         .should('have.text', data.tabDetails)
//         .next()
//         .should('have.attr', 'href', '/settings/security')
//         .should('have.text', data.tabSecurity)
//         .next()
//         .should('have.attr', 'href', '/settings/followings')
//         .should('have.text', data.tabFollowings)
//         .next()
//         .should('have.attr', 'href', '/settings/payment/invoices')
//         .should('have.text', data.tabInvoices)
//         .next()
//         .should('have.attr', 'href', '/settings/packages')
//         .should('have.text', data.tabPackages);
//     })
//     it('Check header', () => {
//         cy.visit(`${apiUrl}settings`);
//         actions.getElement(locators.settingsHeader)
//         .should('have.text', 'General');
//         actions.getFirstChild(locators.settingsPoints)
//         .should('have.class', locators.pointsClass);
//         actions.getElement(locators.pointsCount)
//         .should('have.text', '50');
//     })
//     it('Verify Genereal Tab', () => {       
//         cy.visit(`${apiUrl}settings`);
//         actions.getFirstChild(locators.profilePhoto)
//         .should('have.attr', 'style', 'font-size: 38px;')
//         .should('have.class', locators.profilePhotoClass);
//         cy.checkAvatar(locators.profilePhotoDefault);   
//         actions.getElement(locators.profilePhotoEdit)  
//         .should('have.attr', 'type', 'button')
//         .should('have.attr', 'style', 'font-size: 12px;');
//         cy.uploadPhoto(
//             'cypress/fixtures/img2.png', 
//             {cropAfterUpload:true}
//         );
//         cy.verifyPhoto(locators.profilePhotoPng);
//         cy.deletePhoto();
//         cy.uploadPhoto(
//             'cypress/fixtures/img3.jpeg',
//             {cropAfterUpload:true}
//         );
//         cy.verifyPhoto(locators.profilePhotoJpg);
//         cy.deletePhoto();
//         cy.uploadPhoto('cypress/fixtures/img4.webp');
//         cy.get(locators.allowedFormat)
//         .should('have.text', data.imageFormat)
//         cy.contains('.block', 'Cancel')
//         .click()
//         cy.verifyPhoto(locators.profilePhotoJpg);
//         cy.getRandomNames().then(names => {
//             //cy.changeName(names.nameFirst, names.nameLast);  
//             cy.verifyUsername(names.fullName);
//             cy.verifyCountry(names.fullName, names.fullName, data.playerPhone);
//         })
//         cy.verifyEducation("High School", data.playerSchool, data.playerAgent)
//     })


// })