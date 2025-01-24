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
| Ben Hayward    |            |                              | ✔                 | ✔                   | ✔         | ✔                | ✔        |
| Ismahän Hassan |            | ✔                           |                    | ✔                   | ✔         | ✔                | ✔        |
| Luke Goodwin   | ✔         |                              |                    | ✔                   | ✔         | ✔                | ✔        |

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

| Challenge                             | Risk                                                                                                                        | Solution                                                                                                                                                                         |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Implementing secure login             | User details including passwords are accessible that and anyone can access anyone else's account                            | Used bcrypt for password hashing and CSRF protection                                                                                                                             |
| SQL injection                         | Database queries such as blog post search could allow SQL queries to be added to the search to leak or modify database data | Sequelize uses parameterized queries which safely escape and inject parameters to prevent malicious alteration of the SQL query                                                  |
| Merge conflicts                       | Multiple team members working on the same files could lead to code loss or incorrect merges                                 | Implemented clear branch naming conventions and required PR reviews. Used feature branches to isolate work. Communicated actively about which files team members were working on |
| Environment inconsistencies           | Code working locally but failing in different environments (Windows vs Linux, different Node versions)                      | Created Docker setup to ensure consistent development environment. Added detailed environment setup documentation. Specified exact dependency versions in package.json           |
| Time management with work commitments | Difficulty coordinating team activities due to different work schedules and commitments                                     | Set up async communication channels. Scheduled regular but flexible check-ins                                                                                                    |
| Database schema changes               | Changes to database models could break existing functionality                                                               | Created an ERD and implemented the required database schema early to prevent issues later                                                                                        |
| Testing environment setup             | Different testing approaches (unit, integration, BDD) required different configurations                                     | Created separate test configuration files. Added npm scripts for different test types. Documented test setup process                                                             |
| Code style consistency                | Different IDE settings and personal preferences leading to inconsistent code                                                | Implemented ESLint and Prettier.                                                                                                                                                 |
| Knowledge sharing                     | Team members having different levels of expertise in different areas                                                        | Created documentation for key implementations. Added comments for complex logic. Conducted code review sessions                                                                  |
| Passwords are not secure              | Users can use passwords that are simple and easy to guess allowing others to gain access to their account                   | Added backend validation to ensure passwords have a minimum length, include a caps character and a special character                                                             |

## Evidence for Marking Criteria

### Feature Implementation 

Description: 
This blog application offers key features for an enhanced user experience. Users can search for posts by keywords, blog name, or author, with the option to clear their search. They can like posts to show appreciation and comment to foster discussions, with the ability to edit their comments. A secure login and registration system ensures user data protection, allowing registered users to access interactive features like liking and commenting.

- **Code Reference:** 

![Registration form with secure password hashing implementation](./screenshots/feature-1.png)
The code implements a registration feature, securely hashing user passwords with bcrypt, saving user details via a controller, and redirecting to the login page upon successful registration.

![Blog post like button and counter implementation](./screenshots/feature-2.png)
The code implements a like feature, enabling logged-in users to toggle likes on blog posts and returning the updated like status and count in real-time.

![Comment section with CRUD operations](./screenshots/feature-3.png)
The code implements a comment feature, enabling users to write and submit comments on specific blog posts, which are saved with user and post details.

![Blog search functionality with filtering options](./screenshots/feature-4.png)
The code implements a search feature, allowing users to find blog posts by title or author, with the option to clear the search query and a message displayed when no blogs of that type are found.

![Search feature template in Pug](./screenshots/feature-5.png)
Search feature HTML Pug implementation showing the search form and results layout.

![Registration page template in Pug](./screenshots/feature-6.png)
Registration feature HTML Pug implementation with form validation and error handling.

![Search feature styling](./screenshots/feature-7.png)
CSS implementation for the search feature including responsive design elements.

![Comment feature styling](./screenshots/feature-8.png)
CSS implementation for the comment feature with interactive elements.

![Blog router tests pull request](./screenshots/feature-9.png)
Ben's pull request implementing the blog router integration tests.

![Search feature pull request](./screenshots/feature-10.png)
Ismahan's pull request implementing the search functionality.

![Authentication testing pull request](./screenshots/feature-11.png)
Luke's pull request implementing user authentication testing.

