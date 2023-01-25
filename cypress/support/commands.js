Cypress.Commands.add('fillMandatoryFieldsAndSubmit'
, ()=>{
    
    cy.get('#firstName').type('edu')        
    cy.get('#lastName').type('sa')
    cy.get('#email').type('edu@edu.com')
    cy.get('#open-text-area').type('test', {delay: 0})
    cy.contains('button', 'Enviar').click()
    
} )