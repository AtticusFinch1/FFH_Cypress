const apiUrl = Cypress.env('API_URL');
import locators from "./locators";
import data from "./constants";

const saveData = () => {
    cy.get('.block:visible')
    .contains('Save')
    .click()
}

const getUsername = () => {
    return cy.url().then(url=>{
        const username = url.split('/').pop();
        return username;
    })

}

Cypress.Commands.add('getProfileData', () => {    
        const username = data.nameFormat;
        cy.request({
            method: 'POST', 
            url: `https://dev.foothunters.com/api/players/get/${username}`,
    
        }).then(response => {
            expect(response.status).to.equal(200)
            return response.body;
        })
})

Cypress.Commands.add('login', (email, password) => {
    cy.visit(`${apiUrl}login`)
    cy.get(locators.emailInput)
    .type(email)
    .should('have.value', email)
    cy.get(locators.passwordInput)
    .type(password)
    .type('{enter}')
    cy.wait(2000)
})

Cypress.Commands.add('getName', ()=> {
    cy.get(locators.profileAvatar).click();
    cy.contains('div', 'My Profile')
    .click()
    cy.get(locators.profileName)
    .invoke('text')
    .then(text => {
        const parts = text.split(' ');
        const firstPart = parts[0];
        return firstPart;
    })        
})

Cypress.Commands.add('checkProfile', (name, role, options={}) => {
    cy.get(locators.profileAvatar).click();
    if(options.visitProfile){
        cy.contains('div', 'My Profile')
        .click()
    }
    cy.get(locators.profileCard)
    .find(locators.cardName)
    .should('contain.text', name);
    cy.get(locators.profileCard)
    .find(locators.cardRole)
    .should('have.text', role);
    cy.get(locators.profileCard)
    .find(locators.cardBonus)
    .should('contain.text', data.bonusIcon);
    cy.get(locators.cardBonusLink)
    .should('have.attr', 'href', '/bonus');
    cy.get(locators.cardMenuWrapper)
    .children()
    .first()
    .should('have.text', data.myProfile)
    .should('have.attr', 'href')
    .and('include', '/profile');
    cy.get(locators.cardMenuWrapper)
    .children()
    .eq(1)
    .should('have.text', data.settings)
    .should('have.attr', 'href')
    .and('include', '/settings');
    cy.get(locators.cardMenuWrapper)
    .children()
    .eq(2)
    .should('have.text', data.profileLogout);
})

Cypress.Commands.add('uploadPhoto', (imgSrc, options={}) => {
    cy.contains('Change')
    .click()
    cy.get('input[type=file]')
    .selectFile(imgSrc, {force:true})
    cy.wait(2000)
    if(options.cropAfterUpload){
        cy.get(locators.profileCroptopright).first()
        .trigger('mousedown', {button: 0, clientX: 250, clientY: 250})
        .trigger('mousemove', {clientX: 350, clientY: 350})
        cy.contains('.block', 'Publish')
        .click()
    }
})

Cypress.Commands.add('checkAvatar', (avatarSrc) => {
    cy.get(locators.profilePhoto)
    .find(locators.profilePhotoImage)
    .should('have.attr', 'src')
    .then((src) => {
        if (src !== avatarSrc) {
                cy.deletePhoto();
            }      
    });
});

Cypress.Commands.add('verifyPhoto', (imgSrc) => {
    cy.get(locators.profilePhoto)
    .find(locators.profilePhotoImage)
    .should('have.attr', 'src')
    .and('include', imgSrc)
});

Cypress.Commands.add('deletePhoto', () => {
    cy.contains('.block', 'Delete')
    .click()
    cy.get(locators.cardDeleteDialog)
    .find(locators.dialogHeader)
    .should('have.text', data.deleteConfirm);
    cy.get(locators.cardDeleteDialog)
    .find(locators.dialogBody)
    .should('have.text', data.profilePhotoDelete);
    cy.contains('.block', 'OK')
    .click()
})

