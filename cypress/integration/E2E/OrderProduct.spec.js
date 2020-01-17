describe("Ecommerce Application Demo", function () {

    beforeEach("Launch Application and Login", function () {
        cy.viewport(1440, 1200) // Set the viewport’s width and height globally

        // test1_Launch Application and Login
        cy.visit('https://demo.nopcommerce.com/')
        cy.get('.ico-login').click()
        cy.get('.email').type('autopayus@gmail.com')
        cy.get('.password').type('waste@123')
        cy.get('#RememberMe').click();
        cy.get('input.login-button').click()

        // Assertion_Checking Wheather Logout button exists, after successful login
        cy.get('.ico-logout').
            should('contain', 'Log out')
        cy.screenshot('LoginSuccess')
    })

    // This is needed to delete any existing address for user account 
    // to avoid default address seletion
    it("Delete Existing Address", function () {
        // Assert 
        cy.get('.ico-account').then(($quan) => {
            if ($quan.text() == 'My account') {
                cy.get('.ico-account').click()
            }
            cy.get('.customer-addresses>a').click() // Click on Addresses link
            cy.get('.button-2.delete-address-button').click()  // Delete the exisitng address
            cy.screenshot('AddressDeleted')
        })
    })

    it("Scenario_Purchasing a Product", function () {
        // test2_Search for an product
        cy.get('input#small-searchterms').type('laptop')
        cy.xpath('//input[@class="button-1 search-box-button"]').click()

        //test3_Selecting and adding a product to the cart and capturing screenshot
        cy.xpath('//h2/a[.="Asus N551JK-XO076H Laptop"]').click()
        cy.get('input.add-to-cart-button').click()
        //assert success notification bar
        cy.xpath('//p[@class="content"]').
            should('contain', 'The product has been added to your')
        cy.screenshot('Product Added')

        // test4_Performing Checkout
        cy.get('li#topcartlink').click() // click on Shopping cart
        cy.get('.qty-input').then(($quan) => {
            if ($quan.text() == 1) {
                cy.log("product quantity ok")
            } else {
                cy.get('.qty-input').clear().type(1)
            }
        })   //assert item quantity
        cy.get('input#termsofservice').click()   //Check T&C Checkbox
        cy.get('.checkout-button').click()  //click on checkout button

        // test5_Providing Shipping & Billing address
        cy.get('#BillingNewAddress_CountryId').then(($address) => {
            if ($address.length != 1) {
                cy.xpath('//div[@id="billing-buttons-container"]/input').click()
            } else {
                cy.get('#BillingNewAddress_CountryId').select('India')   // Select Country Name
                cy.get('#BillingNewAddress_City').type('BANGALORE') //Type Cityname
                cy.get('#BillingNewAddress_Address1').type('326 W. Somerset Dr') // Type Street Address
                cy.get('#BillingNewAddress_ZipPostalCode').type('560016') // Type zip code
                cy.get('#BillingNewAddress_PhoneNumber').type('2222222222')    // Type Mobile number
                cy.xpath('//div[@id="billing-buttons-container"]/input').click()   // Click continue button
            }
        })
        cy.xpath('//div[@id="shipping-method-buttons-container"]/input').click() //Click continue on shipping method

        // test6_Selecting payment method
        cy.xpath('//div[@id="payment-method-buttons-container"]/input').click() //Click continue in payment method
        cy.xpath('//div[@id="payment-info-buttons-container"]/input').click()  //Click continue on Payment Information

        // test7_Confirm Order and Verify Success Message
        cy.xpath('//div[@id="confirm-order-buttons-container"]/input').click() //Click Confirm on Confirm Order
        cy.xpath('//strong[.="Your order has been successfully processed!"]').
            should('contain.text', 'Your order has been successfully processed!')  //Validate Success message
        cy.screenshot('Order Successful')

        //  test8_Logout from User Account
        cy.get('.ico-logout').click()  //Click logout
    })
})