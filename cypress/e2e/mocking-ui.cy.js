describe("UI Mocking Example with Button Click", () => {
    it("Should mock API response and log the first record", () => {
        // Mock API response for /api/users with updated data
        cy.intercept("GET", "/api/users", {
            statusCode: 200,
            body: [
                { id: 1, name: "Kiran", email: "kiran@example.com", gender: "Male", experience: 5, role: "Software Engineer", city: "Bangalore" },
                { id: 2, name: "Sam", email: "sam@example.com", gender: "Male", experience: 7, role: "Data Scientist", city: "Mumbai" },
                { id: 3, name: "John", email: "john@example.com", gender: "Male", experience: 4, role: "Product Manager", city: "Delhi" },
                { id: 4, name: "Piter", email: "piter@example.com", gender: "Male", experience: 9, role: "UI/UX Designer", city: "Chennai" },
                { id: 5, name: "Abhi", email: "abhi@example.com", gender: "Male", experience: 3, role: "QA Engineer", city: "Hyderabad" },
            ]
        }).as("getUsers");

        // Visit the local HTML file
        cy.visit("cypress/fixtures/index.html");

        // Click the "Load Users" button
        cy.get("#load-users").click();

        // Wait for mock API call
        cy.wait("@getUsers").then((interception) => {
            // Verify the status code
            expect(interception.response.statusCode).to.eq(200);

            // Verify the number of records in the response
            expect(interception.response.body).to.have.length(5);

            // Log the first record
            cy.log("First User Record:", JSON.stringify(interception.response.body[0]));
        });

        // Verify five user cards appear
        cy.get(".user-card").should("have.length", 5);
    });
});