![Authentication pull request](./screenshots/feature-12.png)
Luke's pull request implementing user authentication with bcrypt.

![Authentication commit history](./screenshots/feature-13.png)
Commit history showing the progression of user authentication implementation.

![Like feature pull request](./screenshots/feature-14.png)
Ben's pull request implementing the blog like feature.

![Comment feature pull request](./screenshots/feature-15.png)
Pull request implementing the comment system with edit capabilities.

![Comment feature commit history](./screenshots/feature-16.png)
Commit history showing the implementation stages of the comment feature.

![Search feature pull request](./screenshots/feature-17.png)
Ismahan's pull request implementing the search functionality.

![Search feature commit history](./screenshots/feature-18.png)
Commit history showing the development of the search feature.

![Passport implementation](./screenshots/feature-19.png)
Passport implementation and login router.

### Testing 

- **Comprehensive Unit and Integration Tests:** We have implemented comprehensive unit and integration tests using Jest. The tests cover various functionalities of the application, including edge cases.
- **Code Coverage:** Our tests achieve over 80% code coverage, ensuring that most of the codebase is tested.
- **Testing Techniques:** We have utilized Behavior-Driven Development (BDD) techniques to ensure the quality of our tests.
- **Testing Frameworks and Tools:** We used Jest for unit and integration tests, and Cucumber for BDD tests.
- **Continuous Integration:** Automated testing is set up using GitHub Actions to ensure tests are run on every push and pull request.
- **Example Test Cases:**
  - **Unit Test:** Testing the user authentication function.
  - **Integration Test:** Testing the interaction between the blog post creation and the database.
  - **BDD Test:** Testing the user login flow from the UI perspective.
- **Documentation:** Detailed documentation of the tests is provided, explaining the purpose and functionality of each test.

  - **Code Reference:** 
    - Unit Tests: 
      - [tests/unit/blogPostController.test.js](./tests/unit/blogPostController.test.js) 
      - [tests/unit/userController.test.js](./tests/unit/userController.test.js)
    - Integration Tests: 
      - [tests/integration/authRouter.test.js](./tests/integration/authRouter.test.js)
      - [tests/integration/blogRouter.test.js](./tests/integration/blogRouter.test.js)
    - BDD Tests: 
      - [features/step_definitions/home.test.js](./features/step_defintions/home.test.js)
      - [features/home.feature](./features/home.feature)
      - [features/step_definitions/login.test.js](./features/step_defintions/login.test.js)
      - [features/login.feature](./features/login.feature)
      - [features/step_definitions/register.test.js](./features/step_defintions/register.test.js)
      - [features/register.feature](./features/register.feature)
  - **Coverage Report:** 
    ![Coverage Report](/screenshots/coverage_report.png)
  - **Test Execution:** 
    - Example of a failing test ![alt text](/screenshots/failing_test.png)
    - Example of a successful test ![alt text](/screenshots/passing_test.png)
    - Example of test suite ![alt text](/screenshots/test_suite.png)

### Security Enhancements

- **Input Validation:** We have implemented input validation to ensure that all user inputs are properly validated before processing.
- **CSRF Protection:** Cross-Site Request Forgery (CSRF) protection is implemented to prevent unauthorized actions on behalf of authenticated users.
- **Password Hashing:** User passwords are hashed using bcrypt before storing them in the database, ensuring that passwords are not stored in plain text.
- **Advanced Safeguards:** We have incorporated advanced safeguards against vulnerabilities such as Cross-Site Scripting (XSS) and SQL injection.
  - **XSS Protection:** Input fields are sanitized and encoded to prevent XSS attacks.
  - **SQL Injection Protection:** We use parameterized queries with Sequelize ORM to prevent SQL injection attacks.
- **Example Security Test Cases:**
  - **SQL Injection:** Testing input fields to ensure they are not vulnerable to SQL injection attacks.
  - **XSS:** Testing input fields to ensure they are not vulnerable to Cross-Site Scripting attacks.
