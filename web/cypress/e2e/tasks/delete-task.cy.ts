describe('should be able to sign up', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('it should be able to navigate to the sign in page and authenticate', () => {
    cy.create_task()

    cy.get('button[data-slot="dropdown-menu-trigger"]').eq(1).click()

    cy.contains('Deletar').click()

    cy.get('button').contains('Deletar tarefa').click()
  })
})
