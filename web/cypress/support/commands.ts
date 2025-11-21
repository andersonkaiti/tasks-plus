/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

Cypress.Commands.add('login', () => {
  cy.visit('/')

  const email = faker.internet.email()
  const password = faker.internet.password()

  cy.contains('Criar conta').click()

  cy.get('input[name="username"]').type(faker.person.fullName())
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('input[name="confirmPassword"]').type(password)

  cy.contains('Criar conta').click()

  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)

  cy.contains('Entrar').click()
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      create_task(): Chainable<void>
    }
  }
}
