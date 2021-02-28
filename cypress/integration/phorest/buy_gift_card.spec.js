describe('Buy gift card', () => {

    const amount = '50';
    //const email = 'fake@email.com';
    const firstName = 'Name1';
    const lastName = 'Name2';
    const cardZip = 92606;
    const cardNumber = '4111 1111 1111 1111';
    const cardExpiry ='12/22';
    const cardSecurity = '999';

    let inboxId;
    let emailAddress;

it("can generate a new email address", () => {
  // see commands.js custom commands
  cy.createInbox().then((inbox) => {
    // verify a new inbox was created
    assert.isDefined(inbox);

    // save the inboxId for later checking the emails
    inboxId = inbox.id;
    emailAddress = inbox.emailAddress;

    cy.wait(5000)


  });
});

    it('Can add gift card details' , () => {

    cy.visit('https://gift-cards.phorest.com/salons/demo-us')

    cy.get('[data-target="amount.optionButton"]').contains(amount).click()

    //enter contact details and click checkout button
    cy.get('[data-target="email.purchaserEmailInput"]').type(emailAddress)
    cy.get('[data-target="name.purchaserFirstNameInput"]').type(firstName)
    cy.get('[data-target="name.purchaserLastNameInput"]').type(lastName)
    
    cy.get('.w-btn [data-target= "checkout.checkoutButton"][data-action="checkout#checkoutAction"]')
    .should('be.visible').click()

    }),

    it('Can view confirmation details' , () => {

    cy.url().should('include','#confirm')
    //check expected purchase details displayed and click confirm button
    
    cy.get('[data-target="confirm.totalSpan"]').contains(amount)
    cy.get('[data-target="confirm.purchaserEmailSpan"]').contains(emailAddress)
    cy.get('[data-target="confirm.recipientEmailSpan"]').contains(emailAddress)
    cy.get('[data-action="confirm#confirmAction"]').should('be.visible').click()

}),

    it('Can view and enter payment details' , () => {

    cy.url().should('include','#payment')
    cy.wait(5000)

    //interact with iframe to enter card deatils
    //see https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/

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
        cy.wait(5000)
      }

       getIframeBody().find('[name="cardName"]').should('be.visible').type(`${firstName} ${lastName}`)
       getIframeBody().find('[name="cardZip"]').type(cardZip)
       getIframeBody().find('[name="cardNumber"]').type(cardNumber)
       getIframeBody().find('[name="cardExpiry"]').type(cardExpiry)
       getIframeBody().find('[name="cardSecurity"]').type(cardSecurity)
       getIframeBody().contains('Submit').click()

    }),

    it('Can view purchase success details' , () => {

       cy.url().should('include','#success')
       cy.contains(amount)

 
   })

it("Confirmation email received", () => {
  // wait for an email in the inbox
  cy.waitForLatestEmail(inboxId).then((email) => {
    // verify we received an email
    assert.isDefined(email);
   
  });
});

})
     