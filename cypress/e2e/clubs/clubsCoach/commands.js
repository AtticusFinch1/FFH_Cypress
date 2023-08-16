import clubLocators from "../clubsCoach/locators";
import generalActions from "../../playerProfile/actions";
import clubData from "./constants";
const apiUrl = Cypress.env('API_URL');

const profileActions = new generalActions();

Cypress.Commands.add('logout', ()=>{
  profileActions.clickByLocator(clubLocators.avatarIcon)
  profileActions.clickByText("Logout")
})

Cypress.Commands.add('uploadLogo', (imgSrc)=>{
  profileActions.clickByText('Upload logo');
  profileActions.putPhoto(imgSrc);
  cy.wait(2000);
  profileActions.clickByText('.block', 'Publish');
})

Cypress.Commands.add('visitFirstClub', ()=>{
  profileActions.getElement(
    clubLocators.clubCard
  )
  .first()
  .click();
})

Cypress.Commands.add('addStaff', (index, email, text) => {
  profileActions.getIndexFindClick(
    clubLocators.clubAddPlayersSection, 
    index, 
    clubLocators.clubPlayerAdd
  );
  profileActions.getElement(clubLocators.playerAddPopup)                               // Verify player/coach add popup
  .should('exist');
  profileActions.getElement(clubLocators.playerAddTitle)
  .should('have.text', 'Add Staff')
  .next()
  .should('have.text', clubData.playerAddText);
  profileActions.getElement(clubLocators.playerAddBottom) 
  .contains('button', 'Add to Page')
  .should('have.attr', 'aria-disabled', 'true');
  profileActions.typeText(clubLocators.playerAddInput, text);
  cy.wait(2000)
  profileActions.getElement(clubLocators.playerAddSuggestion)
  .should('exist')
  .find(clubLocators.playerAddRow)                                                    // Verify all search results match with search query 
    .each(($child) => {       
        const childTexts = [...$child].map((child) => child.innerText)
        cy.wrap(childTexts).each((child) => {
            expect(child).to.match(new RegExp(text, 'i'))
            if(child.includes(email)){
              cy.wrap($child).click();
              cy.get(clubLocators.playerAddBottom) 
              .contains('button', 'Add to Page')
              .should('not.have.attr', 'aria-disabled', 'true')
              .click()
              cy.wait(3000);  
            } else {
              cy.log('User already exists.')
            }                  
        });        
    });
})

Cypress.Commands.add('checkStaff', (row, text, role) => {
  cy.get(clubLocators.clubAddPlayersSection).eq(row)
  .find(clubLocators.staffPendingRow)
  .should('be.visible')
  .should('contain.text', text);
  cy.get(clubLocators.clubAddPlayersSection).eq(row)
  .find(clubLocators.staffPendingRowBottom).eq(0)
  .should('contain.text', role);
})

Cypress.Commands.add('checkTeam', (index, text) => {
  cy.get(clubLocators.teamCard).eq(index)
  .children()
  .first()
  .should('have.class', clubLocators.teamCardAvatar)
  .should('have.css', 'font-size', '160px')
  cy.get(clubLocators.teamCard).eq(index)
  .children()
  .eq(1)
  .should('have.class', clubLocators.teamCardBottom)
  .should('contain.text', text)
})

Cypress.Commands.add('notificationClick', () => {
  profileActions.clickByLocator(clubLocators.notificationIcon)
  profileActions.getFirstChild(clubLocators.notificationBody).click();
})

Cypress.Commands.add('getMyClubs', ()=> {
  const payload = "mine";
  cy.request({
    method: 'POST',
    url: `${apiUrl}api/clubs/find`, 
    body: payload, 
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => {
    cy.log(response.body.clubs.data);
  })
})