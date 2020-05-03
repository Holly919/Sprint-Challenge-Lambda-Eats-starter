// Implement the following tests in Cypress:
// -test that you can add text to the box
// -test that you can select multiple toppings
// -test that you can submit the form

describe("Test form inputs and submittal", function () {
    beforeEach(function () {
        cy.visit("http://localhost:3000/pizza");
    });
    it("Add Tests to test form", function () {
        cy.get('input[name="name"]')
            .type("Fake Name")
            .should("have.value", "Fake Name");
        cy.get('[type="checkbox"]')
            .check()
            .should("be.checked");
        cy.get('button')
            .click()
    })
    

});
