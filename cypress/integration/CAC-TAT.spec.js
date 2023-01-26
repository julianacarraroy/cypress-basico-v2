/// <reference types="Cypress" />



 describe('Central de Atendimento ao Cliente TAT', ()=> {
   
    beforeEach( ()=> {
        
        cy.visit('./src/index.html')
    } )
    
    it('verifica o título da aplicação', ()=> {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('Prenche os campos obrigatórios do form',()=> {
        
        const texto = 'testes, testes, testes, testes, testes, testes, testes, testes, testes, testes, testes, testes'
        cy.get('#firstName').type('edu')        
        cy.get('#lastName').type('sa')
        cy.get('#email').type('edu@edu.com')
        cy.get('#open-text-area').type(texto, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    } )
    
    it(`exibe mensagem de erro ao submeter o formulário
     com um email com formatação inválida`, ()=> {
        
        const texto = 'testes, testes, testes, testes, testes, testes, testes, testes, testes, testes, testes, testes'
        cy.get('#firstName').type('edu')        
        cy.get('#lastName').type('sa')
        cy.get('#email').type('edu.edu.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(texto, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
         

    }  )

    it(` campo telefone  continua vazio quando
     preenchido com valor não numérico`, ()=> {

        cy.get('#phone')
        .type('asdfgh')
        .should('have.value', '')

     }  )

    it(`exibe mensagem de erro quando o telefone se 
    torna obrigatório mas não é preenchido antes do
     envio do formulário`, ()=> {

        const texto = 'testes, testes, testes, testes, testes, testes, testes, testes, testes, testes, testes, testes'
        cy.get('#firstName').type('edu')        
        cy.get('#lastName').type('sa')
        cy.get('#email').type('edu@edu.com')
        cy.get('#phone-checkbox').click('')
        cy.get('#open-text-area').type(texto, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 
         

     }  )

     it(`preenche e limpa os campos: nome, sobrenome,
        e-mail e telefone`, ()=> {

        
        cy.get('#firstName')
        .type('edu')
        .should('have.value', 'edu')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('sa')
        .should('have.value', 'sa')
        .clear()
        .should('have.value', '')

        cy.get('#email')        
        .type('edu@edu.com')
        .should('have.value', 'edu@edu.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')        
        .type('1234567890')
        .should('have.value', '1234567890')
        .clear()
        .should('have.value', '')
         

     }  )

     it(`exibe mensagem de erro ao submeter o
         formulário sem preencher os campos 
         obrigatórios`, ()=> {

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 

     } )

     it(`envia o formuário com sucesso usando
      um comando customizado`,  ()=>{

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

     })
     it(`seleciona um produto (YouTube) por seu texto`, ()=>{
     
         cy.get('#product')
         .select('YouTube')
         .should('have.value', 'youtube')
     } )
     
     it(` seleciona um produto (Mentoria)
      por seu valor (value)`, ()=>{
   
         cy.get('#product')
         .select('mentoria')
         .should('have.value','mentoria')
      })
      
      it(` seleciona um produto (Blog)
      por seu valor (value)`, ()=>{
   
         cy.get('#product')
         .select(1)
         .should('have.value','blog')
      })
  
      it(`marca o tipo de atendimento "Feedback"`, ()=>{
   
         cy.get('input[type="radio"][value="feedback"]')
           .check()
           .should('have.value','feedback')
      })

      it(`marca cada tipo de atendimento "Feedback"`, ()=>{
   
         cy.get('input[type="radio"]')
            .check()
            .should('have.length',3)
            .each( ($radio)=>{
               cy.wrap($radio).check()
               cy.wrap($radio).should('be.checked')
            })

      })

      it(`Marca ambos checkbox E depois desmarca`, ()=>(

         cy.get('input[type=checkbox]')
           .check()
           .should('be.checked')
           .last()
           .uncheck()
           .should('not.be.checked')
      ) )
     
      it('seleciona um arquivo da pasta fixtures', ()=>{

         cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should( ($input)=>{               
               expect($input[0].files[0].name).to.equal('example.json')
            })

      } )

      it('seleciona um arquivo simulando um drag-and-dropv', ()=>{

         cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should( ($input)=>{               
               expect($input[0].files[0].name).to.equal('example.json')
            })

      } )

      it(`seleciona um arquivo utilizando uma 
      fixture para a qual foi dada um alias`, 
      ()=>{
          cy.fixture('example.json').as('sampleFile')
          cy.get('input[type="file"')
            .selectFile('@sampleFile')
            .should( ($input)=>{               
               expect($input[0].files[0].name).to.equal('example.json')
            })
      })
 
     
      it(`verifica que a política de privacidade abre
      em outra aba sem a necessidade de um clique`,
       ()=>{
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
           

     })

     it(`acessa a página da política de privacidade
      removendo o target e então clicando no link`,
      ()=>{
       cy.get('#privacy a')
         .invoke('removeAttr', 'target')
         .click()
      cy.contains('Talking About Testing').should('be.visible')           

     })

     it(`testa a página da política de privacidade de 
       forma independente`, ()=>{

         

     })
     
     
  })
  