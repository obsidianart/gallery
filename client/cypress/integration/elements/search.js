/// <reference types="Cypress" />

context('Page elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should display a search document option', () => {
    cy.get('[data-cy=filter]').should('be.visible')
  })
})