import clubLocators from "./locators";
import generalActions from "../../playerProfile/actions";
const profileActions = new generalActions();

export default class clubActions{
    createClub(){
        cy.get(clubLocators.clubCreateButton)
        .contains('Create')
        .click();
    }
    addDescription(locator, text){
        return cy.get(locator)
        .clear()
        .type(text)        
    }
    selectPhone(clubCountry, code){
        profileActions.getElement(clubLocators.clubCreateFlag)
        .click();
        profileActions.clickByText(
            clubLocators.clubCreateOption, 
            clubCountry
        );
        profileActions.getElement(clubLocators.clubCountryCode)
        .should('have.text', code);
    }
}