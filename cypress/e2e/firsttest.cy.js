/// <reference types="cypress" />

describe("First test", () => {
    it("Sould find components .", () => {
        cy.visit("http://localhost:3000/todo");
        // by tag name
        cy.get("input");
        // Write on the input field
        cy.get("input").type("Hello World");
        // Asert
        cy.get("input").should("have.value", "Hello World");
    })
})