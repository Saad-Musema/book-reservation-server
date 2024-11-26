Book Reservation System

This repository contains the Node.js Book Reservation System, a server-side application that allows users to manage book reservations. The project includes automated workflows to ensure code quality, functionality, and seamless deployment.
GitHub Actions Workflows
1. Linting Workflow

Ensures code quality by automatically analyzing the codebase with ESLint.

    Trigger: Runs on every push or pull request to the main branch.
    Steps:
        Sets up the Node.js environment.
        Installs dependencies.
        Runs the npm run lint command to check for linting issues.
        Fails if any issues are detected.

2. Testing Workflow

Validates the functionality of the application by running the test suite.

    Trigger: Runs on every push or pull request to the main branch.
    Steps:
        Sets up the Node.js environment.
        Installs dependencies.
        Spins up an in-memory MongoDB instance using mongodb-memory-server for isolated testing.
        Runs the test suite using Jest.
        Reports test results and provides a detailed summary.


Local Setup
Prerequisites

    Node.js >= 14
    npm >= 6
    MongoDB (optional for production; in-memory MongoDB is used for testing)

Installation

    Clone the repository:

git clone https://github.com/Saad-Musema/book-reservation-server<repository_url

Navigate to the project directory:

cd book-reservation-system

Install dependencies:

    npm install

Configuration

    Create a .env file in the root directory.
    Add the following environment variables:

    DATABASE_URL=<your_mongodb_connection_string>
    PORT=3000

Running Locally

    Start the server:

npm start

Run the tests:

    npm test

How the Workflow Works
Setting Up the Node.js Environment

    Installs Node.js using the specified version in .nvmrc or the default in the actions/setup-node configuration.
    Installs the necessary dependencies using npm ci.

Testing with Jest and MongoDB

    Uses mongodb-memory-server to provide an isolated, in-memory database for tests.
    Establishes a connection to the in-memory MongoDB instance before tests begin.
    Drops the database and disconnects after tests are complete to ensure no test data leaks between runs.
