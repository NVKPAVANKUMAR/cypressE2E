describe("Nop Ecommerce", function () {

    beforeEach("Login Action", function () {
        // Set the viewport’s width and height globally
        cy.viewport(1440, 1200)

        // Login
        cy.visit('https://demo.nopcommerce.com/')

        //Click on Login Link
        cy.get('.ico-login').click()

        // Input Email ID
        cy.get('.email').type('autopayus@gmail.com')

        //Input Password
        cy.get('.password').type('waste@123')

        // Check Remember me checkbox
        cy.get('#RememberMe').click();

        //Click on login button
        cy.get('input.login-button').click()

        // Assertion 1
        cy.get('.ico-logout').
            should('contain', 'Log out')
        //Assertion 2    
        cy.get('.ico-logout').
            should('contain.text', 'Log out')
        //Assertion 3
        expect(cy.get('img[alt="nopCommerce demo store"]'))
            .to.not.be.null

        cy.screenshot('LoginSuccess')
    })

    it("Delete Existing Address", function () {
        // Assert 
        cy.get('.ico-account').then(($quan) => {
            if ($quan.text() == 'My account') {
                cy.get('.ico-account').click()
            }

            // Click on Addresses link
            cy.get('.customer-addresses>a').click()

            // Delete the exisitng address
            cy.get('.button-2.delete-address-button').click()

            cy.screenshot('AddressDeleted')
        })

    })

    it("Order a Product", function () {

        // Search for an product
        cy.get('input#small-searchterms').type('laptop')

        //Click on Search button
        cy.xpath('//input[@class="button-1 search-box-button"]').click()

        //Click on Product
        cy.xpath('//h2/a[.="Asus N551JK-XO076H Laptop"]').click()

        //Click on Add to Cart button
        cy.get('input.add-to-cart-button').click()

        //assert success notification bar
        cy.xpath('//p[@class="content"]').
            should('contain', 'The product has been added to your')

        cy.screenshot('Product Added')

        //click on Shopping cart
        cy.get('li#topcartlink').click()

        //assert item quantity
        cy.get('.qty-input').then(($quan) => {
            if ($quan.text() == 1) {
                cy.log("product quantity ok")
            } else {
                cy.get('.qty-input').clear().type(1)
            }
        })

        //Check T&C Checkbox
        cy.get('input#termsofservice').click()

        //click on checkout button
        cy.get('.checkout-button').click()

        // Click continue if address already exists, oterwise create new one
        cy.get('#BillingNewAddress_CountryId').then(($address) => {
            if ($address.length != 1) {
                cy.xpath('//div[@id="billing-buttons-container"]/input').click()
            } else {
                // Select Country Name
                cy.get('#BillingNewAddress_CountryId').select('India')

                //Type Cityname
                cy.get('#BillingNewAddress_City').type('BANGALORE')

                // Type Street Address
                cy.get('#BillingNewAddress_Address1').type('326 W. Somerset Dr')

                // Type zip code
                cy.get('#BillingNewAddress_ZipPostalCode').type('560016')

                // Type Mobile number
                cy.get('#BillingNewAddress_PhoneNumber').type('2222222222')

                // Click continue button
                cy.xpath('//div[@id="billing-buttons-container"]/input').click()
            }
        })

        //Click continue on shipping method
        cy.xpath('//div[@id="shipping-method-buttons-container"]/input').click()

        //Click continue in payment method
        cy.xpath('//div[@id="payment-method-buttons-container"]/input').click()

        //Click continue on Payment Information
        cy.xpath('//div[@id="payment-info-buttons-container"]/input').click()

        //Click Confirm on Confirm Order
        cy.xpath('//div[@id="confirm-order-buttons-container"]/input').click()

        //Validate Success message
        cy.xpath('//strong[.="Your order has been successfully processed!"]').
            should('contain.text', 'Your order has been successfully processed!')

        cy.screenshot('Order Successful')

        //Click logout
        cy.get('.ico-logout').click()
    })
})