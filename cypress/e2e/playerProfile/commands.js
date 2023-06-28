const apiUrl = Cypress.env('API_URL');
import {
emailInput,
passwordInput,
profileAvatar,
profileCard,
cardName,
cardRole,
cardBonus,
cardBonusLink,
cardMenuWrapper,
profilePhoto,
profilePhotoImage,
profileCroptopright,
profileSettingsItem,
fullNameLabel,
fullNameItem,
fullNameEdit,
firstNameInput,
lastNameInput,
bannerContent,
usernameInput,
countryError,
countryPicker,
countrySelector,
provinceInput,
addressInput,
zipInput,
educationInput,
schoolInput,
agentInput,
cardDeleteDialog,
dialogHeader,
dialogBody,
allowedFormat,
heightInput,
weightInput,
descriptionArea,
datePicker,
nationalityGenderPicker,
warningBanner,
heightErrMessage,
phoneToggle,
phoneToggleParent,
profilePhone,
marktInput,
marktError,
marktIcon,
currentPassword,
newPassword,
virtualScroll
} from "./locators";
import {
    bonusIcon,
    myProfile,
    settings,
    profileLogout,
    deleteConfirm,
    profilePhotoDelete,
    nameAlert, 
    marktLink,
    countryAlert, 
    provinceAlert,
    heightAlertMin,
    heightAlertMax,
    weightAlertMin,
    weightAlertMax,
    nationalityAlert,
    genderAlert,
    descriptionTxt,
    positionLabelOuter,
    positionFirst,
    positionAlert,
    positionSecond,
    footAlert,
    prefFoot,
    positionLabel,
} from "./constants";
import clubLocators from '../clubs/clubsCoach/locators';

const saveData = () => {
    cy.get('.block:visible')
    .contains('Save')
    .click()
}

Cypress.Commands.add('login', (email, password) => {
    cy.visit(`${apiUrl}login`)
    cy.get(emailInput)
    .type(email).should('have.value', email)
    cy.get(passwordInput)
    .type(password)
    .type('{enter}')
    cy.wait(2000)
})

Cypress.Commands.add('checkProfile', (name, role, options={}) => {
    cy.get(profileAvatar).click();
    cy.get(profileCard)
    .find(cardName)
    .should('have.text', name);
    cy.get(profileCard)
    .find(cardRole)
    .should('have.text', role);
    cy.get(profileCard)
    .find(cardBonus)
    .should('contain.text', bonusIcon);
    cy.get(cardBonusLink)
    .should('have.attr', 'href', '/bonus');
    cy.get(cardMenuWrapper)
    .children()
    .first()
    .should('have.text', myProfile)
    .should('have.attr', 'href')
    .and('include', '/profile')
    cy.get(cardMenuWrapper)
    .children()
    .eq(1)
    .should('have.text', settings)
    .should('have.attr', 'href')
    .and('include', '/settings')
    cy.get(cardMenuWrapper)
    .children()
    .eq(2)
    .should('have.text', profileLogout)
    if(options.visitProfile){
        cy.contains('div', 'My Profile')
        .click()
    }
})

Cypress.Commands.add('uploadPhoto', (imgSrc, options={}) => {
    cy.contains('Change')
    .click()
    cy.get('input[type=file]')
    .selectFile(imgSrc, {force:true})
    cy.wait(2000)
    if(options.cropAfterUpload){
        cy.get(profileCroptopright).first()
        .trigger('mousedown', {button: 0, clientX: 250, clientY: 250})
        .trigger('mousemove', {clientX: 350, clientY: 350})
        cy.contains('.block', 'Upload')
        .click()
    }
})

Cypress.Commands.add('verifyPhoto', (imgSrc, options={}) => {
    cy.get(profilePhoto)
    .find(profilePhotoImage)
    .should('have.attr', 'src')
    .and('include', imgSrc)
    if(options.deleteAfterUpload) {
        cy.contains('.block', 'Delete')
        .click()
        cy.get(cardDeleteDialog)
        .find(dialogHeader)
        .should('have.text', deleteConfirm);
        cy.get(cardDeleteDialog)
        .find(dialogBody)
        .should('have.text', profilePhotoDelete);
        cy.contains('.block', 'OK')
        .click()
    }
})

// change name, verify banner text and check if name is disabled.
Cypress.Commands.add('changeName', (nameFirst, nameLast) => {
    cy.get(profileSettingsItem).eq(1)
    .find(fullNameEdit)
    .click();
    cy.get(firstNameInput)
    .clear()
    .type(nameFirst)
    .should('have.value', nameFirst);
    cy.get(lastNameInput)
    .clear()
    .type(nameLast)
    .should('have.value', nameLast);
    cy.get(bannerContent)
    .should('have.text', nameAlert);
    saveData();
    cy.contains(fullNameLabel, "Full name")
    .parent()
    .should('have.class', 'disabled')
    cy.get(profileAvatar)
    .click()
    cy.get(profileCard)
    .find(cardName)
    .should('contain.text', nameFirst)
})

