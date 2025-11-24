import { faker } from '@faker-js/faker'

describe('should be able to sign up', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('it should be able to navigate to the sign in page and authenticate', () => {
    cy.contains('Criar conta').click()

    const email = faker.internet.email()
    const password = faker.internet.password()

    cy.get('input[name="username"]').type(faker.person.fullName())
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="confirmPassword"]').type(password)

    cy.contains('Criar conta').click()

    cy.wait(500).get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)

    cy.contains('Entrar').click()

    cy.contains('Login realizado com sucesso!').should('exist')
  })
})
