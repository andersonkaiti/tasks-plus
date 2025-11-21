describe('should be able to sign up', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('it should be able to navigate to the sign in page and authenticate', () => {
    cy.create_task()

    cy.get('button[data-slot="dropdown-menu-trigger"]').eq(1).click()

    cy.contains('Atualizar').click().wait(500)

    cy.contains('Salvar alterações').click()

    cy.contains('Tarefa atualizada com sucesso').should('exist')
  })
})