// change name, verify banner text and check if name is disabled.
Cypress.Commands.add('changeName', (nameFirst, nameLast) => {
    cy.get(locators.profileSettingsItem).eq(1)
    .find(locators.fullNameEdit)
    .click();
    cy.get(locators.firstNameInput)
    .clear()
    .type(nameFirst)
    .should('have.value', nameFirst);
    cy.get(locators.lastNameInput)
    .clear()
    .type(nameLast)
    .should('have.value', nameLast);
    cy.get(locators.bannerContent)
    .should('have.text', data.nameAlert);
    saveData();
    cy.contains(locators.fullNameLabel, "Full name")
    .parent()
    .should('have.class', 'disabled')
    cy.get(locators.profileAvatar)
    .click()
    cy.get(locators.profileCard)
    .find(locators.cardName)
    .should('contain.text', nameFirst)
})

Cypress.Commands.add('verifyUsername', (unameNew, unameFormat) => {
    cy.get(locators.profileSettingsItem).eq(2)
    .find(locators.fullNameEdit)
    .click();
    cy.get(locators.usernameInput)
    .clear()
    .type(unameNew)
    .should('have.value', unameNew);
    saveData();
    cy.get(locators.profileSettingsItem).eq(2)
    .find(locators.fullNameLabel)
    .should('contain.text', unameFormat);
})

Cypress.Commands.add('verifyCountry', (country, province, address, zip, options={})=> {
    cy.get(locators.profileSettingsItem).eq(3)
    .find(locators.fullNameLabel)
    .should('contain.text', 'Country');
    cy.get(locators.profileSettingsItem).eq(3)
    .find(locators.fullNameEdit)
    .click();
    if(options.verifyError) {        
        saveData()
        cy.contains(locators.countryError, locators.countryAlert)
        .should('be.visible')
        cy.contains(locators.countryError, locators.provinceAlert)
        .should('be.visible')
    }
    cy.contains(locators.countryPicker, 'Country')
    .click({force:true})
    cy.get(locators.countrySelector)
    .scrollIntoView()
    .contains(country)
    .click()
    cy.get(locators.provinceInput)
    .clear()
    .type(province)
    cy.get(locators.addressInput)
    .clear()
    .type(address)
    .should('have.value', address)
    cy.get(locators.zipInput)
    .clear()
    .type(zip)
    .should('have.value', zip)
    saveData();
})

Cypress.Commands.add('verifyEducation', (institution, school, agent)=> {
    cy.get(locators.profileSettingsItem).eq(4)
    .find(locators.fullNameLabel)
    .should('contain.text', 'Education');
    cy.get(locators.profileSettingsItem).eq(4)
    .find(locators.fullNameEdit)
    .click();
    cy.get(locators.educationInput)
    .click({force:true})
    cy.get(locators.countrySelector)
    .contains(institution)
    .click()
    cy.get(locators.schoolInput)
    .clear()
    .type(school)
    .should('have.value', school);
    cy.get(locators.agentInput)
    .clear()
    .type(agent)
    .should('have.value', agent);
    saveData();
})

