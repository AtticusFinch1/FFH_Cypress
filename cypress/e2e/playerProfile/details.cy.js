// /// <reference types="cypress" />
// import { should } from 'chai';

// import './commands';
// import locators  from './locators';
// import generalAcitons from './actions';
// import data from './constants';

// const apiUrl = Cypress.env('API_URL');
// const actionsGeneral = new generalAcitons();
// context('Actions', () => {
//     beforeEach(() => {
//         cy.login(
//             Cypress.env('EMAIL'), 
//             Cypress.env('PASSWORD')
//         )
//         cy.viewport(1200, 800)
//     })
//     it('Verify Personal Details', ()=> {
//         cy.visit(`${apiUrl}settings/details`)
//         cy.verifyPersonalDetails(
//             data.minHeight, 
//             data.maxHeight, 
//             data.normalHeight, 
//             data.minWeight, 
//             data.maxWeight, 
//             data.normalWeight, 
//             data.gender
//         )
//         cy.verifyPosition(
//             data.firstPosition, 
//             data.secondPosition, 
//             data.preferFoot
//             );
//         cy.verifyContacts();
//         // cy.visit(`${apiUrl}settings/security`);
//         // cy.changePassword();
//     })

//     it('Verify Profile page', ()=> {
//         const dataBackend = [];
//         cy.getUsername().then(username=>{
//             cy.getProfileData(username).then(data=>{
//                 dataBackend.push(
//                     data.user.profile.nationalityName, 
//                     data.user.profile.countryName);
//             });
//         });
//         cy.log('dataBackend', dataBackend);
//         cy.get(locators.profileAvatar).click();
//         cy.contains('div', 'My Profile')
//         .click()
//         cy.get('div[class="q-card q-card--shadowed profile__about"] div[class="row"]')
//         .invoke('text').as('description').then((description)=>{
//             expect(description).to.eq(data.descriptionTxt)
//         });
//         actionsGeneral.getData('Preferred position', 'firstPosition').then((position)=> {
//             expect(position).to.eq(data.firstPosition)
//         });
//         actionsGeneral.getData('Secondary position', 'secondPosition').then((position)=> {
//             expect(position).to.eq(data.secondPosition)
//         });
//         actionsGeneral.getData('Preferred foot', 'prefFoot').then((foot)=> {
//             expect(foot).to.eq(data.preferFoot)
//         });
//         actionsGeneral.getData('Nationality', 'nationality').then((nationality) => {
//             expect(nationality).to.eq(dataBackend[0])
//         });
//         actionsGeneral.getData('Location', 'locaiton').then((location) => {
//             expect(location.trim()).to.eq(dataBackend[1])
//         });
//         actionsGeneral.getData('School / University', 'education').then((education) => {
//             expect(education).to.eq(data.playerSchool)
//         });
//         actionsGeneral.getData('Gender', 'gender').then((gender) => {
//             expect(gender).to.eq(data.gender)
//         });
//         actionsGeneral.getData('Weight', 'weight').then((weight) => {
//             expect(weight).to.eq(data.normalWeight + ' kg')
//         });
//         actionsGeneral.getData('Height', 'height').then((height) => {
//             expect(height).to.eq(data.normalHeight + ' cm')
//         });
//         actionsGeneral.getData('Agent', 'agent').then((agent) => {
//             expect(agent).to.eq(data.playerAgent)
//         });
//         })


//     })