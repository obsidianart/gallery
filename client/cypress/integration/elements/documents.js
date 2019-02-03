/// <reference types="Cypress" />

context('Page elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should display the documents', () => {
    cy.get('[data-cy=document]').its('length').should('eq', 6)
  })
})