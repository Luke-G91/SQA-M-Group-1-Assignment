# SQA Group 1 Blog App

## Table of Contents

- [Introduction](#introduction)
- [Team Contributions](#team-contributions)
- [Setup Instructions](#setup-instructions)
  - [Quick Setup](#quick-setup)
  - [Local Setup](#local-setup)
  - [Running Tests](#running-tests)
- [Features](#features)
- [Challenges and Solutions](#challenges-and-solutions)
- [Evidence for Marking Criteria](#evidence-for-marking-criteria)
  - [Feature Implementation](#feature-implementation)
  - [Testing](#testing)
  - [Security Enhancements](#security-enhancements)
  - [Code Quality and Refactoring](#code-quality-and-refactoring)
  - [CI/CD and Git Practices](#ci-cd-and-git-practices)
- [Conclusion](#conclusion)

## Introduction

- **Purpose:** This project aims to enhance a basic blog application by implementing software quality assurance (SQA) principles. The objectives include improving security, testing, and code quality while demonstrating effective collaboration using Git and GitHub.

## Team Contributions

| Team Member    | Login Flow | Search and Home Improvements | Likes and Comments | README documentation | Unit Tests | Integration Tests | BDD Tests |
| -------------- | ---------- | ---------------------------- | ------------------ | -------------------- | ---------- | ----------------- | --------- |
| Ben Hayward    |            |                              | ✔                 |                      |            |                   |           |
| Ismahän Hassan |            | ✔                           |                    |                      |            |                   |           |
| Luke Goodwin   | ✔         |                              |                    | ✔                   |            |                   |           |

# Setup Instructions

### Quick Setup

1. Launch the application using Docker

   To start the entire stack quickly using a postgres container and the app container, which will be avaliable [here](http://localhost:1234/)

   ```bash
   docker-compose up
   ```

### Local Setup

1. **Install Dependencies**

   To install the necessary packages

   ```bash
   npm install
   ```

2. **Environment Configuration**

- Create a `.env` file in the root directory with the following variables

  - `PORT` (optional, defaults to 3000)
  - `SESSION_SECRET`

    Generate by using the following command:

    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```

3. **Starting the Application**

- To start the app with a local SQLite database, execute

  ```bash
  npm run start:local
  ```

- If you prefer using a different database, specify a connection string in the `.env` file using the `DATABASE_URL` variable.

4. **Optional: PostgreSQL Setup via Docker**

- To start a PostgreSQL database using Docker, run

  ```bash
  docker-compose up postgres
  ```

- Use the following connection URL in your `.env` file

  ```text
  DATABASE_URL=postgres://myuser:mypassword@localhost:5432/mydatabase
  ```

5. **Accessing the Application**
   - The application will be accessible on the defined localhost port. Users will need to register an account upon first access.

### Running Tests

- **Behavior-Driven Development (BDD) Tests**

  ```bash
  npm run test:bdd
  ```

- **Unit and Integration Tests**

  ```bash
  npm run test:jest
  ```

- **All Tests**

  ```bash
  npm run test
  ```

## Features

- **Login Flow:** Secure user authentication and authorization.
- **Blog Search and Home Page Improvements:** Enhanced user interface and search functionality.
- **Blog Likes and Comments:** Interactive features for user engagement.
- **User Profiles:** Personalized user experience with profile management.

## Challenges and Solutions

| Challenge                 | Risk                                                                                                                        | Solution                                                                                                                     |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Implementing secure login | User details including passwords are accessible that and anyone can access anyone else's account                            | Used bcrypt for password hashing and CSRF protection.                                                                        |
| SQL injection             | Database queries such as blog post search could allow SQL queries to be added to the search to leak or modify database data | Sequlize uses paramteised queries which safely escape and inject parameters to prevent malicious alteration of the SQL query |

## Evidence for Marking Criteria

### Feature Implementation

- **Code Reference:** [Link to relevant code sections]
- **Additional Evidence:** [Screenshots, videos, or links]

### Testing

- **Testing Approach:** Utilized Jest for unit and integration tests.
- **Coverage Report:** [Screenshots of test coverage]

### Security Enhancements

- **Security Measures:** Implemented password hashing and CSRF protection.
- **Code Reference:** [Link to relevant code sections]

### Code Quality and Refactoring

- **File Structure Update:** The project file structure was reorganized to facilitate modularization, improving maintainability and readability. [Modularized app functions](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/8/commits/099f51754eb220d1faf9914e0c692df9d2541108)
- **Environment Configuration:** Introduced a `.env` file to securely store configuration secrets such as the database URL and server port. [Database url from env](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/1)
- **Function Reusability:** Consolidated repeated code into separate, reusable functions.
- **Template Extensibility:** Organized Pug files and used `extends` for better template extensibility. [Pug file improvements](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/3/commits/53a2e8096c0240ab265d44bb1851a6ba0bfc358f)
- **Password Security:** Utilized `bcrypt` for secure password hashing. [Bcrypt alongside user auth](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/9/commits/b00384942f5c5327ccf75caa7543feae7c7fa959)
- **CSS Management:** Separated CSS into multiple files to enhance maintainability.
- **Error Handling:** Improved error handling for database interactions and synchronization.
- **Router Organization:** Split routers into distinct sections using different base paths for cleaner and more organized code. [Seperated routers](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/3/commits/84733bee3b2ac699d5e95b3eaf5bbf633f1789e8)
- **Docker Setup:** Created Docker and Docker Compose files for easy and consistent setup across different environments. [Docker Setup Example](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/11)
- **Router-Controller Separation:** Separated routers from controllers to maintain clear separation of concerns.
- **Environment-Specific Configurations:** Used different environments for local, testing, and production, allowing SQLite for local and PostgreSQL for production. [Test env added](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/3/commits/b179cb9dfe8134d7862fc721b770ae5e88014d3d)
- **Testing Scripts:** Added scripts in `package.json` to streamline running and testing processes.
- **Mocking in Tests:** Implemented mocks in unit tests to ensure consistent behavior and independence of functions.
- **Code Improvements Evidence:** [Code Formatting Example](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/19), [Refactor Example](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/3)

### CI/CD and Git Practices

- **CI/CD Setup:** Implemented GitHub Actions to automate testing for unit, integration, and BDD tests on a standardized environment using Node.js on Ubuntu. [List of Actions](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/actions)
- **Linting and Formatting:** Integrated ESLint for code linting and Prettier for consistent code formatting.
- **Database Model Management:** Organized database models in individual files and managed associations from a unified file. [Database models](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/6)
- **Naming Conventions:** Ensured function and variable names are readable and descriptive.
- **Branching Strategy:** Utilized a development branch workflow with releases to the main branch.
- **Branch Naming Conventions:** Followed industry standard git branching patterns such as `feat`, `doc`, `test`, `ci` for branch organization. [Test Naming Convention PR](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/242), [Doc Naming Convention PR](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/12), [CI Naming Convention PR](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/15)
- **Branch Protection Rules:** Established rules to enforce consistency, requiring PRs to be squashed into a single commit with standardized messages like `Feat: change here`.
- **Pull Request Reviews:** Required at least one review approval for PRs, with stale reviews upon further commits to ensure code quality. [Changes Requested Example with Comments](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/21)
- **Merge Blockage on Request Changes:** Prevented merges until requested changes were addressed and approved.
- **GitHub Actions Enforcement:** Required passing GitHub Actions tests and lint checks before merging. [Successful Action Log](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/actions/runs/12927683564), [Failing Lint Action Log](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/actions/runs/12929744677)

## Feature Implementation Evidence

- **Video Demonstration:** [Link to video demonstrating features]

## Testing Evidence

- **Test Execution:** [Screenshots of running tests]
- **Coverage Report:** [Screenshots of coverage report]

## Security Enhancements Evidence

- **Security Implementation:** [Description and code references]

## Code Quality and Refactoring Evidence

### Code Structure Improvements
![Code Structure Before Refactor](./screenshots/app-before.png)
*Figure 1: App.js before refactor and modularization*

![Code Structure Before and After](./screenshots/app-after.png)
*Figure 2: App.js before refactor and modularization*

### Database Model Organization
![User Model User.js](./screenshots/user-model.png)
*Figure 3: Screenshot User individual model*

![Blog Post Model BlogPost.js](./screenshots/blog-post-model.png)
*Figure 4: Screenshot BlogPost individual model*

![Separate models](./screenshots/db-models.png)
*Figure 5: Screenshot showing the organized database models structure*

### Environment Configuration
```env
# Example of our .env structure
PORT=3000
SESSION_SECRET=****
DATABASE_URL=****
```
*Figure 6: Example of environment configuration (with sensitive data redacted)*

### Router Separation
![Router Organization](./screenshots/router-structure.png)
*Figure 7: Screenshot showing the separation of routes into distinct modules*

## CI/CD and Git Practices Evidence

### Branch Protection Rules
![Branch Protection Settings](./screenshots/protection-rules.png)
*Figure 8: Screenshot of GitHub branch protection rules configuration*

### Pull Request Review Process
![PR Review Example](./screenshots/resolved-comments.png)
*Figure 9: Example of a pull request with review comments that have been resolved*

![PR Review Example Comments](./screenshots/pr-comments.png)
*Figure 10: Example of pull request comments*

### GitHub Actions Workflow
![GitHub Actions Dashboard Fail](./screenshots/action-fail.png)
*Figure 11: Screenshot of GitHub Actions showing failing test runs*

![GitHub Actions Dashboard Success](./screenshots/action-success.png)
*Figure 12: Screenshot of GitHub Actions showing successful test runs*

### Code Quality Checks
![ESLint Results Fail](./screenshots/lint-fail.png)
*Figure 13: Example of ESLint code quality check with failed results*

![ESLint Results Success](./screenshots/lint-success.png)
*Figure 14: Example of ESLint code quality check successful results*

### Branching Strategy
![Git Graph](./screenshots/git-graph.png)
*Figure 15: Git graph showing our branching strategy in action*

## Conclusion

- **Project Outcomes:** Successfully enhanced the blog application with improved security, testing, and user features.
- **Future Improvements:** Plan to further optimize performance and expand user functionalities.
