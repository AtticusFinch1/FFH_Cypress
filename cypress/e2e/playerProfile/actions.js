export default class generalActions {
    saveData(){
        cy.get('.block:visible')
        .contains('Save')
        .click()
    }
    
    getData(row, position) {
        return cy.contains('span', row)
        .next('span')
        .invoke('text')
        .as(position)
    }
        
    getElement(locator){
        return cy.get(locator);
    }
    
    getFind(getLocator, findLocator, index){
        return index 
        ? cy.get(getLocator).eq(index).find(findLocator)
        : cy.get(getLocator).find(findLocator);
    }

    getContains(getLocator, text){
        return this.getElement(getLocator).contains(text).click();
    }
    
    getIndexFindClick(getLocator, index, findLocator){
        cy.get(getLocator)
        .eq(index)
        .find(findLocator)
        .click();
    }

    getFirstChild(locator, tag){
        return tag 
        ? this.getElement(locator).children(tag).first()
        : this.getElement(locator).children().first();
    }

    getFirstFind(getLocator, findLocator){
        return cy.get(getLocator).first()
        .find(findLocator)
    }

    getNthChild(locator, index, tag){
        return tag 
        ? this.getElement(locator).children(tag).eq(index)
        : this.getElement(locator).children().eq(index)
    }

    getParent(tag, text){
        return cy.contains(tag, text)
        .parent();
    }

    typeText(locator, text){
        return this.getElement(locator)
        .clear()
        .type(text, {delay:100})
        .should('have.value', text)
    }

    clickByLocator(locator, options={}){
        return options.force 
        ? this.getElement(locator).click({force:true})
        : this.getElement(locator).click()
    }

    clickByText(tag, text){
        return tag
            ? cy.contains(tag, text).click({force:true})
            : cy.contains(text).click();
    }

    invokeText(locator, action){
        return cy.get(locator).invoke(action)
    }

    containsParentInvoke(locator, text, action){
        return cy.contains(locator, text).parent().invoke(action)
    }

    putPhoto(src){
        return cy.get('input[type=file]')
        .selectFile(src, {force:true})
    }

    selectCountry(locator, country){
        cy.get(locator)
        .scrollIntoView()
        .contains(country)
        .click();
    }

    verifyErrMessage(locator, message, options={}){
        return options.notVisible 
        ? cy.contains(locator, message).should('not.exist')
        : cy.contains(locator, message).should('be.visible');
    }

    


}