// vscode support for intellisense
/// <reference types="cypress" />

// general description of the suite
// () => is a callback function 
describe('our first suite', () => {

    // description of the test
    it('first test', () => {
        
        // address is already in baseURL of cypress.config.js file
        cy.visit('/')
        //
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // to get a web element for email textbox http://localhost:4200/pages/forms/layouts
        // by tag name
        cy.get('input')

        // by ID
        cy.get('#inputEmail1')
        
        // by class name
        cy.get('.input-full-width')

        // by attribute name
        cy.get('[placeholder]')

        // by attribute name and value
        cy.get('[placeholder="Email"]')

        // by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by tag name and attribute with value
        cy.get('input[placeholder="Email"]')

        // by 2+ different attributes
        cy.get('[placeholder="Email"][fullwidth][type="email"]')

        // by tag name, attribute with value, and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // MOST reccomended way by cypress (adding a custom attribute to source code)
        cy.get('[data-cy="imputEmail1"]')

    })

    // .only to run a specific test
    it('second test', () =>{

        // address is already in baseURL of cypress.config.js file
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')
        // finds the first sign in
        cy.contains('Sign in')

        // finds a specific sign in using a different identifier
        cy.contains('[status="warning"]','Sign in')

        // assertion that the checkbox is present
        // find method is only to find the child element INSIDE a parent element
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
        // .contains finds element by text
        cy.contains('nb-card','Horizontal form').find('[type="email"]')

    })

    it('then and wrap methods', () => {
        // address is already in baseURL of cypress.config.js file
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // // Using the Grid section
        // cy.contains('nb-card', 'Using the Grid')
        //     .find('[for="inputEmail1"]')
        //     .should('contain', 'Email')
        
        // cy.contains('nb-card', 'Using the Grid')
        //     .find('[for="inputPassword2"]')
        //     .should('contain', 'Password')
        
        // // Basic Form section
        // cy.contains('nb-card', 'Basic form')
        //     .find('[for="exampleInputEmail1"]')
        //     .should('contain', 'Email address')
        
        // cy.contains('nb-card', 'Basic form')
        //     .find('[for="exampleInputPassword1"]')
        //     .should('contain', 'Password')

        // selenium style
        // const gridForm = cy.contains('nb-card', 'Using the Grid')
        // const basicForm = cy.contains('nb-card', 'Basic form')

        // gridForm.find('[for="inputEmail1"]').should('contain', 'Email')
        // gridForm.find('[for="inputPassword2"]').should('contain','Password')
        // basicForm.find('[for="exampleInputEmail1"]').should('contain','Email address')

        // cypress style
        // Using the Grid section
        // used cy.contains to find unique element
        // .then saved the result of that function into gridForm function's parameter
        // .then converts it into a JQuery object (not cypress object) which allows you to save it into a variable
        // .text() grabs the text
        cy.contains('nb-card', 'Using the Grid').then( gridForm => {
            const gridEmail = gridForm.find('[for="inputEmail1"]')
                .text()
            const gridPassword = gridForm.find('[for="inputPassword2"]')
                .text()
            // the above function saves the context into a variable that could be called for an assertion
            expect(gridEmail).to.equal('Email')
            expect(gridPassword).to.equal('Password')
        

            // Basic Form section
            cy.contains('nb-card', 'Basic form').then( basicForm => {
                const basicEmail = basicForm.find('[for="exampleInputEmail1"]')
                    .text()
                const basicPassword = basicForm.find('[for="exampleInputPassword1"]')
                    .text()
                expect(basicEmail).to.equal('Email address')
                expect(basicPassword).to.equal('Password')

                expect(basicPassword).to.equal(gridPassword)

                // convert the JQuery object back to cypress context to use cypress methods
                cy.wrap(basicForm).find('[for="exampleInputPassword1"]')
                    .should('contain', 'Password')
            })
        })
    })
    it.only('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
    })
})
