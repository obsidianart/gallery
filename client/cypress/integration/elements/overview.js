/// <reference types="Cypress" />

context('Page elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should display the number of documents', () => {
    cy.get('[data-cy=documents-count]').should('be.visible')
  })

  it('should display the total size', () => {
    cy.get('[data-cy=documents-size]').should('be.visible')
  })
})