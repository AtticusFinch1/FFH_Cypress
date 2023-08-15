// /// <reference types="cypress" />
import { should } from 'chai';

import './commands';
import locators  from './locators';
import generalAcitons from './actions';
import data from './constants';

const apiUrl = Cypress.env('API_URL');
const actionsGeneral = new generalAcitons();
context('Actions', () => {
    beforeEach(() => {
        cy.login(
            Cypress.env('EMAIL_SETTINGS'), 
            Cypress.env('PASSWORD')
        )
        cy.viewport(1200, 800)
    })
    it('Verify Personal Details', ()=> {
        cy.visit(`${apiUrl}settings/details`)
        cy.verifyPersonalDetails(
            data.minHeight, 
            data.maxHeight, 
            data.normalHeight, 
            data.minWeight, 
            data.maxWeight, 
            data.normalWeight, 
            data.gender
        )
        cy.verifyPosition(
            data.firstPosition, 
            data.secondPosition, 
            data.preferFoot
            );
    })

    it('Verify Profile page', ()=> {
        const dataBackend = [];
        cy.getUsername().then(username=>{
            cy.getProfileData(username).then(data=>{
                dataBackend.push(
                    data.user.profile.nationalityName, 
                    data.user.profile.countryName);
            });
        });
        cy.get(locators.profileAvatar).click();
        actionsGeneral.clickByText('div', 'My Profile');
        actionsGeneral.invokeText(locators.profileDescription, 'text')
        .as('description').then((description)=>{
            expect(description).to.eq(data.descriptionTxt)
        });

        const dataPromises = [
            { text: 'Preferred position',   helper: 'firstPosition',  assertion: data.firstPosition },
            { text: 'Secondary position',   helper: 'secondPosition', assertion: data.secondPosition},
            { text: 'Preferred foot',       helper: 'prefFoot',       assertion: data.preferFoot},
            { text: 'School / University',  helper: 'education',      assertion: data.playerSchool},
            { text: 'Gender',               helper: 'gender',         assertion: data.gender},
            { text: 'Weight',               helper: 'weight',         assertion: data.normalWeight + ' kg'},
            { text: 'Height',               helper: 'height',         assertion: data.normalHeight + ' cm'},
            { text: 'Agent',                helper: 'agent',          assertion: data.playerAgent},
        ];

        dataPromises.forEach((item) => {
            actionsGeneral.getData(item.text, item.helper).then((position) => {
                expect(position).to.eq(item.assertion)
            })
        })
        actionsGeneral.getData('Location', 'locaiton').then((location) => {
            expect(location.trim()).to.eq(dataBackend[1])
        });
        actionsGeneral.getData('Nationality', 'nationality').then((nationality) => {
            expect(nationality).to.eq(dataBackend[0])
        });
    })
})