How to Clone and Run the Project Locally

1. Go to your GitHub repository page https://github.com/NegoslavAskovic/loginEko

2. Click the green Code button, then copy the repository URL (choose HTTPS ).

3. Open your terminal (Git Bash, Command Prompt, or any Git client).

4. Navigate to the folder where you want to clone the project:
   cd /path/to/your/folder

5. Clone the repository by running:
   git clone https://github.com/your-org/automated-tests.git

6. Change into the cloned directory:
   cd automated-tests

7. Open the project in Visual Studio Code (or your preferred editor):
   code .

8. Install dependencies with a clean install:
   npm ci

9. To run the tests:

Open the Cypress Test Runner UI:
npx cypress open

Or run tests headlessly in the terminal:
npx cypress run

⚠️ Important: Set Your Credentials for commands.ts
The sensitive values used in commands.ts — such as:

"URL":,
"GRANT_TYPE":,
"CLIENT_ID":,
"USERNAME":,
"PASSWORD":,
"KEYCLOAK_BASE_URL":,
"REALM":,
"REDIRECT_URI":

— are not included in this repo for security reasons.

Create a file named cypress.env.json in the root of the project (if it doesn’t exist) and add appropriate values.
