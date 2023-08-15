/// <reference types="cypress" />

import { should } from 'chai';
import '../clubsCoach/commands';
import '../../playerProfile/commands';
import clubLocators from '../clubsCoach/locators';
import generalActions from '../../playerProfile/actions';
import clubActions from './actions';
import data from '../../playerProfile/constants';
import clubData from './constants';
import { qase } from 'cypress-qase-reporter/dist/mocha';
const apiUrl = Cypress.env('API_URL');
const profileActions = new generalActions();
const coachActions = new clubActions();


context('Actions', () => {
    beforeEach(() => {
        cy.login(Cypress.env('EMAIL_OTHER'), Cypress.env('PASSWORD'))
        cy.viewport(1200, 800);  
        cy.visit(`${apiUrl}clubs`);
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
      cy.log(err);
      return false;
    })

    it('Create a club', () => {                                                                       // Create a club and check if it is visible in My clubs 
        profileActions.clickByText('Create a Page');
        coachActions.createClub();
        profileActions.verifyErrMessage(
          'span', 
          clubData.logoErrMsg
        );
        profileActions.verifyErrMessage(
          clubLocators.clubCreateErr, 
          clubData.nameErrMsg
        );
        profileActions.verifyErrMessage(
          clubLocators.clubCreateErr, 
          clubData.emailErrMsg
        );
        profileActions.verifyErrMessage(
          'span', 
          clubData.descriptionErrMsg
        );
        cy.uploadLogo(
          clubData.imgUploadPath
        );
        cy.getRandomNames()                                                                            // Generate a random name, type it in the club title and check if it matches with header.
          .then(newClubName => {
          profileActions.typeText(
            clubLocators.clubCreateName, 
            newClubName.fullName
          );
          profileActions.getElement(clubLocators.clubCreateTitle)
          .should('have.text', newClubName.fullName)
          cy.wrap(newClubName.fullName).as('clubName');
        })    
        profileActions.typeText(                                                                      // Fill the rest of the required fields.
          clubLocators.clubCreateEmail, 
          clubData.clubEmail
        )
        coachActions.selectPhone(
          clubData.clubCountry,
          clubData.clubCountryCode
        )
        profileActions.typeText(
          clubLocators.clubCreatePhone, 
          clubData.clubPhone
        );
        profileActions.typeText(
          clubLocators.clubCreateSite, 
          "www.club1.com"
        );
        coachActions.createClub();
        profileActions.verifyErrMessage(
          'div', 
          clubData.urlErrMsg
        );
        profileActions.typeText(
          clubLocators.clubCreateSite, 
          "https://www.club1.com"
        );
        coachActions.addDescription(
          clubLocators.clubCreateContent, 
          data.descriptionTxt
        )
        coachActions.createClub();                                                                     // Assert new club is visible in My Clubs and not visible in All Clubs.
        cy.get('@clubName').then(clubName => {
          cy.visit(`${apiUrl}clubs`)
          cy.contains(clubName)
          .should('not.exist')
          cy.visit(`${apiUrl}clubs/my`)
          cy.get(clubLocators.clubCardTitle)
          .should('contain.text', clubName)                
        })
    })                                                                    
  
    it('Verify Club single page header.', () => {
      cy.visit(`${apiUrl}clubs/my`);
      cy.visitFirstClub();
      profileActions.getElement(                                                                      // Verify club name
          clubLocators.clubSingleLogo
      )
      .should('have.css', 'object-fit', 'contain')
      .should('have.css', 'object-position', '50% 50%');
      profileActions.getElement(clubLocators.clubFollowText)
      .invoke('text')
      .then(($text) => {
          profileActions.getElement(clubLocators.clubFollowCount)                                     // Verify club Follows count.
          .then(($span) => {
            const num1 = parseInt($span.text().replace(/\D/g, ""));
            cy.wrap(num1).as('num1');
            profileActions.getElement(clubLocators.clubSingleFollow).click();
            cy.wait(2000);
            profileActions.getElement(clubLocators.clubFollowCount)
            .then(($span) => {
              const num2 = parseInt($span.text().replace(/\D/g, ""));
              cy.get('@num1').then((num1) => {
                switch ($text) {
                  case 'Follow':
                    expect(num2).to.eq(num1 + 1);
                    break;
                  case 'Following':
                    expect(num2).to.eq(num1 - 1);
                    break;
                  default:
                    break;
              }
            });
          });
        });
      });
      const socialLinks = [                                                                           // Verify social links.
        { index: 0, attr: 'href', value: clubData.socialPhone },                       
        { index: 1, attr: 'href', value: clubData.socialEmail },
        { index: 2, attr: 'href', value: clubData.socialUrl }
      ];
      profileActions.getElement(clubLocators.clubSocialLinks)
        .children()
        .should('have.length', socialLinks.length);
      socialLinks.forEach((link) => {
        profileActions.getElement(clubLocators.clubSocialLinks)
          .children()
          .eq(link.index)
          .should('have.attr', link.attr, link.value);
      });
    })

    it('Add a Player and a Coach to the club, check their pending status', () => {
      cy.visit(`${apiUrl}clubs/my`);
      cy.visitFirstClub();
      profileActions.clickByText('Club details');
      profileActions.getElement(clubLocators.clubEditBtn)                                             // Verify not moderated club header.
      .should('have.text', clubData.clubEdit);
      profileActions.getElement(clubLocators.clubWaitModeration)
      .eq(1)
      .should('have.text', clubData.moderationWaiting)
      .next()
      .should('have.text', clubData.clubDelete);
      profileActions.getFirstChild(clubLocators.clubDescription)
      .then($firstChild => {
        cy.wrap($firstChild).should('have.text', clubData.clubDescription)
          .next()
          .should('contain', clubData.clubDescrText);
        });
      cy.addStaff(0, Cypress.env('EMAIL'), clubData.playerName);                                        // Add staff to the club. 
      cy.wait(2000)                                     
      cy.checkStaff(0, clubData.playerNameLong, 'Player')
      cy.addStaff(0, Cypress.env('EMAIL_COACH'), clubData.coachName);
      cy.wait(2000);
      cy.checkStaff(1, clubData.coachNameLong, 'Coach')
      profileActions.getElement(clubLocators.clubAdminTitle)
      .should('have.text', clubData.adminTitle);
      profileActions.getElement(clubLocators.clubMembersSection).should('exist').within(() => {         // Verify club staff card.
        cy.get(clubLocators.adminLogo).should('exist');
        cy.get(clubLocators.clubCardImage).should('have.css', 'object-fit', 'cover');
        cy.get(clubLocators.adminName).should('have.text', clubData.adminName);
        cy.get(clubLocators.staffPendingRowBottom).should('have.text', clubData.adminRole);
      });
      
    });

      it('Check if same player can not be added for the second time', () => {
        cy.visit(`${apiUrl}clubs/my`);
        cy.visitFirstClub();
        profileActions.clickByText('Club details');                                                       // Type already invited player
        profileActions.getIndexFindClick(
          clubLocators.clubAddPlayersSection, 
          1, 
          clubLocators.clubPlayerAdd
        )
        profileActions.typeText(
          clubLocators.playerAddInput, 
          Cypress.env('EMAIL')
        )
        cy.wait(2000)
        profileActions.getElement('div[role="menu"]')                                                     // Assert invite button is disabled, and no suggestions in popup
        .children()
        .should('not.be.visible')
        profileActions.getElement(clubLocators.playerAddBottom) 
        .contains('button', 'Add to Page')
        .should('have.attr', 'aria-disabled', 'true')
    });

    describe('Accept invite and check the team', ()=> {
      qase(1, it('Accept player invite', () => { 
        cy.logout();
        cy.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
        cy.visit(`${apiUrl}clubs`);
        cy.notificationClick();
        profileActions.clickByText('Accept')
        profileActions.clickByText('Club details');
        cy.checkStaff(0, clubData.playerName, 'Player');
      }))
      qase(2, it('Accept coach invite', () => { 
        cy.logout();
        cy.login(Cypress.env('EMAIL_COACH'), Cypress.env('PASSWORD'));
        cy.visit(`${apiUrl}clubs`);
        cy.notificationClick();
        profileActions.clickByText('Accept')
        profileActions.clickByText('Club details');
        cy.checkStaff(1, clubData.coachName, 'Coach');
      }))
      qase(3, it('Verify that new staff is added to Team', () => {
        cy.visit(`${apiUrl}clubs/my`);
        cy.visitFirstClub();
        profileActions.getContains(clubLocators.clubTabs, 'Team');
        cy.checkTeam(0, clubData.playerName);
        cy.checkTeam(1, clubData.coachName);   
      }))
    })

    describe('Clubs Tabs Spec', () => {
      qase(1, it('Verify club page title and tabs', () => {
         cy.get(clubLocators.clubTabsLong)
          .find('a')
          .should('have.length', 3)
          cy.get(clubLocators.clubTab)
          .first()
          .should('have.attr', 'aria-selected', 'true')
          .should('have.text', 'appsAll Clubs')
          .next()
          .should('have.attr', 'aria-selected', 'false')
          .should('have.text', 'done_outlineMy Clubs')
          .next()
          .should('have.attr', 'aria-selected', 'false')
          .should('have.text', 'how_to_regFollowing')
      }));
      qase(2, it('Verify not moderated Club single page tabs', () => {
        cy.visit(`${apiUrl}clubs/my`);
        cy.visitFirstClub();
        const tabInfo = [
          { index: 0, text: 'Page', link: '/club/' },
          { index: 1, text: 'Team', link: '/team' },
          { index: 2, text: 'Tryouts', link: '/tryouts' },
          { index: 3, text: 'Camps', link: '/camps' },
          { index: 4, text: 'Photos', link: '/photos' },
          { index: 5, text: 'Videos', link: '/videos' },
          { index: 6, text: 'Statistics', link: '/statistics' },
        ];
        tabInfo.forEach((tab) => {
          profileActions.getNthChild(
            clubLocators.clubSingleTabsWrapper,
            tab.index,
            'a'
          )
          .find(clubLocators.clubTabs)
          .should('have.text', tab.text)
          .parent()
          .parent()
          .should('have.attr', 'href')
          .and('include', tab.link);
        })
      }))
    });
  });