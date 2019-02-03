/// <reference types="Cypress" />

context('Page elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should display a search document option', () => {
    cy.get('[data-cy=filter]').should('be.visible')
  })

  it('should filter when typing', () => {
    cy.get('[data-cy=filter]').type('1')
    
    //Force to wait till is updated
    cy.get('[data-cy=documents-count]').invoke('text').should('contain', '1 document')

    cy.get('[data-cy=document] h3').last().invoke('text').should('contain', 'Doc 1')
  })

  it('should update total documents and size', () => {
    cy.get('[data-cy=filter]').type('1')
    cy.get('[data-cy=documents-count]').invoke('text').should('contain', '1 document')
    cy.get('[data-cy=documents-size]').invoke('text').should('contain', '100kb')
  })
})