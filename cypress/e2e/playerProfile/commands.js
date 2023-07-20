const apiUrl = Cypress.env('API_URL');
const uNameUrl = Cypress.env('UNAME_URL');
import locators from "./locators";
import data from "./constants";
import generalActions from "./actions";

const actions = new generalActions();

Cypress.Commands.add('getUsername', () => { 
    cy.visit(`${apiUrl}`)
    actions.clickByLocator(locators.profileAvatar);
    actions.clickByText('div', 'My Profile');
    cy.url().then(url=>{
    const urlAll = url.split('/');
    const username = urlAll[urlAll.length-1];
    return username;
    })
});

Cypress.Commands.add('getProfileData', (username) => {    
        cy.request({
            method: 'POST', 
            url: `${apiUrl}api/players/get/${username}`,
    
        }).then(response => {
            expect(response.status).to.equal(200)
            return response.body;
        })
});

Cypress.Commands.add('getRandomNames', ()=>{
    return cy.request('GET', `${uNameUrl}`)
        .its('body')
        .then(response => {
            const {first, last} = response.results[0].name;
            const full_name = `${first} ${last}`;
            return {nameFirst:first, nameLast:last, fullName: full_name};
        })
})

Cypress.Commands.add('login', (email, password) => {
    cy.visit(`${apiUrl}login`)
    actions.typeText(locators.emailInput, email)
    actions.typeText(locators.passwordInput, password)
    .type('{enter}')
    cy.wait(2000)
})

Cypress.Commands.add('getName', ()=> {
    actions.clickByLocator(locators.profileAvatar); 
    actions.clickByText('div', 'My Profile');   
    actions.invokeText(locators.profileName, 'text')
    .then(text => {
        const parts = text.split(' ');
        const firstPart = parts[0];
        return firstPart;
    })        
})

Cypress.Commands.add('checkProfile', (name, role, options={}) => {
    actions.clickByLocator(locators.profileAvatar);
    if(options.visitProfile){
        actions.clickByText('div', 'My Profile')
    }
    actions.getFind(locators.profileCard, locators.cardName)
    .should('contain.text', name);
    actions.getFind(locators.profileCard, locators.cardRole)
    .should('have.text', role);
    actions.getFind(locators.profileCard, locators.cardBonus)
    .should('contain.text', data.bonusIcon);
    actions.getElement(locators.cardBonusLink)
    .should('have.attr', 'href', '/bonus');
    actions.getFirstChild(locators.cardMenuWrapper)
    .should('have.text', data.myProfile)
    .should('have.attr', 'href')
    .and('include', '/profile');
    actions.getNthChild(locators.cardMenuWrapper, 1)
    .should('have.text', data.settings)
    .should('have.attr', 'href')
    .and('include', '/settings');
    actions.getNthChild(locators.cardMenuWrapper, 2)
    .should('have.text', data.profileLogout);
})

Cypress.Commands.add('uploadPhoto', (imgSrc, options={}) => {
    actions.clickByText('Change');
    actions.putPhoto(imgSrc);
    cy.wait(2000);
    if(options.cropAfterUpload){
        actions.getElement(locators.profileCroptopright)
        .first()
        .trigger('mousedown', {button: 0, clientX: 250, clientY: 250})
        .trigger('mousemove', {clientX: 350, clientY: 350});
        actions.clickByText('.block', 'Publish');
    }
})

Cypress.Commands.add('checkAvatar', (avatarSrc) => {
    actions.getFind(locators.profilePhoto, locators.profilePhotoImage)
    .should('have.attr', 'src')
    .then((src) => {
        if (src !== avatarSrc) {
            cy.deletePhoto();
        }      
    });
});

Cypress.Commands.add('verifyPhoto', (imgSrc) => {
    actions.getFind(locators.profilePhoto, locators.profilePhotoImage)
    .should('have.attr', 'src')
    .and('include', imgSrc)
});

Cypress.Commands.add('deletePhoto', () => {
    actions.clickByText('.block', 'Delete')
    actions.getFind(locators.cardDeleteDialog, locators.dialogHeader)
    .should('have.text', data.deleteConfirm);
    actions.getFind(locators.cardDeleteDialog, locators.dialogBody)
    .should('have.text', data.profilePhotoDelete);
    actions.clickByText('.block', 'OK')
});

// change name, verify banner text and check if name is disabled.
Cypress.Commands.add('changeName', (nameFirst, nameLast) => {
    actions.getIndexFindClick(locators.profileSettingsItem, 1, locators.fullNameEdit);
    actions.typeText(locators.firstNameInput, nameFirst);
    actions.typeText(locators.lastNameInput, nameLast);
    actions.getElement(locators.bannerContent)
    .should('have.text', data.nameAlert);
    actions.saveData();
    actions.getParent(locators.fullNameLabel, "Full name")
    .should('have.class', 'disabled');
    actions.clickByLocator(locators.profileAvatar);
    actions.getFind(locators.profileCard, locators.cardName)
    .should('contain.text', nameFirst)
});

