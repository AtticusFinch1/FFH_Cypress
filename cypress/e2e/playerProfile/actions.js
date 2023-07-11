export default class generalActions {
    getData(row, position) {
        return cy.contains('span', row)
        .next('span')
        .invoke('text')
        .as(position)
    }
    compareData(position){
        cy.get(position).then(row => {
            cy.log(row)
        })
    }
}