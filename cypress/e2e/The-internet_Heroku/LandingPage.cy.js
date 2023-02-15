/// <reference types="cypress" />

//were errors in the test after "forking" see if errors still exist
describe('Welcome Page for TheInternet_Herokuapp.com', () => {
    it('Access landing page', () => {
      cy.request({url: '/'}).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('Verify headers on page', () => {
      cy.visit('/')
      cy.get('.heading').contains('Welcome to the-internet')

      cy.get('h2').contains('Available Examples')
    })

    //test that each link returns a 200 html status.  Clicking on the link will 
    //be tested by each pages test case.
    it('Verify links work using cy.request', () => {
      cy.visit('/')
      //the page has the correct number of links
      cy.get('[id^=content] > ul > li').its('length').should('eq', 44)

      //Is it worth using cy.request on this page when we will be "clicking"
      //to the link at a later time?
      cy.get('ul > li a').each($a => {
        const href = $a.attr('href')
        cy.log(href)
        
        //verify each link returns the correct response status
        if (href.includes('auth') || href.includes('download_secure')) {
          cy.log("Requires authentication checking for 401")
          
          cy.request({url: href, failOnStatusCode: false}).then((response) => {
            expect(response.status).to.equal(401)
          })
          
        } else {
            cy.request({url: href}).then((response) => {
              expect(response.status).to.equal(200)
            })
        }

      }) 
        
    })
  })