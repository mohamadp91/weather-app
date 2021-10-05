describe("Show weather of a region", () => {
	it("should get weather data", () => {
		cy.visit("/")

		cy.findByTestId("menu-button").click()

		// i want to search tehran city
		cy.findByTestId("search-bar").type("teh")
		cy.findByTestId("region").click()
		cy.findByTestId("weather-region")
		cy.findByTestId("capital").should("contain", "Tehran")
		cy.findByTestId("country").should("contain", "Iran")
	})
})