- **Implementation Details:** Detailed implementation of security measures is provided in the codebase.

  - **Code Reference:** 
    - Input Validation: [controllers/blogPostController.js#L13](./controllers/blogPostController.js#L13) // Validates and sanitizes blog post data
    - CSRF Protection: [routers/authRouter.js#L12](./routers/authRouter.js#L12) // Protects against CSRF attacks in authentication routes
    - Password Hashing: [routers/authRouter.js#L32](./routers/authRouter.js#L32) // Hashes user passwords before storing them
    - XSS Protection: [features/step_defintions/home.test.js#L30](./features/step_defintions/home.test.js#L30) // Ensures input fields are sanitized to prevent XSS
    - SQL Injection Protection: [models/index.js#L10](./models/index.js#L10) // Uses parameterized queries to prevent SQL injection
  - **Security Implementation:** 
    - Input Validation: [controllers/blogPostController.js](./controllers/blogPostController.js) // Validates and sanitizes blog post data
    - CSRF Protection: [routers/authRouter.js](./routers/authRouter.js) // Protects against CSRF attacks in authentication routes
    - Password Hashing: [routers/authRouter.js](./routers/authRouter.js) // Hashes user passwords before storing them
    - XSS Protection: [features/step_defintions/home.test.js](./features/step_defintions/home.test.js) // Ensures input fields are sanitized to prevent XSS
    - SQL Injection Protection: [models/index.js](./models/index.js) // Uses parameterized queries to prevent SQL injection

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

- **Video Demonstration:** [Walkthrough video](https://youtu.be/Ovkz2Pbvh3M)

## Code Quality and Refactoring Evidence

### Code Structure Improvements

![Code Structure Before Refactor](./screenshots/app-before.png)
_Figure 1: App.js before refactor and modularization_

![Code Structure Before and After](./screenshots/app-after.png)
_Figure 2: App.js after refactor and modularization_

### Database Model Organization

![User Model User.js](./screenshots/user-model.png)
_Figure 3: Screenshot of individual User model_

![Blog Post Model BlogPost.js](./screenshots/blog-post-model.png)
_Figure 4: Screenshot of individual BlogPost model_

![Separate models](./screenshots/db-models.png)
_Figure 5: Screenshot showing the organized database models structure_

### Environment Configuration

```env
# Example of our .env structure
PORT=3000
SESSION_SECRET=****
DATABASE_URL=****
```

_Figure 6: Example of environment configuration (with sensitive data redacted)_

### Router Separation

![Router Organization](./screenshots/router-structure.png)
_Figure 7: Screenshot showing the separation of routes into distinct modules_

## CI/CD and Git Practices Evidence

### Branch Protection Rules

![Branch Protection Settings](./screenshots/protection-rules.png)
_Figure 8: Screenshot of GitHub branch protection rules configuration_

### Pull Request Review Process

![PR Review Example](./screenshots/resolved-comments.png)
_Figure 9: Example of a pull request with review comments that have been resolved_

![PR Review Example Comments](./screenshots/pr-comments.png)
_Figure 10: Example of pull request comments_

### GitHub Actions Workflow

![GitHub Actions Dashboard Fail](./screenshots/action-fail.png)
_Figure 11: Screenshot of GitHub Actions showing failing test runs_

![GitHub Actions Dashboard Success](./screenshots/action-success.png)
_Figure 12: Screenshot of GitHub Actions showing successful test runs_

### Code Quality Checks

![ESLint Results Fail](./screenshots/lint-fail.png)
_Figure 13: Example of ESLint code quality check with failed results_

![ESLint Results Success](./screenshots/lint-success.png)
_Figure 14: Example of ESLint code quality check successful results_

### Branching Strategy

![Git Graph](./screenshots/git-graph.png)
_Figure 15: Git graph showing our branching strategy in action_

## Conclusion
The team successfully delivered significant improvements to the blog application while implementing robust software quality assurance practices:

### Key Achievements
- Enhanced security through proper password hashing and CSRF protection
- Implemented comprehensive testing strategy including BDD, unit, and integration tests
- Added new features including user profiles, blog interactions (likes/comments), and improved search functionality
- Established efficient CI/CD pipelines using GitHub Actions
- Maintained high code quality through modularization and industry-standard practices

### Future Improvements
- Implement additional security features like two-factor authentication
- Enhance performance optimization for scaling
- Add more social features for user interaction
- Expand test coverage across all components
- Implement automated deployment pipelines
