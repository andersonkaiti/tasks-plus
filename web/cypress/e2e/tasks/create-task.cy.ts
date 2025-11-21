import { faker } from '@faker-js/faker'

describe('should be able to sign up', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('it should be able to navigate to the sign in page and authenticate', () => {
    cy.login()

    cy.contains('Tarefas').click()

    cy.contains('Cadastrar tarefa').click()

    cy.get('input[name="title"]').type(faker.word.words(5))
    cy.get('textarea[name="description"]').type(faker.lorem.sentence())
    cy.contains('Selecionar data').click()
    cy.get('button[data-day]').not('[disabled]').first().click()
    cy.get('input[id="time-picker"]').click().type('23:59')

    cy.contains('Criar tarefa').click()

    cy.contains('Tarefa criada com sucesso!').should('exist')
  })
})
