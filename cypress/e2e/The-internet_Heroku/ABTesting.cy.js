/// <reference types="cypress" />


describe('AB Testing page spec', () => {
  it('visiting the A/B Testing Page', () => {
    cy.visit('/abtest')

    //Verify github link
    cy.get('body div a').invoke('attr', 'href').should('eq', 'https://github.com/tourdedave/the-internet')

    //Verify content this is A/B testing so one click might render
    //'A/B Test Control' and the next will be 'A/B Test Variation 1'
    cy.get('h3').then(($response) => {
      expect($response.text()).to.be.oneOf([
        'A/B Test Control',
        'A/B Test Variation 1'
      ])
    })

    //  if($response == 'A/B Test Control') {
      //  cy.wrap($response).should('contain.text', 'A/B Test Control')
      //} else if ($response == 'A/B Test Variation 1') {
      //  cy.wrap($response).should('contain.text', 'A/B Test Variation 1')
      //}
  

    cy.get('p').should('contain.text', 'Also known as split testing. This is a way in which businesses are able to simultaneously test and learn different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through).')
    
    //verify link at the bottom
    cy.get('.large-4 > div').should('contain.text', 'Powered by')
    cy.get('.large-4 > div').should('contain.html', 'http://elementalselenium.com/')
  })
})