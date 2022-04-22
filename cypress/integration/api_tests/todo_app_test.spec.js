describe('demo api testing', () => {
    let todoItem;
    it('fetches demo api items - GET', () => {
        cy.request('/todos/').as('todoRequest');
        cy.get('@todoRequest').then(todos => {
            expect(todos.status).to.eq(200);
            assert.isArray(todos.body, 'demo api Response is an array')
        });
    });
 });

 it('deletes demo api items - DELETE', () => {
    cy.request('DELETE', `/todos/${todoItem}`).as('todoRequest');
    // deletes Todo item with id = 9
    cy.get('@todoRequest').then(todos => {
        expect(todos.status).to.eq(200);
        assert.isString(todos.body, 'demo item deleted!')
    });
});

it('Add item - POST', () => {
    cy.request('POST', '/todos/', { task: "run tests" }).as('todoRequest');
    // adds new Todo item by defining Todo name
    cy.get('@todoRequest').then(todos => {
        expect(todos.status).to.eq(200);
        cy.wrap(todos.body).should('deep.include', {
            task: 'run tests',
            completed: false,
        });
    });
});