Cypress.Commands.add('verifyUsername', (unameNew, unameFormat) => {
    cy.get(profileSettingsItem).eq(2)
    .find(fullNameEdit)
    .click();
    cy.get(usernameInput)
    .clear()
    .type(unameNew)
    .should('have.value', unameNew);
    saveData();
    cy.get(profileSettingsItem).eq(2)
    .find(fullNameLabel)
    .should('contain.text', unameFormat);
})

Cypress.Commands.add('verifyCountry', (country, province, address, zip, options={})=> {
    cy.get(profileSettingsItem).eq(3)
    .find(fullNameLabel)
    .should('contain.text', 'Country');
    cy.get(profileSettingsItem).eq(3)
    .find(fullNameEdit)
    .click();
    if(options.verifyError) {        
        saveData()
        cy.contains(countryError, countryAlert)
        .should('be.visible')
        cy.contains(countryError, provinceAlert)
        .should('be.visible')
    }
    cy.contains(countryPicker, 'Country')
    .click({force:true})
    cy.get(countrySelector)
    .scrollIntoView()
    .contains(country)
    .click()
    if(options.verifyError){
        saveData();
        cy.contains(countryError, provinceAlert)
        .should('be.visible')
    }
    cy.get(provinceInput)
    .clear()
    .type(province)
    cy.get(addressInput)
    .clear()
    .type(address)
    .should('have.value', address)
    cy.get(zipInput)
    .clear()
    .type(zip)
    .should('have.value', zip)
    saveData();
})

Cypress.Commands.add('verifyEducation', (institution, school, agent)=> {
    cy.get(profileSettingsItem).eq(4)
    .find(fullNameLabel)
    .should('contain.text', 'Education');
    cy.get(profileSettingsItem).eq(4)
    .find(fullNameEdit)
    .click();
    cy.get(educationInput)
    .click({force:true})
    cy.get(countrySelector)
    .contains(institution)
    .click()
    cy.get(schoolInput)
    .clear()
    .type(school)
    .should('have.value', school);
    cy.get(agentInput)
    .clear()
    .type(agent)
    .should('have.value', agent);
    saveData();
})

Cypress.Commands.add('verifyPersonalDetails', () => {
    cy.get(profileSettingsItem).first()
    .find(fullNameLabel)
    .should('contain.text', 'Personal details');
    cy.get(profileSettingsItem).first()
    .find(fullNameEdit)
    .click();
    cy.get(heightInput).invoke('val').then((value) => {
        if(value === '0') {
            saveData();
            cy.contains(heightErrMessage, heightAlertMin)
            .should('be.visible');
        }
        cy.get(heightInput)
        .clear()
        .type('40')
        .should('have.value', '40')
        saveData();
        cy.contains(heightErrMessage, heightAlertMin)
        .should('be.visible')
        cy.get(heightInput)
        .clear()
        .type('211')
        .should('have.value', '211')
        saveData();
        cy.contains(heightErrMessage, heightAlertMax)
        .should('be.visible')
        cy.get(heightInput)
        .clear()
        .type('130')
        .should('have.value', '130')
        saveData();
        cy.contains(heightErrMessage)
        .should('not.exist')
    })
    cy.get(weightInput).invoke('val').then((value) => {
        if(value === '0') {
            saveData();
            cy.contains('div',weightAlertMin)
            .should('be.visible');
        }
        cy.get(weightInput)
        .clear()
        .type('19')
        .should('have.value', '19')
        saveData();
        cy.contains('div', weightAlertMin)
        .should('be.visible')
        cy.get(weightInput)
        .clear()
        .type('141')
        .should('have.value', '141')
        saveData();
        cy.contains('div', weightAlertMax)
        .should('be.visible')
         cy.contains('div', nationalityAlert)
         .should('be.visible')
         cy.contains('div', genderAlert)
         .should('be.visible')
        cy.get(weightInput)
        .clear()
        .type('60')
        .should('have.value', '60')
        saveData();
        cy.contains(heightErrMessage)
        .should('not.exist')
    })
    cy.get(descriptionArea)
    .clear()
    .type(descriptionTxt)
    cy.get(datePicker)
    .click()
    cy.contains('2005')
    .click()
    cy.contains('2000')
    .click()
    cy.contains('21')
    .click()
    cy.contains('Apply')
    .click()
    saveData()
    cy.contains('div', nationalityAlert)
    .should('be.visible')
    cy.contains('div', genderAlert)
    .should('be.visible')
    cy.contains(nationalityGenderPicker, 'Nationality').parent().invoke('text').then((text) => {
        if(text === 'Nationality'){
            saveData();
            cy.contains('div', nationalityAlert)
            .should('be.visible')
            cy.contains(nationalityGenderPicker, 'Nationality')
            .click({force:true})
            cy.contains('American')
            .click()
            saveData()
            cy.contains('div', nationalityAlert)
            .should('not.exist')
        } else {
            cy.contains(nationalityGenderPicker, 'Nationality')
            .click({force:true})
            cy.contains('American')
            .click()
        }
    })
    cy.contains(nationalityGenderPicker, 'Gender').parent().invoke('text').then((text)=> {
        if(text === 'Gender') {
            saveData();
            cy.contains(genderAlert)
            .should('be.visible')
            cy.contains(nationalityGenderPicker, 'Gender')
            .click({force:true})
            cy.get(virtualScroll).children().its('length')
            .should('eq', 2)
            cy.contains('Male')
            .click();
            saveData();
            cy.contains('div', genderAlert)
            .should('not.exist')
        } else {
            cy.contains(nationalityGenderPicker, 'Gender')
            .click({force:true})
            cy.contains('Male')
            .click();
            saveData();
            cy.contains('div', genderAlert)
            .should('not.exist')
        }
    })
})

