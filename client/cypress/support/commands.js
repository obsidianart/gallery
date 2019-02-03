// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//Specific command for the dropzone
Cypress.Commands.add(
  'dropFile',
  { prevSubject: 'element' },
  (subject, fileName, mimeType) => {
    return cy
      .fixture(fileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        // instantiate File from `application` window, not cypress window
        return cy.window().then(win => {
          const file = new win.File([blob], fileName, {
            type: mimeType,
          })
          const dataTransfer = new win.DataTransfer()
          dataTransfer.items.add(file)

          return cy.wrap(subject).trigger('drop', {
            dataTransfer,
          })
        })
      })
  }
)

// Reset the mock server
Cypress.Commands.add(
  'resetMocks',
  (subject) => {
    return cy
      .request('POST', 'http://localhost:3000/api/reset')
  }
)