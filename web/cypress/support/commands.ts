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

  cy.wait(500).get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)

  cy.contains('Entrar').click()
})

Cypress.Commands.add('create_task', () => {
  cy.login()

  cy.contains('Tarefas').click()

  cy.contains('Cadastrar tarefa').click()

  cy.get('input[name="title"]').type(faker.word.words(5))
  cy.get('textarea[name="description"]').type(faker.lorem.sentence())
  cy.contains('Selecionar data').click()
  cy.get('button[data-day]').not('[disabled]').first().click()
  cy.get('input[id="time-picker"]').click().type('23:59')

  cy.contains('Criar tarefa').click()
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      create_task(): Chainable<void>
    }
  }
}