Cypress.Commands.add('verifyUsername', (unameNew) => {
    actions.getIndexFindClick(locators.profileSettingsItem, 2, locators.fullNameEdit);
    actions.typeText(locators.usernameInput, unameNew);
    actions.saveData();
    cy.getUsername().then(uName=>{
        cy.visit(`${apiUrl}settings`);
        actions.getFind(locators.profileSettingsItem, locators.fullNameLabel, 2) 
        .should('contain.text', uName);
    })
});

Cypress.Commands.add('verifyCountry', (country, province, address, zip)=> {
    actions.getFind(locators.profileSettingsItem, locators.fullNameLabel, 3)
    .should('contain.text', 'Country');
    actions.getIndexFindClick(locators.profileSettingsItem, 3, locators.fullNameEdit);
    actions.clickByText(locators.countryPicker, 'Country');
    actions.selectCountry(locators.countrySelector, country)
    actions.typeText(locators.provinceInput, province);
    actions.typeText(locators.addressInput, address);
    actions.typeText(locators.zipInput, zip);
    actions.saveData();
});

Cypress.Commands.add('verifyEducation', (institution, school, agent)=> {
    actions.getFind(locators.profileSettingsItem, locators.fullNameLabel, 4)
    .should('contain.text', 'Education');
    actions.getIndexFindClick(locators.profileSettingsItem, 4, locators.fullNameEdit);
    actions.clickByLocator(locators.educationInput, {force:true});
    actions.getContains(locators.countrySelector, institution);
    actions.typeText(locators.schoolInput, school);
    actions.typeText(locators.agentInput, agent);
    actions.saveData();
});

Cypress.Commands.add('verifyPersonalDetails', (
    minHeight, 
    maxHeight, 
    normalHeight, 
    minWeight, 
    maxWeight, 
    normalWeight, 
    nationality, 
    gender ) => {
    actions.getFirstFind(locators.profileSettingsItem, locators.fullNameLabel)
    .should('contain.text', 'Personal details');
    actions.getFirstFind(locators.profileSettingsItem, locators.fullNameEdit)
    .click();
    actions.typeText(locators.descriptionArea, data.descriptionTxt)
    actions.invokeText(locators.heightInput, 'val').then((value) => {
        if(value === '0') {
            actions.saveData();
            actions.verifyErrMessage(locators.heightErrMessage, data.heightAlertMin);
            actions.typeText(locators.heightInput, minHeight);
            actions.saveData();
            actions.verifyErrMessage(locators.heightErrMessage, data.heightAlertMin);
            actions.typeText(locators.heightInput, maxHeight)
            actions.saveData();
            actions.verifyErrMessage(locators.heightErrMessage, data.heightAlertMax);
            actions.typeText(locators.heightInput, normalHeight);
            actions.saveData();
            cy.contains(locators.heightErrMessage)
            .should('not.exist')
        }
        else {
            actions.typeText(locators.heightInput, normalHeight)
        }
    })
    cy.get(locators.weightInput).invoke('val').then((value) => {
        if (value === '0') {
            actions.saveData();
            actions.verifyErrMessage('div', data.weightAlertMin);
            actions.typeText(locators.weightInput, minWeight);
            actions.saveData();
            actions.verifyErrMessage('div', data.weightAlertMin);
            actions.typeText(locators.weightInput, maxWeight);
            actions.saveData();
            actions.verifyErrMessage('div', data.weightAlertMax);
            actions.verifyErrMessage('div', data.nationalityAlert);
            actions.verifyErrMessage('div', data.genderAlert);
            actions.typeText(locators.weightInput, normalWeight);
            actions.saveData();
            cy.contains(locators.heightErrMessage)
            .should('not.exist')
        } else {
            actions.typeText(locators.weightInput, normalWeight)
        }
    })
    actions.containsParentInvoke(locators.nationalityGenderPicker, 'Nationality', 'text').then((text) => {
        if(text === 'Nationality'){
            actions.saveData();
            actions.verifyErrMessage('div', data.nationalityAlert);
            actions.clickByText(locators.nationalityGenderPicker, 'Nationality');
            actions.clickByText(locators.nationalityGenderPopup, nationality);
            actions.saveData();
            actions.verifyErrMessage('div', data.nationalityAlert, {notVisible:true});
        } else {
            actions.clickByText(locators.nationalityGenderPicker, 'Nationality');
            cy.contains(locators.nationalityGenderPopup, nationality)
            .click()
        }
    })
    actions.containsParentInvoke(locators.nationalityGenderPicker, 'Gender', 'text').then((text)=> {
        if(text === 'Gender') {
            actions.saveData();
            actions.verifyErrMessage('div', data.genderAlert);
            actions.clickByText(locators.nationalityGenderPicker, 'Gender');
            actions.getElement(locators.virtualScroll).children().its('length')
            .should('eq', 2)
            actions.clickByText(gender);
            actions.saveData();
            actions.verifyErrMessage('div', data.genderAlert, {notVisible:true});
        } else {
            actions.clickByText(locators.nationalityGenderPicker, 'Gender');
            cy.contains(gender)
            .click();
            actions.saveData();
            actions.verifyErrMessage('div', data.genderAlert, {notVisible:true});
        }
    })
})

