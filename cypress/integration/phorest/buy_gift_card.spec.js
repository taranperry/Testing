describe('Practice buy gift card', () => {

    it('first test' , () => {
    
    cy.visit('https://gift-cards.phorest.com/salons/demo-us')
    //check can use commands.js to call this page similar to login
    //udate to check is expected url? cy.url.should('include', '/ggdfgfdgdfg')

    cy.get('[data-target="amount.optionButton"]').contains('50').click()
    
    
    //enter contact details - update to remove hard coding here 
    cy.get('[data-target="email.purchaserEmailInput"]').type('fake@email.com')
    cy.get('[data-target="name.purchaserFirstNameInput"]').type('name1')
    cy.get('[data-target="name.purchaserLastNameInput"]').type('name2')
    
    //check expected gift card value displayed - issues with this one see if there is a better alternative to using .w-btn
    //ran into some isues where this wasnt visible did some googling around this
    cy.get('.w-btn [data-target= "checkout.checkoutButton"][data-action="checkout#checkoutAction"]').should('be.visible').click()
    
    //check Summary page loaded
    //https://gift-cards.phorest.com/salons/demo-us#confirm
    cy.contains('Summary')
    //check if ul changes here can add additinal check cy.url().should('include','/fdsdfsdf')
    
    //check expected purchase details displayed
    
    cy.get('[data-target="confirm.totalSpan"]').contains('$50')
    cy.get('[data-target="confirm.purchaserEmailSpan"]').contains('fake@email.com')
    cy.get('[data-target="confirm.recipientEmailSpan"]').contains('fake@email.com')
    
    //select confirm button
    
    cy.get('[data-action="confirm#confirmAction"]').should('be.visible').click()
    cy.contains('Payment details').should('be.visible')
    cy.wait(5000)
    //------------------------------

    //https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/

    const getIframeDocument = () => {
        return cy
        .get('iframe[id^=hostedform]')
 
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its('0.contentDocument').should('exist')
      }
      
      const getIframeBody = () => {
        // get the document
        return getIframeDocument()
        // automatically retries until body is loaded
        .its('body').should('not.be.undefined')
        
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
      }

       getIframeBody().find('[name="cardName"]').should('be.visible').type('3253545')
       getIframeBody().find('[name="cardZip"]').type('3253545')
       getIframeBody().find('[name="cardNumber"]').type('3253545')
       getIframeBody().find('[name="cardExpiry"]').type('3253545')
       getIframeBody().find('[name="cardSecurity"]').type('3253545')
       getIframeBody().contains('Submit').click()


    //can intercept calls using cy.intercept('POST', '/users').as(getUsers) cywait(@getUsers)
    //
    
   })
})
     