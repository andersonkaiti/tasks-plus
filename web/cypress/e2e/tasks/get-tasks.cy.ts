describe('should be able to sign up', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('it should be able to navigate to the sign in page and authenticate', () => {
    cy.create_task()

    cy.get('td[data-slot="table-cell"]').should('exist')
  })
})