Cypress.Commands.add('verifyContacts', () => {
    cy.get(profileSettingsItem).eq(2)
    .find(fullNameLabel)
    .should('contain.text', 'Contacts');
    cy.get(profileSettingsItem).eq(2)
    .find(fullNameEdit)
    .click();
    cy.get(clubLocators.clubCreateFlag)
    .click();
    cy.contains('Argentina')
    .click();
    cy.get(profilePhone)
    .click()
    .type(profilePhone)
    cy.get(phoneToggle).first()
    .click({force:true})
    cy.get(phoneToggle)
    .parent()
    .should('have.class', phoneToggleParent)
    cy.get(phoneToggle).eq(1)
    .click({force:true})
    cy.get(phoneToggle).eq(1)
    .parent()
    .should('have.class', phoneToggleParent);
    saveData();
    cy.get(profileSettingsItem).eq(3)
    .find(fullNameLabel)
    .should('contain.text', 'Social Media');
    cy.get(profileSettingsItem).eq(3)
    .find(fullNameEdit)
    .click();
    cy.get(marktInput)
    .clear()
    .type('notValidUrl')
    saveData();
    cy.contains('div', marktError)
    .should('be.visible');
    cy.get(marktInput)
    .clear()
    .type(marktLink)
    .should('have.value', marktLink)
    saveData();
    cy.get(marktIcon)
    .should('be.visible')
    .should('have.attr', 'href')
    .and('contain', 'transfermarkt')
})

Cypress.Commands.add('verifyPosition', ()=> {
    cy.get(profileSettingsItem).eq(1)
    .find(fullNameLabel)
    .should('contain.text', positionLabel);
    cy.get(profileSettingsItem).eq(1)
    .find(fullNameEdit)
    .click();
    cy.contains(nationalityGenderPicker, positionFirst).parent().invoke('text').then((text)=> {
        if(text === positionFirst) {
            saveData();
            cy.contains('div', positionAlert)
            .should('be.visible');
            cy.contains(footAlert)
            .should('be.visible');
            cy.contains(nationalityGenderPicker, positionFirst)
            .click({force:true});
            cy.get(virtualScroll).children().its('length')
            .should('eq', 18);
            cy.contains('div', 'Left winger')
            .click();
            cy.contains(nationalityGenderPicker, positionSecond)
            .click({force:true});
            cy.get(virtualScroll).children().its('length')
            .should('eq', 18)
            cy.contains('div', 'Right winger')
            .click();
            saveData();
            cy.contains(footAlert)
            .should('be.visible');
            cy.contains(nationalityGenderPicker, prefFoot)
            .click({force:true})
            cy.get(virtualScroll).children().its('length')
            .should('eq', 4);
            cy.contains('div', 'Right Footed')
            .click();
            saveData();
            cy.contains('div', positionAlert)
            .should('not.exist');
            cy.contains(footAlert)
            .should('not.exist');
        } else {
            cy.contains(nationalityGenderPicker, positionFirst)
            .click({force:true});
            cy.get(virtualScroll).children().its('length')
            .should('eq', 18);
            cy.contains('div', 'Left back')
            .click();
            cy.contains(nationalityGenderPicker, positionSecond)
            .click({force:true});
            cy.get(virtualScroll).children().its('length')
            .should('eq', 18)
            cy.contains('div', 'Right back')
            .click();
            cy.contains(nationalityGenderPicker, prefFoot)
            .click({force:true})
            cy.get(virtualScroll).children().its('length')
            .should('eq', 4);
            cy.contains('div', 'Both Feet')
            .click();
            saveData();
        }
    })
})

Cypress.Commands.add('changePassword', ()=> {
    cy.get(profileSettingsItem).first()
    .find(fullNameLabel)
    .should('contain.text', 'Change Password');
    cy.get(profileSettingsItem).first()
    .find(fullNameEdit)
    .click();
    saveData();
    cy.contains('div', 'The current password field is required.')
    .should('be.visible');
    cy.contains('div','The Password field is required')
    .should('be.visible')
    cy.get(currentPassword)
    .type(Cypress.env('PASSWORD'))
    saveData();
    cy.contains('div','The Password field is required')
    .should('be.visible')
    cy.get(newPassword)
    .type(Cypress.env('PASSWORD_NEW'))
    saveData();
    cy.get(profileAvatar).click()
    cy.contains('div', 'Logout')
    .click();
    cy.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
    cy.contains('div', 'Invalid email or password.')
    .should('be.visible')
    cy.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD_NEW'));
    cy.url().should('eq', Cypress.env('API_URL'))
})