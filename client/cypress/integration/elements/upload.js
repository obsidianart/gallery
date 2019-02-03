/// <reference types="Cypress" />

context('Page elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  afterEach(() => {
    cy.resetMocks()
  })

  it('should display an upload button', () => {
    cy.get('[data-cy=upload]').should('be.visible')
  })

  it('should upload a jpg', () => {
    cy.get('[data-cy="upload"]').click()
    cy.get('[data-cy=dropzone]').dropFile('../fixtures/tree.jpg', 'image/jpeg')
    cy.get('[data-cy=documents-count]').invoke('text').should('contain','7 documents')
  })

  it('should increment the total size after the upload', () => {
    cy.get('[data-cy="upload"]').click()
    cy.get('[data-cy=dropzone]').dropFile('../fixtures/tree.jpg', 'image/jpeg')
    cy.get('[data-cy=documents-size]').invoke('text').should('contain', '737kb')
  })

  it('should display the newly added document', () => {
    cy.get('[data-cy="upload"]').click()
    cy.get('[data-cy=dropzone]').dropFile('../fixtures/tree.jpg', 'image/jpeg')

    // I wait till the document count is 7
    cy.get('[data-cy=documents-count]').invoke('text').should('contain', '7 documents')
    cy.get('[data-cy=document] h3').last().invoke('text').should('contain', 'tree.jpg')
  })

  it('should not allow to upload a text file and alert the user', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('[data-cy="upload"]').click()
    
    cy
      .get('[data-cy=dropzone]')
      .dropFile('../fixtures/fail.txt', 'text')
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Sorry, your file is either too big or the wrong format. Only jpg and png under 10MB are accepted')
      })
  })

})