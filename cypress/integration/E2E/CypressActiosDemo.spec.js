describe("Multiple Actions Demo", () => {

    //  Functionalities Covered --> (
    //  Input Text,
    //  Radio button Selection, 
    //  Check Box Selection, 
    //  Uncheck box
    //  Click button, 
    //  Dropdown selection, 
    //  Webtable handle,
    //  CSS Properity Validation of Element
    //  Screenshot capturing
    //  ScrollIntoView
    //  RightClick
    //  getText(have.text)
    //  Reload Page)


    // Declaring WebElements n Creating aliases
    beforeEach(() => {
        cy.viewport(1440, 1200)
        cy.visit('https://only-testing-blog.blogspot.com/2014/01/textbox.html')
        cy.get('img[id="Image1_img"]').as('browserstack')
        cy.get("input[id*='text']").as('inputbox')
        cy.get("input[id='text1']").as('enabledinput')
        cy.get("input[id='text2']").as('disabledinput')
        cy.get('select[id="Carlist"]').as('carSelection')
        cy.get('select[name="FromLB"]').as('multiSelect')
        cy.get('input[id="check2"]').as('checkedBox')
        cy.get('input[id="check3"]').as('unCheckedBox')
        cy.get('#timeLeft').as('elementState')
        cy.get('.post-title.entry-title').as('textBoxHeader')
        cy.xpath('//a[.="Open New Page"]').as('newPageElement')
        cy.xpath('//td[2]/input[1]').as('toggleToRight')
        cy.get('#submitButton').as('submit')
        cy.get('select[name="ToLB"]').as('dropzone')
        cy.get('#radio2').as('genderSelection')
        cy.get('input[value="Show Me Alert"]').as('alertPopup')
        cy.xpath("//button[.='Show Me Confirmation']").as('confirmationPopup')
        cy.xpath("//button[.='Show Me Prompt']").as('promptPopup')
    })


    it('Create backup button should be visible, has right text and attributes', function () {

        cy.get('@textBoxHeader')
            .should('contain.text', 'TextBox')
        // Browser Stack Image Html Attibutes n CSS Validation
        cy.get('@browserstack')
            // Validate Image visible
            .should('be.visible')
            // Alternate text validation
            .should('have.attr', 'alt', 'Sponsors List')
            // validate element width
            .should('have.attr', 'width', '240')
            // validate element height
            .should('have.attr', 'height', '57')
            // validate element not have text
            .should('not.have.text', "browser")
            // validate element lenght(count)
            .should('have.length', '1')

        // Validate number of input boxes    
        cy.get('@inputbox')
            .should('have.length', 3)


        // Enter input text and Validate text entered correctly or not    
        cy.get('@enabledinput').
            clear().
            type('sample').
            should('have.value', 'sample')


        // Check inputbox wheather disabled    
        cy.get('@disabledinput').
            should('be.disabled')

        // Right Click Action
        cy.get('@browserstack').
            rightclick()

        // Radio Option Selection
        cy.get('@genderSelection').click()

        // Item Selection from Dropdown    
        cy.get('@carSelection').select('Renault')

        // Multiple Option Selection
        cy.get('@multiSelect').select(['Russia', 'Italy'])

        //Move Elements Left to Right Container
        cy.get('@toggleToRight').focus().click().blur()

        // getText and assert
        cy.get('@dropzone').should('have.text', '\nRussiaItaly')

        // Check box not Selected 
        cy.get('@checkedBox').should('not.be.checked')

        // Validate checkbox not checked
        cy.get('@unCheckedBox').click().should('be.checked')

        // Alert Handle
        cy.get('@alertPopup').click()

        // asserting with Jquery
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Hi.. This is alert message!')
        })

        // Confimation Handle
        cy.get('@confirmationPopup').click()

        // asserting with Jquery
        cy.on('window:confirm', (str) => {
            expect(str).to.equal("Press 'OK' or 'Cancel' button!")
        })

        // prompt Handle
        // cy.get('@promptPopup').click().type('pavan')

        //Webtable Assertion value exists or not
        cy.get('tr').eq(2).should('contain', '24.63')

        // explicit wait
        cy.wait(12000)

        // Click submit button
        cy.get('@submit').click()

        // validate css of an element(font-family properity)
        cy.get('@elementState')
            .should('have.css', 'font-family')
            .and('match', /serif/)

        // scroll into view element
        cy.get('@textBoxHeader').scrollIntoView()

        // reload page
         cy.reload()

        // valdiate href atribute of <a> element
        cy.get('@newPageElement')
            .then(function (el) {
                const url = el.prop('href')
                cy.log(url)
                expect('have.attr', 'href', "http://only-testing-blog.blogspot.in/2013/09/test.html")
            })

        // remove target
      //  cy.get('@newPageElement').invoke('removeAttr', 'target').click()

        // capture screenshot
        cy.screenshot('All Action Done')
    })
})