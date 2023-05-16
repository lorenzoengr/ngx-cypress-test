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

    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1 .should
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // 2 .then save the result of the first function as the input 'label' as a JQuery element then a JQuery method to get the text then use assertion for 'Email Address'
        cy.get('[for="exampleInputEmail1"]').then ( label => {
            expect(label.text()).to.equal('Email address')
        })

        // 3 .invoke is cypress version of #2
        // used to get text from web page
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })
        
        // check if checkbox is clicked
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            // grabbing attribute values
            .invoke('attr', 'class')
            .should('contain', 'checked')
            // JQuery method
            // .then( classValue => {
            //     expect(classValue).to.contain('checked')
            // })
    })

    // invoke properties of web elements
    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        // click a date on calendar and assert the date is shown
        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then( input => {
                cy.wrap(input).click()
                cy.get('nb-calendar-day-picker').contains('11').click()
                // date is found under Properties -> value
                cy.wrap(input).invoke('prop', 'value').should('contain', 'May 11, 2023')
            })
    })
    
    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // check radio buttons
        cy.contains('nb-card', 'Using the Grid')
            .find('[type="radio"]')
            .then( radioButtons => {
                cy.wrap(radioButtons)
                    // .first is same as eq(0) via index
                    .first()
                    // force cypress to click/check element even if hidden
                    .check({force: true})
                    .should('be.checked')
                
                    cy.wrap(radioButtons)
                    // eq(1) is same as second()
                    .eq(1)
                    .check({force: true})

                    cy.wrap(radioButtons)
                    .first()
                    // check 1st radio button is not checked after 2nd is checked
                    .should('not.be.checked')

                    cy.wrap(radioButtons)
                    .eq(2)
                    .should('be.disabled')
            })
    })

    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]')
            // if you want to uncheck an already checked box, have to use .click()
            .check({force: true})
        
        cy.get('[type="checkbox"]')
        // if you want to uncheck an already checked box, have to use .click()
            .eq(0).click({force: true})
            
    })

    // JS date object
    it('assert property', () => {

        function selectDayFromCurrent(day){
            // Date object gets current current system's date/time
            let date = new Date()

            // add # days to the date object and set date back into the date format, so you have to call the object again
            date.setDate(date.getDate() + day)

            // this is the day we want to select
            let futureDay = date.getDate()

            // the future month we want to select
            // let futureMonth = date.getMonth()
            // same as above but if month names are abbreviated
            let futureMonth = date.toLocaleString('default', {month: 'short'})

            // create variable to check if test output matches intended date to be selected
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if (!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right]').click()
                    // // use 2 locators (tag name and class) to ensure a grayed out date from other month is not selected
                    // cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    
                    // use while loop bc its gonna call itself if that month doesnt have that # it will click next arrow to  satisfy # of days that added/subtracted from current date
                    selectDayFromCurrent()
                } else {
                    // use 2 locators (tag name and class) to ensure a grayed out date from other month is not selected
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        

        // click a date on calendar and assert the date is shown
        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then( input => {
                cy.wrap(input).click()

                // cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                //     if (!dateAttribute.includes(futureMonth)){
                //         cy.get('[data-name="chevron-right]').click()
                //         // use 2 locators (tag name and class) to ensure a grayed out date from other month is not selected
                //         cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                        
                //     } else {
                //         // use 2 locators (tag name and class) to ensure a grayed out date from other month is not selected
                //         cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                //     }
                // })
                
                // 10 is the parameter for # of days
                let dateAssert = selectDayFromCurrent(10)
                // assertion to verify if test output matches intended date to be selected
                cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            })
    })

    it('lists and dropdowns', () => {
        cy.visit('/')

        // 1.
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // // verify the list contains Dark
        // cy.get('nav nb-select').should('contain', 'Dark')
        // // use css style to verify the color code #151a30 to rgb
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
        
        // 2. create a loop to verify each dropdown option
        // if tag has 'select' ypu can use the cypress .select method
        cy.get('nav nb-select').then (dropdown => {
            cy.wrap(dropdown).click()
            // get all options in the list using for .each method loop
            // iterate through listItem 
            cy.get('.options-list nb-option').each( (listItem, index) => {
                // create a variable to store the text of each optiom
                // .trim to remove space and keep just text
                const itemText = listItem.text().trim()

                // JSON object for color codes
                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)",
                }

                // click on the option
                cy.wrap(listItem).click()
                // verify the input field contains the text selected
                cy.wrap(dropdown).should('contain', itemText)
                // remove hard code rgb colors and use JSON object to check each option's colors
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                // logic so it doesnt click the dropdown menu after going throught the list
                
                if (index < 3){
                    cy.wrap(dropdown).click()
                }
            })
        })

    })

    it.only('web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // update Larry's age from 18 to 25
        // use contains to find a certain table and role by the values in table
        // then you can use tableRow to interact with th edifferent columns
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            // use the index to access particular column
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        // add user john smith
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('John')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Smith')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        // verify the user was added
        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'John')
            cy.wrap(tableColumns).eq(3).should('contain', 'Smith')
        })

        // filter by the ages
        // array of ages to filter through
        const age = [20, 30, 40, 200]

        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            // add a 0.5s delay for table to filter
            cy.wait(500)
            // use .each to iterate through rows/columns to a certain value
            cy.get('tbody tr').each( tableRow => {
                // logic to check that no data found
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })

    })
})