Cypress.Commands.add('verifyPersonalDetails', (
    minHeight, 
    maxHeight, 
    normalHeight, 
    minWeight, 
    maxWeight, 
    normalWeight, 
    year_new, 
    day, 
    nationality, 
    gender ) => {
    cy.get(locators.profileSettingsItem).first()
    .find(locators.fullNameLabel)
    .should('contain.text', 'Personal details');
    cy.get(locators.profileSettingsItem).first()
    .find(locators.fullNameEdit)
    .click();
    cy.get(locators.heightInput).invoke('val').then((value) => {
        if(value === '0') {
            saveData();
            cy.contains(locators.heightErrMessage, data.heightAlertMin)
            .should('be.visible');
            cy.get(locators.heightInput)
            .clear()
            .type(minHeight)
            .should('have.value', minHeight)
            saveData();
            cy.contains(locators.heightErrMessage, data.heightAlertMin)
            .should('be.visible')
            cy.get(locators.heightInput)
            .clear()
            .type(maxHeight)
            .should('have.value', maxHeight)
            saveData();
            cy.contains(locators.heightErrMessage, data.heightAlertMax)
            .should('be.visible')
            cy.get(locators.heightInput)
            .clear()
            .type(normalHeight)
            .should('have.value', normalHeight)
            saveData();
            cy.contains(locators.heightErrMessage)
            .should('not.exist')
        }
        else {
            cy.get(locators.heightInput)
            .clear()
            .type(normalHeight)
            .should('have.value', normalHeight)
        }
    })
    cy.get(locators.weightInput).invoke('val').then((value) => {
        if(value === '0') {
            saveData();
            cy.contains('div',data.weightAlertMin)
            .should('be.visible');
            cy.get(locators.weightInput)
            .clear()
            .type(minWeight)
            .should('have.value', minWeight)
            saveData();
            cy.contains('div', data.weightAlertMin)
            .should('be.visible')
            cy.get(locators.weightInput)
            .clear()
            .type(maxWeight)
            .should('have.value', maxWeight)
            saveData();
            cy.contains('div', data.weightAlertMax)
            .should('be.visible')
             cy.contains('div', data.nationalityAlert)
             .should('be.visible')
             cy.contains('div', data.genderAlert)
             .should('be.visible')
            cy.get(locators.weightInput)
            .clear()
            .type(normalWeight)
            .should('have.value', normalWeight)
            saveData();
            cy.contains(locators.heightErrMessage)
            .should('not.exist')
        }else {
            cy.get(locators.weightInput)
            .clear()
            .type(normalWeight)
            .should('have.value', normalWeight)
        }
    })
    cy.get(locators.descriptionArea)
    .clear()
    .type(data.descriptionTxt)
    cy.get(locators.datePicker).then(($datePicker)=>{
        if(!$datePicker.prop('disabled')){
            cy.wrap($datePicker).click()
            cy.getProfileData().then((data) => {
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
    cy.contains(locators.nationalityGenderPicker, 'Nationality').parent().invoke('text').then((text) => {
        if(text === 'Nationality'){
            saveData();
            cy.contains('div', data.nationalityAlert)
            .should('be.visible')
            cy.contains(locators.nationalityGenderPicker, 'Nationality')
            .click({force:true})
            cy.contains(nationality)
            .click()
            saveData()
            cy.contains('div', data.nationalityAlert)
            .should('not.exist')
        } else {
            cy.contains(locators.nationalityGenderPicker, 'Nationality')
            .click({force:true})
            cy.contains(nationality)
            .click()
        }
    })
    cy.contains(locators.nationalityGenderPicker, 'Gender').parent().invoke('text').then((text)=> {
        if(text === 'Gender') {
            saveData();
            cy.contains(data.genderAlert)
            .should('be.visible')
            cy.contains(locators.nationalityGenderPicker, 'Gender')
            .click({force:true})
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 2)
            cy.contains(gender)
            .click();
            saveData();
            cy.contains('div', data.genderAlert)
            .should('not.exist')
        } else {
            cy.contains(locators.nationalityGenderPicker, 'Gender')
            .click({force:true})
            cy.contains(gender)
            .click();
            saveData();
            cy.contains('div', data.genderAlert)
            .should('not.exist')
        }
    })
})

Cypress.Commands.add('verifyContacts', () => {
    cy.get(locators.profileSettingsItem).eq(2)
    .find(locators.fullNameLabel)
    .should('contain.text', 'Contacts');
    cy.get(locators.profileSettingsItem).eq(2)
    .find(locators.fullNameEdit)
    .click();
    cy.get(locators.clubCreateFlag)
    .click();
    cy.contains('Argentina')
    .click();
    cy.get(locators.profilePhone)
    .click()
    .type('123456')
    saveData();
    cy.get(locators.profileSettingsItem).eq(3)
    .find(locators.fullNameLabel)
    .should('contain.text', 'Social Media');
    cy.get(locators.profileSettingsItem).eq(3)
    .find(locators.fullNameEdit)
    .click();
    cy.get(locators.marktInput)
    .clear()
    .type('notValidUrl')
    saveData();
    cy.contains('div', locators.marktError)
    .should('be.visible');
    cy.get(locators.marktInput)
    .clear()
    .type(data.marktLink)
    .should('have.value', data.marktLink)
    saveData();
    cy.get(locators.marktIcon)
    .should('be.visible')
    .should('have.attr', 'href')
    .and('contain', 'transfermarkt')
})

Cypress.Commands.add('verifyPosition', (firstPosition, secondPosition, prefFoot)=> {
    cy.get(locators.profileSettingsItem).eq(1)
    .find(locators.fullNameLabel)
    .should('contain.text', data.positionLabel);
    cy.get(locators.profileSettingsItem).eq(1)
    .find(locators.fullNameEdit)
    .click();
    cy.contains(locators.nationalityGenderPicker, data.positionFirst).parent().invoke('text').then((text)=> {
        if(text === data.positionFirst) {
            saveData();
            cy.contains('div', data.positionAlert)
            .should('be.visible');
            cy.contains(locators.footAlert)
            .should('be.visible');
            cy.contains(locators.nationalityGenderPicker, data.positionFirst)
            .click({force:true});
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 18);
            cy.contains('div', firstPosition)
            .click();
            cy.contains(locators.nationalityGenderPicker, data.positionSecond)
            .click({force:true});
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 18)
            cy.contains('div', secondPosition)
            .click();
            saveData();
            cy.contains(locators.footAlert)
            .should('be.visible');
            cy.contains(locators.nationalityGenderPicker, data.prefFoot)
            .click({force:true})
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 4);
            cy.contains('div', prefFoot)
            .click();
            saveData();
            cy.contains('div', data.positionAlert)
            .should('not.exist');
            cy.contains(locators.footAlert)
            .should('not.exist');
        } else {
            cy.contains(locators.nationalityGenderPicker, data.positionFirst)
            .click({force:true});
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 18);
            cy.contains('div', firstPosition)
            .click({force:true});
            cy.contains(locators.nationalityGenderPicker, data.positionSecond)
            .click({force:true});
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 18)
            cy.contains('div', secondPosition)
            .click({force:true});
            cy.contains(locators.nationalityGenderPicker, data.prefFoot)
            .click({force:true})
            cy.get(locators.virtualScroll).children().its('length')
            .should('eq', 4);
            cy.contains('div', prefFoot)
            .click({force:true});
            saveData();
        }
    })
})

Cypress.Commands.add('changePassword', ()=> {
    cy.get(locators.profileSettingsItem).first()
    .find(locators.fullNameLabel)
    .should('contain.text', 'Change Password');
    cy.get(locators.profileSettingsItem).first()
    .find(locators.fullNameEdit)
    .click();
    saveData();
    cy.contains('div', 'The current password field is required.')
    .should('be.visible');
    cy.contains('div','The Password field is required')
    .should('be.visible')
    cy.get(locators.currentPassword)
    .type(Cypress.env('PASSWORD'))
    saveData();
    cy.contains('div','The Password field is required')
    .should('be.visible')
    cy.get(locators.newPassword)
    .type(Cypress.env('PASSWORD_NEW'))
    saveData();
    cy.get(locators.profileAvatar).click()
    cy.contains('div', 'Logout')
    .click();
    cy.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
    cy.contains('div', 'Invalid email or password.')
    .should('be.visible')
    cy.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD_NEW'));
    cy.url().should('eq', Cypress.env('API_URL'))
})