Cypress.Commands.add('changeAge', (year_new, day)=>{
    cy.getUsername().then(uName=>{
        cy.visit(`${apiUrl}settings`)
        actions.getFirstFind(locators.profileSettingsItem, locators.fullNameEdit)
        .click();
        cy.get(locators.datePicker).then(($datePicker)=>{
            if(!$datePicker.prop('disabled')){
                cy.wrap($datePicker).click()
                cy.getProfileData(uName).then((data) => {
                    const birth_date = (data.user.profile.birth_date);
                    const year = parseInt(birth_date.split("-")[0])
                    cy.contains(year)
                    .click()
                    cy.contains(year_new)
                    .click()
                    cy.contains(day)
                    .click()
                    cy.contains('Apply')
                    .click()
                })
            } else {
                cy.wrap($datePicker).should('have.text', '')
            }
        })
    })
})

Cypress.Commands.add('verifyContacts', () => {
    actions.getFind(locators.profileSettingsItem, locators.fullNameLabel, 2)
    .should('contain.text', 'Contacts');
    actions.getIndexFindClick(locators.profileSettingsItem, 2, locators.fullNameEdit);
    actions.clickByLocator(locators.clubCreateFlag);
    cy.contains('Argentina')
    .click();
    cy.get(locators.profilePhone).clear().type('123456')
    actions.saveData();
    actions.getFind(locators.profileSettingsItem, locators.fullNameLabel, 3)
    .should('contain.text', 'Social Media');
    actions.getIndexFindClick(locators.profileSettingsItem, 3, locators.fullNameEdit);
    actions.typeText(locators.marktInput, 'notValidUrl');
    actions.saveData();
    actions.verifyErrMessage('div', locators.marktError);
    actions.typeText(locators.marktInput, data.marktLink);
    actions.saveData();
    actions.getElement(locators.marktIcon)
    .should('be.visible')
    .should('have.attr', 'href')
    .and('contain', 'transfermarkt')
})

Cypress.Commands.add('verifyPosition', (firstPosition, secondPosition, prefFoot)=> {
    actions.getFind(locators.profileSettingsItem, locators.fullNameLabel, 1)
    .should('contain.text', data.positionLabel);
    actions.getIndexFindClick(locators.profileSettingsItem, 1, locators.fullNameEdit);
    actions.containsParentInvoke(locators.nationalityGenderPicker, data.positionFirst, 'text').then((text)=> {
        if(text === data.positionFirst) {
            actions.saveData();
            actions.verifyErrMessage('div', data.positionAlert);
            actions.verifyErrMessage('div', data.footAlert);
            actions.clickByText(locators.nationalityGenderPicker, data.positionFirst);
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 18);
            actions.clickByText('div', firstPosition);
            actions.clickByText(locators.nationalityGenderPicker, data.positionSecond);
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 18);
            actions.clickByText('div', secondPosition);
            actions.saveData();
            actions.verifyErrMessage('div', data.footAlert);
            actions.clickByText(locators.nationalityGenderPicker, data.prefFoot);
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 4);
            actions.clickByText('div', prefFoot);
            actions.saveData();
            actions.verifyErrMessage('div', data.positionAlert, {notVisible:true})
            actions.verifyErrMessage('div', data.footAlert, {notVisible:true})
        } else {
            actions.clickByText(locators.nationalityGenderPicker, data.positionFirst);
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 18);
            actions.clickByText('div', firstPosition);
            actions.clickByText(locators.nationalityGenderPicker, data.positionSecond);
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 18);
            actions.clickByText('div', secondPosition);
            actions.clickByText(locators.nationalityGenderPicker, data.prefFoot);
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 4);
            actions.clickByText('div', prefFoot);
            actions.saveData();
        }
    })
})

Cypress.Commands.add('changePassword', ()=> {
    actions.getFirstFind(locators.profileSettingsItem, locators.fullNameLabel)
    .should('contain.text', 'Change Password');
    actions.getFirstFind(locators.profileSettingsItem, locators.fullNameEdit)
    .click();
    actions.saveData();
    actions.verifyErrMessage('div', data.passwordAlert);
    actions.verifyErrMessage('div', data.passwordAlert);
    actions.typeText(locators.currentPassword, Cypress.env('PASSWORD'));
    actions.saveData();
    actions.verifyErrMessage('div', data.passwordAlert);
    actions.typeText(locators.newPassword, Cypress.env('PASSWORD_NEW'))
    actions.saveData();
    actions.clickByLocator('div', locators.profileAvatar);
    actions.clickByText('div', 'Logout');
    cy.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
    actions.verifyErrMessage('div', data.invalidCred);
    cy.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD_NEW'));
    cy.url().should('eq', Cypress.env('API_URL'))
})
