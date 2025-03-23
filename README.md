# Cypress UI Mocking and API Testing

## Overview
This project demonstrates how to mock API responses in a simple web application using Cypress for testing. The application fetches user data from a mock API and displays it dynamically.

## Features
- Mock API responses using `cy.intercept` in Cypress.
- Display user details dynamically in a web UI.
- Validate API responses and UI updates with Cypress tests.

## Project Structure
```
MockingCypress/
│── cypress/
│   ├── fixtures/
│   │   ├── index.html   # HTML file for UI
│   ├── integration/
│   │   ├── mock_api_spec.js   # Cypress test file
│── README.md  # Documentation
```

## Technologies Used
- **Cypress**: For UI and API testing.
- **JavaScript**: For frontend scripting.
- **HTML & CSS**: For UI rendering.

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd MockingCypress
   ```
2. Install Cypress:
   ```sh
   npm install cypress --save-dev
   ```

## Running Cypress Tests
1. Open Cypress Test Runner:
   ```sh
   npx cypress open
   ```
2. Run the `mock_api_spec.js` test file.

## Cypress Test Breakdown
- **Intercept API Call:**
  ```js
  cy.intercept("GET", "/api/users", { ...mockData }).as("getUsers");
  ```
- **Visit the UI and Trigger API Call:**
  ```js
  cy.visit("cypress/fixtures/index.html");
  cy.get("#load-users").click();
  ```
- **Verify API Response and UI Rendering:**
  ```js
  cy.wait("@getUsers").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      cy.get(".user-card").should("have.length", 5);
  });
  ```

## Checking API Calls in Browser (For Understanding/Demonstration)
1. Open the `index.html` file in a browser.
2. Open Developer Tools (Press `F12` or `Ctrl + Shift + I` in Chrome).
3. Go to the **Network** tab.
4. Click the **Load Connections** button.
5. Observe the API request (`/api/users`) in the network tab and check the response details.
6. Review headers, status codes, and response payload to understand the request flow.

## Expected Output
Upon running the tests, Cypress will validate:
- The API call returns a mocked response successfully.
- The UI updates with the expected number of user records.
- The first record is logged correctly.

## Conclusion
This project showcases how to implement UI mocking in Cypress to efficiently test API-driven applications. 🚀

