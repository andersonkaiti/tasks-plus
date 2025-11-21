import { faker } from '@faker-js/faker'

describe('should be able to sign up', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('it should be able to navigate to the sign up page and create an user', () => {
    cy.contains('Criar conta').click()

    const password = faker.internet.password()

    cy.get('input[name="username"]').type(faker.person.fullName())
    cy.get('input[name="email"]').type(faker.internet.email())
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="confirmPassword"]').type(password)

    cy.contains('Criar conta').click()

    cy.contains('Usuário cadastrado com sucesso!').should('exist')
  })
})
